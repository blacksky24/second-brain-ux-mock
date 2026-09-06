# Agent's Memory

Second Brain

Product concept

Second Brain is a memory and operating system for people who work with AI agents.

The primary user is a founder/operator who uses tools like Claude Code or Codex every day.

Today, important context is scattered across:

Notes

Documents

Slack / WhatsApp

Email

GitHub

Meeting notes

Random conversations

Personal memory

Second Brain turns that fragmented context into a living, structured knowledge graph of:

People · Projects · Tasks · Events · Decisions · Goals · Knowledge

The AI agent can read and update this system, but the human remains the final authority.

The product should feel less like Notion or a project-management tool and more like:

“The memory layer that sits between me and my AI agent.”

Core UX principles

1. Everything is connected

A person shouldn't exist separately from their projects, conversations, tasks and decisions.

For example:

Maria Chen

might be connected to:

Project: Personalized Cancer Vaccine

Event: Investor meeting

Task: Send clinical data

Decision: Pursue oncology indication

Goal: Raise seed round

The UI should continuously expose these relationships.

2. Events are canonical

An event is created once but can belong to many entities.

Example:

Sept 4 — Call with Maria about the ProteinQure opportunity

Linked to:

[Maria Chen] [ProteinQure] [Fundraising] [Follow-up]

Every relevant page can show that same event.

The UX should make one event → many entities obvious.

3. The agent proposes; the human confirms

The agent can discover:

People

Events

Tasks

Claims

Relationships

Decisions

But these are initially proposals.

The user should always understand:

“Claude found this. I haven't confirmed it yet.”

Agent-created/unconfirmed records should have a distinctive Agent / Unconfirmed state.

Once accepted, they become part of the canonical system.

Unconfirmed records should not silently affect metrics, commitments or decisions.

4. Context is visible

The user should always know what the agent currently has access to.

For example:

Context

ProteinQure Kaggle project 8 open tasks 12 recent events

The user can remove context or add more.

This should be a major part of the Agent experience.

Primary navigation

The main workspace should have:

Today

Projects

People

Goals

Knowledge

Review Queue

Timeline

Health

Archive

Settings

And persistent MCP status:

● Claude Code — Connected

HOME / TODAY

This is the most important screen.

It should answer:

“What do I need to know and do right now?”

Show:

Attention

Things requiring immediate action.

Examples:

Follow up with ProteinQure founder

Submit Kaggle prize tax form

Prepare for upcoming interview

Review startup opportunity

Respond to collaborator

Upcoming

Tasks and commitments with dates and owners.

Current priorities

The user's active goals/projects.

For example:

Find next technical/product opportunity

Build Second Brain prototype

Explore biotech startup opportunities

Agent proposals

Things the agent discovered since the user's last session.

Example:

Agent found a new contact in yesterday's conversation.

Agent identified a potential follow-up task.

Agent thinks this decision supersedes an earlier one.

Actions:

Accept · Edit · Reject

Recent timeline

A merged stream of important events across projects and people.

Every event displays its linked entities.

Stale / forgotten

Things that haven't been touched recently but may require attention.

PROJECTS

Projects should represent meaningful ongoing work, not generic task folders.

Example projects based on the user's world:

Second Brain

Product/design work.

Biotech / Personalized Medicine

Research, opportunities, companies, people and ideas around biotech and personalized medicine.

AI / Agent Projects

Experiments, products, AI research and technical projects.

Career

Job opportunities, interviews, recruiters, applications and preparation.

A project page should contain:

Current state

Objectives

Open tasks

Milestones

People

Decisions

Risks

Documents

Timeline

The most important section is the compiled current truth.

Instead of making the user reconstruct context from dozens of notes, the page should tell them:

Where things stand right now.

PEOPLE

People are first-class objects.

A person page should answer:

“Who is this person, why do I know them, and what is currently happening between us?”

Show:

Who they are

Why they're relevant

Organizations/projects they're connected to

Contact information

Recent interactions

What I owe them

What they owe me

Open commitments

Relevant decisions

Timeline

Call preparation

The agent should be able to generate a call-prep view:

Objective

What I need to learn

Questions

Open commitments

