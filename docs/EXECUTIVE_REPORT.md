# Interview Prep Website - Executive Report

**Prepared for:** Dave & John
**Date:** January 17, 2026
**Project:** togtog Interview Prep Platform

---

## Executive Summary

We have completed **14 of 17 planned chunks** of work, delivering a functional interview prep website with landing pages, a question bank, a premium dashboard, and comprehensive marketing documentation. The platform is deployed on GitHub Pages and ready for user testing.

### Key Accomplishments

| Category | Deliverables |
|----------|-------------|
| **Research** | Search volume analysis (112 positions), hiring push tracker (25 companies) |
| **Content** | 60 interview questions, module architecture, position-module matrix |
| **Product** | 3 landing pages, free tier with blur, premium dashboard with progress tracking |
| **Marketing** | AI copy templates, domain strategy, Google Ads plan, analytics requirements |

### Current Status

- **Live Site:** https://johnbr0phy.github.io/togtog
- **Dashboard:** https://johnbr0phy.github.io/togtog/dashboard
- **Landing Pages:** Google SWE, Amazon SWE, McKinsey Consultant

### Remaining Work

1. Payment integration (Stripe) - deferred
2. Voice mock interviews - deferred (future feature)
3. Expert contributor program - deferred (future feature)

---

## Part 1: What We Built

### 1.1 Research & Analysis

#### Search Volume Analysis (R1)
**File:** `data/interview_landing_page_analysis.xlsx`

**What it contains:**
- 112 company/role combinations with monthly search volume, CPC, and competition data
- Opportunity score ranking for each position
- Top 50 priority targets with build rationale
- Seasonal patterns (Q1 surge, fall recruiting cycles)

**How to use it:**
1. Sort by "Opportunity Score" to find highest-potential positions
2. Use "Priority Tier" column to decide build order
3. Reference seasonal patterns when planning ad campaigns

**Key insight:** Software engineering roles at FAANG companies have highest volume. McKinsey/BCG consulting roles have highest CPC (most valuable leads).

#### Hiring Push Tracker (R2)
**File:** `data/hiring_push_tracker.md`

**What it contains:**
- 25 companies with known hiring surges
- 8 recurring annual events (new grad cycles, intern conversions)
- Company-specific triggers (earnings, product launches)

**How to use it:**
1. Set calendar reminders for recurring events
2. Increase ad spend 2-3 weeks before known hiring pushes
3. Create position-specific content when companies announce hiring

**Key insight:** Q1 (Jan-Mar) and Q4 (Sep-Nov) are peak hiring seasons. Amazon and Google have predictable August new grad pushes.

---

### 1.2 Content Architecture

#### Module Architecture (C1)
**File:** `docs/architecture/module-architecture.md`

**What it contains:**
- Module schema definition (metadata, content types, questions)
- Difficulty progression framework
- Content type specifications (lessons, exercises, assessments)

**How to use it:**
- Reference when creating new modules
- Ensure all modules follow the schema for consistency
- Use difficulty levels to structure learning paths

#### Position-Module Matrix (C2)
**File:** `data/position_module_matrix.md`

**What it contains:**
- Mapping of which modules apply to which positions
- Company category definitions (FAANG, Consulting, Finance, etc.)
- Role category definitions (SWE, PM, Consulting, etc.)
- Bundle composition rules

**How to use it:**
- Determine which modules to include in each position bundle
- Price bundles based on module count
- Identify cross-selling opportunities

#### Universal Behavioral Module (C4)
**File:** `content/modules/univ-behavioral-001/`

**What it contains:**
- Module metadata and learning objectives
- STAR framework lesson
- 60 interview questions across 6 types:
  - Behavioral (20 questions)
  - Technical/Multiple Choice (10 questions)
  - Case Study (5 questions)
  - Situational (5 questions)
  - Culture Fit (5 questions)
  - Company-Specific (15 questions for Google, Amazon, McKinsey)

**How to use it:**
- This is the core content users will access
- Questions are tagged by company, type, and difficulty
- Can be filtered in the dashboard

---

### 1.3 Marketing Assets

#### AI Copy Templates (C3)
**File:** `docs/marketing/prompt-template.md`

**What it contains:**
- Prompt template for generating landing page copy
- Input variables (company, role, industry, unique elements)
- Output format (headline, subheadline, bullets, CTA, meta description)
- Validation checklist

