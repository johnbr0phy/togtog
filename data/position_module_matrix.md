# C2: Position-Module Matrix System

**Last Updated:** January 2026
**Version:** 1.0

---

## 1. Position Data Model

A **Position** is defined as the unique combination of:

```
Position = Company + Role + Level
```

### 1.1 Component Definitions

#### Company Categories
| Category | Description | Examples |
|----------|-------------|----------|
| FAANG | Original big tech | Google, Amazon, Meta, Apple, Netflix |
| Big Tech | Large tech companies | Microsoft, NVIDIA, Salesforce, Adobe |
| AI Native | AI-first companies | OpenAI, Anthropic, DeepMind, xAI |
| Finance - IB | Investment Banking | Goldman Sachs, JP Morgan, Morgan Stanley |
| Finance - Quant | Quantitative Trading | Citadel, Two Sigma, Jane Street |
| Consulting - MBB | Strategy Consulting | McKinsey, BCG, Bain |
| Consulting - Big4 | Professional Services | Deloitte, PwC, EY, KPMG |
| Defense | Defense Contractors | Lockheed Martin, Raytheon, Northrop |
| Growth Tech | High-growth startups | Stripe, Databricks, Snowflake |
| Consumer Tech | Consumer products | Uber, Airbnb, DoorDash, Spotify |

#### Role Categories
| Category | Roles | Primary Skills |
|----------|-------|----------------|
| Software Engineering | SWE, Backend, Frontend, Full-stack | Coding, System Design, Algorithms |
| Data & ML | Data Scientist, ML Engineer, Data Engineer | ML, Statistics, Data Processing |
| Product | Product Manager, Technical PM | Product Sense, Strategy, Execution |
| Design | UX Designer, Product Designer | Design Thinking, User Research |
| Finance | IB Analyst, Quant Analyst, Trader | Financial Modeling, Markets |
| Consulting | Consultant, Business Analyst | Case Studies, Frameworks |

#### Experience Levels
| Level | Years | Typical Titles |
|-------|-------|----------------|
| Entry | 0-2 | New Grad, Junior, Analyst |
| Mid | 2-5 | Engineer, Associate, Senior Analyst |
| Senior | 5-8 | Senior Engineer, Manager, Consultant |
| Staff+ | 8+ | Staff, Principal, Director, Partner |

### 1.2 Position Schema

```typescript
interface Position {
  id: string;                    // Unique identifier
  company: string;               // Company name
  companyCategory: CompanyCategory;
  role: string;                  // Role title
  roleCategory: RoleCategory;
  level: Level;

  // Derived attributes
  tags: string[];                // Auto-generated from components
  interviewFormat: InterviewFormat;
  estimatedPrepTime: number;     // Hours
  searchVolume: number;          // Monthly searches (from R1)
  hiringPriority: number;        // Score 0-100 (from R2)
}

interface InterviewFormat {
  rounds: Round[];
  totalDuration: string;         // e.g., "4-6 weeks"
  style: 'technical' | 'case' | 'behavioral' | 'mixed';
}

interface Round {
  name: string;
  duration: number;              // Minutes
  type: 'coding' | 'system_design' | 'behavioral' | 'case' | 'technical' | 'fit';
  weight: number;                // Importance 0-100
}
```

---

## 2. Module Inventory

### 2.1 Core Interview Modules

| Module ID | Module Name | Category | Difficulty | Est. Hours | Tags |
|-----------|-------------|----------|------------|------------|------|
| M001 | Data Structures & Algorithms | Technical | All | 40-120 | `coding`, `dsa`, `algorithms` |
| M002 | System Design Fundamentals | Technical | Mid+ | 30-60 | `system-design`, `architecture` |
| M003 | Object-Oriented Design | Technical | All | 15-25 | `ood`, `design-patterns` |
| M004 | Behavioral Interview Prep | Behavioral | All | 10-20 | `behavioral`, `star-method` |
| M005 | SQL & Database Design | Technical | All | 15-30 | `sql`, `databases`, `data` |
| M006 | Machine Learning Fundamentals | Technical | Mid+ | 30-50 | `ml`, `ai`, `data-science` |
| M007 | Statistics & Probability | Technical | All | 20-35 | `statistics`, `probability`, `quant` |
| M008 | Product Sense & Strategy | Product | All | 20-40 | `product`, `strategy`, `pm` |
| M009 | Case Interview Frameworks | Consulting | All | 30-60 | `case`, `frameworks`, `consulting` |
| M010 | Financial Modeling | Finance | All | 25-50 | `finance`, `modeling`, `valuation` |

