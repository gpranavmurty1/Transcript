# US-09 — Skill Directory (People Finder by Skill)

**Status:** Ready for Development  
**Owner:** Dev 1 or Dev 2  
**Epic:** Team & Skills Discovery  

---

## User Story

> **As a** new hire,  
> **I want to** search for a skill and see which colleagues have it — and at what level —  
> **so that** I can identify the right people and message them directly via Slack for help, mentorship, or collaboration.

---

## Proficiency Level Mapping

The existing scale from `skills.js` maps to three display tiers:

| Display Label | Rating Value | Meaning |
|---|---|---|
| **Expert** | 5 | Deep expertise, can lead and mentor |
| **Proficient** | 4 | Strong working knowledge |
| **Familiar** | 3 | Working knowledge, growing |

> **Note:** Ratings of 1 (No experience) and 2 (Beginner) are **not shown** in search results — only people with functional skill levels (3+) appear. When a user is editing their own proficiency, all five levels remain available.

---

## Acceptance Criteria

- [ ] **AC1 — Skill Search:** A searchable dropdown or input allows the user to select any skill from the full skills list (role-specific + Core + Domain + AI/LLM). The results include all users in the system who have recorded a proficiency rating of 3 or higher for the selected skill.
- [ ] **AC2 — Expert Group:** Displays all employees with a rating of **5** for that skill under an "Expert" heading. Each person shows their name, role, and avatar.
- [ ] **AC3 — Proficient Group:** Displays all employees with a rating of **4** under a "Proficient" heading.
- [ ] **AC4 — Familiar Group:** Displays all employees with a rating of **3** under a "Familiar" heading.
- [ ] **AC5 — Empty State:** If no employees have a rating ≥ 3 for the selected skill, display a friendly empty state message.
- [ ] **AC6 — No Skill Selected:** Before a skill is chosen, show a prompt instructing the user to select a skill.
- [ ] **AC7 — Contact Access:** Each person card shows a direct **Slack message link** to contact that person.
- [ ] **AC8 — Theme Consistent:** All UI uses CSS variables and adapts to Brand / Light / Dark themes.

---

## Out of Scope

- Editing skill ratings from this view (handled in My Skills)
- Filtering by role or department
- Showing ratings 1–2

---

## Notes for Developer

- **Data source:** All user skill ratings are stored in Firestore `users` collection under `skills: { 'Category::SkillName': rating }`.
- **Query strategy:** For MVP — fetch all users client-side (`getDocs(collection(db, 'users'))`) and filter by the selected skill key and rating ≥ 3. This is acceptable for a small team.
- **Skill key format:** `"Core Skills::Facilitation"`, `"Delivery::Discovery Workshops"`, etc. — always `Category::SkillName`.
- **Navigation:** Accessible from the sidebar (new nav item) or a button within Team Directory.
- **Slack contact:** Use the deep-link pattern already established in `TeamDirectory.jsx` — `https://everest-engineering.slack.com/team/<slack_handle>`.