**How to use it:**
1. Fill in the input variables for a new position
2. Run through Claude or GPT-4
3. Validate output against checklist
4. Customize as needed

#### Sample Marketing Outputs (C3)
**File:** `docs/marketing/sample-outputs.md`

**What it contains:**
- 10 validated marketing copy examples
- Covers: Google, Amazon, McKinsey, Meta, Goldman Sachs, Microsoft, BCG, Apple, Stripe, Deloitte
- Three angles: Expertise, Urgency, Insider Knowledge

**How to use it:**
- Copy/adapt for similar positions
- Reference for tone and messaging consistency
- A/B test different angles

#### Domain Strategy (M2)
**File:** `docs/marketing/domain-strategy.md`

**What it contains:**
- Evaluation of 3 URL strategies (separate domains, subdomains, path-based)
- Recommendation: Path-based (`togtog.com/prep/[slug]`)
- Cost analysis (~$2K/year savings vs separate domains)
- SSL and redirect requirements

**How to use it:**
- Follow path-based strategy for all new positions
- Reference for custom domain setup when ready
- SEO equity consolidation benefits

#### Google Ads Campaign Plan (M1)
**File:** `docs/marketing/google-ads-plan.md`

**What it contains:**
- Campaign structure (5 campaigns by industry)
- Ad groups (15+ by company/role)
- Keywords for 5 positions with CPC estimates
- Negative keywords (account-level and campaign-specific)
- 10 ad copy variations
- UTM parameter structure
- Budget allocation ($5,100/month)
- Conversion tracking setup
- Bid adjustments and CPA targets

**How to use it:**
1. Create Google Ads account
2. Follow campaign structure exactly
3. Import keywords (copy from tables)
4. Set up conversion tracking per instructions
5. Start with 50% budget, scale based on ROAS

**Budget breakdown:**
| Campaign | Monthly Budget |
|----------|---------------|
| Tech-SWE | $1,500 |
| Tech-PM | $900 |
| Consulting | $1,200 |
| Finance-IB | $900 |
| Finance-Quant | $600 |

#### Analytics Requirements (M3)
**File:** `docs/marketing/analytics-requirements.md`

**What it contains:**
- Platform recommendation (GA4 + GTM + Looker Studio)
- Metrics definitions and targets
- 5-stage conversion funnel visualization
- Alert thresholds (critical, warning, opportunity)
- Export/reporting requirements
- Implementation checklist

**How to use it:**
1. Follow implementation checklist to set up GA4
2. Create conversion events per specification
3. Build Looker Studio dashboard using layout provided
4. Configure alerts per thresholds

---

### 1.4 Product (Website)

#### Tech Stack
**Decision:** Next.js + Vercel + Supabase (auth/DB when needed)

**Current deployment:** GitHub Pages (static export)
- Pros: Free, simple, good for MVP testing
- Cons: No server-side features, manual deployment

**Future deployment:** Vercel
- Pros: Automatic deployments, serverless functions, better performance
- When: After validating product-market fit

#### Landing Pages (P1)
**Files:** `web/src/app/prep/[slug]/page.tsx`

**Live URLs:**
- https://johnbr0phy.github.io/togtog/prep/google-software-engineer
- https://johnbr0phy.github.io/togtog/prep/amazon-software-engineer
- https://johnbr0phy.github.io/togtog/prep/mckinsey-consultant

**Components:**
| Section | Purpose |
|---------|---------|
| HeroSection | Headline, subheadline, primary CTA |
| ModulesSection | What's included (module cards) |
| QuestionsSection | Sample questions with blur effect |
| SocialProofSection | Testimonials and stats |
| PricingSection | Price, features, guarantee |
| FAQSection | Common questions |

**How to add new positions:**
1. Add position data to `web/src/data/positions.ts`
2. Add questions to `web/src/data/questions.ts`
3. Run `npm run build` to generate static page
4. Deploy

#### Free Tier Experience (P2)
**Files:**
- `web/src/components/QuestionCard.tsx`
- `web/src/components/QuestionsSection.tsx`

**What it does:**
- Shows 3 sample questions on landing page
- Blurs premium answer content
- "Unlock Full Answer" CTA on blurred content
- Links to dashboard for full access

**How the blur works:**
- `isPremiumAnswer: true` questions show blurred answers
- CSS `blur(8px)` effect with gradient overlay
- Clicking reveals unlock prompt