### 2.2 Company-Specific Modules

| Module ID | Module Name | Company | Category | Est. Hours | Tags |
|-----------|-------------|---------|----------|------------|------|
| C001 | Amazon Leadership Principles | Amazon | Behavioral | 15-25 | `amazon`, `lp`, `behavioral` |
| C002 | Google Interview Deep Dive | Google | Technical | 20-30 | `google`, `coding`, `system-design` |
| C003 | Meta Interview Patterns | Meta | Technical | 15-25 | `meta`, `coding`, `ninja-pirate` |
| C004 | Apple Design Philosophy | Apple | Culture | 10-15 | `apple`, `design`, `culture` |
| C005 | McKinsey PEI Mastery | McKinsey | Behavioral | 15-25 | `mckinsey`, `pei`, `behavioral` |
| C006 | Goldman Sachs Technical | Goldman Sachs | Finance | 20-30 | `goldman`, `finance`, `technical` |
| C007 | NVIDIA GPU/AI Systems | NVIDIA | Technical | 15-25 | `nvidia`, `gpu`, `ai-systems` |
| C008 | OpenAI Safety & Alignment | OpenAI | Technical | 15-20 | `openai`, `ai-safety`, `alignment` |
| C009 | Defense Clearance Prep | Defense | Process | 10-15 | `defense`, `clearance`, `process` |
| C010 | Microsoft STAR+ Method | Microsoft | Behavioral | 10-15 | `microsoft`, `behavioral`, `star` |

### 2.3 Role-Specific Modules

| Module ID | Module Name | Role Category | Est. Hours | Tags |
|-----------|-------------|---------------|------------|------|
| R001 | Frontend Interview Prep | Engineering | 25-40 | `frontend`, `react`, `javascript` |
| R002 | Backend System Design | Engineering | 30-50 | `backend`, `distributed`, `api` |
| R003 | ML System Design | Data & ML | 25-40 | `ml-systems`, `mlops`, `deployment` |
| R004 | Data Pipeline Architecture | Data & ML | 20-35 | `data-engineering`, `pipelines`, `etl` |
| R005 | PM Execution Deep Dive | Product | 15-25 | `execution`, `metrics`, `roadmap` |
| R006 | UX Portfolio Review Prep | Design | 15-20 | `portfolio`, `ux`, `design-critique` |
| R007 | Quantitative Brain Teasers | Quant | 20-35 | `quant`, `probability`, `puzzles` |
| R008 | Investment Banking Technicals | Finance | 25-40 | `ib`, `dcf`, `lbo`, `accretion` |
| R009 | Consulting Math Drills | Consulting | 15-25 | `math`, `estimation`, `consulting` |
| R010 | Senior/Staff Scope & Impact | Leadership | 15-25 | `staff`, `impact`, `scope` |

### 2.4 Skill Intensifiers (Add-ons)

| Module ID | Module Name | Target | Est. Hours | Tags |
|-----------|-------------|--------|------------|------|
| I001 | LeetCode Patterns Deep Dive | SWE | 40-80 | `leetcode`, `patterns`, `hard` |
| I002 | Distributed Systems Advanced | Senior SWE | 25-40 | `distributed`, `consensus`, `advanced` |
| I003 | ML Research Paper Review | ML/Research | 20-35 | `papers`, `research`, `ml-theory` |
| I004 | Trading Strategies | Quant | 20-30 | `trading`, `strategies`, `markets` |
| I005 | M&A Case Studies | IB/PE | 20-30 | `ma`, `case-studies`, `deals` |
| I006 | API Design Patterns | Backend | 15-25 | `api`, `rest`, `graphql` |

---

