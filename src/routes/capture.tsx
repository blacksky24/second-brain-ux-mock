import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Workspace, PageHeader } from "@/components/sb/Workspace";
import { Chips, Panel, SectionLabel } from "@/components/sb/Chip";
import { ref, type EntityRef } from "@/lib/second-brain-data";

export const Route = createFileRoute("/capture")({
  head: () => ({
    meta: [
      { title: "Capture & Review — Second Brain" },
      {
        name: "description",
        content:
          "Dump messy notes from any source, let the agent extract people, events, tasks, relationships and claims, then accept, edit or reject each proposal.",
      },
      { property: "og:title", content: "Capture & Review — Second Brain" },
      {
        property: "og:description",
        content: "The core loop: capture anything, the agent proposes structure, you confirm what becomes canonical.",
      },
    ],
  }),
  component: Capture,
});

const sources = ["Text", "Email", "WhatsApp", "LinkedIn", "Web", "File", "Meeting notes"];

const sample = `Had a call with Maria Chen about ProteinQure. They've settled on an oncology-first indication and want a read on the clinical data pack by next week. She introduced me to Dr. Lena Voss, who runs their RNA delivery work — Lena is currently evaluating mRNA delivery platforms. I said I'd send a project overview. Still waiting on their seed target number.`;

type Extracted = {
  id: string;
  type: string;
  title: string;
  detail?: string;
  snippet: string;
  confidence: number;
  entities: EntityRef[];
};

const extracted: Extracted[] = [
  {
    id: "x1",
    type: "NEW PERSON",
    title: "Dr. Lena Voss",
    detail: "Runs RNA delivery work at ProteinQure",
    snippet: "\"She introduced me to Dr. Lena Voss, who runs their RNA delivery work\"",
    confidence: 0.86,
    entities: [ref("ProteinQure", "project", "proteinqure", "project")],
  },
  {
    id: "x2",
    type: "NEW EVENT",
    title: "Call with Maria about the oncology indication",
    detail: "Sep 4",
    snippet: "\"Had a call with Maria Chen about ProteinQure\"",
    confidence: 0.94,
    entities: [
      ref("Maria Chen", "person", "maria-chen", "person"),
      ref("ProteinQure", "project", "proteinqure", "project"),
      ref("Follow-up", "tag"),
    ],
  },
  {
    id: "x3",
    type: "NEW TASK",
    title: "Send project overview to Lena",
    detail: "Due next week · owner: you",
    snippet: "\"I said I'd send a project overview\"",
    confidence: 0.79,
    entities: [ref("Dr. Lena Voss", "person", "lena-voss", "person")],
  },
  {
    id: "x4",
    type: "NEW RELATIONSHIP",
    title: "Dr. Lena Voss → leads RNA delivery → ProteinQure",
    snippet: "\"who runs their RNA delivery work\"",
    confidence: 0.81,
    entities: [ref("ProteinQure", "project", "proteinqure", "project")],
  },
  {
    id: "x5",
    type: "NEW CLAIM",
    title: "Lena is currently evaluating mRNA delivery platforms.",
    snippet: "\"Lena is currently evaluating mRNA delivery platforms\"",
    confidence: 0.72,
    entities: [ref("Dr. Lena Voss", "person", "lena-voss", "person"), ref("Biotech", "tag")],
  },
];

type Stage = "capture" | "processing" | "review";

