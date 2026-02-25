# Gen AI Proficiency Quiz — User Stories
**Epic:** AI Literacy & Onboarding  
**Source Brief:** [brief-gen-ai-quiz-2026-02-25.md](../briefs/brief-gen-ai-quiz-2026-02-25.md)  
**Role scope:** Product Manager only (MVP — will scale to Engineering/Design with role-specific scenarios)  
**Status:** Decisions resolved ✅ — Ready for Architect review

---

## US-10 — Complete the Gen AI Proficiency Quiz

> **As a** new joiner Product Manager,  
> **I want to** complete a short Gen AI proficiency quiz immediately after my skills assessment,  
> **so that** I understand how effectively I currently use AI as a PM and get a calibrated starting point for my development.

### Acceptance Criteria

- [ ] **AC1 — Role gate:** The quiz is only presented to users with `role = product`. Users with other roles do not see it at any point in the onboarding flow.
- [ ] **AC2 — Trigger:** The quiz launches automatically on first login, immediately after the Skills Assessment step completes (step 4: AI/LLM Skills). It does not appear on subsequent logins *unless* the user initiates a retake from My Skills.
- [ ] **AC3 — Question count:** The quiz contains exactly 10 questions across 3 dimensions: 4 Judgment, 3 Craft, 3 Critical Evaluation.
- [ ] **AC4 — Question formats:** 
  - Judgment questions are scenario-based with a selection of options (e.g. "Would you use AI for this task? If yes, how?")
  - Craft questions present a poorly-written AI prompt for PM context and ask the user to identify the issue
  - Critical Evaluation questions present a realistic AI output (e.g. a market sizing paragraph, a set of user stories) and ask the user to identify what they'd verify or what's flawed
- [ ] **AC5 — Progress indicator:** A progress bar or step counter ("Question 3 of 10") is shown throughout.
- [ ] **AC6 — No skipping:** Users cannot skip questions or submit the quiz with unanswered questions. Attempting to proceed shows a validation prompt.
- [ ] **AC7 — Save on exit:** If the user closes the app mid-quiz, their progress is preserved. On next login, they resume from the last unanswered question.
- [ ] **AC8 — Theme:** All quiz UI uses CSS variables and renders correctly in Brand, Light, and Dark themes.

### Edge Cases
- User refreshes mid-quiz → resumes from last saved question
- User completes Skills Assessment but hits an error before quiz loads → quiz appears on next login
- User is assigned role `product` after initial login (role changed) → quiz is triggered on next login if not yet completed

### Non-Functional Requirements
- Quiz questions and answer options must load in under 1 second
- Quiz state (current question index, answers so far) persisted to Firestore on each answer submission (not only at end)
- Accessible: all interactive elements keyboard-navigable and announced by screen reader

---

## US-11 — View Gen AI Quiz Scorecard

> **As a** Product Manager who has completed the Gen AI quiz,  
> **I want to** see a scorecard with dimension-level scores and a short narrative,  
> **so that** I understand specifically where I am strong and where I have room to grow.

### Acceptance Criteria

- [ ] **AC1 — Dimension scores:** The results screen shows three individual scores: `Judgment: X/5 · Craft: X/5 · Critical Evaluation: X/5`. Not an aggregate total.
- [ ] **AC2 — Narrative:** Each dimension score is accompanied by a 1–2 sentence narrative interpretation contextualised to PM work (not generic). Examples:
  - High Judgment: *"You have a strong instinct for when AI accelerates PM work vs when it misleads — this is the hardest skill to develop."*
  - Low Critical Evaluation: *"You may be accepting AI outputs at face value. In client-facing work, this is where errors sneak into decks and stories."*
- [ ] **AC3 — Overall profile:** A short paragraph summarises the PM's overall AI profile based on the combination of three scores.
- [ ] **AC4 — Strongest/weakest call-out:** The scorecard visually highlights the user's strongest and weakest dimension.
- [ ] **AC5 — Persistent access:** The scorecard is accessible anytime from the My Skills section, showing results from the most recent quiz attempt.
- [ ] **AC6 — Mentor/buddy visibility:** The new joiner's quiz scorecard (dimension scores + narrative) is visible to their assigned onboarding mentor/buddy via the Team Directory or a dedicated mentor view. The new joiner cannot hide their scores from their mentor.
- [ ] **AC7 — Retake prompt:** The scorecard includes a "Retake quiz" button that navigates to the quiz flow.
- [ ] **AC8 — Theme:** Scorecard uses CSS variables and adapts to all three themes.

### Edge Cases
- User retakes quiz → previous scorecard is replaced by new results (no history of past attempts in MVP)
- User somehow reaches the scorecard route without completing the quiz → show a prompt to take the quiz first, not an empty scorecard

### Non-Functional Requirements
- Scorecard must render within 500ms of quiz submission
- Narrative text copy must be maintained in a config or data file (not hardcoded in component) to allow easy iteration

---

## US-12 — Receive Personalised Prescriptions

> **As a** Product Manager who has received my Gen AI quiz scorecard,  
> **I want to** see specific, actionable recommendations tailored to my weakest dimension,  
> **so that** I know exactly what to focus on and who to talk to during my first week.

### Acceptance Criteria

