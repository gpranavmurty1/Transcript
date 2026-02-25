# Architecture Decision Record — Gen AI Proficiency Quiz
**Feature:** US-10 through US-13 — Gen AI Quiz for Product Managers  
**Date:** 2026-02-25  
**Architect:** Architect Agent  
**Status:** Approved — Ready for development

---

## 1. Context: How the Existing Flow Works

The onboarding flow in `App.jsx` is a sequential gate pattern:

```
Firebase Auth → Role Selection → Skills Assessment → Dashboard
```

`SkillsAssessment` is rendered when `!skillsCompleted` in the user's Firestore doc. On `onComplete(ratings)`, it calls `saveAssessment()` from `useSkillsProfile`, sets `skillsCompleted: true`, and App.jsx gates past it.

The quiz slots in **between** Skills Assessment and Dashboard, using the same pattern:

```
Firebase Auth → Role Selection → Skills Assessment → [NEW] Gen AI Quiz → Dashboard
```

---

## 2. Architecture Decisions

### Decision 1: Gate mechanism — same pattern as Skills Assessment

**How:** Add `aiQuizCompleted` boolean to the user's Firestore document. App.jsx renders `<GenAIQuiz>` when:
```js
role === 'product' && skillsCompleted && !aiQuizCompleted
```

This is a single-line addition to the existing conditional chain in `App.jsx`. No routing changes needed — same full-screen takeover pattern as `SkillsAssessment`.

**Why not a new route?** The existing assessment pattern deliberately does not use routes — it's a wall before the app. Adding a route would require the user to reload/navigate manually. The wall pattern is correct for mandatory onboarding steps.

---

### Decision 2: Question config — role-parameterisable from day one

Create `/src/config/aiQuizQuestions.js`:

```js
export const aiQuizQuestions = [
  {
    id: 'q1',
    role: 'product',      // filter key — 'product' | 'engineering' | 'design' | 'all'
    dimension: 'judgment', // 'judgment' | 'craft' | 'critical_evaluation'
    format: 'scenario',    // 'scenario' | 'prompt_critique' | 'output_critique'
    question: 'You need to size the TAM for a new fintech product...',
    options: [...],
    correctOption: 'b',
    explanation: '...',
  },
  ...
]
```

Filtered at runtime: `aiQuizQuestions.filter(q => q.role === role || q.role === 'all')`.  
Engineering/Design scenarios added here later — zero component changes needed.

---

### Decision 3: Firestore data model

Add to each user's document under `aiQuiz`:

```js
users/{uid}/aiQuiz: {
  completedAt: ISO string,
  lastAttemptAt: ISO string,       // updated on every retake
  judgmentScore: number (0–4),     // raw correct answers
  craftScore: number (0–3),
  criticalEvalScore: number (0–3),
  inProgressAnswers: [],           // transient — cleared on completion
  inProgressQuestionIndex: number, // for save-on-exit / retake resume
}
```

No new Firestore collection. No new security rule needed — existing `allow read: if request.auth != null` rule (deployed with Skill Finder) already covers mentor/buddy read access.

---

### Decision 4: New hook — `useAIQuiz`

Create `/src/hooks/useAIQuiz.js` — owns all Firestore reads/writes for quiz state. Keeps components clean.

```js
// Returned interface:
{
  quizData,         // current aiQuiz document data
  quizLoading,
  saveProgress,     // writes inProgressAnswers + index to Firestore
  submitQuiz,       // calculates scores, writes final results, sets aiQuizCompleted: true
  clearInProgress,  // called after 24h stale retake
}
```

---

### Decision 5: Components — 3 new, no modifications to existing

| Component | Responsibility |
|---|---|
| `GenAIQuiz.jsx` | Outer shell — same step/progress UI pattern as `SkillsAssessment.jsx` |
| `QuizQuestion.jsx` | Renders one question (scenario / prompt critique / output critique) |
| `QuizScorecard.jsx` | Shows dimension scores, narrative, prescriptions — lives in My Skills |

`MySkills.jsx` gets one addition: if `aiQuiz.completedAt` exists, renders `<QuizScorecard />` in a new tab/section. No structural changes to MySkills.

---

### Decision 6: Prescription data — config, not hardcoded

Create `/src/config/aiQuizPrescriptions.js`:

```js
export const prescriptions = {
  judgment: {
    challenge: 'Before each AI task this week, write one sentence...',
    skillFinderKey: 'AI & LLM Skills::Prompt Engineering',
  },
  craft: { ... },
  critical_evaluation: { ... },
  always: {
    slackChannel: 'https://everest-engineering.slack.com/channels/artificial-intelligence',
    focusSkills: ['Market Research', 'Story Slicing', 'Prototyping via Lovable'],
  }
}
```

---

## 3. Impact on Existing Code

| File | Change | Risk |
|---|---|---|
| `App.jsx` | Add `aiQuizCompleted` gate (2 lines) | Low |
| `MySkills.jsx` | Add scorecard section if quiz completed | Low |
| `useSkillsProfile.js` | No change | — |
| `Sidebar.jsx` | No change | — |
| `SkillDirectory.jsx` | No change (reused via prescription hook) | — |
| `firestore.rules` | No change (existing rules cover it) | — |

---

## 4. New Files

```
src/
├── config/
│   ├── aiQuizQuestions.js      [NEW]
│   └── aiQuizPrescriptions.js  [NEW]
├── hooks/
│   └── useAIQuiz.js            [NEW]
└── components/
    ├── GenAIQuiz.jsx            [NEW]
    ├── QuizQuestion.jsx         [NEW]
    └── QuizScorecard.jsx        [NEW]
```

---

## 5. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Quiz content (questions/answers) needs frequent iteration | All content in config files — content updates need no component changes |
| Save-on-exit reliability | Write to Firestore on every answer, not only on submit |
| Retake overwrites good scores | Only overwrite on full completion — inProgress state is separate from final scores |
| Mentor visibility (AC6, US-11) | Existing Firestore read rules already allow authenticated reads — mentor reads `aiQuiz` sub-document same as Skill Finder reads `skills` |

---

## 6. Architect's Recommendation to Dev

Start in this order:
1. `aiQuizQuestions.js` config (write 10 PM questions first)
2. `useAIQuiz.js` hook
3. `GenAIQuiz.jsx` + `QuizQuestion.jsx` (gate + quiz flow, no scoring yet)
4. Scoring + `QuizScorecard.jsx`
5. `aiQuizPrescriptions.js` + prescription rendering
6. `App.jsx` gate + `MySkills.jsx` integration last (touches existing code)

---
*Architect Agent | 2026-02-25 | Approved for development*
