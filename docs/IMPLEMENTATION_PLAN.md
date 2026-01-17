# Implementation Plan

> **Last Updated:** 2026-01-17 (Chunks 1-2, 8-10 complete)
>
> Each chunk is a discrete unit of work with a clear deliverable that can be reviewed before moving on.

---

## Progress Overview

| Chunk | Description | Status |
|-------|-------------|--------|
| 1 | Verify Search Volume Analysis (R1) | **Complete** |
| 2 | Hiring Push Identification (R2) | **Complete** |
| 3 | AI Marketing Copy - Prompt Template (C3) | Not Started |
| 4 | AI Marketing Copy - Sample Outputs (C3) | Not Started |
| 5 | Question Bank Expansion - Part 1 (C4) | Not Started |
| 6 | Question Bank Expansion - Part 2 (C4) | Not Started |
| 7 | Domain Strategy (M2) | Not Started |
| 8 | Tech Stack Decision | **Complete** |
| 9 | Landing Page Template (P1) | **Complete** |
| 10 | Deploy Test Positions (P1) | **Complete** |
| 11 | Free Tier Experience (P2) | Not Started |
| 12 | Payment Integration (P3) | Not Started |
| 13 | Premium Content Delivery (P4) | Not Started |
| 14 | Google Ads Campaign Structure (M1) | Not Started |
| 15 | Analytics Requirements (M3) | Not Started |
| 16 | Voice Mock Interview Feasibility (F1) | Deferred |
| 17 | Expert Contributor Program (F2) | Deferred |

---

## Chunk 1: Verify Search Volume Analysis (R1)

- [x] Review `interview_landing_page_analysis.xlsx`
- [x] Confirm 100+ company/role combinations exist (112 found)
- [x] Verify monthly search volume, CPC, competition data present
- [x] Check opportunity score ranking exists
- [x] Confirm top 50 targets identified with rationale
- [x] Document seasonal patterns (Q1 surge, Fall recruiting, etc.)
- [x] Identify and fix any gaps (none found)

**Deliverable:** Verified R1 completion - Excel is complete with all required data

**Status:** **Complete**

**Verification Summary:**
- Sheet 1: 112 company/role combinations with volume, CPC, competition, opportunity score
- Sheet 2: Top 50 targets with priority tiers and build rationale
- Sheet 3: First 10 to build recommendations
- Sheet 4: Seasonal patterns (Q1 surge, summer lull, fall recruiting, industry-specific cycles)
- Sheet 5: Methodology documentation

---

## Chunk 2: Hiring Push Identification (R2)

- [x] Research companies with 1000+ active roles
- [x] Document: company name, role types, geographic focus, timeline, source link
- [x] Cross-reference with R1 search data
- [x] Identify 20+ companies with active pushes (25 tracked)
- [x] Flag recurring annual hiring events (8 recurring cycles)
- [x] Create priority score for each

**Deliverable:** `data/hiring_push_tracker.md`

**Status:** **Complete**

**Summary:**
- 25 companies tracked across 4 priority tiers
- Top tier: Amazon (250K seasonal), Google, Meta, Microsoft, McKinsey
- 8 recurring annual hiring events documented (FAANG new grad, MBB consulting, IB recruiting, etc.)
- Cross-referenced with R1 search data to identify high-value overlaps
- Priority scoring formula: (Hiring Scale × 2) + (R1 Overlap × 3) + (Recurring × 1)

---

## Chunk 3: AI Marketing Copy - Prompt Template (C3)

- [ ] Create prompt template accepting: company name, role title, industry, key challenges
- [ ] Define output format: headline, subheadline, 3 bullets, CTA, meta description
- [ ] Create style guide for brand voice
- [ ] Define quality checklist
- [ ] Document A/B test variants (urgency vs. expertise vs. insider knowledge)

**Deliverable:** `docs/marketing/prompt-template.md`

**Status:** Not Started

---

## Chunk 4: AI Marketing Copy - Sample Outputs (C3)

