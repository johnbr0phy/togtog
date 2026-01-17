import { Module } from '@/types/journey';

export const amazonSdeModule: Module = {
  id: 'amazon-sde',
  slug: 'amazon-sde-specific',
  name: 'Amazon SDE Deep Dive',
  type: 'company-role',
  description: 'Amazon-specific strategies for software engineers',
  icon: '🎯',
  isFree: false, // PAID content
  steps: [
    {
      id: 'amazon-lp-stories',
      slug: 'lp-story-bank',
      title: 'Building Your LP Story Bank',
      subtitle: 'Prepare stories for each Leadership Principle',
      estimatedMinutes: 10,
      blocks: [
        {
          id: 'story-bank-intro',
          type: 'text',
          content: {
            markdown: `## The Story Bank Strategy

Amazon interviewers are trained to probe deeply. A surface-level STAR story won't survive the follow-up questions. You need a **bank of 2-3 stories per Leadership Principle** that you know inside and out.

This module will help you build and refine that story bank.`,
          },
        },
        {
          id: 'story-bank-tip',
          type: 'tip',
          content: {
            title: 'Quality Over Quantity',
            body: 'It\'s better to have 6-8 excellent stories that cover multiple LPs than 16 mediocre ones. One strong technical project might demonstrate Ownership, Dive Deep, Deliver Results, and Bias for Action.',
            variant: 'pro-tip',
          },
        },
        {
          id: 'story-bank-matrix',
          type: 'text',
          content: {
            markdown: `## Mapping Stories to LPs

Here's how to create your story matrix:

### Step 1: List Your Best 8-10 Experiences
Think about:
- Projects you led or significantly contributed to
- Times you failed and recovered
- Conflicts you navigated
- Times you went above and beyond
- Technical deep dives
- Customer-facing situations

### Step 2: Tag Each Story with LPs
Most good stories demonstrate 3-4 LPs. Map them out:

| Story | LPs Covered |
|-------|-------------|
| Payment system migration | Ownership, Dive Deep, Deliver Results |
| Team conflict resolution | Earn Trust, Have Backbone, Hire Best |
| Production incident | Bias for Action, Customer Obsession |

### Step 3: Find the Gaps
Look at your matrix. Which LPs have fewer than 2 stories? Those are your gaps. Either:
- Dig deeper into existing experiences
- Identify new stories you haven't considered`,
          },
        },
        {
          id: 'story-bank-exercise',
          type: 'exercise',
          content: {
            prompt: 'List 5 significant experiences from your career. For each one, note which Leadership Principles it could demonstrate.',
            placeholder: '1. [Experience]: [LPs it demonstrates]\n2. [Experience]: [LPs it demonstrates]\n3. [Experience]: [LPs it demonstrates]\n4. [Experience]: [LPs it demonstrates]\n5. [Experience]: [LPs it demonstrates]',
            minWords: 50,
            persistKey: 'amazon-story-bank-exercise',
          },
        },
        {
          id: 'story-bank-followups',
          type: 'text',
          content: {
            markdown: `## Surviving Follow-Up Questions

Amazon interviewers are trained to ask follow-up questions that go 3-4 levels deep:

- "What was YOUR specific contribution?"
- "What would you do differently?"
- "How did you measure success?"
- "What did you learn?"
- "How did you handle disagreement?"
- "What was the hardest part?"

**For each story, prepare answers to these questions in advance.**`,
          },
        },
      ],
    },
    {
      id: 'amazon-oa-deep-dive',
      slug: 'online-assessment',
      title: 'Crushing the Online Assessment',
      subtitle: 'Strategy for Amazon\'s OA',
      estimatedMinutes: 8,
      blocks: [
        {
          id: 'oa-intro',
          type: 'text',
          content: {
            markdown: `## The Amazon OA Structure

Amazon's Online Assessment is your first technical hurdle. Here's what to expect:

### Part 1: Coding Assessment (70 minutes)
- 2 coding problems
- Typically one medium, one medium-hard
- Test cases visible during submission
- Partial credit for passing some test cases

### Part 2: Work Style Assessment (15 minutes)
- Personality/work style questions
- Mapped to Leadership Principles
- No right/wrong answers, but consistency matters`,
          },
        },
        {
          id: 'oa-common-topics',
          type: 'text',
          content: {
            markdown: `## Common OA Problem Types

Based on analysis of recent Amazon OAs:

### Most Frequent Topics
1. **Arrays/Strings** - 40% of problems
2. **Trees/Graphs** - 25% of problems
3. **Dynamic Programming** - 20% of problems
4. **Sorting/Searching** - 15% of problems

### Common Problem Patterns
- Two pointers in sorted arrays
- BFS/DFS on grids or graphs
- Sliding window for subarray problems
- Priority queues for scheduling problems
- Union-Find for connected components`,
          },
        },
        {
          id: 'oa-tip-time',
          type: 'tip',
          content: {
            title: 'Time Management',
            body: 'Don\'t spend more than 35 minutes on the first problem. Even if you haven\'t fully solved it, move to problem 2. Partial solutions on both problems often score better than one perfect solution.',
            variant: 'warning',
          },
        },
        {
          id: 'oa-checklist',
          type: 'checklist',
          content: {
            title: 'OA Preparation Checklist',
            persistKey: 'amazon-oa-checklist',
            items: [
              { id: 'oa-1', text: 'Practice on Amazon\'s OA interface (HackerRank or similar)' },
              { id: 'oa-2', text: 'Complete 20+ medium LeetCode problems' },
              { id: 'oa-3', text: 'Complete 5+ Amazon-tagged LeetCode problems' },
              { id: 'oa-4', text: 'Practice with a 70-minute timer' },
              { id: 'oa-5', text: 'Review Big O complexity for all solutions' },
              { id: 'oa-6', text: 'Prepare your coding environment (IDE, language choice)' },
            ],
          },
        },
        {
          id: 'oa-work-style',
          type: 'text',
          content: {
            markdown: `## Work Style Assessment Tips

The work style assessment presents scenarios and asks how you'd respond. Key principles:

1. **Be Consistent** - Your answers should paint a consistent picture
2. **Think Customer** - When in doubt, choose the customer-focused option
3. **Bias for Action** - Prefer action over endless deliberation
4. **Ownership Mindset** - Take responsibility, don't blame others
5. **High Standards** - Don't settle for "good enough"

**Warning**: The assessment has validity checks. Extreme answers ("always" or "never") or inconsistent responses can flag your assessment.`,
          },
        },
      ],
    },
    {
      id: 'amazon-loop-strategies',
      slug: 'loop-strategies',
      title: 'On-site Loop Strategies',
      subtitle: 'How to ace your interview day',
      estimatedMinutes: 10,
      blocks: [
        {
          id: 'loop-intro',
          type: 'text',
          content: {
            markdown: `## The On-site Loop

The on-site (or virtual on-site) is your main event. You'll have 4-5 back-to-back interviews, each 45-60 minutes. Here's how to maximize your performance.`,
          },
        },
        {
          id: 'loop-schedule',
          type: 'text',
          content: {
            markdown: `## Typical Loop Structure

### For L4 (SDE I) / New Grad
1. Coding Interview #1 (45 min)
2. Coding Interview #2 (45 min)
3. Behavioral/LP Interview #1 (45 min)
4. Behavioral/LP Interview #2 (45 min) - often Bar Raiser

### For L5 (SDE II) and Above
1. Coding Interview (45 min)
2. System Design Interview (60 min)
3. Behavioral/LP Interview #1 (45 min)
4. Behavioral/LP Interview #2 (45 min)
5. Bar Raiser Interview (45 min)`,
          },
        },
        {
          id: 'loop-quote',
          type: 'quote',
          content: {
            quote: 'The hardest part of the loop isn\'t the technical difficulty - it\'s maintaining energy and enthusiasm across 5 hours of interviews. I\'ve seen technically strong candidates fade in the afternoon interviews.',
            author: 'David Park',
            role: 'Amazon Loop Lead, 100+ interviews',
          },
        },
        {
          id: 'loop-energy',
          type: 'tip',
          content: {
            title: 'Energy Management',
            body: 'Pack snacks and water. Use every break to reset mentally. The interview where you show fatigue is often the one that sinks you.',
            variant: 'info',
          },
        },
        {
          id: 'loop-per-interview',
          type: 'text',
          content: {
            markdown: `## Interview-by-Interview Strategy

### Coding Interviews
- First 5 min: Clarify the problem, ask questions
- Next 5 min: Talk through your approach before coding
- Next 25 min: Code while explaining
- Last 10 min: Test, handle edge cases, discuss complexity

### Behavioral Interviews
- Listen for the LP being tested
- Use STAR format
- Keep answers to 2-3 minutes
- Have follow-up details ready
- Ask clarifying questions if needed

### System Design
- Spend 5-10 min on requirements
- Draw high-level design first
- Be prepared to go deep on any component
- Always discuss trade-offs`,
          },
        },
        {
          id: 'loop-checklist',
          type: 'checklist',
          content: {
            title: 'Loop Day Checklist',
            persistKey: 'amazon-loop-day',
            items: [
              { id: 'loop-1', text: 'Get 8 hours of sleep the night before' },
              { id: 'loop-2', text: 'Eat a good breakfast with protein' },
              { id: 'loop-3', text: 'Arrive/log in 15 minutes early' },
              { id: 'loop-4', text: 'Have water and snacks ready' },
              { id: 'loop-5', text: 'Review your STAR stories one more time' },
              { id: 'loop-6', text: 'Prepare 2-3 questions for each interviewer' },
              { id: 'loop-7', text: 'Test your tech setup (virtual)' },
            ],
          },
        },
      ],
    },
    {
      id: 'amazon-bar-raiser-tactics',
      slug: 'bar-raiser-tactics',
      title: 'Bar Raiser Tactics',
      subtitle: 'Win over the interviewer with veto power',
      estimatedMinutes: 8,
      blocks: [
        {
          id: 'br-intro',
          type: 'text',
          content: {
            markdown: `## The Bar Raiser: Your Final Boss

The Bar Raiser (BR) is a specially trained interviewer from a different team. They have one job: ensure Amazon only hires people who will "raise the bar" - be better than 50% of current employees at that level.

**The BR has veto power.** Even if every other interviewer says hire, a BR "No Hire" will often reject the candidate.`,
          },
        },
        {
          id: 'br-what-they-look-for',
          type: 'text',
          content: {
            markdown: `## What Bar Raisers Look For

### 1. Long-term Thinking
- Will this person still be successful in 5 years?
- Do they show growth trajectory?
- Are they adaptable?

### 2. Deep LP Alignment
- Not just surface-level stories
- Genuine internalization of principles
- Consistent behavior patterns across stories

### 3. Self-Awareness
- Honest reflection on failures
- Understanding of weaknesses
- Ability to give and receive feedback

### 4. Curiosity
- Questions about Amazon's business
- Interest in learning
- Engagement with the interviewer`,
          },
        },
        {
          id: 'br-tip',
          type: 'tip',
          content: {
            title: 'The "Would I Want Them On My Team?" Test',
            body: 'BRs mentally ask: "Would I want this person on my team?" This is about collaboration, communication, and cultural fit as much as technical skills.',
            variant: 'pro-tip',
          },
        },
        {
          id: 'br-red-flags',
          type: 'text',
          content: {
            markdown: `## Red Flags That Trigger BR Concerns

### Immediate Red Flags
- Blaming others in stories
- Taking credit for team work
- Dismissing questions as irrelevant
- Lack of concrete details
- Inconsistent stories

### Subtle Red Flags
- Only having successes, no failures
- Answers that are too polished/rehearsed
- Not asking any questions about Amazon
- Showing no genuine curiosity
- Defensiveness when probed`,
          },
        },
        {
          id: 'br-exercise',
          type: 'exercise',
          content: {
            prompt: 'Write a brief answer to: "What is your biggest weakness?" - Make it genuine (not a humble brag) and include how you\'re actively working to improve.',
            placeholder: 'My biggest weakness is...\n\nHow it has impacted me...\n\nWhat I\'m doing to improve...',
            minWords: 75,
            maxWords: 200,
            persistKey: 'amazon-br-weakness',
          },
        },
        {
          id: 'br-closing',
          type: 'text',
          content: {
            markdown: `## Your Questions for the Bar Raiser

Always have thoughtful questions ready:

**Good Questions**:
- "What's been the most surprising thing about Amazon's culture?"
- "How do Leadership Principles show up in day-to-day work?"
- "What separates good performers from great performers here?"

**Avoid**:
- Questions easily answered on the website
- Compensation/benefits questions (save for recruiter)
- Negative questions about work-life balance`,
          },
        },
      ],
    },
  ],
};
