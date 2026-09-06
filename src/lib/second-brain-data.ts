export type EntityKind = "person" | "project" | "goal" | "tag" | "decision" | "event" | "task";

export type EntityRef = {
  id: string;
  label: string;
  kind: EntityKind;
  /** route target, optional */
  to?: "person" | "project";
};

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  detail?: string;
  entities: EntityRef[];
};

export type Proposal = {
  id: string;
  type: "NEW PERSON" | "NEW TASK" | "NEW EVENT" | "NEW RELATIONSHIP" | "NEW CLAIM" | "DECISION SUPERSEDES";
  title: string;
  snippet?: string;
  confidence: number;
  entities?: EntityRef[];
};

export type AttentionItem = {
  id: string;
  title: string;
  due: string;
  entities: EntityRef[];
};

export const ref = (label: string, kind: EntityKind, id = slug(label), to?: EntityRef["to"]): EntityRef => ({
  id,
  label,
  kind,
  to,
});

export function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const maria = ref("Maria Chen", "person", "maria-chen", "person");
const lena = ref("Dr. Lena Voss", "person", "lena-voss", "person");
const proteinqure = ref("ProteinQure", "project", "proteinqure", "project");
const secondBrain = ref("Second Brain", "project", "second-brain", "project");
const career = ref("Career", "project", "career", "project");
const kaggle = ref("Kaggle", "tag", "kaggle");
const fundraising = ref("Fundraising", "goal", "fundraising");

export const attention: AttentionItem[] = [
  {
    id: "a1",
    title: "Follow up with ProteinQure founder",
    due: "today",
    entities: [maria, proteinqure, fundraising],
  },
  { id: "a2", title: "Submit Kaggle prize tax form", due: "due Fri", entities: [kaggle, ref("Tax", "tag")] },
  { id: "a3", title: "Prepare for technical interview", due: "Sep 11", entities: [career, ref("Prep", "tag")] },
  {
    id: "a4",
    title: "Review startup opportunity — Halcyon Bio",
    due: "no date",
    entities: [ref("Halcyon Bio", "project", "halcyon-bio"), ref("Biotech", "tag")],
  },
  { id: "a5", title: "Respond to Sam about the RNA collaboration", due: "overdue", entities: [lena, proteinqure] },
];

export const upcoming = [
  { id: "u1", title: "Investor meeting — Northline Capital", when: "Sep 10 · 10:00", owner: "You", entities: [fundraising] },
  { id: "u2", title: "Technical interview — Anthropic", when: "Sep 11 · 14:00", owner: "You", entities: [career] },
  { id: "u3", title: "Send clinical data pack", when: "Sep 12", owner: "You", entities: [maria, proteinqure] },
];

export const priorities = [
  { id: "p1", title: "Find next technical/product opportunity", progress: "3 of 7 threads live", entities: [career] },
  { id: "p2", title: "Build Second Brain prototype", progress: "5 screens in review", entities: [secondBrain] },
  { id: "p3", title: "Explore biotech startup opportunities", progress: "2 companies in diligence", entities: [proteinqure] },
];

export const proposals: Proposal[] = [
  {
    id: "pr1",
    type: "NEW PERSON",
    title: "Dr. Lena Voss",
    snippet: "\"Lena from the RNA team — she's the one evaluating mRNA delivery\"",
    confidence: 0.82,
    entities: [proteinqure],
  },
  {
    id: "pr2",
    type: "NEW TASK",
    title: "Send project overview to Lena",
    snippet: "\"I said I'd send her the overview by end of week\"",
    confidence: 0.74,
    entities: [lena, proteinqure],
  },
  {
    id: "pr3",
    type: "DECISION SUPERSEDES",
    title: "Pursue oncology indication",
    snippet: "supersedes — Aug 8 · Broaden to inflammatory disease",
    confidence: 0.64,
    entities: [proteinqure],
  },
];

