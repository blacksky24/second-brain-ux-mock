import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { AgentPanel } from "./AgentPanel";

export function Workspace({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 size-[420px] rounded-full bg-rose/40 blur-3xl" />
        <div className="absolute top-40 right-0 size-[380px] rounded-full bg-sky/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[360px] rounded-full bg-mint/40 blur-3xl" />
        <div className="absolute top-2/3 right-1/4 size-[300px] rounded-full bg-lav/30 blur-3xl" />
      </div>

      <div className="relative mx-auto flex h-screen max-w-[1520px] gap-4 overflow-hidden p-4">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">{children}</main>
        <AgentPanel />
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <header className="glass flex items-end justify-between rounded-[1.5rem] px-6 py-4 ring-1 ring-black/5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-inksoft">{eyebrow}</p>
        <h1 className="font-display text-2xl font-semibold leading-tight text-balance">{title}</h1>
      </div>
      {right ? <div className="text-right text-[12px] text-inksoft">{right}</div> : null}
    </header>
  );
}
