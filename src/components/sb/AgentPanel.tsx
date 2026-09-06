import { useState } from "react";
import { agentContext } from "@/lib/second-brain-data";

const modes = ["Ask", "Draft", "Review"] as const;

export function AgentPanel() {
  const [mode, setMode] = useState<(typeof modes)[number]>("Ask");
  const [context, setContext] = useState(agentContext);
  const [proposalState, setProposalState] = useState<"open" | "accepted" | "rejected">("open");

  return (
    <aside className="glass flex w-80 shrink-0 flex-col overflow-hidden rounded-[1.5rem] ring-1 ring-black/5">
      <div className="border-b border-black/5 px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-inksoft">Agent context</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {context.map((c) => (
            <button
              key={c.id}
              onClick={() => setContext((prev) => prev.filter((x) => x.id !== c.id))}
              className="flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-medium ring-1 ring-black/5"
            >
              {c.label} <span className="text-inksoft/50">×</span>
            </button>
          ))}
          <span className="rounded-full bg-sky/40 px-2.5 py-1 text-[11px] font-medium text-skyink ring-1 ring-skyink/20">
            8 open tasks
          </span>
          <button
            onClick={() => setContext(agentContext)}
            className="rounded-full border border-dashed border-inksoft/40 px-2.5 py-1 text-[11px] text-inksoft"
          >
            + Add
          </button>
        </div>
        <p className="mt-2 text-[11px] text-inksoft">12 recent events in scope</p>
      </div>

      <div className="flex gap-1 px-5 pt-4">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={
              m === mode
                ? "rounded-lg bg-ink px-3 py-1 text-[11px] font-medium text-paper"
                : "rounded-lg px-3 py-1 text-[11px] font-medium text-inksoft"
            }
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 text-[13px]">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3 py-2 text-paper">
          What am I waiting on from ProteinQure?
        </div>
        <div className="max-w-[90%] space-y-2">
          <p className="text-ink">
            You're waiting on two things: confirmation of the technical discussion, and the next step with the
            founder.
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] text-skyink ring-1 ring-skyink/20">
              Call · Sep 4
            </span>
            <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] text-roseink ring-1 ring-roseink/20">
              Maria Chen
            </span>
            <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] text-mintink ring-1 ring-mintink/20">
              Send clinical data
            </span>
          </div>

          {proposalState === "open" ? (
            <div className="rounded-xl border border-dashed border-lavink/40 bg-lav/10 p-2.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-lavink">Proposed action</p>
              <p className="mt-0.5 text-[12px]">Follow up with founder</p>
              <div className="mt-2 flex gap-1.5 text-[11px] font-medium">
                <button
                  onClick={() => setProposalState("accepted")}
                  className="rounded-md bg-mint/50 px-2 py-1 text-mintink ring-1 ring-mintink/20"
                >
                  Accept
                </button>
                <button className="rounded-md bg-white/60 px-2 py-1 text-inksoft">Edit</button>
                <button
                  onClick={() => setProposalState("rejected")}
                  className="rounded-md px-2 py-1 text-inksoft/70"
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white/60 p-2.5 ring-1 ring-black/5">
              <p className="text-[11px] text-inksoft">
                {proposalState === "accepted"
                  ? "Task added to ProteinQure — confirmed by you."
                  : "Proposal rejected. The agent won't suggest it again."}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-black/5 p-3">
        <input
          className="w-full rounded-xl bg-white/60 px-3 py-2 text-[12px] text-ink ring-1 ring-black/5 outline-none placeholder:text-inksoft/60"
          placeholder={mode === "Ask" ? "Ask your agent…" : mode === "Draft" ? "Draft a message or note…" : "Review what changed…"}
        />
      </div>
    </aside>
  );
}
