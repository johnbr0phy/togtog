# Implementation Plan

> **Last Updated:** 2026-01-17 (Chunks 1-11, 13-15 complete)
>
> Each chunk is a discrete unit of work with a clear deliverable that can be reviewed before moving on.

---

## Progress Overview

| Chunk | Description | Status |
|-------|-------------|--------|
| 1 | Verify Search Volume Analysis (R1) | **Complete** |
| 2 | Hiring Push Identification (R2) | **Complete** |
| 3 | AI Marketing Copy - Prompt Template (C3) | **Complete** |
| 4 | AI Marketing Copy - Sample Outputs (C3) | **Complete** |
| 5 | Question Bank Expansion - Part 1 (C4) | **Complete** |
| 6 | Question Bank Expansion - Part 2 (C4) | **Complete** |
| 7 | Domain Strategy (M2) | **Complete** |
| 8 | Tech Stack Decision | **Complete** |
| 9 | Landing Page Template (P1) | **Complete** |
| 10 | Deploy Test Positions (P1) | **Complete** |
| 11 | Free Tier Experience (P2) | **Complete** |
| 12 | Payment Integration (P3) | Not Started |
| 13 | Premium Content Delivery (P4) | **Complete** |
| 14 | Google Ads Campaign Structure (M1) | **Complete** |
| 15 | Analytics Requirements (M3) | **Complete** |
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

- [x] Create prompt template accepting: company name, role title, industry, key challenges
- [x] Define output format: headline, subheadline, 3 bullets, CTA, meta description
- [x] Create style guide for brand voice
- [x] Define quality checklist
- [x] Document A/B test variants (urgency vs. expertise vs. insider knowledge)

**Deliverable:** `docs/marketing/prompt-template.md`

**Status:** **Complete**

**Summary:**
- Master prompt template with 7 input variables
- 3 A/B test variants: Urgency, Expertise, Insider Knowledge
- Complete style guide with do/don't examples
- Quality checklist covering accuracy, brand, technical, legal, SEO
- 3 example outputs (Google SWE, McKinsey, Amazon SWE)

---

## Chunk 4: AI Marketing Copy - Sample Outputs (C3)

- [x] Generate 10 sample outputs using template from Chunk 3
- [x] Validate tone and accuracy for each
- [x] Ensure no hallucinated facts
- [x] Verify consistent brand voice
- [x] Document which A/B variant each sample represents

**Deliverable:** `docs/marketing/sample-outputs.md`

**Status:** **Complete**

**Depends On:** Chunk 3

**Summary:**
- 10 validated samples: Google, Amazon, McKinsey, Meta, Goldman, Microsoft, BCG, Apple, Stripe, Deloitte
- A/B variant distribution: 4 Expertise, 3 Urgency, 3 Insider Knowledge
- All passed quality checklist (character limits, accuracy, brand voice)

---

## Chunk 5: Question Bank Expansion - Part 1 (C4)

- [x] Add 10 behavioral questions (STAR format)
- [x] Add 10 technical questions
- [x] Include for each: question text, category, difficulty, tags, sample answer, framework, common mistakes, source
- [x] Tag questions with applicable modules

**Deliverable:** Updated question bank (35 total questions)

**Status:** **Complete**

**Summary:**
- Added 10 behavioral questions (decision-making, going above & beyond, feedback, stakeholders, learning, prioritization, problem identification, mentoring, pushing back, adapting to change)
- Added 10 technical questions (hash tables, stacks, processes/threads, DB indexes, REST APIs, load balancers, SQL/NoSQL, Big O, deadlocks, caching)
- All questions include full metadata, sample answers, and evaluation criteria

---

## Chunk 6: Question Bank Expansion - Part 2 (C4)

- [x] Add 5 case study questions
- [x] Add 5 situational questions
- [x] Add 5 culture fit questions
- [x] Add 10 company-specific questions (top 3 target companies)
- [x] Ensure 50+ total questions reached (60 total)

**Deliverable:** Complete question bank with 50+ entries

**Status:** **Complete**

**Depends On:** Chunk 5

**Summary:**
- 5 case study questions (retail, airlines, streaming, pharma, system design)
- 5 situational questions (incident response, disagreement, credit-taking, missed deadline, process change)
- 5 culture fit questions (work environment, stress, motivation, team values, 5-year goals)
- 10 company-specific questions:
  - Google (3): data-driven decisions, decisions under uncertainty, pride in building
  - Amazon (4): Invent & Simplify, Ownership, Have Backbone, Deliver Results
  - McKinsey (3): Leadership, Personal Impact, Entrepreneurial Drive (PEI format)
- **Total questions: 60** (exceeds 50+ target)

---

## Chunk 7: Domain Strategy (M2)

- [x] Evaluate: separate domains vs. subdomains vs. path-based
- [x] Document pros/cons (SEO, cost, management)
- [x] Make recommendation
- [x] Plan for 5 test domains/URLs
- [x] Define SSL requirements
- [x] Define redirect logic for future consolidation

**Deliverable:** `docs/marketing/domain-strategy.md`

**Status:** **Complete**

