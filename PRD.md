# Product Requirements Document (PRD): Smart Onboarding Companion

**Date:** February 20, 2026
**Status:** Refined Draft
**Based on:** Executive Sync Meeting (Sam, Tim, Melanie) + Analyst Review Session

---

## 1. Executive Summary

The company faces a critical bottleneck in new hire onboarding across Engineering, Product, and Design. New hires take an average of five weeks to contribute meaningfully, compounded by remote isolation, fragmented tooling, and generic onboarding packs.

The solution is a **"Smart Onboarding Companion"** — a role-aware, adaptive guide that structures a new hire's first two weeks with clear milestones, curated resources from Notion, and prompted connections to the right people at the right time.

---

## 2. Problem Statement

- **Prolonged Time-to-Productivity:** New hires take an average of five weeks to contribute meaningfully, a delay largely attributed to the lack of structured guidance.
- **Remote Isolation & Fragmented Onboarding:** In a remote-first environment, new roles like Product Managers lack a clear roadmap of stakeholders or resources. Onboarding is often relegated to a static email checklist, forcing hires to navigate the organization through self-directed Slack outreach rather than guided integration.
- **The "Wiki Trap" (Information Overload):** Employees have access to thousands of documents on Notion but lack the **context** to know what is relevant versus obsolete.
- **Social Friction:** New hires suffer from "social anxiety," fearing they will look incompetent if they ask basic questions.
- **Static & Inefficient Processes:** The current "Welcome Pack" is generic, treating Engineering, Product, and Design roles identically.

---

## 3. Product Vision

**"A Companion, not a Portal."**

The product understands:
1. **Who the user is** — Role: Engineer, Product Manager, or Designer
2. **Where they are in their journey** — Day 1, Week 1, or Week 2
3. **What they need to do next** — Guided, role-specific milestones, not a dump of links

The goal: shift new hires from *"I have the links, but I'm lost"* to *"I know exactly what to do today."*

---

## 4. Target Audience

| Role | Included in MVP |
|------|----------------|
| Engineering | ✅ Yes |
| Product Management | ✅ Yes |
| Design | ✅ Yes |
| Other roles (HR, Finance, etc.) | ❌ Not in MVP |

---

## 5. Key Features & Requirements

### 5.1. Role-Based Onboarding Paths
- The Companion detects the new hire's role (Engineering, Product, or Design) at login.
- **Role Display Names:**
  - **Product** → Product Manager
  - **Design** → Product Designer
  - **Engineering** → Software Craftsperson
- All content, milestones, team directories, and Notion resources displayed are **specific to that role**.
- A Designer sees Figma resources and Design team directory; an Engineer sees the tech stack and engineering crew leads.

...

### 5.6. Onboarding Dashboard Highlights (NEW)
The landing page (Dashboard) must highlight key onboarding metadata to orient the user:
- **Date of Joining Everest:** Displayed prominently.
- **Role:** The specific display name based on user selection.
- **Current Date:** The current system date.
- **Onboarding Progress Calculation:** The "First Two Weeks" progress must be calculated and visualized based on the difference between the **Joining Date** and the **Current Date**.


### 5.2. Structured Day-by-Day / Week-by-Week Milestones
Role-agnostic milestones (all roles, Week 1):
- Sign in with Everest email and reset temporary password
- Enable 2-factor authentication
- Join the Everest Slack channel
- Set up Zoom with Everest email and update profile picture
- Complete all mandatory security training

Role-agnostic milestones (all roles, Week 1-2):
- Achieve familiarity with core tools: **Miro, Figma, and AntiGravity**

Role-specific milestones (Week 1-2):

**Product Managers:**
- Conduct 1-on-1s with every PM and Designer on the immediate team (working styles)
- Conduct 1-on-1s with Crew Leads (India & Australia) and Head of Product Practice

**Designers:**
- Conduct 1-on-1s with every PM and Designer on the immediate team (working styles)
- Conduct 1-on-1s with Crew Leads (India & Australia) and Head of Design Practice

**Engineers:**
- Conduct 1-on-1s with Crew Leads (India & Australia) and Head of Engineering

### 5.3. Curated Team Directory
- Role-filtered view of key stakeholders: mentors, crew leads, and practice heads
- Integrated contact options: Email and Slack (deep link to Everest workspace)

### 5.4. Notion Integration (Read)
- The Companion surfaces role-relevant Notion documents at the right milestones
- Only curated, "Holy Grail" documents are surfaced — no raw search across all of Notion

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

## 6. Out of Scope (MVP)

| Item | Status |
|------|--------|
| Conversational AI / Q&A chatbot | ❌ Out of scope for MVP |
| Learning Management System (courses, certifications) | ❌ Out of scope |
| Performance management | ❌ Out of scope |
| Onboarding for roles outside Engineering / Product / Design | ❌ Out of scope |
| Jira integration | ❌ Out of scope |

---

## 7. Success Metrics (KPIs)

| Metric | Baseline | Target |
|--------|----------|--------|
| Time-to-Productivity | 5 weeks | **2 weeks** |
| Security training completion | Untracked | **100% within Week 1** |
| Tool familiarity (Miro, Figma, AntiGravity) | Untracked | **100% by end of Week 1** |
| 1-on-1 completion (PMs & Designers) | Untracked | **All required 1-on-1s done within 2 weeks** |
| New Hire Confidence | Qualitative (HR check-in) | Measurable improvement at 30-day check-in |
| Companion Adoption | N/A | **≥ 80% of new hires actively using by Day 3** |

---

## 8. Integrations

| Tool | Integration Type | Purpose |
|------|-----------------|---------|
| **Notion** | Read (curated links) | Surface role-relevant documents at right milestones |
| **Slack** | Deep link (everest-engineering.slack.com) | Direct contact with mentors and crew leads |
| **Google OAuth** | Authentication | Sign in with Everest Google account |

---

## 9. Constraints & Timeline

- **MVP Delivery:** 2 months from project start
- **Budget:** Limited — no significant infrastructure spend; must use existing tools (Notion, Slack, Google)
- **Team:** Small team; scope must stay tight to deliver in 2 months
- **No backend AI:** Conversational AI deferred to post-MVP

---

## 10. Stakeholders

| Name | Role | Focus |
|------|------|-------|
| Sam | CEO / Sponsor | ROI and growth |
| Tim | HR | Retention and reducing new hire anxiety |
| Melanie | CTO | Technical execution |

---

## 11. Risks & Mitigations

- **Data Integrity ("Garbage In, Garbage Out"):**
  - *Risk:* Many existing Notion docs are outdated. Surfacing these will mislead new hires.
  - *Mitigation:* A mandatory "Notion Curation" phase precedes launch. Only flagged "Holy Grail" docs are ingested.

- **Cultural Isolation:**
  - *Risk:* Removing the need to ask humans questions may reduce social bonding.
  - *Mitigation:* The Companion explicitly prompts human 1-on-1 connections as structured milestones, not optional suggestions.

- **Maintenance Overhead:**
  - *Risk:* The Companion becomes another outdated artifact.
  - *Mitigation:* Milestone and directory content is maintained in a simple admin-editable config; no AI training required.

- **Scope Creep:**
  - *Risk:* Stakeholders add features mid-build (AI, integrations) and delay the 2-month MVP.
  - *Mitigation:* Out of scope section (Section 6) is signed off by all stakeholders before development starts.