- [ ] Generate 10 sample outputs using template from Chunk 3
- [ ] Validate tone and accuracy for each
- [ ] Ensure no hallucinated facts
- [ ] Verify consistent brand voice
- [ ] Document which A/B variant each sample represents

**Deliverable:** `docs/marketing/sample-outputs.md`

**Status:** Not Started

**Depends On:** Chunk 3

---

## Chunk 5: Question Bank Expansion - Part 1 (C4)

- [ ] Add 10 behavioral questions (STAR format)
- [ ] Add 10 technical questions
- [ ] Include for each: question text, category, difficulty, tags, sample answer, framework, common mistakes, source
- [ ] Tag questions with applicable modules

**Deliverable:** Updated question bank (35 total questions)

**Status:** Not Started

---

## Chunk 6: Question Bank Expansion - Part 2 (C4)

- [ ] Add 5 case study questions
- [ ] Add 5 situational questions
- [ ] Add 5 culture fit questions
- [ ] Add 10 company-specific questions (top 3 target companies)
- [ ] Ensure 50+ total questions reached

**Deliverable:** Complete question bank with 50+ entries

**Status:** Not Started

**Depends On:** Chunk 5

---

## Chunk 7: Domain Strategy (M2)

- [ ] Evaluate: separate domains vs. subdomains vs. path-based
- [ ] Document pros/cons (SEO, cost, management)
- [ ] Make recommendation
- [ ] Plan for 5 test domains/URLs
- [ ] Define SSL requirements
- [ ] Define redirect logic for future consolidation

**Deliverable:** `docs/marketing/domain-strategy.md`

**Status:** Not Started

---

## Chunk 8: Tech Stack Decision

- [x] Decide: Next.js / Plain HTML / Other → **Next.js**
- [x] Decide: Hosting platform (Vercel / Netlify / Other) → **Vercel**
- [x] Decide: Database for user data (if any) → **Supabase**

**Deliverable:** Decision documented in this file

**Status:** **Complete**

**Tech Stack:**
- **Framework:** Next.js (App Router)
- **Hosting:** Vercel
- **Database:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS

---

## Chunk 9: Landing Page Template (P1)

- [x] Create template with dynamic variables (company, role, logo)
- [x] Include sections: Hero, What You'll Learn, Social Proof, Pricing CTA, FAQ
- [x] Mobile responsive design (Tailwind responsive classes)
- [x] SEO meta tags structure (generateMetadata)
- [x] Define URL structure → Path-based: `/prep/[slug]`

**Deliverable:** Working landing page template

**Status:** **Complete**

**Depends On:** Chunk 8

**Summary:**
- Next.js app created in `/web` directory
- Dynamic route at `/prep/[slug]` for landing pages
- 5 components: HeroSection, ModulesSection, SocialProofSection, PricingSection, FAQSection
- 3 sample positions: Google SWE, Amazon SWE, McKinsey Consultant
- Build successful, static pages pre-rendered

---

## Chunk 10: Deploy Test Positions (P1)

- [x] Deploy landing page for Position 1 (Google SWE)
- [x] Deploy landing page for Position 2 (Amazon SWE)
- [x] Deploy landing page for Position 3 (McKinsey Consultant)
- [x] Verify mobile responsiveness
- [x] Test page load speed (<2s on 3G)

**Deliverable:** 3 live landing pages

**Status:** **Complete**

**Depends On:** Chunk 9

**Live URLs:**
- Home: https://togtog-fblt7hybv-johnbr0phys-projects.vercel.app/
- Google SWE: https://togtog-fblt7hybv-johnbr0phys-projects.vercel.app/prep/google-software-engineer
- Amazon SWE: https://togtog-fblt7hybv-johnbr0phys-projects.vercel.app/prep/amazon-software-engineer
- McKinsey: https://togtog-fblt7hybv-johnbr0phys-projects.vercel.app/prep/mckinsey-consultant

---

## Chunk 11: Free Tier Experience (P2)

