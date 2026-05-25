---
title: "how I escaped the stash, checkout, restart loop"
date: "26-04-2026"
excerpt: "eight hours debugging a Linux VM, a planned macOS VM blocked by Apple Silicon, and the realization that I was solving the wrong problem."
---

running two branches of a thirty-service monorepo in parallel sounds simple. it is not.

I don't mean two checkouts of the same repo on disk — that's `git worktree`, and it's a one-line solution. I mean two instances of the application **fully running at the same time**, each with its own backend, its own frontend, its own port, both reachable in the browser simultaneously, both serving real traffic from a logged-in session.

the motivation is concrete. working on two or more branches in parallel is normal: a feature in progress, a fix being reviewed, a quick experiment, a comparison between an old behavior and a new one. the conventional flow for moving between them is `git stash`, `git checkout`, restart the dev environment, wait for everything to come up, lose the in-memory state — the compiled bundles, the warm caches, the logged-in session, the dashboard you had open on the right screen — then repeat in reverse when you switch back. doing that several times a day is a meaningful tax on focus.

what I wanted instead was both branches up at once. branch A's UI in one tab, branch B's UI in another. switch between them by switching tabs, not by tearing down and rebuilding a stack. see a frontend change in B against the current behavior in A side by side. review a teammate's PR without losing the state of the feature I was just deep in.

the monorepo in question runs around thirty services: mongo, postgres, redis, elasticsearch, opensearch, localstack, an nginx-based proxy, several application servers, plus a custom orchestrator that wires it all together. cold-starting the full stack takes ten to fifteen minutes. the orchestrator assumes there is exactly one of these stacks running on the machine. that assumption is the entire problem.

what follows is the path from "this should be easy" to a working solution that ended up looking nothing like what I originally planned.

---

## first attempt: git worktrees with port offsets

the first instinct was the cheapest one. `git worktree` solves the file-level problem cleanly: multiple working directories tied to the same repo, each on a different branch, no stashing, no work-in-progress commits. the second instance can live in its own directory.

but worktrees do not solve port collisions. every service in the monorepo binds to a specific port, some hardcoded, some configurable through environment variables. two instances starting up means conflicts everywhere — same hosts, same ports, same docker container names.

I wrote a script — `setup-port-offset.sh` — that patched the hardcoded files so the secondary instance used ports offset by some delta. it touched roughly ten files: configs, manifests, nginx templates, the orchestrator's task definitions. it marked each patched file with `git update-index --skip-worktree` so git would ignore them. running the script twice was idempotent, which mattered more than I realized at the time.

the script worked. the offsets were correct. and yet the two instances refused to coexist. there was a deeper problem I hadn't seen.

## the orchestrator refuses to share

the repo includes an internal orchestrator — a task manager that brings up the thirty-odd services in dependency order, with health checks, restart policies, and a strict dependency graph. the application server doesn't start until mongo, redis, postgres, elasticsearch, and a long list of others are reported as healthy **by this instance's orchestrator specifically**.

it doesn't matter that the containers are already running from instance A. the orchestrator wants to see them healthy in *its own* registry.

worse, the orchestrator does this at startup for every container it manages:

> "if a container with this name exists, stop it."

so A starts its mongo. B kills it to start its own. A kills B's to start its own. infinite loop.

the conclusion was uncomfortable: sharing infrastructure between instances is not viable without modifying the orchestrator's source code. and modifying the orchestrator, in my fifth week on the team, was not territory I wanted to enter alone. I asked in the team's slack whether anyone had solved something similar. nobody had.

it was time to think differently.

## the linux vm

the next idea was full isolation. a virtual machine running ubuntu, with its own docker daemon, its own network namespace, its own ports. inside the vm all the defaults work because it's an entirely separate world. outside, on the mac, instance A keeps running natively. zero overlap by construction.

I picked OrbStack for performance on apple silicon. thirty-two gigabytes of ram, the port-offset script applied to the vm-mounted copy of the repo, and the orchestrator inside the vm started up. things began to move.

then the bugs began. all of them stemmed from the same root cause — the platform was mac-first, and linux was a second-class citizen — but each presented as a different symptom, and each took hours to track down.

### the docker version mismatch

ubuntu's `docker.io` package doesn't support `docker compose` as a subcommand, nor `--secret` for buildkit. the repo needs both. I installed the official `docker-ce-cli`, which broke the connection to the daemon. I went back to `docker.io` and accepted the limitations. that was an evening.

### the oom kill

the application server crashed silently, only leaving a `Killed` line in the logs. `dmesg | grep -i oom` confirmed: the kernel was reaping processes under memory pressure. fifteen gigabytes wasn't enough headroom for the full stack plus the build toolchain. I bumped the vm to thirty-two and moved on.

### the dns resolver

the proxy container — running openresty — hung indefinitely in the orchestrator. its logs showed a `dnsLookup` warning every ten seconds, complaining about a name resolution failure for `172.17.0.1`. that address is the gateway of docker's default bridge network on linux.