Previous conversations

Time-boxed agenda

DECISIONS

Decisions should be treated differently from ordinary notes.

Show:

Current decision

The current canonical decision.

Why

Supporting reasoning/context.

History

Previous decisions that were superseded.

For example:

Decision #4 — Current

↓ supersedes

Decision #3

↓ supersedes

Decision #2

↓ supersedes

Decision #1

The system should preserve the history rather than overwrite it.

This is particularly important when the agent is helping maintain context over months.

CAPTURE → REVIEW

This is the core product loop.

The user should be able to dump almost anything into Second Brain:

“Had a call with X. They said Y. Need to follow up next week. They also introduced me to Z.”

The agent extracts structure.

Step 1 — Capture

Simple input.

Allow sources such as:

Text

Email

WhatsApp

LinkedIn

Web

File

Meeting notes

The user should not have to manually structure the information.

Step 2 — Agent extraction

Show a short processing state.

Step 3 — Proposed records

The agent might produce:

NEW PERSON

Maria Chen

NEW EVENT

Call with Maria

[Maria Chen] [Biotech] [Project X]

NEW TASK

Send project overview

NEW RELATIONSHIP

Maria Chen → advising → Project X

NEW CLAIM

Maria is currently evaluating mRNA delivery platforms.

Each proposal shows its source snippet.

Step 4 — Human confirmation

Every proposal gets:

Accept · Edit · Reject

Once accepted, it becomes canonical.

REVIEW QUEUE

A dedicated inbox for everything the agent wants the human to confirm.

Think:

“What did my agent change while I wasn't looking?”

Group by source or capture.

Filter by:

Type

Confidence

Date

Project

Person

The empty state should communicate:

You're caught up.

AGENT

The Agent should feel like a collaborator with memory, not a chatbot bolted onto the side.

The right panel should show:

Current context

Second Brain

ProteinQure

Kaggle project

Maria Chen

8 open tasks

Recent events

Then the conversation.

Example:

User

What am I waiting on from ProteinQure?

Agent

You're waiting on two things: confirmation of the technical discussion and the next step with the founder.

Citations should link directly to the underlying records.

The agent can then propose:

Follow up with founder

Accept · Edit · Reject

Modes:

Ask · Draft · Review

TIMELINE

The global timeline is the chronological memory of the system.

It should combine events from:

Projects

People

Decisions

Goals

Tasks

Captures

An event should never be duplicated simply because it belongs to multiple entities.

Users can filter the timeline by:

Person · Project · Date · Type

HEALTH

Second Brain should continuously expose problems in the knowledge base.

Four primary checks:

Broken links

Records pointing to things that no longer exist.

Stale facts

Information that may no longer be current.

Orphans

Records with no meaningful relationships.

Contradictions

Two conflicting pieces of information.

For contradictions, never silently choose.

Show:

Claim A
Source A

versus

Claim B
Source B

Then let the human decide.

OVERALL USER JOURNEYS

The UX should make these journeys extremely obvious.

Morning

Open Second Brain → See what matters → Review agent proposals → Ask agent → Start work

Capture

Dump messy information → Agent extracts structure → Review → Confirm → Memory updated

Ask

Select context → Ask question → Agent retrieves relevant memory → Answer with citations → Propose actions

Project work

Open project → Understand current truth → See blockers → Review people/tasks/decisions → Take action

Before a call

Open person → Review relationship → See previous interactions → Generate call prep → Have conversation → Capture outcome

Change your mind

Open current decision → See history → Create new decision → Supersede previous decision → System updates current truth

INITIAL UX MOCK SCOPE

Do not attempt to fully design the entire product yet.

The first UX pass should focus on five screens:

Today / Home

Project detail

Capture → Review

Person detail

Agent panel

These five screens should establish:

navigation → information hierarchy → entity relationships → capture → agent interaction → human confirmation

Once these patterns feel right, the remaining screens can be derived from them.

The goal of this first pass is not feature completeness.

It is to answer:

“If I were using this every day with Claude Code, would this feel like the place where my AI and I maintain the memory of my work?”

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/416f4b4a-aaff-4432-a521-5fd60c809b9e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
