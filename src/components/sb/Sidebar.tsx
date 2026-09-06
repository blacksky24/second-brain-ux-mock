import { Link } from "@tanstack/react-router";

const items = [
  { label: "Today", to: "/" as const, badge: null },
  { label: "Projects", to: "/projects/$projectId" as const, params: { projectId: "proteinqure" }, badge: "4" },
  { label: "People", to: "/people/$personId" as const, params: { personId: "maria-chen" }, badge: "38" },
  { label: "Capture", to: "/capture" as const, badge: null },
];

const staticItems = ["Goals", "Knowledge", "Timeline", "Health", "Archive", "Settings"];

export function Sidebar() {
  return (
    <aside className="glass flex w-56 shrink-0 flex-col rounded-[1.5rem] ring-1 ring-black/5">
      <div className="flex items-center gap-2 px-5 pt-5 pb-4">
        <div className="grid size-8 place-items-center rounded-xl bg-rose/50 ring-1 ring-roseink/20">
          <span className="font-display text-base font-semibold text-roseink">S</span>
        </div>
        <div>
          <p className="font-display text-[15px] font-semibold leading-none">Second Brain</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-inksoft">Memory OS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3 text-sm">
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            {...(it.params ? { params: it.params } : {})}
            className="flex items-center justify-between rounded-xl px-3 py-2 text-inksoft hover:bg-white/40"
            activeProps={{ className: "bg-rose/30 font-medium text-ink ring-1 ring-roseink/15" }}
            activeOptions={{ exact: it.to === "/" }}
          >
            {it.label}
            {it.badge ? <span className="text-[11px] text-inksoft/60">{it.badge}</span> : null}
          </Link>
        ))}

        <Link
          to="/capture"
          hash="review"
          className="flex items-center justify-between rounded-xl px-3 py-2 text-inksoft hover:bg-white/40"
        >
          Review Queue
          <span className="rounded-md bg-amber/60 px-1.5 text-[11px] font-medium text-amberink">7</span>
        </Link>

        {staticItems.map((label) => (
          <span
            key={label}
            className="flex cursor-default items-center justify-between rounded-xl px-3 py-2 text-inksoft/60"
          >
            {label}
          </span>
        ))}
      </nav>

      <div className="m-3 rounded-xl bg-white/50 p-3 ring-1 ring-black/5">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-mintink/50" />
            <span className="relative inline-flex size-2 rounded-full bg-mintink" />
          </span>
          <p className="text-[12px] font-medium">Claude Code</p>
        </div>
        <p className="mt-1 text-[11px] text-mintink">Connected · MCP</p>
      </div>
    </aside>
  );
}
