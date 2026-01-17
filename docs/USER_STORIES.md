# User Stories: Interview Prep Website

## Epic 1: Research & Validation

### R1: Search Volume Analysis

**As a founder**
I want to identify high-volume company/role search combinations
So that I can prioritize which landing pages to build first

**Acceptance Criteria:**
- Export Google Trends/Keyword Planner data for 100+ combinations of [company name] + [job title] + "interview"
- Include monthly search volume, CPC, and competition level for each
- Rank combinations by opportunity score (volume x CPC / competition)
- Identify top 50 targets with rationale
- Document seasonal patterns (e.g., college hiring cycles, Q1 budget releases)
- Output: Spreadsheet with prioritized list and recommendation for first 10 to build

---

### R2: Hiring Push Identification

**As a founder**
I want to identify companies with active hiring pushes
So that I can target high-demand opportunities

**Acceptance Criteria:**
- Research current large-scale hiring initiatives (1000+ roles)
- Include company name, role types, geographic focus, timeline, and source link
- Cross-reference with R1 search data to find overlap
- Identify 20+ companies with active pushes
- Flag recurring annual hiring events (e.g., Big 4 accounting fall recruiting, FAANG new grad cycles)
- Output: Tracker with company, role count, timeline, and priority score

---

### R3: Interview Process Mapping

**As a founder**
I want to understand interview processes for top target companies
So that I can create accurate prep content

**Acceptance Criteria:**
- Document full interview pipeline for top 10 company/role combinations from R1
- For each, capture:
  - Number of rounds
  - Format per round (phone/video/onsite)
  - Duration
  - Interviewers (HR/hiring manager/panel)
  - Assessment types (behavioral/technical/case/practical)
- Note any unique elements (e.g., Amazon's Leadership Principles, Google's Googliness)
- Include sources (Glassdoor, Blind, official career pages, Reddit)
- Confidence rating per data point (verified/likely/unverified)
- Output: Structured document per company/role with interview flow diagram

---

## Epic 2: Content System

### C1: Module Architecture

**As a content creator**
I want to build reusable modules
So that content scales efficiently across positions

**Acceptance Criteria:**
- Define module types: Universal, Company-specific, Industry-specific, Role-specific
- Create module template with:
  - Title
  - Description
  - Target audience tags
  - Estimated completion time
  - Content sections
  - Question bank reference
- Establish tagging taxonomy (company, industry, role family, skill type)
- Define module dependency rules (e.g., "Complete Universal Behavioral before Company Culture")
- Specify content format standards (text, video placeholder, interactive elements)
- Output: Module template document + sample module for "Universal Behavioral Interview Prep"

---

### C2: Position-Module Matrix

**As a content creator**
I want to map modules to specific company/role combinations
So that users get relevant bundles

**Acceptance Criteria:**
- Create mapping structure: Position = Company + Role + Level (e.g., Google + PM + Senior)
- Map which modules apply to each position with priority order
- Sample mappings for 10 positions across different companies/roles
- Calculate content coverage: % of position prep covered by existing modules
- Identify gaps requiring new module creation
- Define rules engine logic for auto-generating bundles from tags
- Output: Matrix spreadsheet + bundle generation logic spec

---

### C3: AI Marketing Copy Generation

**As a founder**
I want to generate AI marketing copy per landing page
So that we can scale to thousands of variations

**Acceptance Criteria:**
- Create prompt template that accepts: company name, role title, industry, key interview challenges
- Output includes:
  - Headline (under 60 chars)
  - Subheadline
  - 3 bullet points
  - CTA text
  - Meta description
- Generate 10 sample outputs and validate tone/accuracy
- A/B test copy variants defined (urgency vs. expertise vs. insider knowledge angles)
- Quality checklist: no hallucinated facts, consistent brand voice, passes plagiarism check
- Output: Prompt template + 10 validated samples + style guide

---

### C4: Question Bank

**As a user**
I want to access practice questions with answers
So that I can test my knowledge

**Acceptance Criteria:**
- Define question schema:
  - Question text
  - Category
  - Difficulty (1-3)
  - Company tags
  - Role tags
  - Sample answer
  - Answer framework
  - Common mistakes
  - Source
- Create 50+ seed questions across categories: behavioral (STAR), technical, case study, situational, culture fit
- Include 10 company-specific questions for top 3 target companies
- Sample answers follow framework (e.g., STAR for behavioral, structured approach for case)
- Tag each question with applicable modules
- Output: Question bank in structured format (JSON/spreadsheet) + 50 populated entries

---

## Epic 3: Platform MVP

### P1: Dynamic Landing Pages

**As a user**
I want to land on a page specific to my company/role
So that I feel the content is tailored to me

**Acceptance Criteria:**
- Template renders with dynamic variables: company name, role title, company logo, industry-specific imagery
- Sections:
  - Hero with headline/subhead
  - "What you'll learn" (pulled from module descriptions)
  - Social proof placeholder
  - Pricing CTA
  - FAQ