## 3. Position-Module Matrix

### 3.1 Matrix Structure

Each position maps to a **bundle** of modules with:
- **Priority** (1-5): 1 = Essential, 5 = Optional enhancement
- **Weight**: Percentage of interview focus
- **Sequence**: Recommended study order

### 3.2 Sample Position Mappings (10 Positions)

---

#### Position 1: Google Software Engineer (Mid-Level)

**Position ID:** `google-swe-mid`
**Search Volume:** 49,500/month | **Hiring Priority:** 88

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M001 - DSA | 35% | 80 | 1 |
| 1 | M002 - System Design | 25% | 40 | 2 |
| 2 | C002 - Google Deep Dive | 15% | 25 | 3 |
| 2 | M004 - Behavioral | 15% | 15 | 4 |
| 3 | M003 - OOD | 10% | 20 | 5 |

**Total Prep Time:** 180 hours (8-12 weeks @ 15-20 hrs/week)
**Content Coverage:** 95%

**Interview Format:**
- Phone Screen: Coding (45 min)
- Onsite 1: Coding x2 (45 min each)
- Onsite 2: System Design (45 min)
- Onsite 3: Behavioral (Googleyness) (45 min)

---

#### Position 2: Amazon Software Engineer (Entry)

**Position ID:** `amazon-swe-entry`
**Search Volume:** 40,500/month | **Hiring Priority:** 90

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M001 - DSA | 40% | 60 | 1 |
| 1 | C001 - Amazon LP | 30% | 25 | 2 |
| 2 | M004 - Behavioral | 15% | 15 | 3 |
| 3 | M003 - OOD | 10% | 15 | 4 |
| 4 | M002 - System Design | 5% | 10 | 5 |

**Total Prep Time:** 125 hours (6-8 weeks @ 15-20 hrs/week)
**Content Coverage:** 100%

**Interview Format:**
- Online Assessment: Coding + Work Simulation
- Phone: LP Behavioral (60 min)
- Virtual Onsite: Coding x2 + LP x2

---

#### Position 3: McKinsey Consultant (Entry - Business Analyst)

**Position ID:** `mckinsey-consultant-entry`
**Search Volume:** 22,200/month | **Hiring Priority:** N/A (not in R2)

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M009 - Case Frameworks | 40% | 50 | 1 |
| 1 | C005 - McKinsey PEI | 25% | 25 | 2 |
| 2 | R009 - Consulting Math | 20% | 20 | 3 |
| 2 | M004 - Behavioral | 10% | 15 | 4 |
| 3 | M007 - Stats/Probability | 5% | 15 | 5 |

**Total Prep Time:** 125 hours (6-10 weeks)
**Content Coverage:** 90%

**Interview Format:**
- Round 1: PEI + Case (45 min)
- Round 2: PEI + Case (45 min)
- Round 3 (Final): Partner Interview - PEI + Case (60 min)

---

#### Position 4: Goldman Sachs Investment Banking Analyst (Entry)

**Position ID:** `gs-ib-analyst-entry`
**Search Volume:** 14,800/month | **Hiring Priority:** 78

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M010 - Financial Modeling | 35% | 40 | 1 |
| 1 | R008 - IB Technicals | 30% | 35 | 2 |
| 2 | C006 - GS Technical | 15% | 25 | 3 |
| 2 | M004 - Behavioral | 15% | 15 | 4 |
| 3 | I005 - M&A Case Studies | 5% | 20 | 5 |

**Total Prep Time:** 135 hours (6-10 weeks)
**Content Coverage:** 85%

**Interview Format:**
- Superday: 4-6 interviews
- Technical: Accounting, Valuation, DCF, LBO
- Behavioral: Fit, Why GS, Why IB
- Case: M&A situational

---

#### Position 5: Meta Machine Learning Engineer (Mid-Level)

**Position ID:** `meta-mle-mid`
**Search Volume:** 5,400/month | **Hiring Priority:** 85

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M001 - DSA | 25% | 50 | 1 |
| 1 | M006 - ML Fundamentals | 25% | 40 | 2 |
| 1 | R003 - ML System Design | 20% | 30 | 3 |
| 2 | C003 - Meta Patterns | 10% | 20 | 4 |
| 2 | M004 - Behavioral | 10% | 15 | 5 |
| 3 | M007 - Statistics | 10% | 20 | 6 |

