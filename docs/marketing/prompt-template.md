# AI Marketing Copy Generation (C3)

> **Last Updated:** 2026-01-17
>
> Prompt templates and guidelines for generating landing page marketing copy at scale.

---

## Overview

This document defines the prompt templates, style guide, and quality standards for generating marketing copy for interview prep landing pages. Each landing page targets a specific company/role combination.

---

## Prompt Template

### Input Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{company}` | Target company name | Google, Amazon, McKinsey |
| `{role}` | Job title/position | Software Engineer, Product Manager, Consultant |
| `{industry}` | Industry category | Big Tech, Consulting, Finance, Healthcare |
| `{level}` | Experience level (optional) | Entry, Mid, Senior, Staff+ |
| `{interview_rounds}` | Number of interview rounds | 4, 5, 6 |
| `{unique_elements}` | Company-specific interview quirks | Leadership Principles, Googleyness, Case Interviews |
| `{prep_time}` | Typical preparation time | 6-8 weeks, 8-12 weeks |

### Master Prompt

```
You are an expert copywriter for an interview preparation platform. Generate marketing copy for a landing page targeting candidates preparing for {company} {role} interviews.

CONTEXT:
- Company: {company}
- Role: {role}
- Industry: {industry}
- Level: {level}
- Interview Rounds: {interview_rounds}
- Unique Elements: {unique_elements}
- Typical Prep Time: {prep_time}

VOICE & TONE:
- Confident but not arrogant
- Empathetic to candidate anxiety
- Data-driven and specific
- Action-oriented
- Professional but approachable

OUTPUT FORMAT:
Generate the following elements:

1. HEADLINE (max 60 characters)
   - Action-oriented, specific to company
   - Creates urgency or curiosity

2. SUBHEADLINE (max 150 characters)
   - Expands on the promise
   - Addresses the "how"

3. BULLET POINTS (exactly 3)
   - Each starts with action verb
   - Specific and tangible benefits
   - Mix of emotional and practical value

4. CTA TEXT (max 25 characters)
   - Action verb + benefit
   - Creates momentum

5. META DESCRIPTION (max 160 characters)
   - SEO-optimized
   - Includes company name and role
   - Clear value proposition

CONSTRAINTS:
- No hallucinated statistics or claims
- No guarantees of job offers
- No disparaging competitors
- Must be factually accurate about interview process
- Avoid clichés like "dream job" or "unlock your potential"

Respond in JSON format:
{
  "headline": "",
  "subheadline": "",
  "bullets": ["", "", ""],
  "cta_text": "",
  "meta_description": ""
}
```

---

## A/B Test Variants

### Variant A: Urgency Angle

**Focus:** Time pressure, competitive advantage, limited opportunity

**Prompt Modifier:**
```
ANGLE: Urgency
- Emphasize competitive job market
- Highlight that others are preparing now
- Use time-sensitive language
- Focus on not falling behind

TONE ADJUSTMENT:
- More assertive
- Creates healthy FOMO
- Emphasizes speed to readiness
```

**Example Output:**
- Headline: "Your Google Competitors Are Preparing Now"
- Subheadline: "Don't walk into your interview underprepared. Master the exact patterns Google asks in weeks, not months."
- CTA: "Start Today"

---

### Variant B: Expertise Angle

**Focus:** Insider knowledge, proven methods, expert-backed

**Prompt Modifier:**
```
ANGLE: Expertise
- Emphasize insider knowledge and proven methods
- Highlight expert sources and real interview data
- Focus on systematic approach
- Build credibility through specificity

TONE ADJUSTMENT:
- More authoritative
- Data-driven claims
- Emphasizes proven track record
```

**Example Output:**
- Headline: "The Google SWE Interview, Decoded"
- Subheadline: "Learn the exact coding patterns, system design frameworks, and behavioral strategies from engineers who've passed."
- CTA: "Get the Playbook"

---

### Variant C: Insider Knowledge Angle

**Focus:** Behind-the-scenes access, what interviewers actually look for

**Prompt Modifier:**
```
ANGLE: Insider Knowledge
- Emphasize "what they don't tell you"
- Focus on interviewer perspective
- Highlight hidden evaluation criteria
- Create sense of exclusive access

TONE ADJUSTMENT:
- More conspiratorial/exclusive
- "Us vs. them" framing (candidate vs. unknown process)
- Emphasizes revealed secrets
```

**Example Output:**
- Headline: "What Google Interviewers Actually Look For"
- Subheadline: "Go beyond LeetCode. Understand the hidden signals that separate 'hire' from 'no hire' decisions."
- CTA: "See the Criteria"

---

## Style Guide

### Brand Voice

| Attribute | Do | Don't |
|-----------|-----|-------|
| **Confident** | "Master the interview" | "Try to pass the interview" |
| **Specific** | "5 coding rounds, 2 behavioral" | "Multiple interview stages" |
| **Empathetic** | "Interview anxiety is real" | "Stop being nervous" |
| **Actionable** | "Practice these 50 patterns" | "Get better at coding" |
| **Honest** | "Comprehensive preparation" | "Guaranteed job offer" |

### Language Patterns

**Power Words to Use:**
- Master, Ace, Crack, Nail, Land
- Proven, Tested, Real, Actual
- Insider, Behind-the-scenes, What they look for
- Framework, System, Method, Playbook
- Comprehensive, Complete, Everything

