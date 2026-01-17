import { Module } from '@/types/journey';

export const softwareEngineerModule: Module = {
  id: 'software-engineer-role',
  slug: 'software-engineer',
  name: 'SWE Interview Basics',
  type: 'role',
  description: 'Core concepts for software engineering interviews',
  icon: '💻',
  isFree: true,
  steps: [
    {
      id: 'swe-interview-types',
      slug: 'interview-types',
      title: 'Types of Technical Interviews',
      subtitle: 'What to expect in each round',
      estimatedMinutes: 5,
      blocks: [
        {
          id: 'types-intro',
          type: 'text',
          content: {
            markdown: `## The Three Pillars of SWE Interviews

Every major tech company tests software engineers on three core areas:

1. **Coding/Algorithms** - Can you solve problems?
2. **System Design** - Can you architect solutions?
3. **Behavioral** - Can you work effectively with others?

Let's break down what each involves.`,
          },
        },
        {
          id: 'types-coding',
          type: 'text',
          content: {
            markdown: `## Coding Interviews

**Format**: 45-60 minutes, 1-2 problems

**What They Test**:
- Data structures knowledge (arrays, trees, graphs, hashmaps)
- Algorithm design (sorting, searching, dynamic programming)
- Code quality and bug-free implementation
- Communication and problem-solving approach

**The Real Test**: It's not just about getting the right answer. Interviewers evaluate:
- How you clarify requirements
- How you break down problems
- How you handle hints
- How you test your solution`,
          },
        },
        {
          id: 'types-system-design',
          type: 'text',
          content: {
            markdown: `## System Design Interviews

**Format**: 45-60 minutes, 1 open-ended problem

**What They Test**:
- Ability to design large-scale systems
- Trade-off analysis
- Knowledge of distributed systems concepts
- Communication and whiteboarding skills

**Example Problems**:
- Design Twitter's feed
- Design a URL shortener
- Design a chat system
- Design an e-commerce inventory system

**Note**: System design is typically for L4+ (mid-level and above). New grads usually skip this round.`,
          },
        },
        {
          id: 'types-behavioral',
          type: 'text',
          content: {
            markdown: `## Behavioral Interviews

**Format**: 30-45 minutes of structured questions

**What They Test**:
- Past experiences that demonstrate key competencies
- Self-awareness and growth mindset
- Communication skills
- Cultural fit

**The STAR Method**: Your answers should follow this structure:
- **S**ituation - Set the context
- **T**ask - What was your responsibility
- **A**ction - What specifically did YOU do
- **R**esult - What was the measurable outcome`,
          },
        },
        {
          id: 'types-quiz',
          type: 'quiz',
          content: {
            question: 'In a typical coding interview, what percentage of your evaluation is based on getting the optimal solution?',
            options: [
              { id: 'types-q1-a', text: 'Over 80%', isCorrect: false },
              { id: 'types-q1-b', text: 'About 50%', isCorrect: false },
              { id: 'types-q1-c', text: 'About 30-40%', isCorrect: true },
              { id: 'types-q1-d', text: 'Under 20%', isCorrect: false },
            ],
            explanation:
              'While the solution matters, interviewers heavily weight your problem-solving process, communication, and how you handle the collaborative aspects. A candidate who gets a brute force solution but communicates brilliantly often outscores one who codes the optimal solution silently.',
          },
        },
      ],
    },
    {
      id: 'swe-coding-patterns',
      slug: 'coding-patterns',
      title: 'Essential Coding Patterns',
      subtitle: 'The patterns that solve 80% of problems',
      estimatedMinutes: 8,
      blocks: [
        {
          id: 'patterns-intro',
          type: 'text',
          content: {
            markdown: `## The 80/20 of Coding Interviews

You don't need to memorize 500 LeetCode problems. Instead, master these core patterns that appear in most interview questions:`,
          },
        },
        {
          id: 'patterns-list',
          type: 'text',
          content: {
            markdown: `## The Essential Patterns

### 1. Two Pointers
**When to use**: Sorted arrays, finding pairs, palindromes
**Example**: Find two numbers that sum to target

### 2. Sliding Window
**When to use**: Contiguous subarray/substring problems
**Example**: Find longest substring without repeating characters

### 3. Binary Search
**When to use**: Sorted arrays, finding boundaries
**Example**: Search in rotated sorted array

### 4. BFS/DFS
**When to use**: Trees, graphs, matrices
**Example**: Find all paths from root to leaf

### 5. Dynamic Programming
**When to use**: Optimization problems, counting problems
**Example**: Coin change, longest increasing subsequence

### 6. Hashmaps
**When to use**: Frequency counting, lookups
**Example**: Two sum, group anagrams

### 7. Recursion with Memoization
**When to use**: Overlapping subproblems
**Example**: Fibonacci, climbing stairs`,
          },
        },
        {
          id: 'patterns-tip',
          type: 'tip',
          content: {
            title: 'Pattern Recognition',
            body: 'When you see a new problem, don\'t immediately start coding. Ask: "Which pattern does this remind me of?" This single skill will 10x your interview performance.',
            variant: 'pro-tip',
          },
        },
        {
          id: 'patterns-checklist',
          type: 'checklist',
          content: {
            title: 'Pattern Mastery Checklist',
            persistKey: 'swe-patterns-checklist',
            items: [
              { id: 'p1', text: 'Two Pointers - Can solve 3+ problems without hints' },
              { id: 'p2', text: 'Sliding Window - Understand fixed vs dynamic window' },
              { id: 'p3', text: 'Binary Search - Can implement from scratch' },
              { id: 'p4', text: 'BFS - Can implement level-order traversal' },
              { id: 'p5', text: 'DFS - Can implement pre/in/post order traversal' },
              { id: 'p6', text: 'Dynamic Programming - Can identify DP problems' },
              { id: 'p7', text: 'Hashmaps - Know when to use vs arrays' },
            ],
          },
        },
      ],
    },
    {
      id: 'swe-system-design-basics',
      slug: 'system-design-basics',
      title: 'System Design Fundamentals',
      subtitle: 'Core concepts you need to know',
      estimatedMinutes: 7,
      blocks: [
        {
          id: 'sd-intro',
          type: 'text',
          content: {
            markdown: `## System Design in 30 Seconds

System design interviews test whether you can take a vague, open-ended problem and design a scalable solution. The key is having a structured approach.`,
          },
        },
        {
          id: 'sd-framework',
          type: 'text',
          content: {
            markdown: `## The RESHADED Framework

Use this framework to structure every system design interview:

### R - Requirements
- Clarify functional requirements (what should it do?)
- Clarify non-functional requirements (scale, latency, consistency)

### E - Estimation
- Back-of-envelope calculations
- QPS, storage, bandwidth

### S - Storage
- Database choice (SQL vs NoSQL)
- Schema design

### H - High-level Design
- Draw the boxes and arrows
- Identify main components

### A - API Design
- Define the key endpoints
- Request/response formats

### D - Detailed Design
- Dive deep into 1-2 components
- Handle edge cases

### E - Evaluate
- Identify bottlenecks
- Discuss trade-offs

### D - Deploy & Monitor
- Deployment strategy
- Key metrics to track`,
          },
        },
        {
          id: 'sd-concepts',
          type: 'text',
          content: {
            markdown: `## Must-Know Concepts

- **Load Balancing** - Distributing traffic across servers
- **Caching** - Redis, Memcached, CDNs
- **Database Sharding** - Horizontal partitioning
- **Replication** - Master-slave, master-master
- **CAP Theorem** - Consistency, Availability, Partition tolerance
- **Message Queues** - Kafka, RabbitMQ, SQS
- **Microservices** - Service decomposition
- **API Gateway** - Rate limiting, authentication`,
          },
        },
        {
          id: 'sd-tip',
          type: 'tip',
          content: {
            title: 'Don\'t Skip Requirements',
            body: 'Candidates who jump straight into drawing boxes always struggle. Spend 5+ minutes clarifying requirements. It shows maturity and prevents you from designing the wrong system.',
            variant: 'warning',
          },
        },
      ],
    },
    {
      id: 'swe-star-method',
      slug: 'star-method',
      title: 'Mastering the STAR Method',
      subtitle: 'Structure your behavioral answers',
      estimatedMinutes: 6,
      blocks: [
        {
          id: 'star-intro',
          type: 'text',
          content: {
            markdown: `## Why STAR Matters

Rambling, unstructured answers are the #1 reason candidates fail behavioral rounds. The STAR method gives you a framework to tell compelling stories in under 3 minutes.`,
          },
        },
        {
          id: 'star-breakdown',
          type: 'text',
          content: {
            markdown: `## Breaking Down STAR

### S - Situation (15-20 seconds)
Set the scene. Keep it brief.
- What company/team were you on?
- What was the context?
- What was at stake?

**Bad**: "So I was working at this startup, and we had this problem..."
**Good**: "At my previous company, a Series B fintech startup, our payment processing system was experiencing 30% failure rates."

### T - Task (10-15 seconds)
What was YOUR specific responsibility?
- What were you asked to do?
- What was your role?

**Key**: Use "I" not "we" - interviewers want to know YOUR contribution.

### A - Action (60-90 seconds)
This is the meat. What specifically did YOU do?
- Walk through your approach step by step
- Explain your reasoning
- Include technical details if relevant

### R - Result (20-30 seconds)
Quantify the impact.
- What was the measurable outcome?
- What did you learn?
- Would you do anything differently?`,
          },
        },
        {
          id: 'star-example',
          type: 'text',
          content: {
            markdown: `## Example STAR Answer

**Question**: "Tell me about a time you had to deal with a difficult deadline."

**S**: "Last quarter at Acme Corp, our team was asked to deliver a critical feature for our largest customer - a migration of 10 million records to a new data format - two weeks ahead of schedule because the customer moved up their launch date."

**T**: "As the tech lead, I was responsible for figuring out how to compress a 6-week project into 4 weeks without compromising quality or burning out the team."

**A**: "I took three key actions. First, I re-scoped with the PM - we identified that 3 of the 8 planned features were nice-to-haves, not must-haves, and got customer buy-in to defer them. Second, I redesigned our testing strategy - instead of end-to-end tests, we focused on critical path testing which cut QA time by 40%. Third, I brought in one additional engineer from another team for two weeks, which I negotiated with their manager by offering to help them with their next sprint."

**R**: "We delivered on time with zero critical bugs in production. The customer signed a 2-year renewal worth $2M. I learned that the key to tight deadlines isn't working harder - it's ruthless prioritization and creative resourcing."`,
          },
        },
        {
          id: 'star-exercise',
          type: 'exercise',
          content: {
            prompt: 'Write a STAR answer for: "Tell me about a time you made a mistake at work." Focus on a genuine mistake and what you learned.',
            placeholder: 'S: Situation - What was the context?\n\nT: Task - What were you responsible for?\n\nA: Action - What did you do after the mistake?\n\nR: Result - What was the outcome and what did you learn?',
            minWords: 100,
            maxWords: 300,
            persistKey: 'star-mistake-exercise',
          },
        },
      ],
    },
  ],
};
