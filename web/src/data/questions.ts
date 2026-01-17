import { Question } from '../lib/types';

// Sample questions from the question bank for the free tier preview
// Full access requires purchase

export const sampleQuestions: Question[] = [
  // Behavioral Questions
  {
    id: 'qb-univ-beh-006',
    type: 'behavioral',
    questionText: 'Tell me about a time you led a project or team.',
    context: 'This question assesses leadership capabilities regardless of formal management title.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:behavioral', 'skill:leadership'],
    sampleAnswer: `Situation: Last year, our team was tasked with migrating our payment system to a new provider within 6 weeks before our contract expired. The project had been delayed twice before due to lack of clear ownership.

Task: I volunteered to lead the migration even though I wasn't the most senior engineer, because I had experience with the new provider from a previous role. My goal was to deliver the migration with zero downtime and no customer impact.

Action: I started by creating a detailed project plan with clear milestones and owners for each component. I set up daily standups to surface blockers quickly. When our database team pushed back on the timeline, I worked with them to understand their concerns and we agreed on a phased approach that addressed their risks. I also created a runbook for the cutover and ran two dry-run migrations on staging to build team confidence.

Result: We completed the migration in 5 weeks with zero downtime. The phased approach we developed became the template for future migrations. I was asked to lead two subsequent infrastructure projects based on this experience.`,
    evaluationCriteria: [
      'Clear personal ownership and initiative',
      'Specific leadership actions (not just coordination)',
      'Evidence of influencing others',
      'Quantified positive outcome'
    ],
    isPremiumAnswer: true
  },
  {
    id: 'qb-univ-beh-007',
    type: 'behavioral',
    questionText: 'Tell me about a time you had a conflict with a coworker. How did you resolve it?',
    context: 'This question assesses collaboration and conflict resolution skills.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:behavioral', 'skill:collaboration', 'skill:communication'],
    sampleAnswer: `Situation: On my previous team, a senior engineer and I had a significant disagreement about the architecture for a new feature. He wanted to use a microservices approach, while I believed a monolithic solution would ship faster and be easier to maintain at our scale. The disagreement was creating tension and blocking the project.

Task: As the feature lead, I needed to resolve the conflict quickly while maintaining a good working relationship. We couldn't afford to lose either perspective or let the project stall.

Action: I asked him to grab coffee away from the team to discuss. I started by genuinely trying to understand his concerns—it turned out he'd been burned by monolithic technical debt at a previous company. I acknowledged his experience and shared my reasoning about our current scale. I proposed we create a decision matrix together, evaluating both approaches against our actual constraints. We agreed on objective criteria: time to market, maintenance burden, and ability to scale if needed.

Result: The framework showed that a modular monolith with clear boundaries addressed both our concerns. He appreciated that I'd taken time to understand his perspective rather than just pushing my view. We ended up with a better architecture than either original proposal, and we've collaborated smoothly since then.`,
    evaluationCriteria: [
      'Genuine conflict (not superficial disagreement)',
      'Empathy and effort to understand other perspective',
      'Professional approach focused on issues not personalities',
      'Constructive resolution with maintained/improved relationship'
    ],
    isPremiumAnswer: true
  },
  {
    id: 'qb-univ-beh-008',
    type: 'behavioral',
    questionText: 'Tell me about a time you failed. What did you learn?',
    context: 'This question assesses self-awareness, resilience, and growth mindset.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:behavioral', 'skill:adaptability', 'skill:problem-solving'],
    sampleAnswer: `Situation: Early in my career, I was responsible for launching a feature that I thought was fully tested. I was eager to ship and skipped some of the manual testing steps I'd planned because automated tests were passing.

Task: I owned the feature end-to-end, including quality assurance before release. We had committed to a launch date with the marketing team.

Action: I pushed to production on Thursday afternoon. Within hours, we started getting customer complaints about a critical bug in an edge case my automated tests didn't cover. The bug affected about 5% of users but included some of our largest customers. I had to work through the weekend to fix it and personally emailed affected customers to apologize.

Result: We lost one mid-sized customer who was already considering alternatives. More importantly, I damaged my team's trust and our relationship with marketing. The learning that stuck with me: automated tests are necessary but not sufficient, and never ship before a weekend. Since then, I've built proper testing checklists and established a 'no Friday deploys' norm on teams I've led.`,
    evaluationCriteria: [
      'Genuine failure with real consequences',
      'Honest accountability (not blaming others)',
      'Specific learning extracted from the experience',
      'Evidence of applying the learning going forward'
    ],
    isPremiumAnswer: true
  },

  // Technical Questions
  {
    id: 'qb-tech-001',
    type: 'multiple_choice',
    questionText: 'What is the time complexity of searching for an element in a hash table?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:technical', 'skill:data-structures', 'topic:hash-tables'],
    options: [
      'O(1) average, O(n) worst case',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 0,
    explanation: 'Hash tables provide O(1) average-case lookup by computing an index from the key\'s hash. Worst case is O(n) if all keys hash to the same bucket (collision), but this is rare with good hash functions.',
    isPremiumAnswer: false
  },
  {
    id: 'qb-tech-003',
    type: 'multiple_choice',
    questionText: 'What is the difference between a process and a thread?',
    difficulty: 'intermediate',
    companies: ['all'],
    tags: ['interview:technical', 'skill:systems', 'topic:concurrency'],
    options: [
      'Processes are faster than threads',
      'Threads share memory space within a process; processes have separate memory spaces',
      'Threads can only exist on multi-core systems',
      'Processes are a type of thread'
    ],
    correctAnswer: 1,
    explanation: 'A process has its own memory space, while threads within a process share the same memory. This makes thread communication easier but requires synchronization. Processes are more isolated but have higher overhead for communication.',
    isPremiumAnswer: false
  },

  // Situational Questions
  {
    id: 'qb-sit-001',
    type: 'situational',
    questionText: 'You discover a critical bug in production on Friday at 5 PM. Your team has plans for the weekend. What do you do?',
    context: 'Tests judgment, prioritization, and work-life balance considerations.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 5,
    companies: ['all'],
    tags: ['interview:situational', 'skill:judgment', 'skill:leadership'],
    sampleAnswer: `First, I'd assess the severity: How many users affected? Is there a workaround? What's the business impact? If it's truly critical (data loss, security, major revenue impact), I'd communicate to the team transparently about the situation and ask for volunteers rather than demanding everyone stay. I'd look for a quick mitigation (feature flag, rollback) to reduce impact while we work on a proper fix. If severity allows, I might implement the mitigation myself and schedule the full fix for Monday with fresh minds.`,
    evaluationCriteria: [
      'Assess severity before making decisions',
      'Communicate transparently with team',
      'Consider temporary mitigations',
      'Balance urgency with sustainability'
    ],
    isPremiumAnswer: true
  },

  // Company-Specific: Google
  {
    id: 'qb-google-001',
    type: 'behavioral',
    questionText: 'Tell me about a time you used data to make a decision.',
    context: 'Google values data-driven decision making ("Googleyness").',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:google'],
    tags: ['interview:behavioral', 'skill:problem-solving', 'google:googleyness'],
    sampleAnswer: `Situation: We were debating whether to rebuild our legacy API or incrementally improve it. The team was split, with strong opinions on both sides.

Task: I volunteered to bring data to the discussion instead of continuing to debate opinions.

Action: I analyzed three months of API logs to understand usage patterns. I found that 80% of traffic used just 15% of endpoints, and 40% of the codebase supported rarely-used features. I also surveyed the top 10 API consumers about pain points. I created a cost model comparing: maintain as-is, incremental improvement, and full rebuild.

Result: The data showed incremental improvement on high-traffic endpoints would deliver 90% of user value at 30% of rebuild cost. The team aligned behind this approach quickly once we had shared facts. We shipped improvements in 6 weeks that reduced p99 latency by 50%.`,
    evaluationCriteria: [
      'Proactive data gathering',
      'Appropriate analysis methods',
      'Data changed the conversation',
      'Clear outcome driven by data'
    ],
    isPremiumAnswer: true
  },

  // Company-Specific: Amazon
  {
    id: 'qb-amazon-001',
    type: 'behavioral',
    questionText: 'Tell me about a time you simplified a process or eliminated unnecessary complexity.',
    context: 'Amazon Leadership Principle: Invent and Simplify.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:amazon'],
    tags: ['interview:behavioral', 'skill:problem-solving', 'amazon:invent-simplify'],
    sampleAnswer: `Situation: Our deployment process required 23 manual steps across 4 different tools, took 3 hours, and failed about 20% of the time due to human error. Engineers dreaded deployments.

Task: I took ownership of simplifying this even though 'it had always been this way' and others had accepted the complexity.

Action: I mapped every step and identified which were actually necessary vs. legacy artifacts. I found that 8 steps were for a system we'd deprecated years ago, and 6 others could be automated. I built a single deployment script that handled the essential steps, added validation gates to catch errors early, and created a one-page runbook for the remaining manual steps. I got buy-in by showing the team a demo rather than asking for permission first.

Result: Deployments dropped from 3 hours to 25 minutes. Failure rate went from 20% to near zero. We went from deploying weekly (because it was painful) to daily. The approach was adopted by two other teams.`,
    evaluationCriteria: [
      'Identified unnecessary complexity',
      'Took initiative despite "that\'s how it\'s done"',
      'Measurable simplification',
      'Scaled the improvement'
    ],
    isPremiumAnswer: true
  },

  // Case Study
  {
    id: 'qb-case-001',
    type: 'case_study',
    questionText: 'Your client is a mid-sized retail chain experiencing declining foot traffic. Online sales have grown 15% but in-store sales dropped 25%. How would you approach this problem?',
    context: 'Classic consulting case testing structured problem-solving and business acumen.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 20,
    companies: ['company:mckinsey', 'company:bcg', 'company:bain'],
    tags: ['interview:case', 'skill:problem-solving', 'industry:retail'],
    frameworkHint: 'Consider using a profitability or market analysis framework',
    keyAreas: [
      'Market trends analysis',
      'Customer segmentation',
      'Channel strategy',
      'Cost structure'
    ],
    sampleAnswer: `1. Clarify: Ask about store locations, customer demographics, competitor actions
2. Hypothesize: The shift may be due to changing consumer preferences, competitor moves, or operational issues
3. Analyze: Break down by customer segment, geography, product category
4. Synthesize: Recommend omnichannel strategy, store format optimization, or targeted marketing`,
    evaluationCriteria: [
      'Structured approach with clear framework',
      'Asks clarifying questions before diving in',
      'Considers multiple hypotheses',
      'Quantifies impact where possible',
      'Provides actionable recommendations'
    ],
    isPremiumAnswer: true
  },

  // Culture Fit
  {
    id: 'qb-culture-001',
    type: 'culture_fit',
    questionText: 'What type of work environment do you thrive in?',
    context: 'Assesses self-awareness and cultural alignment.',
    difficulty: 'beginner',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:culture', 'skill:self-awareness'],
    sampleAnswer: `I do my best work in environments that balance autonomy with collaboration. I like having clear goals and the freedom to figure out how to achieve them, but I also value being able to bounce ideas off teammates and get feedback. I thrive with some structure—regular check-ins and clear priorities—but too much process slows me down. For example, at my last company, I appreciated our weekly syncs but also had flexibility to manage my own time day-to-day.`,
    evaluationCriteria: [
      'Self-awareness about work style',
      'Honesty (not just telling them what they want to hear)',
      'Specific examples'
    ],
    isPremiumAnswer: true
  }
];

// Helper functions
export function getQuestionsForPosition(positionSlug: string): Question[] {
  // Filter questions relevant to a position
  const companyMap: Record<string, string> = {
    'google-software-engineer': 'company:google',
    'amazon-software-engineer': 'company:amazon',
    'mckinsey-consultant': 'company:mckinsey'
  };

  const companyTag = companyMap[positionSlug];

  return sampleQuestions.filter(q =>
    q.companies.includes('all') ||
    (companyTag && q.companies.includes(companyTag))
  );
}

export function getFreeQuestions(): Question[] {
  // Return questions that can be fully viewed for free
  return sampleQuestions.filter(q => !q.isPremiumAnswer);
}

export function getQuestionsByType(type: Question['type']): Question[] {
  return sampleQuestions.filter(q => q.type === type);
}

export function getQuestionsByDifficulty(difficulty: Question['difficulty']): Question[] {
  return sampleQuestions.filter(q => q.difficulty === difficulty);
}
