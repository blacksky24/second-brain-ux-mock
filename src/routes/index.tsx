import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Workspace, PageHeader } from "@/components/sb/Workspace";
import { Chips, Panel, SectionLabel } from "@/components/sb/Chip";
import { attention, upcoming, priorities, proposals, recentTimeline, stale } from "@/lib/second-brain-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Second Brain" },
      {
        name: "description",
        content:
          "The memory layer between you and your AI agent: what needs attention, what's upcoming, and what your agent proposed while you were away.",
      },
      { property: "og:title", content: "Today — Second Brain" },
      {
        property: "og:description",
        content: "A living knowledge graph of people, projects, decisions and events, maintained with your AI agent.",
      },
    ],
  }),
  component: Today,
});

function Today() {
  const [resolved, setResolved] = useState<Record<string, "accepted" | "rejected">>({});

  return (
    <Workspace>
      <PageHeader
        eyebrow="Thursday · Sep 4"
        title="Today"
        right={
          <>
            <p>
              <span className="font-medium text-ink">{attention.length}</span> need attention
            </p>
            <p>
              <span className="font-medium text-ink">7</span> agent proposals
            </p>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Panel>
          <SectionLabel tone="text-roseink">Attention</SectionLabel>
          <div className="mt-3 space-y-3">
            {attention.map((a) => (
              <div key={a.id} className="thread pl-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13px] leading-snug">{a.title}</p>
                  <span className="shrink-0 text-[11px] text-inksoft">{a.due}</span>
                </div>
                <Chips entities={a.entities} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center justify-between">
            <SectionLabel tone="text-lavink">Agent · Unconfirmed</SectionLabel>
            <span className="rounded-md bg-lav/40 px-1.5 py-0.5 text-[10px] text-lavink ring-1 ring-lavink/20">
              {proposals.length} new
            </span>
          </div>
          <div className="mt-3 space-y-3">
            {proposals.map((p) => {
              const state = resolved[p.id];
              if (state) {
                return (
                  <div key={p.id} className="rounded-xl bg-white/60 p-3 ring-1 ring-black/5">
                    <p className="text-[12px] text-inksoft">
                      {state === "accepted" ? "Accepted — now canonical: " : "Rejected: "}
                      <span className="text-ink">{p.title}</span>
                    </p>
                  </div>
                );
              }
              return (
                <div key={p.id} className="rounded-xl border border-dashed border-lavink/40 bg-lav/10 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-lavink" />
                      <p className="text-[10px] font-medium uppercase tracking-wider text-lavink">{p.type}</p>
                    </div>
                    <span className="text-[10px] text-inksoft">confidence {p.confidence.toFixed(2)}</span>
                  </div>
                  <p className="mt-1 text-[13px] font-medium">{p.title}</p>
                  {p.snippet ? <p className="text-[11px] text-inksoft">{p.snippet}</p> : null}
                  {p.entities ? <Chips entities={p.entities} /> : null}
                  <div className="mt-2 flex gap-1.5 text-[11px] font-medium">
                    <button
                      onClick={() => setResolved((r) => ({ ...r, [p.id]: "accepted" }))}
                      className="rounded-md bg-mint/50 px-2 py-1 text-mintink ring-1 ring-mintink/20"
                    >
                      Accept
                    </button>
                    <button className="rounded-md bg-white/60 px-2 py-1 text-inksoft">Edit</button>
                    <button
                      onClick={() => setResolved((r) => ({ ...r, [p.id]: "rejected" }))}
                      className="rounded-md px-2 py-1 text-inksoft/70"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
            <Link to="/capture" hash="review" className="block text-[11px] font-medium text-lavink">
              Open review queue →
            </Link>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Panel>
          <SectionLabel tone="text-skyink">Upcoming</SectionLabel>
          <div className="mt-3 space-y-3">
            {upcoming.map((u) => (
              <div key={u.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[13px]">{u.title}</p>
                  <span className="shrink-0 text-[11px] text-inksoft">{u.when}</span>
                </div>
                <p className="text-[11px] text-inksoft">owner · {u.owner}</p>
                <Chips entities={u.entities} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionLabel tone="text-mintink">Current priorities</SectionLabel>
          <div className="mt-3 space-y-3">
            {priorities.map((p) => (
              <div key={p.id}>
                <p className="text-[13px]">{p.title}</p>
                <p className="text-[11px] text-inksoft">{p.progress}</p>
                <Chips entities={p.entities} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <SectionLabel tone="text-skyink">Recent timeline</SectionLabel>
        <div className="mt-3 space-y-3">
          {recentTimeline.map((e) => (
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

      <Panel className="mb-1">
        <SectionLabel tone="text-amberink">Stale · forgotten</SectionLabel>
        <div className="mt-3 space-y-2">
          {stale.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-lg bg-amber/15 px-3 py-2 ring-1 ring-amberink/10"
            >
              <p className="text-[13px]">{s.title}</p>
              <span className="text-[11px] text-amberink">{s.age}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Workspace>
  );
}
