# Implementation Plan

> **Last Updated:** 2026-01-17
>
> This document tracks our phased approach to completing the Interview Prep Website. Each chunk is a discrete unit of work with a clear deliverable that can be reviewed before moving on.

---

## Progress Overview

| Phase | Description | Status |
|-------|-------------|--------|
| Phase A | Research Foundation | Not Started |
| Phase B | Content System | Not Started |
| Phase C | Platform MVP | Not Started |
| Phase D | Marketing Setup | Not Started |
| Phase E | Future Enhancements | Deferred |

---

## Phase A: Complete Research Foundation

### A1: Verify Search Volume Analysis (R1)
- [ ] Review `interview_landing_page_analysis.xlsx`
- [ ] Confirm 100+ company/role combinations exist
- [ ] Verify monthly search volume, CPC, competition data present
- [ ] Check opportunity score ranking exists
- [ ] Confirm top 50 targets identified with rationale
- [ ] Document seasonal patterns
- [ ] Identify and fix any gaps

**Deliverable:** Verified R1 completion or updated Excel with gaps filled

**Status:** Not Started

---

### A2: Hiring Push Identification (R2)
- [ ] Research companies with 1000+ active roles
- [ ] Document: company name, role types, geographic focus, timeline, source link
- [ ] Cross-reference with R1 search data
- [ ] Identify 20+ companies with active pushes
- [ ] Flag recurring annual hiring events
- [ ] Create priority score for each
- [ ] Output tracker file

**Deliverable:** `data/hiring_push_tracker.md` with 20+ companies

**Status:** Not Started

---

## Phase B: Complete Content System

### B1: AI Marketing Copy - Prompt Template (C3)
- [ ] Create prompt template accepting: company name, role title, industry, key challenges
- [ ] Define output format: headline, subheadline, 3 bullets, CTA, meta description
- [ ] Create style guide for brand voice
- [ ] Define quality checklist
- [ ] Document A/B test variants (urgency vs. expertise vs. insider knowledge)

**Deliverable:** `docs/marketing/prompt-template.md` with template + style guide

**Status:** Not Started

**Depends On:** None

---

### B2: AI Marketing Copy - Sample Outputs (C3)
- [ ] Generate 10 sample outputs using template from B1
- [ ] Validate tone and accuracy for each
- [ ] Ensure no hallucinated facts
- [ ] Verify consistent brand voice
- [ ] Document which A/B variant each sample represents

**Deliverable:** `docs/marketing/sample-outputs.md` with 10 validated samples

**Status:** Not Started

**Depends On:** B1

---

### B3: Question Bank Expansion - Part 1 (C4)
- [ ] Add 10 behavioral questions (STAR format)
- [ ] Add 10 technical questions
- [ ] Include for each: question text, category, difficulty, tags, sample answer, framework, common mistakes, source
- [ ] Tag questions with applicable modules

**Deliverable:** Updated `content/modules/univ-behavioral-001/question_bank.yaml` (35 total questions)

**Status:** Not Started

**Depends On:** None

---

### B4: Question Bank Expansion - Part 2 (C4)
- [ ] Add 5 case study questions
- [ ] Add 5 situational questions
- [ ] Add 5 culture fit questions
- [ ] Add 10 company-specific questions (top 3 target companies)
- [ ] Ensure 50+ total questions reached

**Deliverable:** Complete question bank with 50+ entries (may need new file for company-specific)

**Status:** Not Started

**Depends On:** B3

---

## Phase C: Platform MVP

> **Blocked:** Requires tech stack decision before starting

### Tech Stack Decision (Required)
- [ ] Decide: Next.js / Plain HTML / Other
- [ ] Decide: Hosting platform (Vercel / Netlify / Other)
- [ ] Decide: Database for user data (if any)

---

### C1: Landing Page Template (P1)
- [ ] Create template with dynamic variables (company, role, logo)
- [ ] Include sections: Hero, What You'll Learn, Social Proof, Pricing CTA, FAQ
- [ ] Mobile responsive design
- [ ] SEO meta tags structure
- [ ] Define URL structure (subdomain vs. path)

**Deliverable:** Working landing page template

**Status:** Not Started

**Depends On:** Tech Stack Decision

---

### C2: Deploy Test Positions (P1)
- [ ] Deploy landing page for Position 1
- [ ] Deploy landing page for Position 2
- [ ] Deploy landing page for Position 3
- [ ] Verify mobile responsiveness
- [ ] Test page load speed (<2s on 3G)

**Deliverable:** 3 live landing pages