**Summary:**
- Evaluated 3 options: separate domains, subdomains, path-based
- **Recommendation: Path-based** (`togtog.com/prep/[slug]`) - best SEO equity, lowest cost, simplest management
- Cost analysis: Path-based saves ~$2,000/year vs separate domains
- 5 test URLs documented (3 live, 2 planned)
- SSL handled by Vercel (automatic), HSTS configuration provided
- Redirect strategy defined for company rebrands, URL restructures, position consolidation

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

- [x] Display 5-10 free questions without login
- [x] Show question text, category badge, difficulty
- [x] Implement answer blur/fade behind paywall
- [x] Add "Unlock full answer" CTA
- [x] Implement engagement tracking (basic - expand/collapse)
- [x] Optional email capture with value prop (CTA for free PDF)

**Deliverable:** Free tier functional with analytics

**Status:** **Complete**

**Depends On:** Chunk 10

**Summary:**
- Created Question type definitions and sample questions data (10 questions from question bank)
- Built QuestionCard component with:
  - Question type badges (Behavioral, Technical, Case Study, Situational, Culture Fit)
  - Difficulty badges (Beginner, Intermediate, Advanced)
  - Estimated time display
  - Expandable answer section
  - Blur effect for premium answers with unlock CTA overlay
- Built QuestionsSection component with:
  - Filter tabs by question type
  - Show more/less functionality
  - Unlock CTA banner with email capture option
  - Question stats display
- Integrated into landing pages (Google, Amazon, McKinsey)
- Build verified successful

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

- [ ] Magic link authentication (no password) - *Deferred until Chunk 12*
- [x] Dashboard: question bank view with progress
- [x] Module view with completion checkboxes
- [x] Question bank with filters (type, difficulty, company)
- [x] Progress persistence across sessions (localStorage)
- [x] Indefinite access (no expiration)

**Deliverable:** Dashboard with progress tracking (ungated for refinement)

**Status:** **Complete** (ungated per user request)

**Depends On:** Chunk 12 (auth deferred)

**Summary:**
- Created `/dashboard` page with full question bank view
- Three filter dropdowns: Question Type, Difficulty, Company
- Progress tracking with completion checkboxes
- localStorage persistence for completed questions
- Progress bar showing completion percentage
- ~30 questions populated from question bank
- QuestionsSection links to dashboard for full access
- Authentication deferred until payment integration (Chunk 12)

---

## Chunk 14: Google Ads Campaign Structure (M1)

- [x] Define campaign structure (1 per industry)
- [x] Define ad groups (per company/role)
- [x] List keywords for 5 positions
- [x] Define negative keywords
- [x] Create 10 ad copy variations using marketing templates
- [x] Set UTM parameters
- [x] Define budget caps
- [x] Define conversion tracking events

**Deliverable:** `docs/marketing/google-ads-plan.md`

**Status:** **Complete**

**Depends On:** Chunk 3, Chunk 4

**Summary:**
- 5 campaigns by industry (Tech-SWE, Tech-PM, Consulting, Finance-IB, Finance-Quant)
- 15+ ad groups by company/role
- Keywords for Google, Amazon, McKinsey, Goldman Sachs, Meta
- Account-level + campaign-specific negative keywords
- 10 ad copy variations (2 per position)
- UTM structure with dynamic parameters
- $5,100/month budget with CPA targets
- Conversion tracking events (purchase, add to cart, view pricing)

---

## Chunk 15: Analytics Requirements (M3)

- [x] Define metrics per position (impressions, clicks, CTR, CPC, conversions, ROAS)
- [x] Design funnel visualization
- [x] Define alert thresholds
- [x] Specify export requirements
- [x] Choose analytics platform

**Deliverable:** `docs/marketing/analytics-requirements.md`

**Status:** **Complete**

**Depends On:** Chunk 14

**Summary:**
- Platform: GA4 + Google Ads + GTM + Looker Studio (free stack)
- Metrics: 12 core marketing metrics + 7 micro-conversion events
- 5-stage conversion funnel with drop-off targets
- Alert system: Critical (immediate), Warning (daily), Opportunity (weekly)
- Export: Daily email, weekly PDF, monthly deep dive
- KPI dashboard layout with status indicators

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
| 2026-01-17 | 3 | Marketing copy prompt template + style guide + A/B variants |
| 2026-01-17 | 4 | Generated 10 validated sample outputs for landing pages |
| 2026-01-17 | 5 | Added 20 questions (10 behavioral, 10 technical) - now 35 total |
| 2026-01-17 | 6 | Added 25 questions (5 case, 5 situational, 5 culture, 10 company-specific) - now 60 total |
| 2026-01-17 | 7 | Domain strategy - path-based recommended, SSL/redirect requirements defined |
| 2026-01-17 | 11 | Free tier experience - questions displayed with blur effect, unlock CTAs |
| 2026-01-17 | 13 | Premium dashboard - question bank, filters, progress tracking (ungated) |
| 2026-01-17 | 14 | Google Ads campaign structure - 5 campaigns, keywords, ad copy, UTMs |
| 2026-01-17 | 15 | Analytics requirements - GA4 stack, funnel, alerts, exports |