- [ ] Display 5-10 free questions without login
- [ ] Show question text, category badge, difficulty
- [ ] Implement answer blur/fade behind paywall
- [ ] Add "Unlock full answer" CTA
- [ ] Implement engagement tracking
- [ ] Optional email capture with value prop

**Deliverable:** Free tier functional with analytics

**Status:** Not Started

**Depends On:** Chunk 10

---

## Chunk 12: Payment Integration (P3)

- [ ] Stripe Checkout integration
- [ ] Configure $197 price point (test mode)
- [ ] Payment flow: select → email → pay → confirm → access
- [ ] Receipt email via Stripe
- [ ] Handle failed payments with retry
- [ ] Store purchase records
- [ ] Display refund policy

**Deliverable:** End-to-end payment flow in test mode

**Status:** Not Started

**Depends On:** Chunk 10

---

## Chunk 13: Premium Content Delivery (P4)

- [ ] Magic link authentication (no password)
- [ ] Dashboard: purchased position, module list, progress
- [ ] Module view with completion checkboxes
- [ ] Question bank with filters
- [ ] Progress persistence across sessions
- [ ] Indefinite access (no expiration)

**Deliverable:** Authenticated user flow with progress tracking

**Status:** Not Started

**Depends On:** Chunk 12

---

## Chunk 14: Google Ads Campaign Structure (M1)

- [ ] Define campaign structure (1 per industry)
- [ ] Define ad groups (per company/role)
- [ ] List keywords for 5 positions
- [ ] Define negative keywords
- [ ] Create 10 ad copy variations using marketing templates
- [ ] Set UTM parameters
- [ ] Define budget caps
- [ ] Define conversion tracking events

**Deliverable:** `docs/marketing/google-ads-plan.md`

**Status:** Not Started

**Depends On:** Chunk 3, Chunk 4

---

## Chunk 15: Analytics Requirements (M3)

- [ ] Define metrics per position (impressions, clicks, CTR, CPC, conversions, ROAS)
- [ ] Design funnel visualization
- [ ] Define alert thresholds
- [ ] Specify export requirements
- [ ] Choose analytics platform

**Deliverable:** `docs/marketing/analytics-requirements.md`

**Status:** Not Started

**Depends On:** Chunk 14

---

## Chunk 16: Voice Mock Interview Feasibility (F1)

- [ ] Research Sesame.ai capabilities
- [ ] Evaluate alternatives (ElevenLabs, PlayHT, OpenAI)
- [ ] Define MVP voice experience
- [ ] Technical feasibility assessment
- [ ] Cost model per session

**Deliverable:** Feasibility report

**Status:** Deferred

---

## Chunk 17: Expert Contributor Program (F2)

- [ ] Define contributor profile
- [ ] Design revenue share model
- [ ] Draft contributor agreement
- [ ] Define submission/review workflow
- [ ] Create quality rubric

**Deliverable:** Contributor program one-pager + legal template

**Status:** Deferred

---

## Completed Work (Reference)

- [x] **R3: Interview Process Mapping** - `docs/interview-processes/`
- [x] **C1: Module Architecture** - `docs/architecture/module-architecture.md`
- [x] **C2: Position-Module Matrix** - `data/position_module_matrix.md`
- [x] **Universal Behavioral Module** - `content/modules/univ-behavioral-001/`
- [x] **Bundle Generator** - `src/bundle-generator.ts`
- [x] **User Stories** - `docs/USER_STORIES.md`

---

## Session Log

| Date | Chunks Completed | Notes |
|------|------------------|-------|
| 2026-01-17 | - | Created implementation plan |
| 2026-01-17 | 1 | Verified R1 Excel - all acceptance criteria met |
| 2026-01-17 | 2 | Created hiring push tracker - 25 companies, 8 recurring events |
| 2026-01-17 | 8, 9 | Tech stack (Next.js/Vercel/Supabase) + Landing page template |
| 2026-01-17 | 10 | Deployed to Vercel - 3 live landing pages |

