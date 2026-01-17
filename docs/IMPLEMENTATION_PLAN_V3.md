# Implementation Plan v3: Interview Prep Platform Enhancement

> **Date:** January 17, 2026
> **Scope:** Chunks 18-32 (extending existing plan)
> **Source:** User Stories v3 (Epics 6-9)

---

## Summary

| Phase | Chunks | Focus | Stories Covered |
|-------|--------|-------|-----------------|
| 1 - Core Structure | 18-21 | Stage navigation & pages | J1, J2 |
| 2 - Hidden Intent | 22 | Intent labels & metadata | H1 |
| 3 - Set Pieces | 23-25 | Response system | S1, S2, S3 |
| 4 - Practice System | 26-28 | Practice & debrief | P5, P6, P7 |
| 5 - Content & Polish | 29-31 | Transcripts & guides | J3, H2, H3 |
| 6 - Navigation | 32 | Updated IA | All |

---

## Progress Overview

| Chunk | Description | Status | Story |
|-------|-------------|--------|-------|
| 18 | Data Models & TypeScript Schema | Not Started | Foundation |
| 19 | Interview Stage Map | Not Started | J1 |
| 20 | Stage Page Template | Not Started | J2 (Part 1) |
| 21 | Stage Content - 5 Core Stages | Not Started | J2 (Part 2) |
| 22 | Intent Labels System | Not Started | H1 |
| 23 | Response Categories Framework | Not Started | S1 |
| 24 | Set Piece Builder | Not Started | S2 |
| 25 | Question-to-SetPiece Practice | Not Started | S3 |
| 26 | Practice Sessions | Not Started | P5 |
| 27 | Immediate Debrief | Not Started | P6 |
| 28 | Weak Point Dashboard | Not Started | P7 |
| 29 | Excellence Transcripts | Not Started | J3 |
| 30 | Interviewer Mindset Guide | Not Started | H2 |
| 31 | Reframing Negatives Module | Not Started | H3 |
| 32 | Updated Information Architecture | Not Started | All |

---

## Phase 1: Core Structure

### Chunk 18: Data Models & TypeScript Schema

**Purpose:** Establish the data foundation for stages, set pieces, practice sessions, and progress tracking.

**Tasks:**
- [ ] Define `InterviewStage` type (id, name, format, assessments, prepTime, order)
- [ ] Define `StageProgress` type (stageId, sectionsCompleted, percentComplete, isComplete)
- [ ] Define `SetPiece` type (id, category, title, situation, task, action, result, wordCount, lastEdited)
- [ ] Define `SetPieceCategory` type (id, name, description, questionTypes, framework, exampleSetPiece)
- [ ] Define `PracticeSession` type (id, mode, filters, questions, startTime, answers, score)
- [ ] Define `DebriefResult` type (sessionId, score, gaps, patterns, recommendations)
- [ ] Define `UserProgress` type (stages, setPieces, practiceHistory, weakPoints)
- [ ] Create `/web/src/types/v3.ts` with all type definitions
- [ ] Create sample data files for each type

**Deliverable:** `/web/src/types/v3.ts` with complete TypeScript schema

**Depends On:** None (foundation chunk)

---

### Chunk 19: Interview Stage Map (J1)

**Purpose:** Build the main navigation showing interview stages with progress tracking.

**Tasks:**
- [ ] Create `StageCard` component showing:
  - Stage name and typical format (e.g., "45 min video call")
  - What they're assessing (1-2 sentences)
  - Prep completion percentage (progress bar)
  - Estimated time to complete
  - Status indicator (not started / in progress / complete)
- [ ] Create `StageMap` component (list/grid of StageCards)
- [ ] Implement stage reordering (drag-and-drop or up/down buttons)
- [ ] Add "Add custom stage" functionality
- [ ] Add "Remove stage" with confirmation
- [ ] Store stage order and customizations in localStorage
- [ ] Create default stage templates per company/role
- [ ] Clicking a stage navigates to its prep page

**Deliverable:** `/web/src/components/stages/StageMap.tsx` and `/web/src/components/stages/StageCard.tsx`

**Depends On:** Chunk 18

**Acceptance Criteria (from J1):**
- Display interview stages as navigable list/cards
- Each stage shows: name, format, assessments, completion %, time estimate
- Users can add/remove/reorder stages
- Clear visual distinction between states

---

### Chunk 20: Stage Page Template (J2 - Part 1)

**Purpose:** Create the reusable template for individual stage prep pages.