export const recentTimeline: TimelineEvent[] = [
  {
    id: "e1",
    date: "Sep 4",
    title: "Call with Maria about the ProteinQure opportunity",
    entities: [maria, proteinqure, fundraising, ref("Follow-up", "tag")],
  },
  { id: "e2", date: "Sep 2", title: "Decision #4 — Pursue oncology indication", entities: [proteinqure, ref("Decision", "decision")] },
  { id: "e3", date: "Aug 30", title: "Kaggle prize awarded, $50k", entities: [kaggle, ref("Second Brain", "project", "second-brain", "project")] },
  { id: "e4", date: "Aug 28", title: "Intro from Maria to Dr. Lena Voss", entities: [maria, lena, proteinqure] },
];

export const stale = [
  { id: "s1", title: "Review startup opportunity — Halcyon Bio", age: "21 days untouched" },
  { id: "s2", title: "Confirm seed round target", age: "14 days untouched" },
  { id: "s3", title: "Knowledge note: mRNA delivery landscape", age: "38 days untouched" },
];

export type Project = {
  id: string;
  name: string;
  kind: string;
  currentTruth: string;
  objectives: string[];
  tasks: { id: string; title: string; owner: string; due: string; unconfirmed?: boolean }[];
  milestones: { id: string; title: string; when: string; done: boolean }[];
  people: EntityRef[];
  decisions: { id: string; n: number; title: string; why: string; date: string; current: boolean }[];
  risks: string[];
  documents: string[];
  timeline: TimelineEvent[];
};

export const projects: Record<string, Project> = {
  proteinqure: {
    id: "proteinqure",
    name: "ProteinQure",
    kind: "Biotech / Personalized Medicine",
    currentTruth:
      "Maria's team has narrowed to an oncology-first indication and is waiting on your read of the clinical data pack before the next partner conversation. The technical discussion from Sep 4 is unconfirmed on their side. Fundraising is the live constraint: seed target is unsettled and blocks the intro to Northline.",
    objectives: [
      "Decide whether to join as technical co-founder or advise",
      "Validate the mRNA delivery approach against the two competing platforms",
      "Help close a seed round by end of Q4",
    ],
    tasks: [
      { id: "t1", title: "Send clinical data pack to Maria", owner: "You", due: "Sep 12" },
      { id: "t2", title: "Read the delivery-platform comparison memo", owner: "You", due: "Sep 10" },
      { id: "t3", title: "Confirm technical discussion outcome", owner: "Maria Chen", due: "waiting" },
      { id: "t4", title: "Draft advisory scope one-pager", owner: "You", due: "no date", unconfirmed: true },
    ],
    milestones: [
      { id: "m1", title: "First technical deep-dive", when: "Aug 21", done: true },
      { id: "m2", title: "Indication locked", when: "Sep 2", done: true },
      { id: "m3", title: "Seed round target agreed", when: "Sep 20", done: false },
      { id: "m4", title: "Decision: join or advise", when: "Oct 1", done: false },
    ],
    people: [maria, lena, ref("Sam Okonkwo", "person", "sam-okonkwo")],
    decisions: [
      { id: "d4", n: 4, title: "Pursue oncology indication", why: "Clearest regulatory path and the data pack is strongest here.", date: "Sep 2", current: true },
      { id: "d3", n: 3, title: "Broaden to inflammatory disease", why: "Reaction to a partner conversation that later fell through.", date: "Aug 8", current: false },
      { id: "d2", n: 2, title: "Target solid tumors only", why: "Narrow scope to fit the existing preclinical work.", date: "Jul 21", current: false },
      { id: "d1", n: 1, title: "Stay indication-agnostic", why: "Initial position before any clinical data.", date: "Jun 30", current: false },
    ],
    risks: [
      "Seed target still unsettled — blocks the Northline intro",
      "Delivery platform depends on a partner you haven't met",
      "Your availability is contingent on the Career thread resolving",
    ],
    documents: ["Clinical data pack v3.pdf", "Delivery platform comparison.md", "Sep 4 call notes"],
    timeline: [
      { id: "pe1", date: "Sep 4", title: "Call with Maria about the ProteinQure opportunity", entities: [maria, proteinqure, fundraising, ref("Follow-up", "tag")] },
      { id: "pe2", date: "Sep 2", title: "Decision #4 — Pursue oncology indication", entities: [proteinqure, ref("Decision", "decision")] },
      { id: "pe3", date: "Aug 28", title: "Intro from Maria to Dr. Lena Voss", entities: [maria, lena, proteinqure] },
      { id: "pe4", date: "Aug 21", title: "First technical deep-dive", entities: [proteinqure, maria] },
    ],
  },
};

