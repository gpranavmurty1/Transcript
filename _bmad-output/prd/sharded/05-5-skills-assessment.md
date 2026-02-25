# PRD: Smart Onboarding Companion
## 5. Key Features & Requirements
### 5.5. Skills Proficiency Assessment (NEW)

#### Overview
Immediately after selecting their role (first login only), every new hire completes a mandatory **skills proficiency assessment**. Skills are rated **1–5** where 1 = no experience and 5 = expert. Once submitted, skills are displayed in a dedicated **My Skills** section of the app and can be updated anytime.

#### Assessment Flow (Mandatory — First Login)
```
Login → Role Selection → Skills Assessment (4 steps) → Dashboard
                              ↓
                   Step 1: Role-Specific Skills
                   Step 2: Core Skills (all roles)
                   Step 3: Domain Experience (all roles)
                   Step 4: AI / LLM Skills (all roles)
```

#### Step 1: Role-Specific Skills (rated 1–5)

**Product Managers:**
| Category | Skills |
|---|---|
| Delivery | Discovery Workshops, Scope Management, Estimations, Outcome-based Roadmaps, Iteration Planning, Release Planning, Systems Thinking, Testing |
| Product | User Research, Understanding Customer/Business/Commercial, Market/Marketing a Product, Feasibility Assessments, Product Strategy, Experiment-based Product Development |
| Program | Process Design & Optimisation, Change Management, Problem Identification & Resolution, Risk Management, Contract Management, Pre-sales |

**Designers:**
UX Research, UI Design, Figma, Design Systems, Prototyping, Usability Testing, Content Design

**Engineers:**
React, Node.js, Python, AWS, DevOps/CI-CD, System Design, Mobile, APIs, SQL

#### Step 2: Core Skills — All Roles (rated 1–5)
Stakeholder Management, Teaming, Facilitation, Advanced Communication, Coaching, Negotiation, Conflict Resolution

#### Step 3: Domain Experience — All Roles (rated 1–5)
Fintech, Healthtech, Enterprise SaaS, E-commerce, EdTech, Logistics, Government

#### Step 4: AI / LLM Skills — All Roles (rated 1–5)
Prompt Engineering, GitHub Copilot, ChatGPT/GPT-4, Claude, Cursor, AntiGravity, Building AI Agents, LangChain/CrewAI

#### Post-Assessment
- All rated skills are **stored in Firestore** under the user's profile
- A **My Skills** section in the app displays the user's proficiency visually (1–5 bar/stars)
- Users can **update any skill's proficiency** at any time from their My Skills section

---
*[← Notion Integration](./05-4-notion-integration.md) · [Index](./index.md) · [Next: Dashboard Highlights →](./05-6-dashboard-highlights.md)*