**Tasks:**
- [ ] Create `StagePage` layout component with 7 consistent sections:
  1. **Overview** - What happens, format, duration, who you'll meet
  2. **What They're Really Testing** - Hidden intent behind this stage
  3. **How to Prepare** - Specific actions to take
  4. **Example Transcript** - What an excellent candidate says (placeholder for Chunk 29)
  5. **Practice** - Questions/exercises for this stage
  6. **Common Mistakes** - What to avoid
  7. **Checklist** - Self-assessment before marking complete
- [ ] Create collapsible section component with completion tracking
- [ ] Implement section completion checkboxes
- [ ] Auto-save progress to localStorage
- [ ] Add "Mark Stage Complete" button (only enabled when checklist done)
- [ ] Create section navigation sidebar (jump to any section)
- [ ] Mobile-responsive layout

**Deliverable:** `/web/src/app/stages/[stageId]/page.tsx` and section components

**Depends On:** Chunk 18, Chunk 19

---

### Chunk 21: Stage Content - 5 Core Stages (J2 - Part 2)

**Purpose:** Populate content for the 5 most common interview stage types.

**Tasks:**
- [ ] **Phone Screen** stage content:
  - Overview (30-45 min, recruiter/hiring manager, video or phone)
  - Hidden intent (culture fit, communication, baseline skills)
  - How to prepare (research company, prepare questions, test tech)
  - Common mistakes (rambling, negativity, no questions)
  - Checklist (8-10 items)
- [ ] **Technical Round** stage content:
  - Overview (45-60 min, coding + system design, screen share)
  - Hidden intent (problem-solving approach, collaboration, code quality)
  - How to prepare (practice coding, review DS&A, mock interviews)
  - Common mistakes (jumping to code, silence, giving up)
  - Checklist (8-10 items)
- [ ] **Behavioral Round** stage content:
  - Overview (45-60 min, STAR questions, multiple interviewers possible)
  - Hidden intent (past behavior predicts future, leadership signals)
  - How to prepare (prepare 5-7 set pieces, practice STAR delivery)
  - Common mistakes (vague answers, no metrics, blame others)
  - Checklist (8-10 items)
- [ ] **Case Study Round** stage content (consulting/PM):
  - Overview (30-45 min, business problem, structured analysis)
  - Hidden intent (structured thinking, business acumen, communication)
  - How to prepare (practice frameworks, mental math, case books)
  - Common mistakes (diving in, forgetting the ask, no recommendation)
  - Checklist (8-10 items)
- [ ] **Final Round / Onsite** stage content:
  - Overview (4-6 hours, multiple interviews, team meet)
  - Hidden intent (team fit, stamina, consistency across interviews)
  - How to prepare (review all stages, prepare for lunch chat, energy management)
  - Common mistakes (letting guard down, inconsistent stories, fatigue)
  - Checklist (8-10 items)
- [ ] Create `/web/src/data/stages.ts` with all stage content

**Deliverable:** Complete content for 5 stage types in `/web/src/data/stages.ts`

**Depends On:** Chunk 20

---

## Phase 2: Hidden Intent

### Chunk 22: Intent Labels System (H1)

**Purpose:** Add "what they're really testing" metadata to all questions and stages.