**Words to Avoid:**
- Dream job, Unlock potential, Journey
- Easy, Simple, Quick fix
- Guaranteed, Promise, Always works
- Best, #1, Top-rated (without evidence)
- Hack, Trick, Cheat, Game the system

### Formatting Rules

1. **Headlines:** Title Case, No Period
2. **Subheadlines:** Sentence case, Period optional
3. **Bullets:** Start with verb, no ending punctuation
4. **CTA:** Title Case, No Period
5. **Numbers:** Use digits (5 rounds, not "five rounds")

---

## Quality Checklist

Before publishing any generated copy, verify:

### Accuracy
- [ ] Company name spelled correctly
- [ ] Role title matches industry standard
- [ ] Interview round count is accurate
- [ ] No fabricated statistics or claims
- [ ] Unique elements correctly attributed

### Brand Alignment
- [ ] Tone matches style guide
- [ ] No prohibited words/phrases
- [ ] Confident but not arrogant
- [ ] Empathetic to candidate experience

### Technical Requirements
- [ ] Headline ≤ 60 characters
- [ ] Subheadline ≤ 150 characters
- [ ] Exactly 3 bullet points
- [ ] CTA ≤ 25 characters
- [ ] Meta description ≤ 160 characters

### Legal/Compliance
- [ ] No job guarantees
- [ ] No false claims about success rates
- [ ] No trademark violations
- [ ] No disparagement of competitors

### SEO
- [ ] Company name in headline or subheadline
- [ ] Role title in meta description
- [ ] "Interview" keyword present
- [ ] Natural language (not keyword stuffed)

---

## Example Outputs

### Example 1: Google Software Engineer

**Inputs:**
```
company: Google
role: Software Engineer
industry: Big Tech
level: Mid
interview_rounds: 5
unique_elements: Googleyness, coding focus, system design
prep_time: 8-12 weeks
```

**Output (Expertise Angle):**
```json
{
  "headline": "Ace Your Google SWE Interview",
  "subheadline": "Master the coding patterns, system design frameworks, and Googleyness signals that separate hires from passes.",
  "bullets": [
    "Learn the 15 LeetCode patterns Google asks most frequently",
    "Practice system design with real Google-scale problems",
    "Nail behavioral questions with the Googleyness framework"
  ],
  "cta_text": "Start Preparing Now",
  "meta_description": "Comprehensive Google Software Engineer interview prep. Master coding, system design, and behavioral interviews with proven strategies."
}
```

### Example 2: McKinsey Consultant

**Inputs:**
```
company: McKinsey
role: Consultant
industry: Consulting
level: Entry
interview_rounds: 4
unique_elements: Case interviews, PEI, Problem Solving Test
prep_time: 8-12 weeks
```

**Output (Insider Knowledge Angle):**
```json
{
  "headline": "What McKinsey Interviewers Actually Evaluate",
  "subheadline": "Go beyond case frameworks. Understand the hidden criteria that determine hire vs. no-hire decisions.",
  "bullets": [
    "Decode the PEI: what 'personal impact' really means to McKinsey",
    "Master the 4 case types with interviewer-approved structures",
    "Build a story bank that demonstrates McKinsey's core values"
  ],
  "cta_text": "See the Criteria",
  "meta_description": "McKinsey consultant interview prep. Master case interviews, PEI, and the evaluation criteria interviewers actually use."
}
```

### Example 3: Amazon Software Engineer

**Inputs:**
```
company: Amazon
role: Software Engineer
industry: Big Tech
level: Entry
interview_rounds: 5
unique_elements: Leadership Principles, Bar Raiser, LP-focused behavioral
prep_time: 6-10 weeks
```

**Output (Urgency Angle):**
```json
{
  "headline": "Your Amazon Interview Is Closer Than You Think",
  "subheadline": "Master all 16 Leadership Principles before your loop. Candidates who prep LP stories get offers at 2x the rate.",
  "bullets": [
    "Build STAR stories for each of Amazon's 16 Leadership Principles",
    "Prepare for the Bar Raiser round that trips up most candidates",
    "Practice the coding patterns Amazon's SDE interviews favor"
  ],
  "cta_text": "Start Today",
  "meta_description": "Amazon Software Engineer interview prep. Master Leadership Principles, coding rounds, and the Bar Raiser with proven strategies."
}
```

---

## Implementation Notes

### Batch Generation Workflow

1. **Input:** CSV with company, role, industry, level, etc.
2. **Process:** Run prompt for each row with all 3 angles
3. **Output:** JSON file with 3 variants per position
4. **Review:** Human QA against checklist
5. **Select:** Choose best variant or A/B test

### Integration with Landing Pages

The generated copy maps directly to the `Position` type in `/web/src/lib/types.ts`:

```typescript
{
  headline: string;      // → Hero section H1
  subheadline: string;   // → Hero section subtitle
  bullets: string[];     // → Hero section bullet list
  ctaText: string;       // → CTA button text
  metaDescription: string; // → <meta name="description">
}
```

### Recommended A/B Test Plan

| Test | Variants | Success Metric |
|------|----------|----------------|
| 1 | Urgency vs. Expertise | Click-through rate |
| 2 | Winner vs. Insider | Click-through rate |
| 3 | Winning angle variations | Conversion rate |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-01-17 | Initial template created |
