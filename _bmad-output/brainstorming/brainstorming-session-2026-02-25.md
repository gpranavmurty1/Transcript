---
stepsCompleted: [1, 2, 3]
session_topic: 'Gen AI quiz for new joiner Product Managers'
session_goals: 'Explore what a meaningful AI proficiency quiz for PMs looks like — dimensions, question types, format, and how results could be used'
selected_approach: 'user-selected'
techniques_used: ['Mind Mapping']
ideas_generated: [32]
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Pranav
**Date:** 2026-02-25

## Session Overview

**Topic:** Gen AI quiz for new joiner Product Managers
**Goals:** Explore what a meaningful AI proficiency quiz for PMs looks like — what dimensions of Gen AI proficiency matter most for a PM/Business Owner role, question types, format, and how results could be used

### Session Setup

Focused on assessing Gen AI proficiency from the perspective of a PM/Business Owner, not a technical practitioner. Results should indicate meaningful proficiency tiers that could guide onboarding support.

## Technique Selection

**Approach:** User-Selected Techniques
**Selected Techniques:**

- **Mind Mapping:** Visually branch ideas from a central concept to discover connections and expand thinking. Perfect for discovering how many dimensions the PM-AI proficiency space actually has.

---

## Technique Execution — Mind Map: "Gen AI Proficiency for Product Managers"

### 🌿 Branch 1 — What PMs use Gen AI for

| Cluster | Use Cases |
|---|---|
| 🔭 Strategy & Market | TAM/SAM/SOM market sizing (top-down/bottom-up), competitor analysis, market entry evaluation |
| 🧭 Discovery & Facilitation | Remote workshop design, user personas, As-Is journeys, To-Be journeys, story mapping |
| ⚡ Delivery & Planning | Outcome prioritisation, release planning, AARRR product metrics |
| ✍️ Articulation & Documentation | Vertically sliced user stories, acceptance criteria, low-fi wireframing |
| *(gap)* Synthesis | Meeting/interview transcript synthesis, research synthesis across sources |
| *(gap)* Comms | Stakeholder update drafting, exec narratives |

### 🌿 Branch 2 — What separates Expert from Novice PM AI users

Three proficiency dimensions identified:
- **Judgment** — *When* to use AI vs when not to (knowing AI's failure modes)
- **Craft** — *How* to use AI (prompting quality, iteration, knowing limitations)
- **Impact** — *Productivity delta* (time saved, quality lifted)

Key insight: *"AI is a synthesis engine, not a source of truth."*

### 🌿 Branch 3 — Quiz format options

- ~~Option 1: Multiple choice~~ (too gameable)
- ✅ **Option 2: "Spot what's wrong" with an AI output** — tests critical evaluation
- ✅ **Option 3: "Walk me through how you'd use AI for this task"** — tests judgment + process

### 🌿 Branch 4 — Concrete question scenarios

- **Spot the flaw:** Story slicing — AI almost always produces horizontal slices (by layer) disguised as vertical ones
- **Walk me through it:** User stories + Market sizing (contrast: one structured, one open-ended)

### 🌿 Branch 5 — Scoring model

✅ **Model B — Dimension scores:** `Judgment: X/5 · Craft: X/5 · Critical Evaluation: X/5`

### 🌿 Branch 6 — Structure & UX decisions

- Taken once as part of onboarding (first-time only trigger), but can be retaken anytime
- 10 questions, appearing after the existing skills assessment
- Results: Scorecard + narrative
- Lives in: **My Skills** section

### 🌿 Branch 7 — Question distribution (10 questions)

| Dimension | Questions | Format |
|---|---|---|
| Judgment | 4 | Scenario: "Do you use AI here? Why/why not?" |
| Craft | 3 | Prompt evaluation: "What's wrong with this prompt?" |
| Critical Evaluation | 3 | Output critique: "What do you do before using this AI output?" |

### 🌿 Branch 8 — Prescription framework

Regardless of weak dimension, every new joiner PM receives:

| Prescription | Detail |
|---|---|
| 👤 Mentor | "Talk to your mentor this week about your AI proficiency score" |
| 💬 Slack | Join **#artificial-intelligence** for curated AI updates |
| 🎯 Essential AI Skills to master | Market Research · Story Slicing · Prototyping via Lovable |

**North star connection:** Every question maps to one of the 3 Essential AI Skills:
- Market Research → Judgment + Critical Evaluation
- Story Slicing → Craft + Critical Evaluation
- Lovable prototyping → Judgment

---

## 🔗 Existing App Integration

- Follows existing **Skills Assessment** flow (same step-based pattern)
- Person recommendation powered by **Skill Finder** (US-09, already built) — quiz passes weak dimension → Skill Finder surfaces Expert colleagues
- Results stored in **My Skills** — consistent with existing skill data model
- Mentor reference leverages existing **Team Directory** mentor data

---

## Next Steps

- [ ] Hand off to Analyst agent to write Project Brief
- [ ] PM agent to write user story (US-10)
- [ ] Architect to assess impact on existing assessment flow and data model
- [ ] Dev to implement quiz component, scoring engine, and results/prescription screen
