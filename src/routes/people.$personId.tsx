import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Workspace, PageHeader } from "@/components/sb/Workspace";
import { Chip, Chips, Panel, SectionLabel } from "@/components/sb/Chip";
import { people } from "@/lib/second-brain-data";

export const Route = createFileRoute("/people/$personId")({
  head: () => ({
    meta: [
      { title: "Person — Second Brain" },
      {
        name: "description",
        content:
          "Who this person is, why you know them, what is open between you, and a generated call-prep brief before your next conversation.",
      },
      { property: "og:title", content: "Person — Second Brain" },
      { property: "og:description", content: "Relationship state, open commitments and call prep in one place." },
    ],
  }),
  component: PersonDetail,
});

function PersonDetail() {
  const { personId } = Route.useParams();
  const person = people[personId] ?? people["maria-chen"]!;
  const [prepOpen, setPrepOpen] = useState(false);

  return (
    <Workspace>
      <PageHeader
        eyebrow={person.role}
        title={person.name}
        right={
          <>
            <p>
              <span className="font-medium text-ink">{person.owedByMe.length}</span> you owe
            </p>
            <p>
              <span className="font-medium text-ink">{person.owedToMe.length}</span> they owe
            </p>
          </>
        }
      />

      <Panel>
        <SectionLabel tone="text-roseink">Why they're relevant</SectionLabel>
        <p className="mt-3 font-display text-[17px] leading-relaxed">{person.why}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {person.orgs.map((o) => (
            <Chip key={o.id} entity={o} />
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-3 gap-4">
        <Panel>
          <SectionLabel tone="text-inksoft">Contact</SectionLabel>
          <div className="mt-3 space-y-2">
            {person.contact.map((c) => (
              <div key={c.label}>
                <p className="text-[10px] uppercase tracking-wider text-inksoft">{c.label}</p>
                <p className="text-[13px]">{c.value}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionLabel tone="text-amberink">What I owe them</SectionLabel>
          <div className="mt-3 space-y-2">
            {person.owedByMe.map((t) => (
              <div key={t.id} className="rounded-lg bg-amber/15 px-3 py-2 ring-1 ring-amberink/10">
                <p className="text-[13px]">{t.title}</p>
                <p className="text-[11px] text-amberink">{t.due}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionLabel tone="text-skyink">What they owe me</SectionLabel>
          <div className="mt-3 space-y-2">
            {person.owedToMe.map((t) => (
              <div key={t.id} className="rounded-lg bg-sky/15 px-3 py-2 ring-1 ring-skyink/10">
                <p className="text-[13px]">{t.title}</p>
                <p className="text-[11px] text-skyink">{t.due}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Panel>
          <SectionLabel tone="text-skyink">Recent interactions</SectionLabel>
          <div className="mt-3 space-y-3">
            {person.interactions.map((e) => (
              <div key={e.id} className="flex gap-3">
                <span className="w-14 shrink-0 text-[11px] font-medium text-inksoft">{e.date}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px]">{e.title}</p>
                  <Chips entities={e.entities} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionLabel tone="text-lavink">Relevant decisions</SectionLabel>
          <div className="mt-3 space-y-2">
            {person.decisions.map((d) => (
              <div key={d.id} className="rounded-lg bg-white/50 px-3 py-2 ring-1 ring-black/5">
                <p className="text-[13px]">{d.title}</p>
                <p className="text-[11px] text-inksoft">{d.date}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="mb-1">
        <div className="flex items-center justify-between">
          <SectionLabel tone="text-mintink">Call preparation</SectionLabel>
          <button
            onClick={() => setPrepOpen((v) => !v)}
            className="rounded-md bg-mint/50 px-2.5 py-1 text-[11px] font-medium text-mintink ring-1 ring-mintink/20"
          >
            {prepOpen ? "Hide prep" : "Generate call prep"}
          </button>
        </div>

        {prepOpen ? (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-inksoft">Objective</p>
                <p className="mt-1 font-display text-[15px] leading-snug">{person.callPrep.objective}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-inksoft">What I need to learn</p>
                <ul className="mt-1 space-y-1.5">
                  {person.callPrep.learn.map((l) => (
                    <li key={l} className="thread pl-3 text-[13px] leading-snug">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-inksoft">Questions</p>
                <ul className="mt-1 space-y-1.5">
                  {person.callPrep.questions.map((q) => (
                    <li key={q} className="text-[13px] leading-snug">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-inksoft">Time-boxed agenda · 45 min</p>
              <div className="mt-2 space-y-1.5">
                {person.callPrep.agenda.map((a) => (
                  <div key={a.time} className="flex gap-3 rounded-lg bg-white/50 px-3 py-2 ring-1 ring-black/5">
                    <span className="w-12 shrink-0 text-[11px] font-medium text-inksoft">{a.time}</span>
                    <span className="text-[13px]">{a.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-[12px] text-inksoft">
            The agent will assemble an objective, open commitments and a time-boxed agenda from everything linked to{" "}
            {person.name}.
          </p>
        )}
      </Panel>
    </Workspace>
  );
}