**Total Prep Time:** 175 hours (8-12 weeks)
**Content Coverage:** 90%

**Interview Format:**
- Phone: Coding (45 min)
- Onsite 1: Coding (45 min)
- Onsite 2: ML System Design (45 min)
- Onsite 3: ML Theory/Fundamentals (45 min)
- Onsite 4: Behavioral (45 min)

---

#### Position 6: OpenAI Research Scientist (Senior)

**Position ID:** `openai-research-senior`
**Search Volume:** 5,400/month | **Hiring Priority:** 90

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M006 - ML Fundamentals | 25% | 45 | 1 |
| 1 | I003 - ML Paper Review | 25% | 35 | 2 |
| 1 | C008 - OpenAI Safety | 20% | 20 | 3 |
| 2 | M001 - DSA | 10% | 30 | 4 |
| 2 | R010 - Senior Scope | 10% | 20 | 5 |
| 3 | M004 - Behavioral | 10% | 15 | 6 |

**Total Prep Time:** 165 hours (8-12 weeks)
**Content Coverage:** 75% (Gap: Research presentation module needed)

**Interview Format:**
- Research Presentation (60 min)
- Technical Deep Dive (60 min)
- Coding/Implementation (45 min)
- Culture/Values Fit (45 min)

---

#### Position 7: Jane Street Quantitative Trader (Entry)

**Position ID:** `janestreet-quant-entry`
**Search Volume:** 4,400/month | **Hiring Priority:** N/A

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | R007 - Quant Brain Teasers | 30% | 35 | 1 |
| 1 | M007 - Stats/Probability | 25% | 30 | 2 |
| 2 | I004 - Trading Strategies | 20% | 25 | 3 |
| 2 | M001 - DSA | 15% | 40 | 4 |
| 3 | M004 - Behavioral | 10% | 10 | 5 |

**Total Prep Time:** 140 hours (6-10 weeks)
**Content Coverage:** 80% (Gap: Mental math speed drills, market microstructure)

**Interview Format:**
- Phone: Math/Probability (60 min)
- Onsite: 4-5 rounds of math, probability, trading scenarios
- Focus: Mental math, probability puzzles, market intuition

---

#### Position 8: Deloitte Consultant (Entry)

**Position ID:** `deloitte-consultant-entry`
**Search Volume:** 9,900/month | **Hiring Priority:** 82

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M009 - Case Frameworks | 35% | 40 | 1 |
| 2 | M004 - Behavioral | 25% | 20 | 2 |
| 2 | R009 - Consulting Math | 20% | 20 | 3 |
| 3 | M007 - Stats/Probability | 10% | 15 | 4 |
| 4 | M008 - Product Sense | 10% | 15 | 5 |

**Total Prep Time:** 110 hours (5-8 weeks)
**Content Coverage:** 95%

**Interview Format:**
- Behavioral Interview (30 min)
- Case Interview 1 (30-45 min)
- Case Interview 2 (30-45 min)
- Group Exercise (some offices)

---

#### Position 9: Apple Product Manager (Mid-Level)

**Position ID:** `apple-pm-mid`
**Search Volume:** 8,100/month | **Hiring Priority:** 95 (company level)

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M008 - Product Sense | 35% | 35 | 1 |
| 1 | R005 - PM Execution | 20% | 20 | 2 |
| 2 | C004 - Apple Design | 15% | 15 | 3 |
| 2 | M004 - Behavioral | 15% | 15 | 4 |
| 3 | M002 - System Design | 10% | 25 | 5 |
| 4 | M001 - DSA (light) | 5% | 20 | 6 |

**Total Prep Time:** 130 hours (6-10 weeks)
**Content Coverage:** 85% (Gap: Apple-specific product teardown module)

**Interview Format:**
- Phone: Product Sense + Technical (45 min)
- Onsite 1: Product Design (45 min)
- Onsite 2: Analytical/Metrics (45 min)
- Onsite 3: Technical Understanding (45 min)
- Onsite 4: Leadership/Culture (45 min)