**Status:** Not Started

**Depends On:** C1

---

### C3: Free Tier Experience (P2)
- [ ] Display 5-10 free questions without login
- [ ] Show question text, category badge, difficulty
- [ ] Implement answer blur/fade behind paywall
- [ ] Add "Unlock full answer" CTA
- [ ] Implement engagement tracking
- [ ] Optional email capture with value prop

**Deliverable:** Free tier functional with analytics

**Status:** Not Started

**Depends On:** C2

---

### C4: Payment Integration (P3)
- [ ] Stripe Checkout integration
- [ ] Configure $197 price point (test mode)
- [ ] Payment flow: select → email → pay → confirm → access
- [ ] Receipt email via Stripe
- [ ] Handle failed payments with retry
- [ ] Store purchase records
- [ ] Display refund policy

**Deliverable:** End-to-end payment flow in test mode

**Status:** Not Started

**Depends On:** C2

---

### C5: Premium Content Delivery (P4)
- [ ] Magic link authentication (no password)
- [ ] Dashboard: purchased position, module list, progress
- [ ] Module view with completion checkboxes
- [ ] Question bank with filters
- [ ] Progress persistence across sessions
- [ ] Indefinite access (no expiration)

**Deliverable:** Authenticated user flow with progress tracking

**Status:** Not Started

**Depends On:** C4

---

## Phase D: Marketing Setup

### D1: Domain Strategy (M2)
- [ ] Evaluate: separate domains vs. subdomains vs. path-based
- [ ] Document pros/cons (SEO, cost, management)
- [ ] Make recommendation
- [ ] Plan for 5 test domains/URLs
- [ ] Define SSL requirements
- [ ] Define redirect logic for future consolidation

**Deliverable:** `docs/marketing/domain-strategy.md`

**Status:** Not Started

**Depends On:** None

---

### D2: Google Ads Campaign Structure (M1)
- [ ] Define campaign structure (1 per industry)
- [ ] Define ad groups (per company/role)
- [ ] List keywords for 5 positions
- [ ] Define negative keywords
- [ ] Create 10 ad copy variations using C3 templates
- [ ] Set UTM parameters
- [ ] Define budget caps
- [ ] Define conversion tracking events

**Deliverable:** `docs/marketing/google-ads-plan.md`

**Status:** Not Started

**Depends On:** B1, B2

---

### D3: Analytics Requirements (M3)
- [ ] Define metrics per position (impressions, clicks, CTR, CPC, conversions, ROAS)
- [ ] Design funnel visualization
- [ ] Define alert thresholds
- [ ] Specify export requirements
- [ ] Choose analytics platform

**Deliverable:** `docs/marketing/analytics-requirements.md`

**Status:** Not Started

**Depends On:** D2

---

## Phase E: Future Enhancements (Deferred)

### E1: Voice Mock Interview Feasibility (F1)
- [ ] Research Sesame.ai capabilities
- [ ] Evaluate alternatives (ElevenLabs, PlayHT, OpenAI)
- [ ] Define MVP voice experience
- [ ] Technical feasibility assessment
- [ ] Cost model per session

**Deliverable:** Feasibility report with recommendation

**Status:** Deferred

**Depends On:** Platform live

---

### E2: Expert Contributor Program (F2)
- [ ] Define contributor profile
- [ ] Design revenue share model
- [ ] Draft contributor agreement
- [ ] Define submission/review workflow
- [ ] Create quality rubric

**Deliverable:** Contributor program one-pager + legal template

**Status:** Deferred

**Depends On:** Content proven

---

## Recommended Execution Order

```
A1 → A2 → B1 → B2 → B3 → B4 → D1 → [Tech Stack Decision] → C1 → C2 → C3 → C4 → C5 → D2 → D3
```

---

## Completed Work (Reference)

The following was completed in previous sessions:

- [x] **R3: Interview Process Mapping** - 10 company/role docs in `docs/interview-processes/`
- [x] **C1: Module Architecture** - Full spec in `docs/architecture/module-architecture.md`
- [x] **C2: Position-Module Matrix** - Complete in `data/position_module_matrix.md`
- [x] **Universal Behavioral Module** - 7 sections in `content/modules/univ-behavioral-001/`
- [x] **Bundle Generator** - TypeScript implementation in `src/bundle-generator.ts`
- [x] **User Stories** - Documented in `docs/USER_STORIES.md`

---

## Session Log

| Date | Chunks Completed | Notes |
|------|------------------|-------|
| 2026-01-17 | - | Created implementation plan |

