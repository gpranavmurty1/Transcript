# Project Brief: Research Digest

**Date:** 2026-02-25
**Status:** Draft — pending PM handoff
**Prepared by:** Analyst Agent
**Originated from:** Brainstorming session (2026-02-25)

---

## Vision

> *Research Digest* is an AI-aggregated, Australia-specific product intelligence platform that lets Product Managers, UX practitioners, founders, and investors explore what's happening across Australian industries — filtered by domain and refreshed daily.

Unlike global intelligence tools (Crunchbase, CB Insights), Research Digest is laser-focused on the **Australian market** and the **Product + UX perspective** — not financial data or global noise.

---

## Problem

Product practitioners in Australia have no single, reliable, and current source of truth for what's happening in their industry from a *product and innovation* lens. Existing options are:

- **Too global** (Medium, TechCrunch) — no AU filter
- **Too financial** (Crunchbase, AFR) — investment-heavy, not product-focused
- **Too manual** (LinkedIn, newsletters) — requires significant time to curate and consume

**Result:** PMs, designers, and founders make decisions with incomplete or outdated awareness of the Australian landscape.

---

## Target Users

| User Type | Primary Need |
|---|---|
| Product Managers | Stay ahead of product trends in their industry vertical |
| UX Designers | Discover UX shifts, design patterns, accessibility moves in AU |
| Founders | Evaluate market before entering; spot gaps and competitors |
| Investors | Track where product innovation and funding is flowing in AU |

---

## Proposed Solution

### The Explorer Model
A domain-based intelligence explorer. Users start on a **domain grid** and click into any industry for a structured, AI-curated view across 4 dimensions.

### Domain Coverage (MVP)
Fintech · Healthtech · Construction · EdTech · Retail · E-Commerce · Government Digital *(+ expandable)*

### Content Dimensions (per domain)
| Dimension | What it surfaces |
|---|---|
| 📈 Trends | Key product & market shifts in AU |
| 🎨 UX Shifts | Notable UX patterns, design changes, a11y moves |
| 🤖 Gen AI Adoption | How AU companies are deploying AI in their products |
| 💰 Investments | Funding rounds, acquisitions, government grants |

### Data Model
- **Source:** AI aggregation from AU-specific news, VC announcements, government sources, community signals
- **Refresh cadence:** Daily
- **Content format:** AI-summarised insight cards with source links, recency indicator, significance tag (High Impact / Emerging / Watch)

### Authentication
- Google Login (free, no paywall)
- Login unlocks: Follow domains · Save/bookmark insights · Opt-in daily digest email

---

## Source Strategy (MVP)

| Category | Key Sources |
|---|---|
| AU Tech News | AFR Tech, StartupSmart, Which-50, InnovationAus, Mumbrella |
| Investment | Crunchbase (AU filter), Cut Through Venture, ASIC/ASX disclosures, AusIndustry grants |
| Gen AI | CSIRO Data61, Tech Council of Australia, LinkedIn company pages |
| UX / Product | UX Australia, Product Anonymous, Smashing Magazine (AU case studies) |
| Domain-specific | Fintech Australia, CSIRO Health, EdTech Australia, GBCA |

*Note: Source list is a living config — expandable without code changes.*

---

## Risks & Constraints

| Risk | Mitigation |
|---|---|
| AI aggregation quality is low or hallucinated | Human-readable source links on every card; users can verify |
| AU-specific signal is thin for some domains (e.g. Construction, Gov Digital) | Flag low-signal domains clearly; expand source list iteratively |
| Daily refresh API costs | Rate-limit sources; cache aggressively; monitor costs from day 1 |
| Content duplication across sources | Deduplication step in AI aggregation pipeline |
| Google Login dependency | Fallback: allow anonymous browsing (login only required to save/follow) |

---

## Assumptions

- Users prefer to browse by domain rather than search
- Australia-specific framing is the primary value differentiator
- Free access maximises adoption; monetisation is not an MVP concern
- Daily refresh is sufficient (real-time is out of scope for MVP)

---

## Success Metrics

- Daily active users returning to check their followed domains
- Time spent per domain view
- % of users who follow 2+ domains (engagement signal)
- % of users who opt in to daily digest email
- Source coverage: at least 3 credible sources per domain contributing daily

---

## Recommended Next Steps

1. **PM Agent** — write user stories for: domain explorer UI, AI aggregation pipeline, Google login + personalisation, daily digest email
2. **Architect** — design AI aggregation architecture (scheduled jobs, source config, deduplication, Firestore/DB model)
3. **Dev** — scaffold new project repo separate from the Onboarding Companion

---

## Out of Scope (MVP)

- Paid tiers or paywalled content
- Mobile app
- User-contributed content / community submissions
- Non-Australian content
- Real-time data (daily refresh only)
- Engineering, Design, or non-PM role-specific views

---
*Analyst Agent | 2026-02-25 | Ready for PM handoff*
