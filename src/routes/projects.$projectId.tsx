import { createFileRoute } from "@tanstack/react-router";
import { Workspace, PageHeader } from "@/components/sb/Workspace";
import { Chip, Chips, Panel, SectionLabel } from "@/components/sb/Chip";
import { projects } from "@/lib/second-brain-data";

export const Route = createFileRoute("/projects/$projectId")({
  head: () => ({
    meta: [
      { title: "Project — Second Brain" },
      {
        name: "description",
        content: "Compiled current truth for a project: objectives, open tasks, people, decisions, risks and timeline.",
      },
      { property: "og:title", content: "Project — Second Brain" },
      {
        property: "og:description",
        content: "Where the work stands right now, compiled from every linked event, person and decision.",
      },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const project = projects[projectId] ?? projects["proteinqure"]!;

  return (
    <Workspace>
      <PageHeader
        eyebrow={project.kind}
        title={project.name}
        right={
          <>
            <p>
              <span className="font-medium text-ink">{project.tasks.length}</span> open tasks
            </p>
            <p>
              <span className="font-medium text-ink">{project.timeline.length}</span> recent events
            </p>
          </>
        }
      />

      <Panel>
        <SectionLabel tone="text-skyink">Current truth</SectionLabel>
        <p className="mt-3 font-display text-[17px] leading-relaxed text-ink">{project.currentTruth}</p>
        <p className="mt-3 text-[11px] text-inksoft">
          Compiled from {project.timeline.length} events · last updated Sep 4
        </p>
      </Panel>

      <div className="grid grid-cols-2 gap-4">
        <Panel>
          <SectionLabel tone="text-mintink">Objectives</SectionLabel>
          <ul className="mt-3 space-y-2">
            {project.objectives.map((o) => (
              <li key={o} className="thread pl-3 text-[13px] leading-snug">
                {o}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <SectionLabel tone="text-roseink">Open tasks</SectionLabel>
          <div className="mt-3 space-y-2">
            {project.tasks.map((t) => (
              <div
                key={t.id}
                className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 ${
                  t.unconfirmed
                    ? "border border-dashed border-lavink/40 bg-lav/10"
                    : "bg-white/50 ring-1 ring-black/5"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-[13px]">{t.title}</p>
                  <p className="text-[11px] text-inksoft">
                    {t.owner}
                    {t.unconfirmed ? " · unconfirmed proposal" : ""}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-inksoft">{t.due}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Panel>
          <SectionLabel tone="text-amberink">Milestones</SectionLabel>
          <div className="mt-3 space-y-2">
            {project.milestones.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <span
                  className={`size-1.5 rounded-full ${m.done ? "bg-mintink" : "bg-inksoft/30"}`}
                />
                <p className={`flex-1 text-[13px] ${m.done ? "text-inksoft line-through" : ""}`}>{m.title}</p>
                <span className="text-[11px] text-inksoft">{m.when}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionLabel tone="text-roseink">People</SectionLabel>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.people.map((p) => (
              <Chip key={p.id} entity={p} />
            ))}
          </div>
          <div className="mt-5">
            <SectionLabel tone="text-amberink">Risks</SectionLabel>
            <ul className="mt-3 space-y-2">
              {project.risks.map((r) => (
                <li key={r} className="rounded-lg bg-amber/15 px-3 py-2 text-[13px] ring-1 ring-amberink/10">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <Panel>
        <SectionLabel tone="text-lavink">Decisions</SectionLabel>
        <div className="mt-3 space-y-2">
          {project.decisions.map((d, i) => (
            <div key={d.id} style={{ marginLeft: i === 0 ? 0 : (i - 1) * 12 + 12 }}>
              {i > 0 ? <p className="mb-1 text-[10px] text-inksoft">↓ supersedes</p> : null}
              <div
                className={`rounded-xl px-3 py-2 ${
                  d.current ? "bg-mint/30 ring-1 ring-mintink/25" : "bg-white/50 ring-1 ring-black/5"
                }`}
                style={d.current ? {} : { opacity: 1 - i * 0.12 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-inksoft">
                    Decision #{d.n} {d.current ? "· current" : ""}
                  </span>
                  <span className="text-[11px] text-inksoft">{d.date}</span>
                </div>
                <p className="mt-0.5 text-[13px] font-medium">{d.title}</p>
                <p className="text-[11px] text-inksoft">{d.why}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-4 pb-1">
        <Panel>
          <SectionLabel tone="text-inksoft">Documents</SectionLabel>
          <div className="mt-3 space-y-2">
            {project.documents.map((doc) => (
              <div key={doc} className="rounded-lg bg-white/50 px-3 py-2 text-[13px] ring-1 ring-black/5">
                {doc}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionLabel tone="text-skyink">Timeline</SectionLabel>
          <div className="mt-3 space-y-3">
            {project.timeline.map((e) => (
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
      </div>
    </Workspace>
  );
}
