# What I Learned Using BMAD on a Real Product

*A personal retrospective on using an AI agent framework to take a product feature from blank page to implementation-ready spec*

---

## What is BMAD?

BMAD (Breakthrough Method for Agile Development) is a multi-agent framework that orchestrates specialised AI agents — Analyst, Product Manager, Architect, Developer, QA, and others — through the structured phases of software product development. Rather than using a single AI assistant for everything, BMAD assigns each phase of the product lifecycle to an agent with a defined role, a specific output format, and clear handoff criteria.

The idea is to replicate the collaborative process of a real product team, not just generate output faster.

---

## The Project

I used BMAD on my **Transcript** project — specifically on two interconnected workstreams:

1. **Smart Onboarding Companion** — a role-aware, milestone-driven web app to guide new hires (Engineering, Product, Design) through a structured 2-week onboarding journey at Everest Engineering
2. **Gen AI Proficiency Quiz** — a scenario-based assessment embedded in the onboarding flow, designed to objectively calibrate a PM's AI literacy across three dimensions: Judgment, Craft, and Critical Evaluation

Both features were real. Both fed into a working React + Firebase app deployed on Vercel.

---

## How I Went About It

The sequence below is what a BMAD workflow actually looked like in practice:

### Step 1 — Brainstorming (`/brainstorming`)

I opened a brainstorming session to explore what a meaningful Gen AI quiz for PMs would look like. Instead of jumping straight to writing requirements, I used mind mapping to surface:
- What PMs actually use Gen AI for (strategy, discovery, delivery, documentation)
- What separates an expert from a novice user (Judgment vs. Craft vs. Critical Evaluation)
- What question formats would actually test proficiency rather than self-perception
- How scores should connect back to prescriptions and team resources

**What I learned here:** Starting with a brainstorm, even when I had a rough idea of what I wanted, produced a sharper and more differentiated design than if I'd jumped straight to writing a brief. The mind mapping surfaced the insight that self-reported AI rating (what the existing Skills Assessment captured) was *systematically unreliable* for AI — people don't know what *good* looks like, so they overestimate. That single insight shaped the entire quiz concept.

---

### Step 2 — Project Brief (Analyst Agent)

The Analyst agent converted the brainstorm output into a structured project brief with: problem statement, target users, proposed solution, scope, risks, and recommended next steps.

**What I learned here:** The brief acted as a forcing function. Before handing off to the PM agent, I had to answer: What is the actual problem? Who is it for? What's in scope for MVP? The Analyst agent didn't hallucinate scope — it stayed close to what the brainstorm produced and flagged open questions explicitly for the next agent. The handoff note at the bottom ("Ready for PM handoff — US-10") was a small detail that made the chain of custody clear.

---

### Step 3 — PRD (PM Agent)

The PM agent expanded the brief into a full PRD. For the main Onboarding Companion, this covered 6 epics and 19 user stories. For the Gen AI Quiz, it produced:

- **US-10** — Complete the Quiz (8 acceptance criteria: role gating, progress tracking, save-on-exit, theme compatibility)
- **US-11** — View the Scorecard (dimension scores, narrative, mentor visibility)
- **US-12** — Receive Personalised Prescriptions (always-on + dimension-specific challenges)
- **US-13** — Retake the Quiz (retake state separate from final results)

Each story was vertically sliced, had edge cases documented, and had non-functional requirements called out explicitly (Firestore write-on-each-answer, config-not-hardcoded, WCAG 2.1 AA).

**What I learned here:** The PM agent's output was the most immediately useful of all agent outputs. It produced the kind of acceptance criteria I'd normally spend 2–3 hours writing — with enough precision that a developer could actually implement from it without a follow-up conversation. The key was that it built on *two prior layers of context* (the brainstorm and the brief). The quality of PRD output was directly proportional to how much thinking I'd invested upstream.

---

### Step 4 — Architecture (Architect Agent)

The Architect agent produced:
- A full technical architecture doc for the Onboarding Companion (React SPA + Firebase + static config files, hosted on Vercel)
- An Architecture Decision Record (ADR) specifically for the Gen AI Quiz feature

