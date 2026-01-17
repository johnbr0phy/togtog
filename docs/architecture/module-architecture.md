# Module Architecture Specification

## Overview

This document defines the modular content architecture for the togtog interview preparation platform. The architecture enables efficient content scaling through reusable, composable modules that can be combined to create targeted interview preparation experiences.

---

## 1. Module Type Definitions

### 1.1 Universal Modules

**Definition:** Core interview preparation content applicable across all companies, industries, and roles.

**Characteristics:**
- Company-agnostic content
- Foundational skills and knowledge
- Highest reusability (100% of users)
- Updated infrequently (quarterly review)

**Examples:**
- Behavioral Interview Fundamentals (STAR Method)
- Communication Skills for Interviews
- Interview Logistics & Etiquette
- Salary Negotiation Basics
- Resume & LinkedIn Optimization

**Use Cases:**
- Entry point for all new users
- Prerequisite for specialized modules
- Standalone refresher content

---

### 1.2 Company-Specific Modules

**Definition:** Content tailored to a specific company's interview process, culture, and expectations.

**Characteristics:**
- Single company focus
- Includes company-specific question patterns
- Culture and values alignment
- Process-specific preparation (interview stages, timelines)
- Updated frequently (monthly review for Tier 1 companies)

**Examples:**
- Google Software Engineer Interview Prep
- Amazon Leadership Principles Deep Dive
- Meta System Design Interview
- McKinsey Case Interview Framework
- Apple Design Interview Process

**Priority Tiers (from R1/R2 research):**
| Tier | Search Volume | Companies |
|------|---------------|-----------|
| 1 | ≥20K/month | Google, Amazon, Meta, Microsoft, Apple |
| 2 | ≥8K/month | NVIDIA, Goldman Sachs, JPMorgan, Netflix |
| 3 | ≥3K/month | Salesforce, Uber, Airbnb, Stripe |
| 4 | <3K/month | All others |

---

### 1.3 Industry-Specific Modules

**Definition:** Content addressing interview patterns and expectations unique to specific industries.

**Characteristics:**
- Covers multiple companies within an industry
- Industry-specific terminology and concepts
- Regulatory/compliance awareness where applicable
- Domain knowledge requirements

**Industry Categories:**
| Industry | Key Focus Areas |
|----------|-----------------|
| Big Tech | Scale, system design, coding excellence |
| Finance/Banking | Risk, compliance, quantitative skills |
| Consulting | Case studies, frameworks, client management |
| Defense/Government | Clearance, structured processes, mission focus |
| Healthcare Tech | HIPAA, patient safety, interoperability |
| AI/ML Startups | Research depth, rapid iteration, ambiguity tolerance |
| E-commerce | Conversion, logistics, customer obsession |

**Examples:**
- Investment Banking Technical Interview Prep
- Management Consulting Case Frameworks
- Defense Contractor Clearance & Interview Process
- Healthcare Tech Compliance Awareness

---

### 1.4 Role-Specific Modules

**Definition:** Content tailored to specific job functions regardless of company or industry.

**Characteristics:**
- Function-focused (engineering, product, design, etc.)
- Skill-level variants (junior, mid, senior, staff)
- Technical depth appropriate to role
- Cross-company applicability within role family

**Role Families:**
| Role Family | Sub-Roles |
|-------------|-----------|
| Software Engineering | Frontend, Backend, Full-Stack, Mobile, Embedded |
| Infrastructure | SRE, DevOps, Platform, Cloud |
| Data | Data Engineer, Data Scientist, ML Engineer, Analytics |
| Product | Product Manager, Technical PM, Product Designer |
| Design | UX Designer, UI Designer, UX Researcher |
| Leadership | Engineering Manager, Director, VP |
| Security | Security Engineer, AppSec, InfoSec |

**Examples:**
- System Design for Senior Engineers
- Product Sense for PM Interviews
- Machine Learning System Design
- Frontend Performance Deep Dive
- Engineering Manager Leadership Scenarios

---

## 2. Module Template Specification

### 2.1 Core Template Structure

