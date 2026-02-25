# Project Brief: Gen AI Proficiency Quiz for Product Managers

**Date:** 2026-02-25
**Status:** Draft — ready for PM handoff
**Source:** Brainstorming session output ([brainstorming-session-2026-02-25.md](../brainstorming/brainstorming-session-2026-02-25.md))

---

## Problem

New joiner Product Managers at Everest arrive with widely varying levels of Gen AI literacy. The existing Skills Assessment captures self-reported ratings (1–5) for general AI tools, but self-rating is unreliable for AI — people systematically overestimate their proficiency because they don't know what *good* looks like.

There is currently no mechanism to:
- Objectively calibrate a PM's Gen AI proficiency at onboarding
- Prescribe specific, actionable development steps based on where they actually are
- Connect them to the right colleagues for mentorship on AI craft

The result: some new PMs are under-supported in an area that directly affects their productivity and client impact.

---

## Opportunity

A short, scenario-based quiz embedded in the onboarding flow can:

1. Reveal actual proficiency across three dimensions: **Judgment** (when to use AI), **Craft** (how to use AI), and **Critical Evaluation** (how to assess AI output)
2. Prescribe a personalised Week 1 development path
3. Connect the PM to relevant colleagues and resources automatically

This is incremental — it builds on existing infrastructure (Skills Assessment flow, Skill Finder, My Skills, Team Directory) and introduces no new data storage patterns.

---

## Proposed Solution

### What it is
A **10-question Gen AI proficiency quiz** for new joiner PMs, positioned immediately after the existing Skills Assessment step, accessible and retakeable anytime from My Skills.

### Question format (not multiple choice — scenario-based)
- **4 Judgment questions** — "You're doing X. Do you use AI? Why/why not?"
- **3 Craft questions** — "Here's a prompt used for a PM task. What's wrong with it?"
- **3 Critical Evaluation questions** — "Here's an AI output. What do you do before using it in client work?"

Scenarios drawn from three **Essential PM AI Skills**:
- Market Research (TAM/SAM/SOM, competitor analysis)
- Story Slicing (vertically sliced user stories, acceptance criteria)
- Prototyping via Lovable (rapid early-concept prototyping)

### Scoring
Dimension scores, not a single total: `Judgment: X/5 · Craft: X/5 · Critical Evaluation: X/5`

### Output — Scorecard + Prescription
Every PM receives a scorecard with a short narrative interpretation, plus three prescriptions regardless of score:

| Prescription | Detail |
|---|---|
| 👤 Mentor | "Talk to your onboarding mentor about your results this week" |
| 💬 Slack | Join **#artificial-intelligence** for curated AI updates from the team |
| 🎯 Focus areas | Personalised to weak dimension(s): Market Research · Story Slicing · Lovable prototyping |

### Integration with existing app
- Triggered automatically after Skills Assessment (first login only)
- Retakeable anytime from **My Skills**
- Person recommendation via **Skill Finder** (already built — passes weak dimension, surfaces Expert colleagues)
- Mentor reference via **Team Directory** mentor data

---

## Scope

**In:** PM role only (MVP). 10 questions. Scorecard + narrative. Prescriptions. My Skills integration.

**Out:** Engineering/Design role variants (future). Manager visibility of scores. Gamification/leaderboards. Automated Slack channel join.

---

## Success Criteria

- 100% of new joiner PMs complete the quiz within their first week
- PM can identify their lowest-scoring dimension and name one concrete action to improve it
- Quiz completion leads to at least one mentor conversation or Skill Finder connection per new joiner

---

## Open Questions for PM Agent

1. Should quiz results be visible to the onboarding buddy/mentor, or only the new joiner?
2. Is there a minimum score threshold that triggers a different onboarding intervention?
3. Should the quiz be PM-only or eventually extended to all roles with role-appropriate scenarios?

---

*Prepared by: Analyst Agent | Ready for handoff to Product Manager agent for user story creation (US-10)*
