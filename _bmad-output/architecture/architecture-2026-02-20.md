# Technical Architecture: Smart Onboarding Companion
**Version:** 1.0
**Date:** February 20, 2026
**Author:** Architect Agent
**Input:** PRD v1.0 (prd-2026-02-20.md)
**Status:** Draft

---

## 1. System Overview

The Smart Onboarding Companion is a **React SPA** deployed on Vercel, backed by **Firebase** for authentication and data persistence. All content (milestones, resources, directory) is maintained in **static configuration files** in the codebase — no CMS or database admin UI required for MVP.

```
┌─────────────────────────────────────────────────────┐
│                  Browser (React SPA)                 │
│   Login → Role Selection → Dashboard → Journey      │
│           Resources → Team Directory                 │
└─────────────────┬───────────────────────────────────┘
                  │
     ┌────────────┴────────────┐
     │                         │
┌────▼─────┐           ┌───────▼──────┐
│ Firebase  │           │ Static Config │
│ Auth      │           │ (JSON/JS)    │
│ Firestore │           │ milestones   │
│           │           │ resources    │
└───────────┘           │ directory    │
                        └──────────────┘
                               │
                        ┌──────▼──────┐
                        │   Notion    │
                        │ (links only │
                        │ no API)     │
                        └─────────────┘
```

**Key decisions:**
| Decision | Choice | Rationale |
|---|---|---|
| Frontend | React + Vite | Already in use, fast builds |
| Styling | TailwindCSS | Already in use |
| Auth | Firebase Auth (Google OAuth) | Already live in the app |
| Data persistence | Firebase Firestore | Free tier sufficient, no backend needed |
| Content management | Static JS config files | Zero infra cost, redeploy to update |
| Notion integration | Curated links only (no API) | Keeps scope tight, no API token mgmt |
| Slack integration | Deep links | Already implemented |
| Hosting | Vercel | Already live |

---

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| UI Framework | React 19 + Vite | Existing |
| Styling | TailwindCSS 3 | Existing |
| Auth | Firebase Auth | Existing (Google OAuth) |
| Database | Firebase Firestore | **New** — for user role + milestone progress |
| Icons | Lucide React | Existing |
| Hosting | Vercel | Existing |
| Config | Static JS/JSON files | **New** — milestones, resources, directory data |

---

## 3. Folder Structure

```
onboarding-companion/
├── src/
│   ├── config/                        ← NEW
│   │   ├── milestones.js              ← All milestone data by role + week
│   │   ├── resources.js               ← Notion links by role
│   │   └── directory.js              ← Team directory by role + crew
│   │
│   ├── components/
│   │   ├── Login.jsx                  ← Existing (Firebase Auth)
│   │   ├── RoleSelector.jsx           ← NEW — shown once after first login
│   │   ├── Sidebar.jsx                ← Existing
│   │   ├── Dashboard.jsx              ← Modified — role-aware progress summary
│   │   ├── JourneyMap.jsx             ← Modified — renders milestones from config
│   │   ├── Resources.jsx              ← Modified — renders from resources.js config
│   │   ├── TeamDirectory.jsx          ← Modified — renders from directory.js config
│   │   ├── Settings.jsx               ← Existing
│   │   └── ChatWidget.jsx             ← Existing (kept, non-AI for MVP)
│   │
│   ├── hooks/
│   │   ├── useUserProfile.js          ← NEW — fetches/sets role from Firestore
│   │   └── useMilestoneProgress.js    ← NEW — reads/writes milestone completions
│   │
│   ├── firebase.js                    ← Existing
│   ├── App.jsx                        ← Modified — adds role gate
│   ├── main.jsx                       ← Existing
│   └── index.css                      ← Existing
│
├── .env.local                         ← Existing (Firebase keys)
└── package.json                       ← Add: firebase (Firestore)
```

---

## 4. Firebase Firestore Data Model

### Collection: `users`
```
users/
  {uid}/
    role: "engineering" | "product" | "design"
    name: string
    email: string
    joinedAt: timestamp
    milestones/             ← subcollection
      {milestoneId}/
        completed: boolean
        completedAt: timestamp
```

**Why subcollection:** Milestone progress can grow large; keeping it nested avoids loading all user data on every auth check.

---

## 5. Static Config Structure