function Capture() {
  const [stage, setStage] = useState<Stage>("capture");
  const [source, setSource] = useState("Text");
  const [text, setText] = useState("");
  const [resolved, setResolved] = useState<Record<string, "accepted" | "rejected">>({});
  const [filter, setFilter] = useState("All");

  const run = () => {
    setStage("processing");
    setTimeout(() => setStage("review"), 1400);
  };

  const open = extracted.filter((e) => !resolved[e.id]);
  const visible = open.filter((e) => filter === "All" || e.type.includes(filter.toUpperCase()));

  return (
    <Workspace>
      <PageHeader
        eyebrow="Capture → Review"
        title="Dump it, the agent structures it"
        right={
          <>
            <p>
              <span className="font-medium text-ink">{open.length}</span> awaiting confirmation
            </p>
            <p>step {stage === "capture" ? "1" : stage === "processing" ? "2" : "3"} of 3</p>
          </>
        }
      />

      <Panel>
        <SectionLabel tone="text-roseink">1 · Capture</SectionLabel>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sources.map((s) => (
            <button
              key={s}
              onClick={() => setSource(s)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${
                s === source
                  ? "bg-rose/40 text-roseink ring-roseink/20"
                  : "bg-white/60 text-inksoft ring-black/5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Had a call with X. They said Y. Need to follow up next week. They also introduced me to Z."
          className="mt-3 w-full resize-none rounded-xl bg-white/60 px-4 py-3 text-[13px] leading-relaxed ring-1 ring-black/5 outline-none placeholder:text-inksoft/60"
        />
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={run}
            className="rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-paper"
          >
            Extract structure
          </button>
          <button
            onClick={() => setText(sample)}
            className="rounded-lg bg-white/60 px-3 py-1.5 text-[12px] font-medium text-inksoft ring-1 ring-black/5"
          >
            Use sample note
          </button>
          <span className="text-[11px] text-inksoft">source · {source}</span>
        </div>
      </Panel>

      {stage === "processing" ? (
        <Panel>
          <SectionLabel tone="text-lavink">2 · Agent extraction</SectionLabel>
          <div className="mt-3 flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lavink/50" />
              <span className="relative inline-flex size-2 rounded-full bg-lavink" />
            </span>
            <p className="text-[13px] text-inksoft">Reading the note, resolving entities against your memory…</p>
          </div>
        </Panel>
      ) : null}

      {stage === "review" ? (
        <Panel id="review">
          <div className="flex items-center justify-between">
            <SectionLabel tone="text-lavink">3 · Proposed records · unconfirmed</SectionLabel>
            <div className="flex gap-1.5">
              {["All", "Person", "Event", "Task", "Relationship", "Claim"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${
                    f === filter ? "bg-lav/40 text-lavink ring-lavink/20" : "bg-white/60 text-inksoft ring-black/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {visible.map((x) => (
              <div key={x.id} className="rounded-xl border border-dashed border-lavink/40 bg-lav/10 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-lavink" />
                    <p className="text-[10px] font-medium uppercase tracking-wider text-lavink">{x.type}</p>
                  </div>
                  <span className="text-[10px] text-inksoft">confidence {x.confidence.toFixed(2)}</span>
                </div>
                <p className="mt-1 text-[13px] font-medium">{x.title}</p>
                {x.detail ? <p className="text-[11px] text-inksoft">{x.detail}</p> : null}
                <p className="mt-2 border-l-2 border-lavink/40 bg-white/50 px-2 py-1.5 text-[11px] text-inksoft">
                  {x.snippet}
                </p>
                <Chips entities={x.entities} />
                <div className="mt-2 flex gap-1.5 text-[11px] font-medium">
                  <button
                    onClick={() => setResolved((r) => ({ ...r, [x.id]: "accepted" }))}
                    className="rounded-md bg-mint/50 px-2 py-1 text-mintink ring-1 ring-mintink/20"
                  >
                    Accept
                  </button>
                  <button className="rounded-md bg-white/60 px-2 py-1 text-inksoft">Edit</button>
                  <button
                    onClick={() => setResolved((r) => ({ ...r, [x.id]: "rejected" }))}
                    className="rounded-md px-2 py-1 text-inksoft/70"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {visible.length === 0 ? (
              <div className="rounded-xl bg-white/50 px-4 py-8 text-center ring-1 ring-black/5">
                <p className="font-display text-[17px]">You're caught up.</p>
                <p className="mt-1 text-[12px] text-inksoft">
                  Everything the agent proposed has been confirmed or rejected. Accepted records are now canonical.
                </p>
              </div>
            ) : null}
          </div>
        </Panel>
      ) : null}

      {Object.keys(resolved).length > 0 ? (
        <Panel className="mb-1">
          <SectionLabel tone="text-mintink">Confirmed this session</SectionLabel>
          <div className="mt-3 space-y-2">
            {extracted
              .filter((x) => resolved[x.id])
              .map((x) => (
                <div key={x.id} className="rounded-lg bg-white/50 px-3 py-2 ring-1 ring-black/5">
                  <p className="text-[13px]">
                    {resolved[x.id] === "accepted" ? "Added to memory · " : "Rejected · "}
                    <span className="text-inksoft">{x.title}</span>
                  </p>
                </div>
              ))}
          </div>
        </Panel>
      ) : null}
    </Workspace>
  );
}
