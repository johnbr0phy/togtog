import { Module } from '@/types/journey';

export const amazonCompanyModule: Module = {
  id: 'amazon-company',
  slug: 'amazon-company',
  name: 'Amazon Fundamentals',
  type: 'company',
  description: 'Understand Amazon\'s culture, history, and what they look for in candidates',
  icon: '📦',
  isFree: true,
  steps: [
    {
      id: 'amazon-history',
      slug: 'amazon-history',
      title: 'Amazon: From Garage to Global',
      subtitle: 'Understanding the company you\'re interviewing with',
      estimatedMinutes: 5,
      blocks: [
        {
          id: 'amazon-history-intro',
          type: 'text',
          content: {
            markdown: `## Why Company History Matters

Before you walk into any interview, you need to understand the company's DNA. Amazon interviewers **will** notice if you don't know basic facts about the company - it signals lack of preparation and genuine interest.

More importantly, understanding Amazon's history helps you understand *why* they interview the way they do.`,
          },
        },
        {
          id: 'amazon-history-video',
          type: 'video',
          content: {
            youtubeId: 'eOFbbLPSFTw',
            title: 'The History of Amazon in 10 Minutes',
            duration: '10:23',
          },
        },
        {
          id: 'amazon-history-facts',
          type: 'text',
          content: {
            markdown: `## Key Facts You Should Know

- **Founded**: July 5, 1994 by Jeff Bezos in his garage in Bellevue, Washington
- **Original Name**: Cadabra, Inc. (changed because it sounded like "cadaver")
- **First Product**: Books - Bezos chose books because of the huge selection possible
- **IPO**: May 15, 1997 at $18 per share
- **Current CEO**: Andy Jassy (since July 2021)
- **Employees**: Over 1.5 million globally
- **Revenue**: Over $500 billion annually`,
          },
        },
        {
          id: 'amazon-history-quiz',
          type: 'quiz',
          content: {
            question: 'When was Amazon founded?',
            options: [
              { id: 'q1-a', text: '1990', isCorrect: false },
              { id: 'q1-b', text: '1994', isCorrect: true },
              { id: 'q1-c', text: '1998', isCorrect: false },
              { id: 'q1-d', text: '2001', isCorrect: false },
            ],
            explanation:
              'Amazon was founded on July 5, 1994 by Jeff Bezos. This is a common phone screen question!',
            hint: 'Think mid-90s, before the dot-com boom really took off.',
          },
        },
        {
          id: 'amazon-history-tip',
          type: 'tip',
          content: {
            title: 'Phone Screen Alert',
            body: 'Recruiters often ask "What do you know about Amazon?" or "Why Amazon?" in the initial phone screen. Having these facts ready shows you\'ve done your homework.',
            variant: 'warning',
          },
        },
      ],
    },
    {
      id: 'amazon-leadership-principles',
      slug: 'leadership-principles-overview',
      title: 'The 16 Leadership Principles',
      subtitle: 'The foundation of every Amazon interview',
      estimatedMinutes: 8,
      blocks: [
        {
          id: 'lp-intro',
          type: 'text',
          content: {
            markdown: `## What Are Leadership Principles?

Amazon's 16 Leadership Principles (LPs) are the **single most important thing** to understand before your interview. They're not just corporate values - they're the actual criteria used to evaluate every candidate.

Every behavioral question you're asked will be designed to assess one or more LPs. Your answers will be scored against these principles.`,
          },
        },
        {
          id: 'lp-quote',
          type: 'quote',
          content: {
            quote: 'At Amazon, we don\'t have just one or two principles we focus on - we have 16, and we expect every Amazonian to embody all of them. When we interview, we\'re specifically looking for evidence of these principles in your past behavior.',
            author: 'Sarah Chen',
            role: 'Former Amazon Bar Raiser',
            source: 'LinkedIn',
          },
        },
        {
          id: 'lp-list',
          type: 'text',
          content: {
            markdown: `## The 16 Leadership Principles

### Customer Obsession
Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.

### Ownership
Leaders are owners. They think long term and don't sacrifice long-term value for short-term results.

### Invent and Simplify
Leaders expect and require innovation and invention from their teams and always find ways to simplify.

### Are Right, A Lot
Leaders are right a lot. They have strong judgment and good instincts.

### Learn and Be Curious
Leaders are never done learning and always seek to improve themselves.

### Hire and Develop the Best
Leaders raise the performance bar with every hire and promotion.

### Insist on the Highest Standards
Leaders have relentlessly high standards that many may think are unreasonably high.

### Think Big
Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction.

### Bias for Action
Speed matters in business. Many decisions are reversible and don't need extensive study.

### Frugality
Accomplish more with less. Constraints breed resourcefulness.

### Earn Trust
Leaders listen attentively, speak candidly, and treat others respectfully.

### Dive Deep
Leaders operate at all levels, stay connected to the details, and audit frequently.

### Have Backbone; Disagree and Commit
Leaders respectfully challenge decisions when they disagree, then commit wholly.

### Deliver Results
Leaders focus on the key inputs and deliver them with the right quality and in a timely fashion.

### Strive to be Earth's Best Employer
Leaders work every day to create a safer, more productive, and more diverse work environment.

### Success and Scale Bring Broad Responsibility
We started in a garage, but we're not there anymore. We must be humble and thoughtful about even secondary effects.`,
          },
        },
        {
          id: 'lp-tip',
          type: 'tip',
          content: {
            title: 'Pro Tip: Memorize These',
            body: 'You should be able to name all 16 Leadership Principles from memory. In the interview, you\'ll need to quickly identify which LP a question is targeting so you can tailor your answer.',
            variant: 'pro-tip',
          },
        },
        {
          id: 'lp-quiz',
          type: 'quiz',
          content: {
            question: 'Which Leadership Principle is being tested when an interviewer asks: "Tell me about a time you had to make a decision with incomplete information"?',
            options: [
              { id: 'lp-q1-a', text: 'Dive Deep', isCorrect: false },
              { id: 'lp-q1-b', text: 'Bias for Action', isCorrect: true },
              { id: 'lp-q1-c', text: 'Are Right, A Lot', isCorrect: false },
              { id: 'lp-q1-d', text: 'Ownership', isCorrect: false },
            ],
            explanation:
              '"Bias for Action" is about making decisions quickly when you don\'t have perfect information. The question is testing whether you can move forward with calculated risk.',
          },
        },
      ],
    },
    {
      id: 'amazon-interview-process',
      slug: 'interview-process',
      title: 'The Amazon Interview Process',
      subtitle: 'What to expect at each stage',
      estimatedMinutes: 6,
      blocks: [
        {
          id: 'process-intro',
          type: 'text',
          content: {
            markdown: `## The 5-Stage Interview Process

Amazon's interview process is structured and consistent. Here's what you'll experience:`,
          },
        },
        {
          id: 'process-stages',
          type: 'checklist',
          content: {
            title: 'Interview Stages',
            persistKey: 'amazon-interview-stages',
            items: [
              {
                id: 'stage-1',
                text: 'Stage 1: Recruiter Phone Screen (30 min)',
                detail: 'Basic qualification check, motivation questions, logistics discussion',
              },
              {
                id: 'stage-2',
                text: 'Stage 2: Online Assessment (OA)',
                detail: '2 coding problems + work style assessment. Usually 90-120 minutes.',
              },
              {
                id: 'stage-3',
                text: 'Stage 3: Phone/Video Technical Screen (45-60 min)',
                detail: '1-2 coding problems with a senior engineer. May include LP questions.',
              },
              {
                id: 'stage-4',
                text: 'Stage 4: On-site Loop (4-5 interviews)',
                detail: 'The main event. 2 coding, 1 system design (L5+), 2 behavioral rounds.',
              },
              {
                id: 'stage-5',
                text: 'Stage 5: Bar Raiser Interview',
                detail: 'Cross-team interviewer focused on long-term fit and LP evaluation.',
              },
            ],
          },
        },
        {
          id: 'process-bar-raiser',
          type: 'tip',
          content: {
            title: 'The Bar Raiser',
            body: 'The Bar Raiser is a specially trained interviewer from outside the hiring team. They have veto power and focus on whether you\'ll raise the bar for Amazon\'s talent. Don\'t underestimate this round.',
            variant: 'warning',
          },
        },
        {
          id: 'process-timeline',
          type: 'text',
          content: {
            markdown: `## Typical Timeline

- **Application to recruiter call**: 1-2 weeks
- **OA invitation**: Within 1 week of recruiter call
- **Phone screen scheduling**: 1-2 weeks after OA
- **On-site scheduling**: 1-2 weeks after phone screen
- **Decision after on-site**: 3-5 business days

**Total**: 4-8 weeks from application to offer`,
          },
        },
      ],
    },
    {
      id: 'amazon-who-youll-meet',
      slug: 'who-youll-meet',
      title: 'Who You\'ll Meet',
      subtitle: 'Understanding your interviewers',
      estimatedMinutes: 5,
      blocks: [
        {
          id: 'interviewers-intro',
          type: 'text',
          content: {
            markdown: `## Your Interview Panel

During the on-site loop, you'll meet 4-5 different interviewers. Each has a specific role:`,
          },
        },
        {
          id: 'interviewers-list',
          type: 'text',
          content: {
            markdown: `### The Hiring Manager
- Usually conducts one of the behavioral rounds
- Focused on team fit and your specific experience
- Will likely ask about your interest in their team's work
- **Tip**: Research their team's products before the interview

### Senior Engineers (2-3)
- Conduct coding and system design rounds
- Assess technical depth and problem-solving
- Look for how you communicate your thought process
- **Tip**: Think out loud - they want to see how you think

### The Bar Raiser
- From a completely different team
- Has veto power on hiring decisions
- Focuses heavily on Leadership Principles
- Conducts deep-dive behavioral questions
- **Tip**: They're looking for long-term Amazon fit, not just technical skills

### Loop Lead
- Coordinates the interview day
- May or may not interview you
- Collects feedback from all interviewers
- Makes the hiring recommendation`,
          },
        },
        {
          id: 'interviewers-quote',
          type: 'quote',
          content: {
            quote: 'As a Bar Raiser, I\'m not looking at whether you can do this specific job. I\'m looking at whether you\'ll still be successful at Amazon in 5 years, whether you\'ll help us maintain our culture, and whether I\'d want you on my team.',
            author: 'Marcus Johnson',
            role: 'Amazon Bar Raiser, 5+ years',
          },
        },
        {
          id: 'interviewers-tip',
          type: 'tip',
          content: {
            title: 'Everyone Has a Vote',
            body: 'Every interviewer submits independent written feedback before the debrief meeting. They vote Hire, No Hire, or Inclined/Not Inclined. One strong "No Hire" (especially from the Bar Raiser) can sink your candidacy.',
            variant: 'info',
          },
        },
      ],
    },
  ],
};
