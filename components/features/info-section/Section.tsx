import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  label: string;
  children: ReactNode;
}

export default function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--muted)]">
          {label}
        </h2>
        <div className="mt-3 h-px bg-[var(--rule)]" />
      </div>
      {children}
    </section>
  );
}
