# Product Requirements Document (PRD): Smart Onboarding Companion

**Date:** January 22, 2026  
**Status:** Draft  
**Based on:** Executive Sync Meeting (Sam, Tim, Melanie)

## 1. Executive Summary
The company is currently facing a critical bottleneck in new hire onboarding. Engineers are taking nearly five weeks to reach productivity, primarily due to overwhelmed "information dumping" and social anxiety around asking questions.
The solution is to build a **"Smart Onboarding Companion"**—an intelligent, adaptive agent that guides new hires through their specific journey, providing context-aware information and a safe space for questions.

## 2. Problem Statement
*   **Prolonged Time-to-Productivity:** It takes new engineers ~5 weeks to ship their first meaningful feature.
*   **The "Wiki Trap" (Information Overload):** Employees have access to thousands of documents (Notion, Drive, Jira) but lack the **context** to know what is relevant versus obsolete (e.g., reading a 2023 roadmap in 2026).
*   **Social Friction:** New hires suffer from "social anxiety," fearing they will look incompetent if they ask basic questions (e.g., "Where is the VPN config?").
*   **Static & Inefficient Processes:** The current "Welcome Pack" is generic, treating unique roles (like Marketing Managers and Backend Engineers) the same way.

## 3. Product Vision
A "Companion, not a Portal." The product serves as a smart guide that understands:
1.  **Who the user is** (Role: Product Designer, Backend Dev, etc.)
2.  **Where they are in their journey** (Scenario: "It's Day 2")
3.  **What they already know** (Skill Level: Skips React basics if the user is an expert)

The ultimate goal is to shift the user experience from *"I have the links, but I'm lost"* to *"I have a guide that prioritizes my focus."*

## 4. Key Features & Requirements

### 4.1. Adaptive Learning Paths
*   **Role-Based Customization:** The system must differentiate content delivery based on the user's specific job title.
    *   *Example:* A Product Designer sees Figma files on Day 2; a Backend Engineer sees API docs.
*   **Dynamic Skill Assessment:** The guide should adapt to the user's proficiency, skipping introductory material for established skills (e.g., skipping React basics for a senior React dev).

### 4.2. Context-Aware Guidance
*   **Time-Based Triggers:** The system understands the specific "day" or "week" of the user's tenure and suggests appropriate tasks (e.g., "Don't worry about API docs yet, just focus on setup").
*   **Curated Navigation:** Instead of a full search index, the system highlights the "Holy Grail" documents and suppresses known "trash" or obsolete files.

### 4.3. Conversational AI Companion
*   **"Safe Space" Q&A:** An AI interface that answers "trivial" questions instantly, removing the fear of judgement or "looking stupid" to a human manager.
*   **Contextual Answers:** Answers must be specific to the company infrastructure (VPN configs, internal tools).

## 5. Success Metrics (KPIs)
*   **Time-to-Productivity:** Decrease the average time to ship the first feature (Baseline: 5 weeks).
*   **New Hire Confidence:** Qualitative improvement in 30-day HR check-in feedback.
*   **Senior Dev Interruptions:** Reduction in the frequency of basic help requests sent to senior engineering staff.

## 6. Stakeholders
*   **Sam (CEO):** Sponsor; focused on ROI and growth.
*   **Tim (HR):** Stakeholder; focused on retention and reducing new hire anxiety.
*   **Melanie (CTO):** Stakeholder; focused on technical execution and implementation.

## 7. Risks & Mitigations
*   **Data Integrity ("Garbage In, Garbage Out"):**
    *   *Risk:* Melanie identified that many existing docs are "trash" or obsolete. An AI trained on this will hallucinate or provide incorrect info.
    *   *Mitigation:* A mandatory "Data Curation" phase must precede AI ingestion. We must flag "Holy Grail" docs and archive obsolete ones manually or via heuristics.
*   **Cultural Isolation:**
    *   *Risk:* By removing the need to ask humans "stupid questions," we may accidentally remove opportunities for social bonding, leading to technically productive but culturally isolated engineers.
    *   *Mitigation:* The Companion should be programmed to *encourage* human interaction for subjective or complex topics (e.g., "Ask Sarah about the history of this module").
*   **Maintenance Overhead:**
    *   *Risk:* The Companion becoming another "outdated artifact" if it requires manual updates.
    *   *Mitigation:* The system must auto-sync with active repositories and flag when its own knowledge base seems stagnant.