```yaml
module:
  # === METADATA ===
  id: string                    # Unique identifier (e.g., "univ-behavioral-001")
  version: string               # Semantic version (e.g., "1.0.0")
  created_at: datetime
  updated_at: datetime
  author: string
  status: enum                  # draft | review | published | archived

  # === CLASSIFICATION ===
  type: enum                    # universal | company | industry | role
  title: string                 # Display title (max 80 chars)
  slug: string                  # URL-friendly identifier
  description: string           # Summary (max 300 chars)
  long_description: string      # Detailed description (max 1000 chars)

  # === TARGET AUDIENCE ===
  audience:
    companies: string[]         # Empty for universal/industry/role modules
    industries: string[]        # Empty for universal/company modules
    role_families: string[]     # Empty for universal modules
    roles: string[]             # Specific roles within families
    experience_levels: enum[]   # entry | mid | senior | staff | principal | executive
    skill_prerequisites: string[]

  # === TIMING ===
  timing:
    estimated_completion_minutes: integer
    recommended_pace: enum      # self_paced | daily | intensive
    validity_period_days: integer  # How long content stays relevant

  # === CONTENT STRUCTURE ===
  sections: Section[]           # Ordered list of content sections

  # === ASSESSMENT ===
  question_bank_refs: string[]  # References to question bank IDs
  assessment:
    pre_assessment_id: string   # Optional diagnostic
    post_assessment_id: string  # Mastery check
    passing_threshold: float    # 0.0 - 1.0

  # === RELATIONSHIPS ===
  dependencies:
    required: string[]          # Must complete before this module
    recommended: string[]       # Suggested prior modules
    unlocks: string[]           # Modules this enables

  # === TAGS ===
  tags:
    companies: string[]
    industries: string[]
    role_families: string[]
    skill_types: string[]
    interview_types: string[]
    difficulty: enum            # beginner | intermediate | advanced | expert
    content_format: string[]    # text | video | interactive | practice

  # === SEO & DISCOVERY ===
  seo:
    primary_keyword: string
    secondary_keywords: string[]
    meta_description: string
    search_volume_tier: enum    # tier_1 | tier_2 | tier_3 | tier_4
```

### 2.2 Section Structure

```yaml
Section:
  id: string
  title: string
  type: enum                    # lesson | practice | assessment | resource
  order: integer
  estimated_minutes: integer

  # Content can be one of several formats
  content:
    format: enum                # text | video | interactive | mixed

    # For text content
    text:
      body: markdown
      key_takeaways: string[]

    # For video content
    video:
      url: string
      duration_seconds: integer
      transcript: string
      chapters: VideoChapter[]

    # For interactive content
    interactive:
      type: enum                # quiz | coding | simulation | flashcard
      config: object            # Type-specific configuration

  # Section-level questions
  practice_questions: string[]  # Question bank references

  # Progress tracking
  completion_criteria:
    type: enum                  # view | time_spent | quiz_score | exercise_complete
    threshold: number
```

### 2.3 Video Chapter Structure

```yaml
VideoChapter:
  title: string
  start_seconds: integer
  end_seconds: integer
  summary: string
```

---

## 3. Tagging Taxonomy

### 3.1 Company Tags

**Format:** `company:{company_slug}`

**Tier 1 Companies (Priority):**
```
company:google
company:amazon
company:meta
company:microsoft
company:apple
company:nvidia
company:anthropic
company:openai
```

**Tier 2 Companies:**
```
company:netflix
company:goldman-sachs
company:jpmorgan
company:morgan-stanley
company:mckinsey
company:bcg
company:bain
company:deloitte
```

**Tier 3+ Companies:**
```
company:salesforce
company:uber
company:airbnb
company:stripe
company:databricks
company:snowflake
company:palantir
company:lockheed-martin
company:raytheon
company:northrop-grumman
```

---

### 3.2 Industry Tags

**Format:** `industry:{industry_slug}`

```
industry:big-tech
industry:finance-banking
industry:investment-banking
industry:management-consulting
industry:defense-aerospace
industry:healthcare-tech
industry:ai-ml-startups
industry:e-commerce
industry:fintech
industry:enterprise-saas
industry:gaming
industry:government-federal
industry:automotive-tech
industry:cybersecurity
```

---

### 3.3 Role Family Tags

**Format:** `role:{role_slug}`

**Engineering Roles:**
```
role:software-engineer
role:frontend-engineer
role:backend-engineer
role:fullstack-engineer
role:mobile-engineer
role:embedded-engineer
role:sre
role:devops-engineer
role:platform-engineer
role:data-engineer
role:ml-engineer
role:security-engineer
```

**Data & Analytics Roles:**
```
role:data-scientist
role:data-analyst
role:analytics-engineer
role:research-scientist
role:applied-scientist
```

**Product & Design Roles:**
```
role:product-manager
role:technical-pm
role:product-designer
role:ux-designer
role:ux-researcher
```