---

#### Position 10: Lockheed Martin Software Engineer (Mid-Level)

**Position ID:** `lockheed-swe-mid`
**Search Volume:** 2,900/month | **Hiring Priority:** 85

| Priority | Module | Weight | Est. Hours | Sequence |
|----------|--------|--------|------------|----------|
| 1 | M001 - DSA | 30% | 50 | 1 |
| 1 | C009 - Defense Clearance | 15% | 15 | 2 |
| 2 | M002 - System Design | 20% | 30 | 3 |
| 2 | M004 - Behavioral | 20% | 20 | 4 |
| 3 | M003 - OOD | 10% | 15 | 5 |
| 4 | R002 - Backend Systems | 5% | 20 | 6 |

**Total Prep Time:** 150 hours (7-10 weeks)
**Content Coverage:** 90% (Gap: Defense-specific tech stack module - Ada, VHDL, embedded)

**Interview Format:**
- Technical Screen (60 min)
- Behavioral Screen (30 min)
- Technical Onsite: Coding + System Design
- Security Clearance Discussion

---

## 4. Content Coverage Analysis

### 4.1 Coverage by Position Type

| Position | Total Modules | Covered | Coverage % | Primary Gap |
|----------|---------------|---------|------------|-------------|
| Google SWE Mid | 5 | 5 | 95% | None significant |
| Amazon SWE Entry | 5 | 5 | 100% | None |
| McKinsey Consultant | 5 | 4.5 | 90% | Live case practice module |
| GS IB Analyst | 5 | 4.25 | 85% | Deal experience simulations |
| Meta MLE Mid | 6 | 5.4 | 90% | Meta-specific ML papers |
| OpenAI Research Senior | 6 | 4.5 | 75% | Research presentation prep |
| Jane Street Quant | 5 | 4 | 80% | Mental math drills, market micro |
| Deloitte Consultant | 5 | 4.75 | 95% | None significant |
| Apple PM Mid | 6 | 5.1 | 85% | Apple product teardowns |
| Lockheed SWE Mid | 6 | 5.4 | 90% | Defense tech stack (Ada, VHDL) |

### 4.2 Overall Content Coverage

```
Average Coverage: 88.5%
Positions with >90% coverage: 5/10 (50%)
Positions with <80% coverage: 1/10 (10%)
```

### 4.3 Module Utilization Analysis

| Module | Used In # Positions | Utilization |
|--------|---------------------|-------------|
| M001 - DSA | 8/10 | High |
| M004 - Behavioral | 10/10 | Universal |
| M002 - System Design | 5/10 | Moderate |
| M007 - Statistics | 4/10 | Moderate |
| M009 - Case Frameworks | 2/10 | Niche |
| M006 - ML Fundamentals | 2/10 | Niche |
| M010 - Financial Modeling | 1/10 | Niche |

---

## 5. Gap Analysis: New Modules Required

### 5.1 High Priority Gaps (Affects >2 positions)

| Gap ID | Module Needed | Affected Positions | Priority |
|--------|---------------|-------------------|----------|
| G001 | Research Presentation Prep | OpenAI Research, DeepMind, Anthropic | High |
| G002 | Mental Math Speed Drills | Jane Street, Citadel, Two Sigma, HRT | High |
| G003 | Market Microstructure | All Quant Trading positions | High |
| G004 | Live Case Practice Simulations | All Consulting positions | High |

### 5.2 Medium Priority Gaps (Affects 1-2 positions)

| Gap ID | Module Needed | Affected Positions | Priority |
|--------|---------------|-------------------|----------|
| G005 | Defense Tech Stack (Ada/VHDL/Embedded) | Lockheed, Raytheon, Northrop, Boeing | Medium |
| G006 | Apple Product Teardowns | Apple PM, Apple Design | Medium |
| G007 | Deal Experience Simulations | GS IB, JPM IB, MS IB | Medium |
| G008 | Crypto/Web3 Fundamentals | Coinbase, Crypto funds | Medium |