### `src/config/milestones.js`
```js
export const milestones = {
  all: [                              // Shown to ALL roles
    {
      id: "setup-email",
      week: 1,
      title: "Set up Everest email",
      description: "Sign in with your Everest email and reset your temporary password.",
      notionLink: null,
    },
    {
      id: "enable-2fa",
      week: 1,
      title: "Enable 2-Factor Authentication",
      description: "Secure your account with 2FA.",
      notionLink: "https://notion.so/...",
    },
    // ... etc
  ],
  engineering: [                      // Engineering-only milestones
    { id: "1on1-crew-lead-india", week: 2, title: "1-on-1 with India Crew Lead", ... },
    { id: "1on1-head-engineering", week: 2, title: "1-on-1 with Head of Engineering", ... },
  ],
  product: [                          // PM-only milestones
    { id: "1on1-pms-designers", week: 2, title: "1-on-1s with PMs & Designers", ... },
    { id: "1on1-crew-lead-india", week: 2, title: "1-on-1 with India Crew Lead", ... },
    { id: "1on1-head-product", week: 2, title: "1-on-1 with Head of Product Practice", ... },
  ],
  design: [                           // Designer-only milestones
    { id: "1on1-pms-designers", week: 2, title: "1-on-1s with PMs & Designers", ... },
    { id: "1on1-crew-lead-india", week: 2, title: "1-on-1 with India Crew Lead", ... },
    { id: "1on1-head-design", week: 2, title: "1-on-1 with Head of Design Practice", ... },
  ],
};
```

### `src/config/directory.js`
```js
export const directory = {
  crews: [
    {
      name: "Enterprise",
      leads: [
        { name: "Ravinder Deolal", region: "India", role: "Enterprise Crew Lead", ... },
        { name: "...", region: "Australia", role: "Enterprise Crew Lead", ... },
      ]
    },
    {
      name: "Scaleups",
      leads: [ ... ]
    },
    {
      name: "Startups",
      leads: [ ... ]
    }
  ],
  practiceHeads: {
    engineering: { name: "...", role: "Head of Engineering", ... },
    product:     { name: "...", role: "Head of Product Practice", ... },
    design:      { name: "...", role: "Head of Design Practice", ... },
  },
  mentors: {
    product: [ /* Kshitij, Sruthi, Gopal */ ],
    design:  [ /* ... */ ],
    engineering: [ /* ... */ ],
  }
};
```

---

## 6. Key User Flows

### First Login Flow
```
Open App
  → Firebase Auth check
  → Not logged in → Show Login screen
  → Sign in with Google (@everest.engineering only)
  → Check Firestore: does user doc exist?
    → No  → Show RoleSelector → Save role + create user doc → Dashboard
    → Yes → Load role from Firestore → Dashboard
```

### Milestone Completion Flow
```
User views JourneyMap
  → Load milestones from config (filtered by user role)
  → Load completion state from Firestore subcollection
  → User clicks "Mark Complete"
  → Write to Firestore: milestones/{id}.completed = true
  → UI updates optimistically
```

---

## 7. Security

| Concern | Mitigation |
|---|---|
| Access control | Firebase Auth — only @everest.engineering emails allowed (enforced in code + Firebase rules) |
| Data isolation | Firestore rules: users can only read/write their own document |
| Secrets | Firebase config in Vercel env vars (already done) |
| No sensitive data | Only name, email, role, and milestone checks stored — no payroll/HR data |

### Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /milestones/{milestoneId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## 8. Answers to PRD Open Questions

| Question | Answer |
|---|---|
| Where is role + milestone progress stored? | Firebase Firestore (users collection with milestones subcollection) |
| How are Notion links maintained? | Static JS config file — update the file, redeploy on Vercel (no CMS needed for MVP) |
| Admin view in Phase 2? | Yes, recommended — a simple admin route protected by email allowlist to edit config without redeploying |

---

## 9. Implementation Phases (2-Month MVP)

| Week | Focus |
|---|---|
| 1–2 | Firestore setup, RoleSelector component, user profile hook |
| 3–4 | Milestone config file + JourneyMap redesign with progress tracking |
| 5–6 | Resources page (role-filtered), Team Directory redesign (crew structure) |
| 7 | Polish, testing, @everest.engineering email restriction |
| 8 | QA, UAT with real users, Vercel prod deploy |

---

## 10. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Firestore free tier limits | Low | MVP usage is minimal; free tier handles ~50K reads/day |
| Content maintenance lag | Medium | Static config means devs update it — build admin UI in Phase 2 |
| @everest.engineering enforcement bypass | Low | Enforce in both Firebase Auth custom claims and Firestore rules |