**Leadership Roles:**
```
role:engineering-manager
role:tech-lead
role:staff-engineer
role:principal-engineer
role:director-engineering
role:vp-engineering
role:cto
```

---

### 3.4 Skill Type Tags

**Format:** `skill:{skill_slug}`

**Technical Skills:**
```
skill:algorithms
skill:data-structures
skill:system-design
skill:object-oriented-design
skill:api-design
skill:database-design
skill:distributed-systems
skill:concurrency
skill:performance-optimization
skill:testing
skill:debugging
```

**Domain Skills:**
```
skill:machine-learning
skill:deep-learning
skill:nlp
skill:computer-vision
skill:data-modeling
skill:etl-pipelines
skill:cloud-architecture
skill:kubernetes
skill:security-architecture
```

**Soft Skills:**
```
skill:communication
skill:leadership
skill:problem-solving
skill:collaboration
skill:conflict-resolution
skill:stakeholder-management
skill:project-management
skill:mentoring
```

---

### 3.5 Interview Type Tags

**Format:** `interview:{type_slug}`

```
interview:behavioral
interview:technical-screen
interview:coding
interview:system-design
interview:object-oriented-design
interview:case-study
interview:product-sense
interview:estimation
interview:culture-fit
interview:hiring-manager
interview:cross-functional
interview:presentation
interview:take-home
interview:pair-programming
interview:whiteboard
interview:live-coding
```

---

### 3.6 Difficulty Tags

**Format:** `difficulty:{level}`

```
difficulty:beginner       # New to interviews, 0-2 years experience
difficulty:intermediate   # Some interview experience, 2-5 years
difficulty:advanced       # Experienced, targeting senior roles, 5-10 years
difficulty:expert         # Staff+ level, 10+ years
```

---

### 3.7 Content Format Tags

**Format:** `format:{type}`

```
format:text              # Written lessons and guides
format:video             # Video content (placeholder for future)
format:interactive       # Quizzes, simulations, exercises
format:practice          # Practice questions and problems
format:flashcard         # Spaced repetition cards
format:checklist         # Actionable checklists
format:template          # Reusable templates (STAR stories, etc.)
```

---

## 4. Module Dependency Rules

### 4.1 Dependency Types

| Type | Description | Enforcement |
|------|-------------|-------------|
| **Required** | Must complete before accessing | Hard block |
| **Recommended** | Suggested for best experience | Soft warning |
| **Unlocks** | Completing this enables others | Automatic |
| **Co-requisite** | Should be taken together | Suggested pairing |

### 4.2 Dependency Rules

#### Rule 1: Universal Foundation First
```
All company/industry/role modules SHOULD have at least one
universal module as a recommended dependency.
```

**Rationale:** Ensures users have foundational skills before specializing.

**Example:**
```yaml
# Google SWE Interview module
dependencies:
  recommended:
    - univ-behavioral-001      # Universal Behavioral Prep
    - univ-communication-001   # Interview Communication
```

#### Rule 2: Experience Level Progression
```
Advanced/Expert modules MUST require completion of
intermediate modules in the same skill area.
```

**Example:**
```yaml
# System Design - Advanced
dependencies:
  required:
    - role-sysdesign-intermediate-001
  recommended:
    - role-sysdesign-beginner-001
```

#### Rule 3: No Circular Dependencies
```
Module A cannot depend on Module B if Module B
depends on Module A (directly or transitively).
```

**Enforcement:** Automated validation during module creation.

#### Rule 4: Company Modules Build on Role Modules
```
Company-specific technical modules SHOULD recommend
the corresponding role-specific module.
```

**Example:**
```yaml
# Amazon System Design Interview
dependencies:
  recommended:
    - role-sysdesign-advanced-001    # Generic System Design
    - company-amazon-lp-001          # Amazon Leadership Principles
```

#### Rule 5: Cross-Module Skill Building
```
Modules covering advanced topics SHOULD unlock
related modules that build on those skills.
```

**Example:**
```yaml
# Distributed Systems Fundamentals
dependencies:
  unlocks:
    - role-sysdesign-advanced-001
    - company-google-sysdesign-001
    - company-meta-sysdesign-001
```

### 4.3 Dependency Graph Visualization