### 5.3 Low Priority Gaps (Nice to have)

| Gap ID | Module Needed | Affected Positions | Priority |
|--------|---------------|-------------------|----------|
| G009 | Meta-specific ML Papers | Meta MLE | Low |
| G010 | Netflix Culture Deck Deep Dive | Netflix all roles | Low |
| G011 | Clearance Polygraph Prep | CIA, NSA, cleared defense | Low |

---

## 6. Rules Engine: Auto-Bundle Generation Logic

### 6.1 Tag-Based Matching Rules

```typescript
interface BundleRule {
  id: string;
  name: string;
  trigger: TriggerCondition;
  modules: ModuleSelection[];
  priority: number;
}

interface TriggerCondition {
  companyTags?: string[];      // Match any
  roleTags?: string[];         // Match any
  levelTags?: string[];        // Match any
  requireAll?: string[];       // Must match all
}

interface ModuleSelection {
  moduleId: string;
  priority: 1 | 2 | 3 | 4 | 5;
  weight: number;              // 0-100
  sequence: number;
  conditions?: string[];       // Optional additional conditions
}
```

### 6.2 Core Bundle Rules

```yaml
rules:
  # Rule 1: Tech SWE Base Bundle
  - id: "tech-swe-base"
    name: "Tech Software Engineer Base"
    trigger:
      roleTags: ["swe", "software-engineer", "backend", "frontend", "fullstack"]
      companyTags: ["faang", "big-tech", "growth-tech"]
    modules:
      - moduleId: "M001"  # DSA
        priority: 1
        weight: 35
        sequence: 1
      - moduleId: "M002"  # System Design
        priority: 1
        weight: 25
        sequence: 2
        conditions: ["level != entry"]
      - moduleId: "M004"  # Behavioral
        priority: 2
        weight: 15
        sequence: 3
      - moduleId: "M003"  # OOD
        priority: 3
        weight: 10
        sequence: 4

  # Rule 2: Amazon LP Override
  - id: "amazon-lp-override"
    name: "Amazon Leadership Principles"
    priority: 100  # High priority override
    trigger:
      companyTags: ["amazon"]
    modules:
      - moduleId: "C001"  # Amazon LP
        priority: 1
        weight: 30
        sequence: 2

  # Rule 3: MBB Consulting Bundle
  - id: "mbb-consulting"
    name: "MBB Consulting Interview"
    trigger:
      companyTags: ["mbb", "mckinsey", "bcg", "bain"]
      roleTags: ["consultant", "business-analyst"]
    modules:
      - moduleId: "M009"  # Case Frameworks
        priority: 1
        weight: 40
        sequence: 1
      - moduleId: "R009"  # Consulting Math
        priority: 2
        weight: 20
        sequence: 2
      - moduleId: "M004"  # Behavioral
        priority: 2
        weight: 15
        sequence: 3

  # Rule 4: McKinsey PEI Addition
  - id: "mckinsey-pei"
    name: "McKinsey PEI Module"
    priority: 100
    trigger:
      companyTags: ["mckinsey"]
    modules:
      - moduleId: "C005"  # McKinsey PEI
        priority: 1
        weight: 25
        sequence: 2

  # Rule 5: ML/AI Role Additions
  - id: "ml-role-additions"
    name: "ML Engineer Additions"
    trigger:
      roleTags: ["ml-engineer", "data-scientist", "ai-engineer"]
    modules:
      - moduleId: "M006"  # ML Fundamentals
        priority: 1
        weight: 25
        sequence: 2
      - moduleId: "R003"  # ML System Design
        priority: 1
        weight: 20
        sequence: 3
        conditions: ["level != entry"]
      - moduleId: "M007"  # Statistics
        priority: 2
        weight: 15
        sequence: 4

  # Rule 6: IB Analyst Bundle
  - id: "ib-analyst"
    name: "Investment Banking Analyst"
    trigger:
      roleTags: ["ib-analyst", "investment-banking"]
    modules:
      - moduleId: "M010"  # Financial Modeling
        priority: 1
        weight: 35
        sequence: 1
      - moduleId: "R008"  # IB Technicals
        priority: 1
        weight: 30
        sequence: 2
      - moduleId: "M004"  # Behavioral
        priority: 2
        weight: 15
        sequence: 3

  # Rule 7: Quant Trading Bundle
  - id: "quant-trading"
    name: "Quantitative Trading"
    trigger:
      companyTags: ["quant", "hft", "trading"]
      roleTags: ["quant-analyst", "quant-trader", "quant-researcher"]
    modules:
      - moduleId: "R007"  # Brain Teasers
        priority: 1
        weight: 30
        sequence: 1
      - moduleId: "M007"  # Stats/Probability
        priority: 1
        weight: 25
        sequence: 2
      - moduleId: "I004"  # Trading Strategies
        priority: 2
        weight: 20
        sequence: 3
      - moduleId: "M001"  # DSA
        priority: 2
        weight: 15
        sequence: 4

  # Rule 8: Senior/Staff Level Additions
  - id: "senior-staff-additions"
    name: "Senior+ Level Modules"
    trigger:
      levelTags: ["senior", "staff", "principal", "director"]
    modules:
      - moduleId: "R010"  # Senior Scope & Impact
        priority: 2
        weight: 10
        sequence: 5
      - moduleId: "I002"  # Distributed Systems Advanced
        priority: 3
        weight: 10
        sequence: 6
        conditions: ["role in ['swe', 'backend']"]

  # Rule 9: Defense Contractor Additions
  - id: "defense-additions"
    name: "Defense Contractor Modules"
    trigger:
      companyTags: ["defense", "lockheed", "raytheon", "northrop", "boeing"]
    modules:
      - moduleId: "C009"  # Defense Clearance Prep
        priority: 1
        weight: 15
        sequence: 2

  # Rule 10: AI Native Company Additions
  - id: "ai-native-additions"
    name: "AI Native Company Focus"
    trigger:
      companyTags: ["ai-native", "openai", "anthropic", "deepmind", "xai"]
    modules:
      - moduleId: "C008"  # AI Safety/Alignment (generic)
        priority: 2
        weight: 15
        sequence: 4
      - moduleId: "I003"  # ML Paper Review
        priority: 2
        weight: 15
        sequence: 5
        conditions: ["role in ['research', 'ml-engineer']"]
```