- Mobile responsive (test on iOS Safari, Android Chrome)
- Page load under 2 seconds on 3G
- SEO meta tags dynamically populated
- URL structure defined: subdomain (spotify.interviewprep.com) vs. path (/prep/spotify-pm)
- Output: Working template deployed for 3 test positions

---

### P2: Free Tier Experience

**As a user**
I want to access free sample questions
So that I can evaluate the product before paying

**Acceptance Criteria:**
- Display 5-10 free questions per position without login
- Questions shown with: question text, category badge, difficulty indicator
- Answers hidden behind paywall with blur/fade preview
- "Unlock full answer" CTA on each question
- Track engagement: questions viewed, unlock attempts, scroll depth
- Email capture optional (not gated) with value prop: "Get 3 bonus questions free"
- Output: Free tier functional with analytics events firing

---

### P3: Payment Integration

**As a user**
I want to pay a one-time fee to unlock premium content
So that I get full access

**Acceptance Criteria:**
- Stripe Checkout integration for one-time payment
- Price point: $197 (test) with ability to configure per position
- Payment flow: select position, enter email, pay, receive confirmation, immediate access
- Receipt email sent via Stripe with access instructions
- Handle failed payments gracefully with retry option
- Store purchase record: email, position purchased, timestamp, Stripe transaction ID
- Refund policy displayed before checkout (7-day money-back)
- Output: End-to-end payment flow working in test mode

---

### P4: Premium Content Delivery

**As a paying user**
I want to access all relevant modules for my target position
So that I can prepare comprehensively

**Acceptance Criteria:**
- Authenticated access via magic link (no password)
- Dashboard shows:
  - Purchased position
  - Module list with progress
  - Question bank access
- Module view: content sections with completion checkboxes, estimated time remaining
- Question bank: filter by category/difficulty, mark questions as "practiced", track score on self-assessment
- Progress persists across sessions
- Access valid indefinitely (no expiration)
- Output: Authenticated user flow with progress tracking functional

---

## Epic 4: Marketing & Acquisition

### M1: Google Ads Campaign

**As a founder**
I want to run Google Ads for specific company/role keywords
So that I can drive targeted traffic

**Acceptance Criteria:**
- Campaign structure: 1 campaign per industry, ad groups per company/role combo
- 10 test ad variations live across 5 positions
- Keywords include:
  - "[company] interview prep"
  - "how to pass [company] interview"
  - "[company] [role] interview questions"
- Negative keywords defined (free, reddit, glassdoor)
- Ad copy follows template from C3 with UTM parameters
- Daily budget cap set ($50/day for test phase)
- Conversion tracking: landing page visit, free question view, payment initiated, payment complete
- Output: Live campaigns with tracking verified

---

### M2: Domain Strategy

**As a founder**
I want to create memorable URLs per position
So that ads feel hyper-relevant and memorable

**Acceptance Criteria:**
- Evaluate options: separate domains vs. subdomains vs. path-based
- Recommendation with pros/cons (SEO, cost, management overhead)
- Register 5 test domains for top positions (if domain strategy chosen)
- SSL configured on all domains
- Redirect logic defined for consolidation later if needed
- Output: Domain strategy doc + 5 working URLs

---

### M3: Performance Analytics

**As a founder**
I want to track ad performance by position
So that I can optimize spend

**Acceptance Criteria:**
- Dashboard shows per position:
  - Impressions
  - Clicks
  - CTR
  - CPC
  - Landing page views
  - Free question views
  - Payment conversions
  - Revenue
  - ROAS
- Funnel visualization: ad click > landing > free engagement > payment
- Daily/weekly trend views
- Alerts for: CPC exceeding threshold, conversion rate drop >20%
- Export capability for deeper analysis
- Output: Analytics dashboard functional with 7 days test data

---

## Epic 5: Future Enhancements

### F1: Voice Mock Interview

**As a user**
I want to practice with voice-based mock interviews
So that I can simulate real interviews

**Acceptance Criteria:**
- Research Sesame.ai capabilities: latency, voice quality, conversation flow, pricing
- Evaluate alternatives (ElevenLabs, PlayHT, OpenAI voice)
- Define MVP voice experience: AI asks question, user responds verbally, AI provides feedback
- Technical feasibility assessment: browser support, mobile support, recording/playback
- Cost model per mock interview session
- Output: Feasibility report with recommendation and cost projection

---

### F2: Expert Contributor Program

**As a founder**
I want to onboard industry experts to create specialized modules
So that content has credibility

**Acceptance Criteria:**
- Define contributor profile: current/former employees at target companies, recruiters, career coaches
- Revenue share model: flat fee per module vs. royalty on sales
- Contributor agreement covering:
  - IP ownership
  - Exclusivity
  - Quality standards
  - Revision rights
- Submission and review workflow defined
- Quality rubric for accepting/rejecting modules
- Output: Contributor program one-pager + legal agreement template