**Tasks:**
- [ ] Extend question schema to include:
  - `hiddenIntent`: string (1 sentence, what they're really testing)
  - `strongAnswersDemonstrate`: string[] (what good answers show)
  - `weakAnswersReveal`: string[] (what bad answers expose)
- [ ] Update all 60 existing questions with intent metadata
- [ ] Create `IntentLabel` component (styled badge/tooltip showing intent)
- [ ] Add intent display to `QuestionCard` component
- [ ] Add intent section to stage overview pages
- [ ] Create `/web/src/data/intents.ts` with common intent patterns
- [ ] Consistent styling: subtle but visible on all question views

**Deliverable:** Updated questions with intent metadata, `IntentLabel` component

**Depends On:** Chunk 21

**Acceptance Criteria (from H1):**
- Every question displays: question text, hidden intent, strong/weak answer signals
- Every stage overview includes hidden assessment goals
- Consistent placement/styling throughout

---

## Phase 3: Set Pieces

### Chunk 23: Response Categories Framework (S1)

**Purpose:** Define the 5-7 universal response categories that map to any interview question.

**Tasks:**
- [ ] Define 7 response categories:
  1. **Leadership / Taking Initiative** - Questions about leading, stepping up, ownership
  2. **Teamwork / Collaboration** - Questions about working with others, conflicts resolved
  3. **Overcoming Challenges / Failure** - Questions about setbacks, learning from mistakes
  4. **Technical Problem-Solving** - Questions about debugging, architecture decisions
  5. **Conflict Resolution** - Questions about disagreements, difficult conversations
  6. **Achievement / Impact** - Questions about accomplishments, metrics, results
  7. **Growth / Learning** - Questions about feedback, skill development, adaptability
- [ ] For each category, document:
  - Category description (2-3 sentences)
  - Question types that map here (5+ example questions)
  - Response framework (STAR variation appropriate for category)
  - Example set piece (full story showing the pattern)
- [ ] Create question-to-category mapping for all 60 existing questions
- [ ] Build demonstration: show how 1 set piece answers 5+ different questions
- [ ] Create `/web/src/data/categories.ts` with framework

**Deliverable:** `/web/src/data/categories.ts` and `/docs/set-piece-framework.md`

**Depends On:** Chunk 22

**Acceptance Criteria (from S1):**
- 5-7 universal response categories defined
- Each category shows question mappings, framework, example
- Demonstrate 1 set piece → 5+ questions flexibility

---

### Chunk 24: Set Piece Builder (S2)

**Purpose:** Build the guided interface for users to create and store their own set piece stories.

**Tasks:**
- [ ] Create `SetPieceBuilder` component with guided flow:
  1. Select category
  2. Prompts to surface real experiences ("Think of a time when...")
  3. STAR structure template with field for each part
  4. Word count guidance (target: 150-250 words for 2-min response)
  5. Save button
- [ ] Create `SetPieceCard` component (compact view of saved set piece)
- [ ] Create `SetPieceList` component (view all set pieces by category)
- [ ] Implement edit/delete functionality
- [ ] Store set pieces in localStorage (structure for future DB migration)
- [ ] Quick-view modal: see any set piece from anywhere in the app
- [ ] Category completion indicator ("You have set pieces for 5/7 categories")
- [ ] Optional: AI feedback on response strength (placeholder for future)

**Deliverable:** `/web/src/components/setpieces/SetPieceBuilder.tsx` and related components

**Depends On:** Chunk 23

**Acceptance Criteria (from S2):**
- Guided builder per category with prompts
- STAR structure template with length guidance
- Save multiple set pieces per category
- Quick-view from any page

---

### Chunk 25: Question-to-SetPiece Practice (S3)

**Purpose:** Practice mode for matching interview questions to the right set piece category.

**Tasks:**
- [ ] Create `CategoryMatchPractice` component:
  - Display a random question
  - Show 7 category buttons to choose from
  - Reveal correct mapping with explanation
  - Track correct/incorrect
- [ ] Implement practice session (10 questions per round)
- [ ] Show accuracy score at end of session
- [ ] Track accuracy over time (localStorage)
- [ ] Create `CoverageReport` component:
  - "You have set pieces for 5/7 categories"
  - Visual indicator per category (filled/empty)
- [ ] Create `GapAlert` component:
  - "You need a story for 'conflict resolution'"
  - Link to SetPieceBuilder for that category

**Deliverable:** `/web/src/components/practice/CategoryMatchPractice.tsx` and coverage components

**Depends On:** Chunk 24

**Acceptance Criteria (from S3):**
- Practice mode: see question → pick category → see correct answer
- Track accuracy over time
- Coverage report showing set piece gaps
- Gap alerts with action links

---

## Phase 4: Practice System

### Chunk 26: Practice Sessions (P5)

**Purpose:** Flexible practice session launcher with multiple modes and filters.

**Tasks:**
- [ ] Create `PracticeLauncher` component with mode selection:
  - **By Stage** - All questions for Phone Screen, Technical, etc.
  - **By Category** - All behavioral, all technical, etc.
  - **By Set Piece Category** - All "leadership" questions, etc.
  - **Mixed/Random** - Random selection across all
  - **Quick Drill** - 10 random questions, timed
  - **Weak Points Focus** - Questions user has struggled with
- [ ] Implement filter UI (checkboxes/dropdowns for each mode)
- [ ] Create `PracticeSession` component:
  - Question display with answer input (text area)
  - Next/Previous navigation
  - Progress indicator (question 3 of 10)
  - Timer (optional, configurable)
  - Pause/Resume functionality
- [ ] Store incomplete sessions in localStorage (can resume)
- [ ] Create `PracticeComplete` component (triggers debrief - Chunk 27)

**Deliverable:** `/web/src/components/practice/PracticeLauncher.tsx` and `/web/src/components/practice/PracticeSession.tsx`

**Depends On:** Chunk 25

**Acceptance Criteria (from P5):**
- Multiple practice modes (by stage, category, set piece, mixed)
- Timed mode optional
- Can pause and resume

---

### Chunk 27: Immediate Debrief (P6)

**Purpose:** Feedback flow immediately after completing a practice session.

**Tasks:**
- [ ] Create `DebriefSummary` component showing:
  - Overall score / completion rate
  - Time spent
  - Questions attempted vs skipped
- [ ] Create `QuestionDebrief` component for each question:
  - User's answer (or "skipped")
  - Ideal response / sample answer
  - Gap analysis (what was missing)
  - Link to relevant set piece category
- [ ] Create `PatternAnalysis` component:
  - "You struggled with X type questions"
  - "Your conflict resolution answers need work"
  - Charts/visuals for patterns
- [ ] Create `NextSteps` component:
  - "Review these 3 questions"
  - "Strengthen your [category] story"
  - Links to specific actions
- [ ] Add "Retry Missed Questions" button (starts new session with only missed)
- [ ] Save debrief to localStorage for later review
- [ ] Create debrief history view

**Deliverable:** `/web/src/components/practice/Debrief.tsx` and related components

**Depends On:** Chunk 26

**Acceptance Criteria (from P6):**
- Score/completion summary after each session
- Per-question breakdown with ideal response
- Pattern highlighting ("You struggled with X")
- Specific next steps with action links
- Retry missed questions option
- Save debrief for later review

---

### Chunk 28: Weak Point Dashboard (P7)

**Purpose:** Centralized view of user's weak areas with prioritized remediation links.

**Tasks:**
- [ ] Create `WeakPointsDashboard` page showing:
  - **Question Categories** - Below-average performance areas
  - **Specific Questions** - Questions missed multiple times
  - **Set Piece Gaps** - Categories without stories
  - **Incomplete Stages** - Stages not marked complete
- [ ] Implement priority scoring algorithm:
  - Weight by impact (more important categories higher)
  - Weight by recency (recent struggles higher)
  - Weight by frequency (repeated misses higher)
- [ ] Sort weak points by priority score
- [ ] One-click remediation links:
  - "Practice weak area" → launches practice session filtered to that area
  - "Build missing set piece" → opens SetPieceBuilder for that category
  - "Complete stage" → navigates to stage page
- [ ] Real-time updates as user improves (recalculate on each visit)
- [ ] Visual progress indicators (improving/stable/declining)

**Deliverable:** `/web/src/app/weak-points/page.tsx`

**Depends On:** Chunk 27

**Acceptance Criteria (from P7):**
- Summary view with all weak areas
- Sorted by priority/impact
- One-click jump to remediation
- Updates as user improves

---

## Phase 5: Content & Polish

### Chunk 29: Excellence Transcripts (J3)

**Purpose:** Create annotated examples of what excellent candidates say.

**Tasks:**
- [ ] Define transcript schema:
  - Interview type (behavioral, technical, case, culture fit)
  - Question asked
  - Full candidate response (verbatim)
  - Annotations (inline notes explaining why each part works)
  - Contrast response (optional weak answer for comparison)
- [ ] Create `TranscriptViewer` component:
  - Full Q&A display
  - Annotation highlights (click to see why it works)
  - Toggle to show/hide weak response contrast
- [ ] Write 10+ annotated transcripts:
  - 3 Behavioral (leadership, failure, teamwork)
  - 2 Technical explanation (algorithm walkthrough, system design)
  - 2 Case study (market sizing, profitability)
  - 2 Culture fit (why this company, career goals)
  - 1 Difficult question (weakness, fired/laid off)
- [ ] Add search/filter by question type
- [ ] Link transcripts to relevant stage pages
- [ ] Create `/web/src/data/transcripts.ts`

**Deliverable:** `/web/src/components/TranscriptViewer.tsx` and 10+ transcripts

**Depends On:** Chunk 21

**Acceptance Criteria (from J3):**
- Full Q&A transcript with annotations
- Contrast with weak responses where useful
- Cover: behavioral, technical, case, culture fit
- Minimum 2 transcripts per interview type
- Searchable/filterable

---

### Chunk 30: Interviewer Mindset Guide (H2)

**Purpose:** Help users understand how interviewers think and evaluate.

**Tasks:**
- [ ] Create `LessonCard` component (bite-sized lesson, 3-5 min read)
- [ ] Write 8-10 interviewer psychology lessons:
  1. How interviewers make decisions (first impressions, anchoring)
  2. What makes them advocate for a candidate (memorable moments)
  3. Red flags they watch for (negativity, vagueness, arrogance)
  4. How to recover from mistakes mid-interview
  5. The "airport test" and culture fit evaluation
  6. How technical interviewers assess problem-solving
  7. What interviewers discuss in debrief meetings
  8. Company-specific: Big Tech evaluation criteria
  9. Company-specific: Consulting evaluation criteria
  10. Company-specific: Finance evaluation criteria
- [ ] Link lessons to relevant stage pages (e.g., "Read this before your behavioral round")
- [ ] Track lesson completion
- [ ] Create `/web/src/data/interviewer-lessons.ts`

**Deliverable:** `/web/src/components/LessonCard.tsx` and 10 lessons

**Depends On:** Chunk 21

**Acceptance Criteria (from H2):**
- 8-10 short lessons on interviewer psychology
- Bite-sized format (3-5 min each)
- Accessible from stage pages where relevant

---

### Chunk 31: Reframing Negatives Module (H3)

**Purpose:** Teach users to handle difficult questions about failures and weaknesses.

**Tasks:**
- [ ] Create `ReframingScenario` component:
  - Difficult question (e.g., "Tell me about a failure")
  - Common bad approach (what most people do wrong)
  - Reframing strategy (how to turn it positive)
  - Example response (full answer showing the turn)
  - Practice exercise (user tries their own reframe)
- [ ] Write 8-10 reframing scenarios:
  1. "Tell me about a failure" → Growth and learning frame
  2. "What's your biggest weakness?" → Self-aware improvement frame
  3. "Why did you leave your last job?" → Positive opportunity frame
  4. "Why were you fired/laid off?" → Circumstances + lessons frame
  5. "Explain this gap in your resume" → Intentional choices frame
  6. "Why should we hire you over others?" → Unique value frame
  7. "Where do you see yourself in 5 years?" → Aligned ambition frame
  8. "Tell me about a conflict with your manager" → Professional resolution frame
  9. "What would your critics say about you?" → Balanced self-awareness frame
  10. "Why do you want to leave your current role?" → Growth-seeking frame
- [ ] Add practice mode: user writes their own reframed response
- [ ] Create `/web/src/data/reframing.ts`

**Deliverable:** `/web/src/components/ReframingScenario.tsx` and 10 scenarios

**Depends On:** Chunk 22 (uses intent system)

**Acceptance Criteria (from H3):**
- Cover: failures, weaknesses, job changes, gaps, fired/laid off
- Each has: reframing strategy, example response, practice exercise
- 8-10 scenarios total

---

## Phase 6: Navigation

### Chunk 32: Updated Information Architecture

**Purpose:** Restructure the app navigation to match the new IA.

**Tasks:**
- [ ] Update main navigation structure:
  ```
  Home: "Your Interview Prep"
  │
  ├── Interview Stages (main nav) ← Chunk 19
  │   ├── [Stage 1] with progress
  │   ├── [Stage 2] with progress
  │   └── [+ Add custom stage]
  │
  ├── Your Set Pieces (sidebar/tab) ← Chunk 24
  │   ├── [Category 1] ✓/empty
  │   └── ...
  │
  ├── Practice (quick access) ← Chunk 26
  │   ├── Quick drill
  │   ├── By stage
  │   ├── By category
  │   └── Weak points focus
  │
  └── Weak Points [N items] ← Chunk 28
  ```
- [ ] Update homepage to be "Your Interview Prep" dashboard:
  - Overall progress summary
  - Next recommended action
  - Quick links to each section
- [ ] Create responsive sidebar navigation
- [ ] Add breadcrumbs for nested pages
- [ ] Update all internal links to new structure
- [ ] Redirect old routes if needed (e.g., `/dashboard` → `/`)
- [ ] Mobile navigation (hamburger menu)
- [ ] Persist navigation state (which section expanded)

**Deliverable:** Updated navigation and homepage layout

**Depends On:** Chunks 19, 24, 26, 28 (all must be complete)

---

## Dependencies Graph

```
Chunk 18 (Schema)
    │
    ├──→ Chunk 19 (Stage Map)
    │        │
    │        └──→ Chunk 20 (Stage Template)
    │                  │
    │                  └──→ Chunk 21 (Stage Content)
    │                            │
    │                            ├──→ Chunk 22 (Intent Labels)
    │                            │        │
    │                            │        └──→ Chunk 23 (Categories Framework)
    │                            │                  │
    │                            │                  └──→ Chunk 24 (Set Piece Builder)
    │                            │                            │
    │                            │                            └──→ Chunk 25 (Category Practice)
    │                            │                                      │
    │                            │                                      └──→ Chunk 26 (Practice Sessions)
    │                            │                                                │
    │                            │                                                └──→ Chunk 27 (Debrief)
    │                            │                                                          │
    │                            │                                                          └──→ Chunk 28 (Weak Points)
    │                            │
    │                            ├──→ Chunk 29 (Transcripts) [can run parallel with 22-28]
    │                            │
    │                            └──→ Chunk 30 (Mindset Guide) [can run parallel with 22-28]
    │
    └──→ Chunk 31 (Reframing) [after Chunk 22]

Chunk 32 (Navigation) ──→ [Requires: 19, 24, 26, 28]
```

---

## Parallel Work Opportunities

These chunks can be worked on simultaneously:

**Track A (Core Flow):** 18 → 19 → 20 → 21 → 22 → 23 → 24 → 25 → 26 → 27 → 28 → 32

**Track B (Content - can start after 21):**
- Chunk 29 (Transcripts)
- Chunk 30 (Mindset Guide)
- Chunk 31 (Reframing) - needs Chunk 22 first

---

## Effort Estimates

| Chunk | Complexity | Primary Work |
|-------|------------|--------------|
| 18 | Low | TypeScript definitions |
| 19 | Medium | React components + localStorage |
| 20 | Medium | Page template + 7 section components |
| 21 | Medium | Content writing (5 stages) |
| 22 | Medium | Schema update + 60 question updates |
| 23 | Low | Data structure + documentation |
| 24 | High | Guided builder UI + state management |
| 25 | Medium | Practice game + progress tracking |
| 26 | High | Multiple practice modes + session management |
| 27 | High | Debrief UI + analysis logic |
| 28 | Medium | Dashboard + priority algorithm |
| 29 | Medium | Transcript component + content writing |
| 30 | Low | Lesson component + content writing |
| 31 | Medium | Reframing component + content writing |
| 32 | Medium | Navigation overhaul + routing |

---

## Key Concepts Reference

| Concept | Definition |
|---------|------------|
| **Stage** | A round in the interview process (phone screen, technical, etc.) |
| **Set Piece** | A reusable story the user prepares that can answer many questions |
| **Category** | A type of set piece (leadership, teamwork, failure, etc.) |
| **Intent** | What the interviewer is really assessing with a question |
| **Debrief** | Feedback after practice showing gaps and next steps |
| **Weak Point** | An area where user needs more practice |

---

## Files to Create (Summary)

```
web/src/
├── types/
│   └── v3.ts                          # Chunk 18
├── data/
│   ├── stages.ts                      # Chunk 21
│   ├── intents.ts                     # Chunk 22
│   ├── categories.ts                  # Chunk 23
│   ├── transcripts.ts                 # Chunk 29
│   ├── interviewer-lessons.ts         # Chunk 30
│   └── reframing.ts                   # Chunk 31
├── components/
│   ├── stages/
│   │   ├── StageMap.tsx               # Chunk 19
│   │   ├── StageCard.tsx              # Chunk 19
│   │   └── StageSections.tsx          # Chunk 20
│   ├── setpieces/
│   │   ├── SetPieceBuilder.tsx        # Chunk 24
│   │   ├── SetPieceCard.tsx           # Chunk 24
│   │   └── SetPieceList.tsx           # Chunk 24
│   ├── practice/
│   │   ├── PracticeLauncher.tsx       # Chunk 26
│   │   ├── PracticeSession.tsx        # Chunk 26
│   │   ├── CategoryMatchPractice.tsx  # Chunk 25
│   │   └── Debrief.tsx                # Chunk 27
│   ├── IntentLabel.tsx                # Chunk 22
│   ├── TranscriptViewer.tsx           # Chunk 29
│   ├── LessonCard.tsx                 # Chunk 30
│   └── ReframingScenario.tsx          # Chunk 31
└── app/
    ├── page.tsx                       # Chunk 32 (update)
    ├── stages/
    │   └── [stageId]/
    │       └── page.tsx               # Chunk 20
    └── weak-points/
        └── page.tsx                   # Chunk 28
```