#### Premium Dashboard (P4)
**File:** `web/src/app/dashboard/page.tsx`

**Live URL:** https://johnbr0phy.github.io/togtog/dashboard

**Features:**
| Feature | Implementation |
|---------|---------------|
| Full question bank | ~30 questions displayed |
| Type filter | All/Behavioral/Technical/Case Study/etc. |
| Difficulty filter | All/Beginner/Intermediate/Advanced |
| Company filter | All/Google/Amazon/McKinsey |
| Progress tracking | Checkboxes to mark complete |
| Progress persistence | localStorage (survives refresh) |
| Progress bar | Visual completion percentage |

**Current state:** Ungated (no login required)
- This is intentional for testing/refinement
- Will add authentication after payment integration

---

## Part 2: How Everything Connects

### User Journey (Current)

```
1. User searches "google software engineer interview prep"
          ↓
2. Sees Google Ad (from google-ads-plan.md)
          ↓
3. Clicks to landing page (/prep/google-software-engineer)
          ↓
4. Sees hero, modules, sample questions (blurred answers)
          ↓
5. Scrolls to pricing section
          ↓
6. Clicks "Try the full dashboard" link
          ↓
7. Accesses dashboard with all questions (currently free)
          ↓
8. [FUTURE] Prompted to pay to unlock
```

### Data Flow

```
Question Bank (YAML)
       ↓
questions.ts (TypeScript)
       ↓
   ┌───┴───┐
   ↓       ↓
Landing  Dashboard
 Page     Page
(blur)   (full)
```

### File Structure

```
togtog/
├── content/
│   └── modules/
│       └── univ-behavioral-001/
│           └── questions/
│               └── question_bank.yaml    ← Master questions
├── data/
│   ├── interview_landing_page_analysis.xlsx
│   ├── hiring_push_tracker.md
│   └── position_module_matrix.md
├── docs/
│   ├── IMPLEMENTATION_PLAN.md           ← Progress tracker
│   ├── USER_STORIES.md
│   ├── architecture/
│   │   └── module-architecture.md
│   └── marketing/
│       ├── prompt-template.md
│       ├── sample-outputs.md
│       ├── domain-strategy.md
│       ├── google-ads-plan.md
│       └── analytics-requirements.md
└── web/
    └── src/
        ├── app/
        │   ├── page.tsx                 ← Homepage
        │   ├── dashboard/
        │   │   └── page.tsx             ← Premium dashboard
        │   └── prep/
        │       └── [slug]/
        │           └── page.tsx         ← Landing pages
        ├── components/
        │   ├── HeroSection.tsx
        │   ├── ModulesSection.tsx
        │   ├── QuestionsSection.tsx
        │   ├── QuestionCard.tsx
        │   ├── SocialProofSection.tsx
        │   ├── PricingSection.tsx
        │   └── FAQSection.tsx
        └── data/
            ├── positions.ts             ← Position definitions
            └── questions.ts             ← Questions for frontend
```

---

## Part 3: What Still Needs Work

### Critical (Before Launch)

#### 1. Payment Integration (Chunk 12)
**Status:** Not started (deferred)

**What's needed:**
- Stripe account setup
- Checkout flow implementation
- Purchase confirmation page
- Access gating on dashboard

**Effort estimate:** 1-2 days of development

**Recommendation:** Do this after validating interest with current ungated version.

#### 2. Authentication
**Status:** Not implemented

**What's needed:**
- Magic link authentication (email-based, no password)
- User session management
- Link purchases to user accounts

**Depends on:** Stripe integration (need to know who paid)

#### 3. More Landing Pages
**Status:** 3 built, need 10-20 for launch

**Priority positions to add:**
1. Meta Software Engineer
2. Microsoft Software Engineer
3. Apple Software Engineer
4. BCG Consultant
5. Bain Consultant
6. Goldman Sachs IB Analyst
7. JP Morgan IB Analyst
8. Google Product Manager
9. Amazon Product Manager
10. Stripe Software Engineer

**Effort:** ~30 min each (mostly data entry)

### Important (Post-Launch)

#### 4. More Questions
**Current:** 60 questions
**Target:** 200+ questions

**Gaps:**
- Technical coding questions (need more)
- System design questions (need dedicated set)
- Company-specific deep dives
- Role-specific variations (PM vs SWE vs Consulting)