export type Person = {
  id: string;
  name: string;
  role: string;
  why: string;
  orgs: EntityRef[];
  contact: { label: string; value: string }[];
  owedByMe: { id: string; title: string; due: string }[];
  owedToMe: { id: string; title: string; due: string }[];
  decisions: { id: string; title: string; date: string }[];
  interactions: TimelineEvent[];
  callPrep: {
    objective: string;
    learn: string[];
    questions: string[];
    agenda: { time: string; item: string }[];
  };
};

export const people: Record<string, Person> = {
  "maria-chen": {
    id: "maria-chen",
    name: "Maria Chen",
    role: "Co-founder & CEO · ProteinQure",
    why: "Introduced through the Kaggle prize thread. She is the closest live path into personalized-medicine work and the only person currently offering a technical co-founder seat.",
    orgs: [proteinqure, fundraising, ref("Biotech", "tag")],
    contact: [
      { label: "Email", value: "maria@proteinqure.co" },
      { label: "Signal", value: "+1 ••• ••• 4417" },
      { label: "Timezone", value: "Toronto · ET" },
    ],
    owedByMe: [
      { id: "o1", title: "Send clinical data pack", due: "Sep 12" },
      { id: "o2", title: "Read delivery-platform memo", due: "Sep 10" },
    ],
    owedToMe: [
      { id: "o3", title: "Confirmation of the technical discussion", due: "since Sep 4" },
      { id: "o4", title: "Seed round target number", due: "since Aug 28" },
    ],
    decisions: [{ id: "dd1", title: "Decision #4 — Pursue oncology indication", date: "Sep 2" }],
    interactions: [
      { id: "ie1", date: "Sep 4", title: "Call about the ProteinQure opportunity", entities: [maria, proteinqure, fundraising] },
      { id: "ie2", date: "Aug 28", title: "Intro to Dr. Lena Voss", entities: [maria, lena] },
      { id: "ie3", date: "Aug 21", title: "First technical deep-dive", entities: [maria, proteinqure] },
    ],
    callPrep: {
      objective: "Decide whether the co-founder seat is real, and what would have to be true for you to take it.",
      learn: [
        "What the seed target actually is, and who is already committed",
        "Whether the oncology decision is settled with the whole team",
        "Where Lena's delivery work sits relative to the two competing platforms",
      ],
      questions: [
        "What did the technical discussion conclude?",
        "What does the first 90 days look like for a technical co-founder?",
        "What is the equity and timing expectation?",
      ],
      agenda: [
        { time: "0–5", item: "Warm-up, Kaggle result, personal" },
        { time: "5–15", item: "Where the round stands" },
        { time: "15–30", item: "Technical scope and Lena's platform read" },
        { time: "30–40", item: "The seat: scope, equity, timing" },
        { time: "40–45", item: "Next steps and who owes what" },
      ],
    },
  },
};

export const agentContext = [
  { id: "c1", label: "Second Brain", meta: "project" },
  { id: "c2", label: "ProteinQure", meta: "project" },
  { id: "c3", label: "Kaggle project", meta: "project" },
  { id: "c4", label: "Maria Chen", meta: "person" },
];
