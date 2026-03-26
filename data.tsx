import { InfoData, SocialLink } from "./types";

export const infoData: InfoData = {
  me: {
    title: "me",
    subtitle: "who i am and what i do",
    content: `i build things.

i've been doing this for over 6 years — started by teaching myself, and over the past couple of years i've been working remotely while traveling. hopping between countries, staying a week here and there, figuring things out as i go. i've been to over 15 countries so far, and along the way ended up at companies like google and webflow.

most of my career has been about taking broken or outdated systems and making them work well. rewriting legacy platforms, designing services from scratch, building tools that people actually depend on every day. i care about clean architecture, but i also care about shipping. the best engineers know when to do each.

i don't have a cs degree. i learned by building stuff, breaking stuff, and reading a lot of documentation at 3am. i'm scrappy and i figure things out.

i'm from buenos aires, argentina. no matter where i go, i always end up coming back home.
when i'm not coding i'm probably training jiu jitsu, reading, or planning where to go next.

corporate version here:
`,
    links: [
      {
        url: "https://linkedin.com/in/nicvazquez",
        name: "linkedin.com/in/nicvazquez",
      },
    ],
  },
  "open-source": {
    title: "open source",
    subtitle: "things i build in the open",
    links: [
      {
        url: "https://github.com/nicvazquezdev/hispano-lang",
        name: "hispano-lang ⭐",
      },
      {
        url: "https://github.com/nicvazquezdev/hispanolang.com",
        name: "hispano-lang-website",
      },
    ],
  },
  "digital-nomad": {
    title: "digital nomad",
    subtitle:
      "i write code wherever i find coffee and wi-fi. here's my journey:",
    entries: [
      {
        slug: "japan-2",
        country: "japan",
        date: "december 2025",
        content: `went back to tokyo, kyoto, and osaka. still my favorite country in the world, nothing changed. this time was more relaxed because i already knew how everything worked, so less planning and more just being there. revisited some places i loved from the first trip, found new spots, wandered into neighborhoods i hadn't explored before. going back only confirmed what i already knew: you could visit japan ten times and still find something new. i'll keep going back as long as i can.`,
      },
      {
        slug: "china",
        country: "china",
        date: "november 2025",
        content: `shanghai, hangzhou, shenzhen, and guangzhou. china is massive and every city feels like a completely different country. the weather was great, people were genuinely kind, and the temples and history blew me away. there's so much depth to the culture you could spend months and barely scratch the surface.

the technology caught me off guard. everything runs through wechat and alipay: paying, ordering food, navigating, unlocking shared bikes. you can't function without them. on the other hand, google, whatsapp, and most western apps are blocked, so without a vpn you're cut off from the rest of the internet. felt like living in a parallel digital universe.

the language barrier was real. almost nobody speaks english, signs are all in mandarin, and google translate became my best friend. everyone stared at me constantly. not hostile, more like genuine curiosity, like they'd never seen a foreigner up close. and some cultural differences catch you off guard. people casually letting one rip in the middle of a subway car and nobody bats an eye. just how it is.`,
      },
      {
        slug: "mexico",
        country: "mexico",
        date: "april 2025",
        content: `tulum, merida, san cristobal, and puerto escondido. the cenotes and beaches in tulum were great, but overall mexico was a bit disappointing. the food felt overrated, i never really had a meal that blew me away, and people didn't feel as welcoming as i'd expected. missed chichen itza because it didn't work out, and i skipped mexico city and oaxaca too, so maybe those would change my mind. jury's still out.`,
      },
      {
        slug: "indonesia",
        country: "indonesia",
        date: "april 2025",
        content: `bali became my favorite place in southeast asia. stayed in canggu, uluwatu, and ubud, each with a completely different vibe, and did a guided tour to nusa penida. nightlife in canggu was a lot of fun, the beaches were great, and the people were some of the friendliest i've met anywhere. met a lot of good people at the hostels, the kind you end up hanging out with for days.

getting around by scooter is the only real way to do bali. i used grab for rides and loved cruising through the rice terraces and coastal roads. worked from a couple coworking spaces that were surprisingly good and full of other remote workers. the local food was unreal too. some of the best meals of the entire trip came from tiny warungs on the side of the road.

got hit with bali belly, and the very next day i went snorkeling for the first time. ended up throwing up on the boat. not my proudest moment. i saw some hindu ceremonies and offerings on the streets, which added something to the whole experience. monkeys were everywhere, and they're not as cute as they look. some of them are straight up thieves. but the temples, the rice terraces, the sunsets, the general energy of the place. i never got tired of it.`,
      },
      {
        slug: "malaysia",
        country: "malaysia",
        date: "april 2025",
        content: `kuala lumpur was forgettable. not old enough to feel historic, not modern enough to feel exciting. people came across as a bit rude, and the city felt dirty and disorganized. the one highlight was the petronas towers lit up at night, that area was genuinely nice. batu caves were worth the trip too. but beyond that, not a place i'd go back to.`,
      },
      {
        slug: "vietnam",
        country: "vietnam",
        date: "april 2025",
        content: `hanoi was pure chaos. motorbikes everywhere, crossing the street felt like a death wish, and the noise never stops. but underneath all that, the city has a lot of character. the food was really good, the nightlife was fun, and i ended up going out to some great spots. walking around the old quarter and the lakes showed me a calmer side of it.

got around on the back of grab motorbikes, which was both terrifying and exhilarating. weaving through traffic at full speed holding on for dear life. worked from a few cafes that had good vibes, met some cool people along the way. haggling at the markets was a whole thing. you learn quickly that the first price is never the real price. the endless swarm of motorbikes is overwhelming at first but it ends up being one of the most iconic parts of the place.`,
      },
      {
        slug: "cambodia",
        country: "cambodia",
        date: "march 2025",
        content: `siem reap was all about the temples, and angkor wat did not disappoint. the scale of it is almost impossible to put into words. you just stand there thinking "how did they build this." the people were really friendly, the country was very affordable, and getting around by tuk-tuk was part of the fun. bought a few things at the local markets, tried some cambodian food that was surprisingly good, talked with locals who were always happy to chat.

the poverty and social contrast were hard to ignore. you see it everywhere. in the streets, in the floating village, in the way people live. it stays with you.

the best story from cambodia had nothing to do with the temples though. the night before i was supposed to leave, i impulsively booked a flight to vietnam. tickets, hotel, everything. a few hours later i realized i needed a visa. panicked, searched everywhere, ended up paying for an emergency visa even though i wasn't sure it would arrive in time. the flight was the next day at 4pm. the visa came through at 12pm. i was relieved, rushed to the airport, and when i got to check-in they told me the visa was valid starting the following day, not that day. tried everything: travel agencies, another emergency visa, begging. nothing worked. lost the flight, paid for another night.

ended up staying at a family guesthouse. the owner gave me the best mango i've ever eaten in my life, cooked me a meal, and the next morning drove me to the airport himself. we talked the whole ride. sometimes the best moments come from the worst plans.`,
      },
      {
        slug: "thailand",
        country: "thailand",
        date: "march 2025",
        content: `my first time in southeast asia, and what an introduction. bangkok was wild. great nightlife, the street food was something else, and getting around in tuk-tuks for the first time was a lot of fun. visited the floating markets and night markets, packed with life and things to try. phuket had nice beaches and a more relaxed vibe.

i was surprised by how open weed was everywhere. people smoking at hostels, shops selling it on every corner. i tried it, because when in thailand. met a bunch of great people at the hostels, and everything was shockingly cheap. meals, transport, accommodation, all of it.

the people were super friendly, most spoke english, and the buddhist temples added another layer to the whole thing. hard to ask for more from a first trip to this part of the world.`,
      },
      {
        slug: "turkey",
        country: "turkey",
        date: "march 2025",
        content: `istanbul is huge, chaotic, and fascinating. i happened to be there during ramadan, which made the atmosphere even more special. the city comes alive after sunset with night gatherings, food everywhere, a completely different energy.

i was lucky enough to reconnect with a friend i'd met back in bulgaria, who lives in istanbul. she showed me around for a few days, which made the experience completely different from exploring solo. we visited the grand bazaar, hagia sophia, and the blue mosque. i also crossed between the european and asian sides of the city, which is a surreal thing to do in a single afternoon.

that trip is where i really learned to haggle. the vendors in the bazaar don't mess around, and you either learn fast or overpay for everything. the people turned out to be incredibly hospitable. one time a taxi driver bought two bottles of water, one for himself and one for me, completely unprompted. small gesture, but it says a lot.

skipped the turkish baths and i still regret it. never got into the desserts either. baklava wasn't for me. but the tea culture was a nice surprise. everyone drinks tea, all the time, everywhere. and the kebabs were as good as you'd imagine.`,
      },
      {
        slug: "portugal",
        country: "portugal",
        date: "march 2025",
        content: `lisbon has a special charm. great food, friendly people, good nightlife, and a nice mix of old and new. i stayed in alfama, which was full of character. narrow streets, fado music drifting from somewhere, an atmosphere that just pulls you in. heard fado live one night and it was one of those moments you don't forget.

climbed up to the castelo de sao jorge for the views, and took a day trip to sintra where the palaces and gardens felt almost unreal. tried the famous pasteis de belem, which lived up to the hype. went out in bairro alto a couple nights and met some great people, though walking up and down those hills after a few drinks is a workout.

had some rainy days, but that didn't stop me from enjoying it. definitely a city i'd go back to.`,
      },
      {
        slug: "japan",
        country: "japan",
        date: "january 2025",
        content: `my favorite destination, no contest. i'd go back a thousand times and never get bored.

visited tokyo, kyoto, nara, and osaka in january. cool weather, fewer tourists, perfect for walking around. tokyo was something else: explored akihabara, shibuya, and shinjuku. the energy is unlike anything. the nightlife surprised me, the ramen was some of the best food i've ever had, and the sushi was on a completely different level from what i'd tried before. also got a taste of the otaku and anime culture, which was fun to see even as a casual fan.

kyoto was the opposite. calm, traditional, full of temples and history. took the shinkansen between cities, which was an experience in itself. fast, clean, perfectly on time. day trip to nara to see the deer, totally worth it. osaka was the weakest stop. i wouldn't spend more than two days there, one of them just for universal studios.

the people were friendly but a bit shy. not many speak english, but i never had trouble communicating. and the biggest surprise: it's much cheaper than people think.`,
      },
      {
        slug: "czech-republic",
        country: "czech republic",
        date: "december 2024",
        content: `prague is stunning. the historic center is full of medieval architecture, and just wandering around was one of the best parts of the trip. beer culture is huge. i was blown away by how cheap it was, and i tried a blueberry beer that turned out to be one of the best things i drank the entire trip. walked across the charles bridge, which was really nice, though i never made it inside prague castle.

the nightlife was solid, met some cool people, and the city has a lot of personality. the steep streets can get tiring, but it's worth it.`,
      },
      {
        slug: "romania",
        country: "romania",
        date: "november 2024",
        content: `romania wasn't even in the plan. i was in sofia, bored out of my mind after three days, so i booked a seat on an overnight bus to bucharest. eight hours through roads that felt like they hadn't been paved since the soviet era, bouncing around at full speed in the dark. one of those travel experiences you survive more than enjoy.

bucharest surprised me though. it was nice and had more to offer than i expected. visited the palace of the parliament, which is absurdly massive, and even found a water park that was a lot of fun.

from there i joined a guided tour to transylvania. saw snow for the first time in my life, which was magical, until i realized i was wearing sneakers. the snow went right through them and my feet were frozen the entire day. explored brasov, peles castle (gorgeous), and dracula's castle. which honestly was disappointing. cool name, underwhelming place.`,
      },
      {
        slug: "bulgaria",
        country: "bulgaria",
        date: "november 2024",
        content: `sofia wasn't for me. coming right after budapest, the contrast was rough. i went in low season without knowing much about the city, and it felt boring and a bit depressing. ended up leaving three days later on a midnight bus to romania. the people didn't feel very friendly either, which didn't help.

still, the soviet-style architecture and gray buildings had their own strange charm. interesting to see, just not somewhere i'd rush back to.`,
      },
      {
        slug: "hungary",
        country: "hungary",
        date: "november 2024",
        content: `budapest is my favorite city in europe. even in november, during low season, there was plenty to do. the szechenyi thermal baths were incredible. sitting in hot water outdoors while it's freezing outside is something everyone should try at least once. the food was great too. the goulash alone was worth the trip.

explored the ruin bars, which are exactly as cool as people say. old buildings turned into bars with a chaotic, eclectic vibe. climbed up to fisherman's bastion for panoramic views, met a bunch of great people along the way. the christmas market was just starting up and it made the city feel even better.

the highlight was a night boat ride on the danube. seeing the parliament and the bridges lit up from the water was one of the most beautiful things i've seen while traveling.`,
      },
      {
        slug: "spain",
        country: "spain",
        date: "august 2024",
        content: `visited my cousins in spain and spent time in both madrid and barcelona. being a spanish speaker made everything feel more natural. no language barrier, no awkward translation moments, just flowing with the city.

both cities had a lot of energy, great food, and a nightlife that doesn't quit. in barcelona i visited the sagrada familia, which is as impressive in person as everyone says. also went to "el brunch," an electronic music festival. dancing in the sun with good music and good people. tried tapas and paella at a few places and everything was delicious. didn't spend enough time in either city to go deep, but both left me wanting to come back for longer.`,
      },
      {
        slug: "france",
        country: "france",
        date: "august 2024",
        content: `paris was a must-see, and it mostly lived up to the hype. the city is beautiful but felt a bit dirty in spots. contrary to what everyone says, i didn't find parisians rude at all. visited montmartre and sacre-coeur, which had an amazing atmosphere, and stopped by notre-dame. still under reconstruction but impressive even wrapped in scaffolding. the croissants were as good as advertised.

the highlight was a random picnic under the eiffel tower with about 15 strangers i'd just met, which turned into a full night out. that's the kind of thing that makes solo travel special. also visited the louvre, packed with tourists fighting to see the mona lisa, but i managed to push my way to the front and get a good photo.

i was supposed to go to versailles, but the night before i'd gone out with people from the hostel and overslept. missed the tour. classic move. no regrets though, the night was worth it.`,
      },
      {
        slug: "italy",
        country: "italy",
        date: "august 2024",
        content: `rome. my first stop as a digital nomad and solo traveler. a city so full of history you trip over it just walking around. the colosseum, the forum, the plazas, the fountains. everything felt larger than life. threw a coin in the fontana di trevi, walked through trastevere at night, had some great gelato.

the food was good, but i'll be honest, i still prefer argentine pizza and pasta. i know that's borderline sacrilege, but it's how i feel.

also visited the vatican, which was impressive, though i went with a hangover and almost no sleep so i didn't enjoy it as much as i should have. met some great people at the hostel. the kind of instant friendships that happen when everyone's figuring out a new city together. not my best planned stop, but a good start to the journey.`,
      },
    ],
  },
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/nicvazquezdev",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-gray-400 hover:text-gray-300"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/nicvazquez",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-gray-400 hover:text-gray-300"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];