- [ ] **AC1 — Prescriptions always shown:** Every new joiner PM receives all three prescriptions regardless of score:
  1. **Mentor:** *"Talk to your onboarding mentor about your AI proficiency results this week."* — includes a Slack deep-link to the mentor (from Team Directory data)
  2. **Slack:** *"Join #artificial-intelligence for curated AI updates from the team."* — includes a `slack://` deep-link
  3. **Focus areas:** The three essential PM AI skills are always surfaced: Market Research · Story Slicing · Prototyping via Lovable
- [ ] **AC2 — Dimension-specific challenge:** The lowest-scoring dimension triggers one additional targeted Week 1 challenge:
  - Low Judgment → *"Before each AI task this week, write one sentence about why you're using AI for it. Share one with your mentor."*
  - Low Craft → *"For every AI task this week, write your first prompt — then immediately rewrite it with more context before submitting. Compare outputs."*
  - Low Critical Evaluation → *"For every AI output you use in client-facing work this week, verify at least one specific claim from a primary source."*
- [ ] **AC3 — Colleague recommendation:** If the lowest-scoring dimension maps to a skill in the Skill Finder, surface one "Expert" colleague card with a Slack Message button. Skill mapping:
  - Judgment → `AI/LLM Skills::Prompt Engineering`
  - Craft → `AI/LLM Skills::Prompt Engineering`
  - Critical Evaluation → `AI/LLM Skills::ChatGPT/GPT-4` or `AI/LLM Skills::Claude`
- [ ] **AC4 — Mentor deep-link fallback:** If no mentor is assigned in the user's profile, the Mentor prescription shows *"Ask your team lead to assign you an onboarding mentor"* instead of a Slack link.
- [ ] **AC5 — Slack channel link fallback:** If the `slack://` protocol is unavailable (web context), the link opens `https://everest-engineering.slack.com` as fallback.

### Edge Cases
- All three dimensions score equally low → show all three challenges (don't pick just one)
- No colleague has rated themselves Expert in the mapped skill → suppress the colleague card, do not show an empty state
- User has no mentor assigned → fallback copy per AC4

### Non-Functional Requirements
- Prescription content (copy, skill mappings, Slack channel name) maintained in a config file, not hardcoded
- Colleague recommendation reuses the `useAllUsersSkills` hook (already exists from Skill Finder) — no new Firestore calls

---

## US-13 — Retake the Gen AI Quiz

> **As a** Product Manager,  
> **I want to** retake the Gen AI quiz at any time from My Skills,  
> **so that** I can track how my AI proficiency has developed since onboarding.

### Acceptance Criteria

- [ ] **AC1 — Entry point:** A "Retake quiz" button is visible on the scorecard within My Skills. It is only visible after completing the quiz at least once.
- [ ] **AC2 — Full quiz on retake:** Retaking presents the full 10-question quiz, not an abbreviated version.
- [ ] **AC3 — Results update:** Completing a retake replaces the previous scorecard with new results. A timestamp shows when the quiz was last taken (e.g. *"Last taken: 25 Feb 2026"*).
- [ ] **AC4 — No forced redirect:** Retakes are initiated voluntarily from My Skills. The quiz does not appear automatically on login for users who have already completed it.
- [ ] **AC5 — Mid-retake state:** If the user abandons a retake mid-way, the previous scorecard remains visible. The in-progress retake is discarded after 24 hours of inactivity.

### Edge Cases
- User starts retake, closes app, reopens → resumes retake within 24 hours; after 24 hours, retake state is cleared and previous results remain
- User completes retake and scores lower → new (lower) score replaces the previous one with no warning (MVP; consider score history in future)

### Non-Functional Requirements
- Retake state stored separately from completed quiz results to avoid overwriting results mid-attempt

---

## Cross-Cutting / Non-Functional Requirements (all stories)

| Requirement | Detail |
|---|---|
| **Role gating** | All quiz functionality is hidden from non-PM roles at data and UI layer |
| **Firestore data model** | Quiz results stored under `users/{uid}/aiQuiz: { completedAt, judgmentScore, craftScore, criticalEvalScore, lastAttemptAt }`. Mentor/buddy access via existing Firestore auth-scoped read rules (same pattern as Skill Finder). |
| **Theme** | All components use CSS variables — no hardcoded colours |
| **Performance** | Quiz loads in < 1s; scorecard renders in < 500ms post-submission |
| **Accessibility** | WCAG 2.1 AA — keyboard navigable, screen reader labels on all interactive elements |
| **Question config** | Questions stored in a role-parameterisable config file (`aiQuizQuestions.js`) structured as `{ role: 'product', dimension: 'judgment', ... }`. This allows Engineering and Design role scenarios to be added without restructuring the component. |
| **No score intervention threshold** | No minimum score triggers a mandatory intervention — prescriptions are lightweight and consistent for all scores. |
| **No PII in questions** | Question scenarios use fictional names/companies only |

---

## Decisions Resolved ✅

| # | Question | Decision |
|---|---|---|
| 1 | Score visibility | Mentor/buddy **can see** quiz scores (AC6 added to US-11) |
| 2 | Minimum score intervention | **Not required** — prescriptions are lightweight and apply consistently |
| 3 | Role expansion | **Yes** — question config built as role-parameterisable from day one to support Engineering/Design later |

---
*Written by: Product Manager Agent | Decisions resolved by Pranav, 2026-02-25 | Ready for Architect review*