```
                    ┌─────────────────────────────┐
                    │     UNIVERSAL MODULES       │
                    │  (Foundation Layer)         │
                    └──────────────┬──────────────┘
                                   │
           ┌───────────────────────┼───────────────────────┐
           │                       │                       │
           ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  ROLE-SPECIFIC  │    │INDUSTRY-SPECIFIC│    │ COMPANY-SPECIFIC│
│    MODULES      │    │    MODULES      │    │    MODULES      │
│  (Skill Layer)  │    │ (Context Layer) │    │ (Target Layer)  │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
                    ┌─────────────────────────────┐
                    │   COMBINED PREP PATHS       │
                    │  (User Learning Journeys)   │
                    └─────────────────────────────┘
```

### 4.4 Recommended Learning Paths

**Path 1: New Grad Software Engineer → Big Tech**
```
1. univ-behavioral-001 (Universal Behavioral)
2. univ-communication-001 (Communication Skills)
3. role-coding-beginner-001 (Coding Interview Basics)
4. role-coding-intermediate-001 (Coding Patterns)
5. role-sysdesign-beginner-001 (System Design Intro)
6. company-{target}-swe-001 (Company-Specific)
```

**Path 2: Senior Engineer → FAANG System Design**
```
1. univ-behavioral-001 (Universal Behavioral)
2. role-sysdesign-intermediate-001 (System Design Core)
3. role-sysdesign-advanced-001 (Advanced System Design)
4. company-{target}-sysdesign-001 (Company-Specific)
```

**Path 3: Consultant → Big Tech PM**
```
1. univ-behavioral-001 (Universal Behavioral)
2. industry-consulting-transition-001 (Consulting to Tech)
3. role-pm-fundamentals-001 (PM Interview Basics)
4. role-pm-product-sense-001 (Product Sense)
5. company-{target}-pm-001 (Company-Specific)
```

---

## 5. Content Format Standards

### 5.1 Text Content Standards

#### Formatting Guidelines
- **Markdown:** All text content uses GitHub-flavored Markdown
- **Heading Hierarchy:** H1 for module title only; sections start at H2
- **Code Blocks:** Use fenced code blocks with language specification
- **Lists:** Use bullet points for unordered items; numbers for sequences
- **Emphasis:** Bold for key terms; italics for definitions

#### Length Guidelines
| Content Type | Target Length | Max Length |
|--------------|---------------|------------|
| Section intro | 100-200 words | 300 words |
| Lesson body | 500-1000 words | 1500 words |
| Key takeaways | 3-5 bullet points | 7 points |
| Example | 200-400 words | 600 words |

#### Readability Standards
- **Reading Level:** 10th-12th grade (Flesch-Kincaid)
- **Sentence Length:** Average 15-20 words
- **Paragraph Length:** 3-5 sentences max
- **Active Voice:** Prefer active over passive constructions

### 5.2 Video Content Standards (Placeholder)

#### Technical Specifications
| Attribute | Specification |
|-----------|---------------|
| Resolution | 1080p minimum, 4K preferred |
| Aspect Ratio | 16:9 |
| Frame Rate | 30fps minimum |
| Audio | Stereo, -16 LUFS loudness |
| Format | MP4 (H.264/AAC) |

#### Content Guidelines
- **Duration:** 5-15 minutes per video segment
- **Chapters:** Required for videos >5 minutes
- **Captions:** Required (SRT format)
- **Transcript:** Required (searchable text)

#### Placeholder Structure
```yaml
video:
  placeholder: true
  planned_topics:
    - Topic 1 description
    - Topic 2 description
  estimated_duration_minutes: 10
  production_priority: high | medium | low
```

### 5.3 Interactive Element Standards

#### Quiz Elements
```yaml
quiz:
  type: multiple_choice | multiple_select | true_false | ordering
  question: string
  options: string[]
  correct_answer: string | string[]  # Index or indices
  explanation: string
  difficulty: beginner | intermediate | advanced
  time_limit_seconds: integer | null
```

#### Coding Exercise Elements
```yaml
coding_exercise:
  type: complete_function | debug | optimize | design
  language: string[]                 # Supported languages
  starter_code: string
  solution: string
  test_cases:
    - input: any
      expected_output: any
      is_hidden: boolean
  hints: string[]
  time_limit_minutes: integer
```

#### Simulation Elements
```yaml
simulation:
  type: mock_interview | scenario | decision_tree
  scenario_description: string
  decision_points:
    - prompt: string
      options:
        - text: string
          feedback: string
          score_impact: integer
          next_point: string | null
  scoring:
    max_score: integer
    passing_score: integer
```

#### Flashcard Elements
```yaml
flashcard:
  front: string
  back: string
  tags: string[]
  difficulty: integer              # 1-5 scale
  spaced_repetition:
    initial_interval_days: 1
    ease_factor: 2.5
```