The ADR was notable because it didn't just describe *what* to build — it documented *why* each decision was made:
- Why the quiz uses the same "gate pattern" as Skills Assessment rather than a new route
- Why questions live in a config file rather than a database
- Why no new Firestore security rules are needed (existing rules already cover mentor read access)
- Why new components don't touch existing components (exact impact: 2-line change to `App.jsx`, one addition to `MySkills.jsx`)

**What I learned here:** The ADR format forced decision traceability. When a developer implements this, they won't just have *what* to build — they'll understand *why* it's structured that way. The Architect agent also explicitly sequenced the build order (config → hook → components → integration), which saved the dev from having to reason about dependencies.

---

## What Worked Well

**1. The handoff chain is the product**
Each agent output explicitly named the next agent and what they needed to do. The Analyst ended with "Ready for PM handoff — write US-10." The PM ended with "Ready for Architect review." This kept momentum and made it clear where a feature was in its lifecycle at any point.

**2. Layering context produces better output**
The Gen AI Quiz brief, PRD, and ADR were all significantly better than if I'd asked a single agent to produce them in isolation. Each layer built on the one before it, and decisions made in the brief ("no minimum score threshold") propagated correctly into the user stories and the ADR without me having to re-explain them.

**3. Config-over-hardcoding as a default**
The Architect agent consistently recommended moving content to config files rather than hardcoding it. This showed up in: milestone content, resource links, quiz questions, prescription copy, Skill Finder mappings. I didn't have to instruct this — it was the agent's instinct. That's the right instinct for a product at this stage.

**4. Specificity in AC beats vagueness**
AC6 in US-11 ("Mentor/buddy **can** see quiz scores — new joiner **cannot** hide their scores from their mentor") is a great example of an acceptance criterion that would usually be left implicit. The explicit framing prevented a privacy/transparency debate during implementation.

**5. Vertical slicing held**
Every user story covered exactly one user action and its complete behaviour. No story was "implement the quiz." Each was a specific, verifiable piece of user value.

---

## Honest Friction Points

**1. The brainstorming step requires genuine engagement**
The `/brainstorming` workflow isn't a shortcut — it's only as useful as the thinking you bring into it. I got the most value when I treated it like a working session, not a prompt. If I'd just written "make me a quiz," the output would have been generic.

**2. Agent output isn't always immediately shippable**
The PRD needed one review pass before it was implementation-ready. Mostly this was to verify that decisions I'd made in conversation (e.g. "mentor visibility: yes") had been correctly captured in acceptance criteria, and to catch any inherited assumptions that needed adjustment. Plan for a review step, not a fire-and-forget.

**3. Managing scope expansion**
BMAD makes adding scope very easy — it's tempting to ask the PM agent to "also add a story for X." I did this several times and the PRD grew. Without discipline, this pattern produces a large, high-quality spec for a product that's too big to ship. The structured scope section (In / Out) in the brief helped, but scope discipline is still a human job.

**4. The agents don't know your codebase unless you tell them**
The best architecture decisions came when I explicitly told the Architect agent about existing patterns (e.g. "the existing Skills Assessment is a full-screen gate, not a route"). When I skipped this context, the agent would default to route-based navigation — technically fine, but inconsistent with the existing product.

---

## Devil's Advocate: What I Could Have Done Better

Looking back at the outputs with a critical eye, there are some gaps I didn't notice while I was in the flow of it.

**1. The chain stopped at Architecture — Dev and QA were barely used**
BMAD has 9+ agents. I used four of them seriously (Brainstorm facilitator, Analyst, PM, Architect). The Developer agent never implemented from the specs. The QA agent produced exactly one test plan — for US-04, a relatively simple "view my journey" story — with 5 test cases, none of which were executed. The more complex features (the Gen AI Quiz with its save-on-exit, retake state, and prescription logic) had *zero* test coverage planned. If the point of BMAD is end-to-end product development, I stopped at roughly the halfway mark and called it a success.