#### 5. Analytics Implementation
**Status:** Requirements documented, not implemented

**What's needed:**
- GA4 property creation
- GTM container setup
- Conversion tracking tags
- Looker Studio dashboard

**Effort:** 2-4 hours

#### 6. Custom Domain
**Current:** johnbr0phy.github.io/togtog
**Target:** togtog.com or similar

**What's needed:**
- Purchase domain
- Configure DNS
- Update basePath in next.config.ts
- Set up SSL

### Future Features (Deferred)

#### 7. Voice Mock Interviews (Chunk 16)
**Status:** Research not started

**Concept:** AI-powered voice practice sessions

**Considerations:**
- Sesame.ai, ElevenLabs, or OpenAI Realtime API
- Cost per session could be $0.50-2.00
- Technical complexity is high

**Recommendation:** Validate core product first, add later as premium upsell.

#### 8. Expert Contributor Program (Chunk 17)
**Status:** Not started

**Concept:** Allow industry experts to contribute content for revenue share

**What's needed:**
- Contributor portal
- Content submission workflow
- Review/approval process
- Revenue share tracking

**Recommendation:** Build audience first, add contributors when demand exists.

---

## Part 4: Recommended Next Steps

### Immediate (This Week)

1. **Test the dashboard experience**
   - Go through all questions
   - Check mobile responsiveness
   - Note any UX issues

2. **Add 5 more landing pages**
   - Meta SWE, Microsoft SWE, BCG, Bain, Goldman

3. **Set up basic analytics**
   - Create GA4 property
   - Add tracking snippet
   - Monitor traffic patterns

### Short-term (Next 2 Weeks)

4. **Soft launch to friends/network**
   - Share dashboard link
   - Gather qualitative feedback
   - Identify most-requested features

5. **Run small Google Ads test**
   - $50-100 budget
   - Test one campaign (Tech-SWE)
   - Measure CTR and engagement

### Medium-term (Next Month)

6. **Implement payment if validation positive**
   - Stripe integration
   - Checkout flow
   - Access gating

7. **Expand question bank**
   - Target 150+ questions
   - Add system design category
   - More company-specific content

---

## Part 5: Key Metrics to Track

### Launch Readiness Checklist

| Item | Status | Notes |
|------|--------|-------|
| Landing pages (3+) | ✅ Done | 3 live |
| Question bank (50+) | ✅ Done | 60 questions |
| Dashboard functional | ✅ Done | Ungated |
| Mobile responsive | ✅ Done | Tested |
| Analytics setup | ❌ Pending | Need GA4 |
| Payment integration | ❌ Pending | Chunk 12 |
| Custom domain | ❌ Pending | Using GitHub Pages |

### Success Metrics (First 30 Days)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Landing page visits | 500 | GA4 |
| Dashboard visits | 100 | GA4 |
| Email signups | 50 | (if implemented) |
| Purchases | 10 | Stripe |
| Conversion rate | 2% | Purchases / Visits |

---

## Appendix: Quick Reference

### Key URLs

| Resource | URL |
|----------|-----|
| Live Site | https://johnbr0phy.github.io/togtog |
| Dashboard | https://johnbr0phy.github.io/togtog/dashboard |
| Google SWE | https://johnbr0phy.github.io/togtog/prep/google-software-engineer |
| Amazon SWE | https://johnbr0phy.github.io/togtog/prep/amazon-software-engineer |
| McKinsey | https://johnbr0phy.github.io/togtog/prep/mckinsey-consultant |
| GitHub Repo | https://github.com/johnbr0phy/togtog |

### Key Files

| Purpose | File |
|---------|------|
| Progress tracking | `docs/IMPLEMENTATION_PLAN.md` |
| Add new position | `web/src/data/positions.ts` |
| Add new questions | `web/src/data/questions.ts` |
| Marketing copy | `docs/marketing/sample-outputs.md` |
| Google Ads setup | `docs/marketing/google-ads-plan.md` |
| Analytics setup | `docs/marketing/analytics-requirements.md` |

### Commands

```bash
# Run locally
cd web && npm run dev

# Build for production
cd web && npm run build

# Deploy (merge to main, GitHub Actions handles it)
git checkout main
git merge claude/check-github-tasks-1isvP
git push origin main
```

---

**End of Report**

*Generated by Claude on January 17, 2026*