### 6.3 Bundle Generation Algorithm

```typescript
function generateBundle(position: Position): Bundle {
  // Step 1: Find all matching rules
  const matchingRules = rules.filter(rule =>
    matchesTrigger(position, rule.trigger)
  );

  // Step 2: Sort by priority (higher priority wins conflicts)
  matchingRules.sort((a, b) => b.priority - a.priority);

  // Step 3: Merge modules, resolving conflicts
  const moduleMap = new Map<string, ModuleSelection>();

  for (const rule of matchingRules) {
    for (const module of rule.modules) {
      // Skip if conditions not met
      if (module.conditions && !evaluateConditions(module.conditions, position)) {
        continue;
      }

      const existing = moduleMap.get(module.moduleId);
      if (!existing) {
        moduleMap.set(module.moduleId, module);
      } else {
        // Higher priority rule wins, or merge weights
        if (rule.priority > existing.priority) {
          moduleMap.set(module.moduleId, module);
        }
      }
    }
  }

  // Step 4: Normalize weights to 100%
  const modules = Array.from(moduleMap.values());
  const totalWeight = modules.reduce((sum, m) => sum + m.weight, 0);
  modules.forEach(m => m.weight = (m.weight / totalWeight) * 100);

  // Step 5: Sort by sequence
  modules.sort((a, b) => a.sequence - b.sequence);

  // Step 6: Calculate estimated prep time
  const estimatedHours = modules.reduce((sum, m) => {
    const moduleData = getModuleById(m.moduleId);
    return sum + moduleData.avgHours * (m.weight / 100);
  }, 0);

  return {
    positionId: position.id,
    modules,
    estimatedHours,
    coverage: calculateCoverage(modules, position)
  };
}

function matchesTrigger(position: Position, trigger: TriggerCondition): boolean {
  // Check companyTags
  if (trigger.companyTags) {
    const hasMatch = trigger.companyTags.some(tag =>
      position.tags.includes(tag) ||
      position.company.toLowerCase().includes(tag.toLowerCase())
    );
    if (!hasMatch) return false;
  }

  // Check roleTags
  if (trigger.roleTags) {
    const hasMatch = trigger.roleTags.some(tag =>
      position.tags.includes(tag) ||
      position.roleCategory.toLowerCase().includes(tag.toLowerCase())
    );
    if (!hasMatch) return false;
  }

  // Check levelTags
  if (trigger.levelTags) {
    const hasMatch = trigger.levelTags.includes(position.level.toLowerCase());
    if (!hasMatch) return false;
  }

  // Check requireAll
  if (trigger.requireAll) {
    const hasAll = trigger.requireAll.every(tag => position.tags.includes(tag));
    if (!hasAll) return false;
  }

  return true;
}
```