**2. The hardest artefact was never created: the actual quiz questions**
The entire Gen AI Quiz chain — brainstorm, brief, PRD (4 stories, 20+ acceptance criteria), ADR, config file structure — describes a quiz in extraordinary detail. But the 10 actual questions were never written. The Architect agent even specified the config file format (`aiQuizQuestions.js`) and the PM agent defined the three question formats (scenario, prompt critique, output critique). Yet the content — the thing that makes the quiz *work* — was deferred. The framework produced a beautifully specified container with nothing inside it. This is a pattern worth watching: BMAD excels at structure and process artefacts but doesn't naturally push you to create the hardest content.

**3. Only one brainstorming technique was used**
The brainstorming session used Mind Mapping. It worked well. But BMAD's `/brainstorming` workflow offers multiple techniques — SCAMPER, Reverse Brainstorming, Six Thinking Hats, and others. I never explored what a Reverse Brainstorming session ("How would we make onboarding AI assessment *completely useless*?") might have surfaced, or whether SCAMPER would have challenged the quiz format itself. I picked one technique, got a good result, and moved on. That's satisficing, not exploring.

**4. The Research Digest brief went nowhere**
The Analyst agent also produced a full project brief for a "Research Digest" — an AU-specific product intelligence platform. It had a problem statement, target users, 7 domain verticals, a source strategy, and a clear handoff ("Ready for PM handoff"). It was never picked up. No PM stories, no architecture, no decision to explicitly kill it. It just... sat there. This is a real cost of BMAD's productivity: it's easy to generate a brief for every idea and then never follow through. Unfinished briefs aren't free — they create the illusion of progress.

**5. No user was ever consulted**
The brainstorm surfaced the insight that self-reported AI ratings are unreliable. This is a plausible hypothesis — but it was never validated with actual new joiner PMs. The entire quiz concept, scoring model, and prescription framework were designed in a closed loop between me and the agents. No user interview, no lightweight survey, no "show the scorecard mockup to one PM and ask if it's useful." BMAD's structured output can feel so complete and polished that it suppresses the instinct to validate with real users. The artefacts *look* like they've been through a discovery process, but they haven't.

**6. Market research was done *after* the PRD, not before**
The Market Research Digest (dated March 8) was produced two weeks *after* the PRD (dated February 20). The competitive analysis confirmed the PRD direction — but confirmation bias is the risk when research follows decisions. If the research had been done first, it might have shaped the scope differently. For example: the market research flagged that mobile-first design is "strong in market" but the PRD had no mobile story. The research also identified that no competitor does conversational AI well in onboarding — a signal that could have elevated or de-prioritised the chatbot deferral. The research validated the decisions I'd already made instead of informing new ones.

**7. The test plan reveals a quality gap**
There is one test plan in the entire project: 5 test cases for US-04 (View My Onboarding Journey), all status "Pending." No test plans exist for the Gen AI Quiz (4 stories), the Skills Assessment (5 stories), or the Team Directory. The QA agent was available and capable. I just didn't use it. If I'd run the QA agent against US-10 alone (with its save-on-exit, 24-hour retake expiry, and role-gating logic), it would have surfaced edge cases that the PM might have missed.

**8. I have no baseline to measure whether BMAD actually saved time**
I wrote that the PM agent "produced acceptance criteria I'd normally spend 2–3 hours writing." But I didn't actually track how long the BMAD process took end-to-end. Did brainstorm + brief + PRD + ADR take 4 hours? 8 hours? More? Without a baseline, "BMAD is faster" is a feeling, not a finding. Next time: timestamp when you start and finish. The comparison matters.

---

## Key Takeaways

- **Use BMAD for features, not just tasks.** It's overkill for a simple UI change. It's exactly right for a feature that involves user flows, data models, and integration with other parts of the system.

- **The Analyst → PM → Architect chain is the core value.** Don't shortcut it. Each step sharpens the next.

- **Treat outputs as first drafts with very high craftsmanship, not final specs.** One review pass is normal and worthwhile.

- **The brainstorming session is where product thinking actually happens.** It's not optional preamble — it's the step that defines whether you're solving the right problem.

- **BMAD makes implicit decisions explicit.** This is uncomfortable at first (there are more open questions than you expect) but valuable. Implicit decisions become bugs. Explicit decisions become acceptance criteria.