tracing through the orchestrator's source revealed the cause: the gateway IP was being injected into eight environment variables as a string, and openresty's lua dns module was trying to resolve it as a hostname. on the mac with docker desktop, this never happened — its internal proxy is more permissive about how DNS resolution falls back. on native linux, it's a hard failure.

the fix involved replacing the IP with `host.docker.internal`, which the docker compose file was already mapping correctly via `--add-host`. the fix worked. the warnings stopped.

### the systemic issue

this is where I started losing faith.

after the dns fix, the proxy container was still stuck in "loading" state in the orchestrator. the container itself was healthy. `curl` against it returned valid responses. but the orchestrator never recognized it as up.

the health check used an HTTP-based polling function. searching the orchestrator's logs, I found that the polling event for that task had never fired. not once. for tasks using TCP-based polling, events fired normally.

there was a bug in how the orchestrator handled HTTP health checks on linux. switching the check from HTTP to TCP made the task go green.

the fix worked. the pattern, however, was systemic. I ended up applying the same change to nearly half the orchestrator's tasks: elasticsearch, localstack, opensearch dashboards, the application server, the dashboard, the designer. this wasn't a one-off bug. it was an entire feature that did not work on linux, and nobody on the team would notice because the team uses macs.

### the script that sabotaged itself

the script applying all these patches used multi-line `sed` invocations. at some point, one of the patches started corrupting the orchestrator's config file — leaving arrays unclosed, breaking task boundaries, producing typescript that wouldn't compile. the orchestrator wouldn't start. iteration stopped until I tracked it down.

the lesson was retrospectively obvious: multi-line `sed` is a poor tool for editing source code. anything beyond a single-line replacement should use a real scripting language with literal string substitution, or an AST parser.

### the hidden assumption

the repo's `start.sh` includes a conditional that only runs the bootstrap script on macos. on linux it prints a warning and continues. the bootstrap is what installs dependencies, configures secrets, and syncs aws tokens. without it, several critical environment variables were missing, opensearch refused to start, and a cascade of secondary failures appeared whose root cause was the same: an entire setup phase had been silently skipped.

### the moment to stop

after roughly eight hours fighting the linux vm, I had a state where things *almost* worked. the dashboard sometimes returned 200. I could log in. but the cost was visible:

- around fifty patches applied to the repo just to make it run "almost" on linux
- every `git pull` was a small disaster — stale nx caches, out-of-sync `node_modules`
- each iteration cycle took five to ten minutes
- the patch script had corrupted itself once and would do so again
- the team doesn't use linux, so none of these bugs would ever be fixed upstream

I asked myself the honest question: is this worth continuing?

the answer was no. this was sunk cost fallacy in real time. I was going to be fighting the setup forever, and every upstream change would reopen wounds I had already cauterized.

I deleted the vm. uninstalling OrbStack also broke instance A — it had been providing the `docker` binary on the mac — and I had to reinstall it as a runtime-only dependency. that detail captures the mood of the day fairly well.

## the macos vm dead end

the next idea seemed obvious: if linux is the problem, run a macos vm inside the mac. Tart can do this on apple silicon using `Virtualization.framework`, with near-native performance. inside, the environment matches the host exactly. all the platform-specific bugs disappear. only port offsets remain.

while researching the setup, I hit a hard wall: **apple silicon does not support nested virtualization for macos guests**. that is not a tooling limitation. it is a hardware and firmware constraint, and it makes the entire approach impossible.

docker desktop runs containers inside its own embedded linux vm. a macos vm running docker desktop becomes a vm inside a vm — nested virtualization — which is not supported. colima has the same problem: it relies on `Virtualization.framework`, which inside a macos guest needs nested virt.

I worked through the alternatives:

- **point the macos vm's docker client at the host's daemon** via `DOCKER_HOST=tcp://...`. but then both instances share the same daemon, with the same container names and ports — exactly the original conflict, now with an extra hop.
- **run a separate linux vm just for docker, and have the macos vm point at it.** technically works. operationally a Frankenstein: three vms, three networks, three places things can break, plus the original orchestrator behavior on top.
- **virtualbuddy, utm, or other alternatives.** same nested-virt limitation. apple silicon, not the tool.
- **a second physical mac.** would work. costs money. felt like admitting defeat.

each option either reproduced the original problem with extra steps, or drifted further from the constraint that mattered: a setup the rest of the team could plausibly use without me writing pages of documentation.

it was time to stop solving the problem the way I'd framed it.

## reframing the problem

the question that changed the project: do I actually need a complete stack running in parallel?

my day-to-day changes are roughly ninety-five percent frontend and backend. I almost never touch database migrations. I never touch infrastructure config. databases are stateful and port-unique — there is no real reason to duplicate them. neither is there reason to duplicate the message queue, the search indexes, or the localstack mock.

what I *do* need duplicated is the application layer: a separate backend process for branch B, a separate frontend dev server for branch B, both reachable in the browser at the same time as A.

the new approach was almost embarrassingly small:

- instance A starts everything normally — mongo, postgres, redis, nginx, the orchestrator, all of it
- instance B does **not** use the orchestrator at all. it starts only two processes: the backend on a different port, and the frontend in watch mode
- a small HTTPS proxy sits in front of B's backend to handle routing and browser compatibility

no virtual machines. no duplicated docker. no platform bugs. two extra processes per parallel instance. that is all.

## hydra

I built it as a bash script of about three hundred and seventy lines and called it `hydra`. the metaphor felt right: one body of shared infrastructure, multiple heads of application logic. cut a head, regrow it.

```
hydra create feature-x
cd ../repo-feature-x
hydra start
```

`start` does the obvious things in order — load the right node version from `.nvmrc`, install dependencies if missing, run the build targets that produce runtime bundles the server expects on disk, then spawn three things: the backend on a deterministic port derived from the worktree name, the frontend in `rspack --watch` mode (no dev server, no HMR — just on-disk rebuilds), and the proxy.

ports are assigned by hashing the worktree name with md5 into a fixed range. the first version used `cksum` and produced collisions — two different worktree names would hash to the same port. md5 was the simplest fix.

most of the script is undramatic. the proxy was where things got subtle.

### the proxy's subproblems

the proxy had to solve four distinct issues that each broke the system in a different way.

**HTTPS redirect.** the application server has middleware that forces HTTPS unless it sees `X-Forwarded-Proto: https` on the request. an HTTP-only proxy produced infinite redirect loops. the proxy now injects that header on every request.

**HSTS cache.** chrome had the development domain in its HSTS cache from previous sessions, which forced HTTPS on every port — including localhost — producing `ERR_SSL_PROTOCOL_ERROR` for any plain HTTP listener. the fix was to make the proxy serve HTTPS using the same wildcard certificates the repo already provisions for development.

**vhost routing.** the application server routes by the `Host` header. without the correct one, every response is a 404. the proxy sets `Host` from the incoming request, preserving subdomains.

**hardcoded URLs in HTML.** the dashboard would load the navbar, but every asset request went to instance A's port because the URLs were hardcoded into the HTML the server returned. the proxy now buffers HTML responses, rewrites every occurrence of A's port to B's port, and removes content-encoding headers so it doesn't have to decode gzip before rewriting.

each of these came up only after the previous one was solved, which is its own small lesson about layered systems: the failure modes are sequential, not parallel.

### cleanup and branch switching

two operational issues surfaced once the basic flow worked.

killing the script with ctrl+c left child processes — the proxy, the server, the watcher — as orphans, and the next run failed with `EADDRINUSE`. a single `trap` line on `INT TERM EXIT` that kills the process group on shutdown solved it.

switching branches with the server running tended to crash the server: code was changing under a running process. I added a background poller that runs `git rev-parse HEAD` every three seconds, and on commit change kills the server, rebuilds dependencies, and restarts. the proxy stays up throughout, so the browser experience is uninterrupted.

### multi-worktree support

extending the script to handle N parallel worktrees was straightforward once the per-worktree port-by-hash decision was in place. each worktree gets its own deterministic port, its own log file, and its own running instance. nothing collides because everything is namespaced by name.

```
hydra create feature-x
hydra create feature-y
hydra list
```

the result is small enough to fit on one screen and stable enough that I've stopped thinking about it.

---

## what I learned

**the problem you think you have is often not the actual problem.** I started wanting "two complete instances running in parallel". what I actually needed was "two frontends and two backends running, sharing the database layer". the difference between those two framings is eight hours of debugging on linux, a discarded vm, an entire planned approach abandoned for hardware reasons, and around fifty patches thrown away.

**when a tool tells you it wasn't designed for your use case, listen.** every linux bug I encountered was a consequence of a mac-first platform. these weren't things I was doing wrong — they were reasonable design decisions that didn't account for my use case. insisting was a waste of time, and the cost of that insistence compounded with every patch.

**sunk cost is real and powerful.** I invested six hours in the linux vm before seriously considering an alternative. each bug fix felt like progress. but the real metric was "how close am I to using this end-to-end", and that wasn't moving as fast as it felt. the gap between perceived and actual progress is where most engineering time is lost.

**idempotent scripts pay for themselves quickly.** every iteration of the offset script depended on being able to run it twice without breaking anything. that property is what made the iteration loop possible at all. when it broke — when one of the multi-line `sed` patches started corrupting files — iteration stopped until I fixed it.

**modifying the repo is almost always the wrong move when the alternative is staying outside it.** the decision not to modify the monorepo and instead build the tooling externally turned out to be the most important one. anyone on the team can use hydra without affecting anyone else. there are no patches to maintain, no fork to keep in sync, no infrastructure PRs to defend, and no conflict with how the rest of the team works.

**multi-line sed is not for editing source code.** obvious in retrospect. next time, a real script with literal string replacement, or an AST-aware tool.

---

what initially looked like "two virtual machines, duplicated docker, port offsets in fifty places" became "one bash script, one node proxy, zero changes to the monorepo". the best code is the code you don't write. and sometimes the best solution to the problem you think you have is realizing that wasn't the problem in the first place.