### 6.4 Tag Taxonomy

```yaml
# Company Tags
company_tags:
  category:
    - faang
    - big-tech
    - ai-native
    - finance-ib
    - finance-quant
    - consulting-mbb
    - consulting-big4
    - defense
    - growth-tech
    - consumer-tech

  specific:
    - google
    - amazon
    - meta
    - apple
    - microsoft
    - netflix
    - nvidia
    - openai
    - anthropic
    - mckinsey
    - goldman
    - citadel
    - lockheed

# Role Tags
role_tags:
  engineering:
    - swe
    - software-engineer
    - backend
    - frontend
    - fullstack
    - mobile
    - devops
    - sre

  data:
    - data-scientist
    - ml-engineer
    - data-engineer
    - data-analyst
    - research-scientist

  product:
    - pm
    - product-manager
    - technical-pm
    - product-designer

  finance:
    - ib-analyst
    - quant-analyst
    - quant-trader
    - equity-research

  consulting:
    - consultant
    - business-analyst
    - strategy

# Level Tags
level_tags:
  - entry
  - junior
  - mid
  - senior
  - staff
  - principal
  - director
  - vp
```

---

## 7. Implementation Recommendations

### 7.1 Phase 1: Core Modules (Priority)
1. Build M001 (DSA) - covers 80% of tech positions
2. Build M004 (Behavioral) - universal need
3. Build M002 (System Design) - required for mid+
4. Build M009 (Case Frameworks) - covers all consulting

### 7.2 Phase 2: Company-Specific
1. Build C001 (Amazon LP) - highest volume
2. Build C002 (Google Deep Dive) - highest volume
3. Build C005 (McKinsey PEI) - high value niche

### 7.3 Phase 3: Gap Filling
1. G001: Research Presentation Prep
2. G002: Mental Math Speed Drills
3. G004: Live Case Practice Simulations

### 7.4 Metrics to Track
- Bundle completion rate by position
- Time to interview for each bundle
- Success rate (offers) by coverage %
- Module NPS by position type

---

## Appendix A: Position Tag Reference

| Position | Auto-Generated Tags |
|----------|---------------------|
| Google SWE Mid | `faang`, `big-tech`, `google`, `swe`, `software-engineer`, `mid` |
| Amazon SWE Entry | `faang`, `big-tech`, `amazon`, `swe`, `software-engineer`, `entry` |
| McKinsey Consultant Entry | `consulting-mbb`, `mckinsey`, `consultant`, `entry` |
| GS IB Analyst Entry | `finance-ib`, `goldman`, `ib-analyst`, `entry` |
| Meta MLE Mid | `faang`, `big-tech`, `meta`, `ml-engineer`, `mid` |
| OpenAI Research Senior | `ai-native`, `openai`, `research-scientist`, `senior` |
| Jane Street Quant Entry | `finance-quant`, `quant`, `janestreet`, `quant-trader`, `entry` |
| Deloitte Consultant Entry | `consulting-big4`, `deloitte`, `consultant`, `entry` |
| Apple PM Mid | `faang`, `big-tech`, `apple`, `pm`, `product-manager`, `mid` |
| Lockheed SWE Mid | `defense`, `lockheed`, `swe`, `software-engineer`, `mid` |