---

## How BMAD Is Used Across the Industry

BMAD has moved from a niche experiment to a recognised methodology in AI-assisted development. Here's how it's being adopted in practice:

**1. From "vibe coding" to spec-driven development**
The most common adoption pattern is teams using BMAD to move away from ad-hoc prompting — where someone pastes a vague requirement into an AI tool and hopes for the best — toward a structured, artefact-driven workflow. The framework treats documentation as a first-class citizen: PRDs, architecture docs, and ADRs are committed to version control and become the source of truth for both humans and AI agents.

**2. Agent personas as specialist consultants**
BMAD ships with 12+ named agent personas (e.g., "John" the PM, "Winston" the Architect, "Amelia" the Developer, "Quinn" the QA). Teams invoke these agents for specific phases rather than using a single generic assistant. The personas carry distinct expertise, communication styles, and output formats — which keeps outputs consistent and reduces hallucination.

**3. Scale-adaptive intelligence**
A key differentiator: BMAD automatically adjusts its level of rigour based on task complexity. A simple bug fix triggers a lightweight "Quick Flow" (quick spec → quick dev). A new feature triggers full ceremony — architecture reviews, sprint planning, cross-agent collaboration. This prevents the framework from feeling heavy on small tasks.

**4. Party Mode for multi-perspective work**
Teams use BMAD's `/party-mode` to bring multiple agent personas into a single session — for example, having the PM, Architect, and QA agents debate a proposed design *before* any code is written. This simulates the cross-functional challenge that would normally happen in a real team meeting.

**5. Epic sharding for incremental change**
Rather than re-generating an entire PRD after every scope change, teams use BMAD to "shard" large documents into small, self-contained units (epics, stories) that carry only the context needed for a specific task. This reduces token waste and context drift.

**6. IDE-native integration**
BMAD is designed to work inside existing developer tools — Cursor, Claude Code, Windsurf, and similar AI-powered IDEs. Agents are invoked via slash commands (`/pm`, `/architect`, `/brainstorming`), making the framework feel like a natural extension of the coding environment rather than a separate tool.

---

## Recommended Ways to Use BMAD

### As an Individual

When you're a solo practitioner — a PM exploring a feature, a designer thinking through flows, or an engineer spiking on architecture — BMAD gives you a structured thinking partner. Here's the ideal workflow:

**Choose your path based on task size:**

| Task Size | Workflow | What You Do |
|---|---|---|
| Small (bug fix, minor tweak) | **Quick Flow** — skip the full chain | Quick Spec → Quick Dev. No PRD needed. |
| Medium (new feature) | **Full chain, single pass** | Brainstorm → Brief → PRD → Architecture → Dev |
| Large (new product / major epic) | **Full chain + iteration** | Full chain, but run `/review-adversarial-general` on each artefact before progressing |

**Individual best practices:**

1. **Always start with `/brainstorming`** — even when you think you know what to build. The brainstorm is where you discover what you *don't* know. Use at least two techniques (e.g., Mind Mapping + Reverse Brainstorming) to avoid satisficing.

2. **Use fresh chats for each agent phase.** Context contamination between phases produces worse output than a clean handoff with the artefact as the only input.

3. **Run the adversarial review.** Before progressing from Brief → PRD or PRD → Architecture, invoke `/review-adversarial-general` on the output. This is the equivalent of showing your work to a sceptical colleague. It catches assumptions you've embedded without realising.

4. **Don't skip Dev and QA.** The planning chain (Analyst → PM → Architect) is seductive because the artefacts look complete and polished. But the chain isn't finished until the Developer agent has implemented and the QA agent has written test plans. The planning artefacts are the *means*, not the *end*.

5. **Use `/help` liberally.** If you're unsure what step comes next, ask. BMAD's help system is designed to keep you oriented in the workflow.

6. **Track your time.** Timestamp when you start and finish. Without a baseline, you can't tell whether BMAD is actually faster — or just feels more structured.

---

### As a Team of Three (PM + Designer + Lead Engineer)