### 5.4 Practice Question Standards

#### Question Structure
```yaml
practice_question:
  id: string
  type: behavioral | technical | case | estimation | coding
  question_text: string
  context: string | null           # Additional context if needed

  # For behavioral questions
  behavioral:
    competency: string             # e.g., "leadership", "conflict-resolution"
    star_prompts:
      situation: string
      task: string
      action: string
      result: string
    sample_answer: string
    evaluation_criteria: string[]

  # For technical questions
  technical:
    topic: string
    subtopics: string[]
    expected_answer_points: string[]
    follow_up_questions: string[]
    common_mistakes: string[]

  # For coding questions
  coding:
    problem_statement: string
    constraints: string[]
    examples:
      - input: string
        output: string
        explanation: string
    optimal_solution:
      approach: string
      time_complexity: string
      space_complexity: string
      code: string
    alternative_solutions: Solution[]
    hints: string[]

  # Metadata
  difficulty: beginner | intermediate | advanced | expert
  estimated_time_minutes: integer
  frequency: high | medium | low   # How often asked in real interviews
  companies: string[]              # Companies known to ask this
  source: string                   # Attribution if applicable
```

### 5.5 Asset Standards

#### Images
| Attribute | Specification |
|-----------|---------------|
| Format | PNG for diagrams, WebP for photos |
| Max Width | 1200px |
| Alt Text | Required for accessibility |
| Naming | `{module_id}-{section_id}-{descriptor}.{ext}` |

#### Diagrams
- **Tool:** Mermaid.js for inline diagrams
- **Style:** Consistent color palette across modules
- **Accessibility:** Text descriptions for complex diagrams

#### File Organization
```
/content
  /modules
    /{module_id}
      /module.yaml           # Module definition
      /sections
        /{section_id}.md     # Section content
      /assets
        /images
        /diagrams
      /questions
        /question_bank.yaml  # Module-specific questions
```

---

## 6. Module Lifecycle

### 6.1 Status Definitions

| Status | Description | Visibility |
|--------|-------------|------------|
| `draft` | Initial creation, incomplete | Internal only |
| `review` | Ready for editorial review | Internal only |
| `published` | Live and accessible | Public |
| `archived` | Deprecated, read-only access | Hidden from browse |

### 6.2 Review Checklist

Before publishing, modules must pass:

- [ ] Content completeness (all sections filled)
- [ ] Dependency validation (no circular refs)
- [ ] Tag validation (all tags exist in taxonomy)
- [ ] Readability score check
- [ ] Technical accuracy review
- [ ] Legal/compliance review (for company-specific content)
- [ ] SEO metadata complete
- [ ] Question bank populated (minimum 5 questions)
- [ ] Assessment thresholds set

### 6.3 Update Frequency

| Module Type | Review Cadence | Trigger Events |
|-------------|----------------|----------------|
| Universal | Quarterly | Industry trends, user feedback |
| Company-Specific (Tier 1) | Monthly | Process changes, new data |
| Company-Specific (Tier 2-4) | Quarterly | Major changes only |
| Industry-Specific | Quarterly | Regulatory changes, trends |
| Role-Specific | Quarterly | Technology evolution |

---

## 7. Quality Metrics

### 7.1 Content Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Completion Rate | >70% | Users who finish vs. start |
| Assessment Pass Rate | 60-80% | First-attempt pass rate |
| Time on Task | ±20% of estimate | Actual vs. estimated time |
| User Rating | >4.0/5.0 | Post-module survey |
| Return Rate | >30% | Users who revisit module |

### 7.2 SEO Performance Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Organic Traffic | Tier-based | 90 days post-publish |
| Search Ranking | Top 10 for primary keyword | 180 days |
| Click-Through Rate | >3% | Ongoing |
| Bounce Rate | <60% | Ongoing |

---

## Appendix A: Module ID Convention

**Format:** `{type}-{topic}-{level}-{sequence}`

**Examples:**
```
univ-behavioral-001           # Universal, Behavioral, first module
company-google-swe-001        # Google, SWE, first module
industry-consulting-case-001  # Consulting, Case Study, first module
role-sysdesign-advanced-001   # System Design, Advanced, first module
```

**Type Prefixes:**
- `univ` - Universal
- `company` - Company-specific
- `industry` - Industry-specific
- `role` - Role-specific

---

## Appendix B: Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-01-16 | Architecture Team | Initial specification |
