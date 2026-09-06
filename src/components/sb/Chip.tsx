import { Link } from "@tanstack/react-router";
import type { EntityRef } from "@/lib/second-brain-data";

const tone: Record<string, string> = {
  person: "bg-rose/40 text-roseink ring-roseink/15",
  project: "bg-sky/40 text-skyink ring-skyink/15",
  goal: "bg-mint/40 text-mintink ring-mintink/15",
  tag: "bg-amber/50 text-amberink ring-amberink/15",
  decision: "bg-lav/40 text-lavink ring-lavink/15",
  event: "bg-sky/40 text-skyink ring-skyink/15",
  task: "bg-mint/40 text-mintink ring-mintink/15",
};

export function Chip({ entity }: { entity: EntityRef }) {
  const cls = `rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ${tone[entity.kind] ?? tone.tag}`;

  if (entity.to === "person") {
    return (
      <Link to="/people/$personId" params={{ personId: entity.id }} className={cls}>
        {entity.label}
      </Link>
    );
  }
  if (entity.to === "project") {
    return (
      <Link to="/projects/$projectId" params={{ projectId: entity.id }} className={cls}>
        {entity.label}
      </Link>
    );
  }
  return <span className={cls}>{entity.label}</span>;
}

export function Chips({ entities }: { entities: EntityRef[] }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {entities.map((e) => (
        <Chip key={e.kind + e.id} entity={e} />
      ))}
    </div>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-[1.5rem] p-5 ring-1 ring-black/5 ${className}`}>{children}</section>
  );
}

export function SectionLabel({ children, tone }: { children: React.ReactNode; tone: string }) {
  return <p className={`text-[11px] font-medium uppercase tracking-[0.18em] ${tone}`}>{children}</p>;
}