This is where BMAD's value multiplies — but the coordination model matters. Here's a recommended division of labour:

#### Who Owns Which Agents

| Agent Phase | Owner | Why |
|---|---|---|
| **Brainstorming** (`/brainstorming`) | PM leads, Designer and Engineer participate | The PM brings the problem space; the Designer challenges with user empathy; the Engineer flags feasibility constraints early |
| **Analyst** (Project Brief) | PM | The PM is accountable for problem definition, scope, and success criteria |
| **PM Agent** (PRD + User Stories) | PM writes, Designer reviews | The PM drafts stories; the Designer reviews for user flow completeness, edge cases in interaction, and accessibility gaps |
| **Architect** (Architecture + ADR) | Lead Engineer | The Engineer owns technical decisions and writes architecture with full codebase context |
| **Developer** (Implementation) | Lead Engineer | Code execution and implementation from specs |
| **QA** (Test Plans) | Lead Engineer writes, PM reviews | The Engineer writes test plans; the PM reviews to ensure AC coverage matches intent |
| **Editorial Review** (`/editorial-review-*`) | Designer | The Designer reviews all user-facing copy, error messages, and flow narratives for clarity and consistency |
| **Adversarial Review** (`/review-adversarial-general`) | Rotate each sprint | A different team member runs this each cycle to prevent blind spots from calcifying |

#### The Team Workflow

```
Week 1: Discovery & Planning
─────────────────────────────
PM runs /brainstorming (Designer + Engineer contribute)
    ↓
PM runs Analyst → produces Brief
    ↓
PM shares Brief → Designer reviews for user gaps, Engineer reviews for feasibility
    ↓
PM runs PM Agent → produces PRD + User Stories
    ↓
Designer runs /editorial-review-prose on all user-facing copy
    ↓
Engineer runs Architect Agent → produces Architecture + ADR
    ↓
Team runs /party-mode to challenge the full spec together

Week 2+: Implementation
─────────────────────────────
Engineer runs Developer Agent per story (implements from spec)
    ↓
Engineer runs QA Agent → produces test plans per story
    ↓
PM reviews test plans for AC coverage
    ↓
Designer validates implemented UI against intended flows
```

#### Team-Specific Best Practices

1. **The PM is the chain owner, not the chain doer.** The PM should run the first three phases (Brainstorm, Brief, PRD) but *invite* the Designer and Engineer to review at each gate. BMAD's structured handoffs make async review easy — share the artefact, get comments, iterate.

2. **The Engineer must feed codebase context to the Architect agent.** This is the single highest-leverage action for a team. When the Engineer tells the Architect "we use a gate pattern, not routes" or "Firestore rules already cover this," the architecture output becomes consistent with the real system. Without this, you get technically valid but contextually wrong decisions.

3. **The Designer should own the editorial review workflow.** BMAD's `/editorial-review-prose` and `/editorial-review-structure` workflows are underused. The Designer is best positioned to catch inconsistent terminology, unclear error messages, and flow gaps that the PM and Engineer will overlook because they're thinking in systems, not in user experience.

4. **Use Party Mode for contentious decisions.** When the team disagrees — "Should quiz scores be visible to mentors?" or "Should we build a mobile view?" — run `/party-mode` and let the agents argue it out from multiple perspectives. This surfaces trade-offs faster than a meeting and creates a documented rationale for the decision.

5. **Run the adversarial review on a rotation.** If the PM always reviews the PM's own output, blind spots persist. Have the Engineer run `/review-adversarial-general` on the PRD. Have the PM run it on the Architecture doc. Cross-functional adversarial review catches the most valuable issues.

6. **Shard early, shard often.** Once the PRD exceeds 10 user stories, use `/shard-doc` to break it into manageable pieces. Each shard becomes a self-contained unit that can be independently estimated, implemented, and tested. This prevents the "200-line PRD that nobody reads" problem.

7. **Don't let generated briefs pile up.** If the Analyst produces a brief for an idea and nobody picks it up within a sprint, explicitly kill it or move it to a backlog. Unfinished briefs create the illusion of progress and cognitive overhead.

---

*Transcript project | February–April 2026*
