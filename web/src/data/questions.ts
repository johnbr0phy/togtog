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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They want to see if you can influence outcomes and people without relying on formal authority.",
      strongAnswersDemonstrate: [
        "Taking initiative without being asked",
        "Influencing others through persuasion, not mandate",
        "Making decisions and owning consequences",
        "Creating structure where none existed"
      ],
      weakAnswersReveal: [
        "Confusing coordination with leadership",
        "Waiting for permission to act",
        "Taking credit for team work without showing personal contribution",
        "Inability to influence without authority"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They want to see how you handle disagreement without damaging relationships or avoiding necessary conflict.",
      strongAnswersDemonstrate: [
        "Separating the person from the problem",
        "Genuine effort to understand opposing viewpoints",
        "Finding creative solutions that address multiple concerns",
        "Maintaining professionalism under emotional pressure"
      ],
      weakAnswersReveal: [
        "Avoiding conflict entirely (I never have conflicts)",
        "Blaming the other person without self-reflection",
        "Escalating to management as first response",
        "Winning the argument but losing the relationship"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're testing your self-awareness, humility, and ability to learn from mistakes rather than repeat them.",
      strongAnswersDemonstrate: [
        "Choosing a real failure with meaningful stakes",
        "Taking full accountability without excuses",
        "Extracting specific, actionable lessons",
        "Showing evidence of changed behavior"
      ],
      weakAnswersReveal: [
        "Disguising a success as a failure (I worked too hard)",
        "Blaming circumstances or other people",
        "Superficial learning without behavior change",
        "Inability to acknowledge personal shortcomings"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're evaluating your judgment, prioritization skills, and whether you can balance urgency with sustainable team practices.",
      strongAnswersDemonstrate: [
        "Structured approach to severity assessment",
        "Creative problem-solving (mitigation strategies)",
        "Respect for team wellbeing while maintaining accountability",
        "Clear communication with stakeholders"
      ],
      weakAnswersReveal: [
        "Knee-jerk reactions without assessment",
        "Ignoring team impact entirely",
        "Inability to make decisions under pressure",
        "Either extreme: panic or complacency"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Google wants to see if you default to evidence over opinion and can use data to persuade others.",
      strongAnswersDemonstrate: [
        "Proactively seeking data rather than relying on intuition",
        "Choosing appropriate metrics and analysis methods",
        "Using data to align stakeholders rather than just justify positions",
        "Being willing to change your mind when data contradicts assumptions"
      ],
      weakAnswersReveal: [
        "Cherry-picking data to support existing beliefs",
        "Analysis paralysis—gathering data but not acting",
        "Ignoring qualitative signals in favor of easy metrics",
        "Inability to translate data into actionable decisions"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Amazon wants to see if you challenge status quo complexity and relentlessly simplify for customers and teammates.",
      strongAnswersDemonstrate: [
        "Questioning 'how things have always been done'",
        "Measuring complexity and simplification objectively",
        "Taking action without waiting for permission",
        "Scaling improvements beyond original scope"
      ],
      weakAnswersReveal: [
        "Accepting unnecessary complexity as inevitable",
        "Adding complexity in the name of 'best practices'",
        "Focusing on technical elegance over user impact",
        "Waiting for others to identify problems"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Consultancies want to see if you can structure ambiguous problems, think commercially, and communicate complex analysis clearly.",
      strongAnswersDemonstrate: [
        "Clarifying before diving into analysis",
        "Using frameworks without being rigid about them",
        "Quantifying impact and sizing opportunities",
        "Synthesizing analysis into clear recommendations"
      ],
      weakAnswersReveal: [
        "Jumping to solutions before understanding the problem",
        "Over-reliance on memorized frameworks",
        "Inability to handle ambiguity",
        "Analysis without actionable recommendations"
      ]
    }
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
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're checking if you'll actually fit their environment and whether you're self-aware enough to know what you need.",
      strongAnswersDemonstrate: [
        "Genuine self-awareness about work preferences",
        "Specificity rather than generic answers",
        "Nuanced understanding (not just 'I'm flexible')",
        "Evidence of having thrived in described conditions"
      ],
      weakAnswersReveal: [
        "Telling them what you think they want to hear",
        "Claiming to thrive in any environment",
        "Lack of self-reflection about work style",
        "Inability to articulate specific needs"
      ]
    }
  },

  // Additional STAR Method Questions
  {
    id: 'qb-univ-beh-001',
    type: 'multiple_choice',
    questionText: 'In the STAR method, what percentage of your answer should focus on the Action component?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:behavioral', 'format:practice'],
    options: ['10-15%', '25-30%', '50-60%', '70-80%'],
    correctAnswer: 2,
    explanation: 'The Action section should comprise 50-60% of your answer. This is where you demonstrate your skills, judgment, and approach—the core of what interviewers want to assess.',
    isPremiumAnswer: false
  },
  {
    id: 'qb-univ-beh-002',
    type: 'multiple_choice',
    questionText: 'What is the ideal total length for a STAR-formatted behavioral answer?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:behavioral', 'format:practice'],
    options: ['30 seconds to 1 minute', '2-3 minutes', '5-7 minutes', 'As long as needed to tell the full story'],
    correctAnswer: 1,
    explanation: 'Behavioral answers should be 2-3 minutes. Under 2 minutes typically lacks depth, while over 3 minutes risks losing the interviewer\'s attention. Practice with a timer to calibrate.',
    isPremiumAnswer: false
  },
  {
    id: 'qb-univ-beh-003',
    type: 'multiple_choice',
    questionText: 'Which of the following is the BEST example of a quantified Result?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:behavioral', 'format:practice'],
    options: [
      'The project was successful and everyone was happy',
      'We reduced page load time by 40%, improving user retention by 15%',
      'The feature launched on time',
      'My manager said it was one of the best projects they\'d seen'
    ],
    correctAnswer: 1,
    explanation: 'Quantified results with specific metrics (40% reduction, 15% improvement) are most compelling. They provide concrete evidence of impact rather than subjective assessments.',
    isPremiumAnswer: false
  },

  // More Behavioral Questions
  {
    id: 'qb-univ-beh-016',
    type: 'behavioral',
    questionText: 'Tell me about a time you had to make a decision with incomplete information.',
    context: 'This question assesses decision-making under uncertainty and risk tolerance.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:behavioral', 'skill:problem-solving', 'skill:leadership'],
    sampleAnswer: `Situation: We had a production incident affecting 10% of users, and I was the on-call engineer. Logs suggested either a database issue or a third-party API failure, but I couldn't definitively determine which without more investigation that would take 30+ minutes.

Task: I needed to restore service quickly. Every minute of downtime was costing us roughly $5,000 in lost transactions. I had to decide whether to roll back our recent deployment, switch to backup database, or fail over to our secondary API provider.

Action: I quickly assessed the probability of each cause based on available data. The deployment was 3 days old with no previous issues, making it unlikely. The third-party API had been flaky recently. I decided to fail over to the secondary API provider—it was the fastest to implement and had the highest probability of being the root cause. I documented my reasoning in our incident channel so the team knew my thinking.

Result: The failover resolved the issue within 5 minutes. Post-incident analysis confirmed the third-party API was the cause. My manager appreciated that I documented my reasoning, which helped us improve our runbook for similar situations.`,
    evaluationCriteria: [
      'Clear articulation of uncertainty',
      'Logical framework for decision-making',
      'Appropriate risk assessment',
      'Ownership of the decision regardless of outcome'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They want to see if you can take decisive action under uncertainty without being paralyzed or reckless.",
      strongAnswersDemonstrate: [
        "Clear framework for decision-making under uncertainty",
        "Appropriate risk assessment and mitigation",
        "Bias toward action with reversible decisions",
        "Ownership of outcomes regardless of result"
      ],
      weakAnswersReveal: [
        "Analysis paralysis—waiting for perfect information",
        "Making decisions without considering risk",
        "Blaming uncertainty for poor outcomes",
        "Inability to explain reasoning behind decisions"
      ]
    }
  },
  {
    id: 'qb-univ-beh-017',
    type: 'behavioral',
    questionText: 'Describe a time when you went above and beyond what was expected.',
    context: 'This question assesses initiative, ownership, and work ethic.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['all', 'company:amazon'],
    tags: ['interview:behavioral', 'skill:leadership', 'amazon:ownership'],
    sampleAnswer: `Situation: I was assigned to fix a bug in our checkout flow that was causing about 2% of transactions to fail. The ticket estimated 4 hours of work.

Task: My official task was just to fix the specific bug, but when I started investigating, I noticed the checkout code had several other potential issues that could cause similar problems in the future.

Action: After fixing the assigned bug in about 3 hours, I spent an additional day refactoring the checkout error handling. I added comprehensive logging, created a dashboard to monitor checkout failures in real-time, and documented the common failure modes I'd discovered. I then wrote up a brief proposal for the team on how we could prevent similar issues going forward.

Result: The immediate bug fix worked, but the monitoring dashboard caught two other issues in the following week before they became customer-facing problems. My proposal was adopted as a standard practice for critical user flows, and I was asked to present the approach to our sister team.`,
    evaluationCriteria: [
      'Clear distinction between expected and actual effort',
      'Strategic thinking about broader impact',
      'Self-motivation (not just responding to requests)',
      'Measurable positive outcome beyond the original ask'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're assessing if you take ownership beyond your job description and proactively create value.",
      strongAnswersDemonstrate: [
        "Self-initiated effort beyond requirements",
        "Strategic thinking about broader impact",
        "Genuine initiative (not just working more hours)",
        "Creating lasting value beyond immediate task"
      ],
      weakAnswersReveal: [
        "Equating 'above and beyond' with just working overtime",
        "Taking on extra work without strategic purpose",
        "Waiting to be asked before taking initiative",
        "Unable to distinguish expected work from exceptional contribution"
      ]
    }
  },
  {
    id: 'qb-univ-beh-018',
    type: 'behavioral',
    questionText: 'Tell me about a time you received critical feedback. How did you respond?',
    context: 'This question assesses coachability, self-awareness, and growth mindset.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:behavioral', 'skill:adaptability', 'skill:communication'],
    sampleAnswer: `Situation: During a performance review, my manager told me that while my technical work was strong, I had a reputation for being dismissive of others' ideas in code reviews. This was hard to hear because I thought I was just being thorough.

Task: I needed to understand if this perception was accurate and, if so, change my behavior without compromising code quality standards.

Action: First, I asked my manager for specific examples to understand the pattern. I realized I often rejected ideas without fully explaining my reasoning. I started a personal practice: before rejecting an approach in a review, I'd write out the pros and cons and ensure I acknowledged what I liked about the approach before explaining concerns. I also asked a trusted colleague to give me feedback on my reviews for a month.

Result: After three months, my manager mentioned that multiple people had commented on my improved collaboration. My code review approval rate stayed the same, but feedback from teammates was much more positive. I learned that being right technically isn't enough—how you communicate matters as much as what you communicate.`,
    evaluationCriteria: [
      'Genuine critical feedback (not minor)',
      'Mature initial response (not defensive)',
      'Concrete actions taken to address feedback',
      'Evidence of actual behavior change'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're testing if you're coachable and can improve based on feedback rather than becoming defensive.",
      strongAnswersDemonstrate: [
        "Choosing genuinely critical feedback",
        "Non-defensive initial response",
        "Seeking to understand before responding",
        "Concrete evidence of changed behavior"
      ],
      weakAnswersReveal: [
        "Dismissing or minimizing feedback",
        "Becoming defensive or making excuses",
        "Superficial acceptance without real change",
        "Inability to receive negative feedback gracefully"
      ]
    }
  },

  // More Technical Questions
  {
    id: 'qb-tech-004',
    type: 'multiple_choice',
    questionText: 'What is the primary benefit of using an index in a database?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:technical', 'skill:databases', 'topic:indexing'],
    options: [
      'Reduces storage space',
      'Speeds up write operations',
      'Speeds up read queries on indexed columns',
      'Ensures data integrity'
    ],
    correctAnswer: 2,
    explanation: 'Indexes create a data structure (typically B-tree) that allows the database to find rows faster without scanning the entire table. However, indexes add overhead to writes and consume additional storage.',
    isPremiumAnswer: false
  },
  {
    id: 'qb-tech-005',
    type: 'multiple_choice',
    questionText: 'What is a RESTful API?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:technical', 'skill:web', 'topic:api-design'],
    options: [
      'An API that uses only GET requests',
      'An architectural style using stateless HTTP operations on resources',
      'An API that returns only JSON',
      'An API that requires authentication'
    ],
    correctAnswer: 1,
    explanation: 'REST (Representational State Transfer) is an architectural style where APIs are stateless and operate on resources using standard HTTP methods (GET, POST, PUT, DELETE). Resources are identified by URLs.',
    isPremiumAnswer: false
  },
  {
    id: 'qb-tech-006',
    type: 'multiple_choice',
    questionText: 'What is the purpose of a load balancer?',
    difficulty: 'beginner',
    companies: ['all'],
    tags: ['interview:technical', 'skill:systems', 'topic:distributed-systems'],
    options: [
      'To encrypt traffic between servers',
      'To distribute incoming traffic across multiple servers',
      'To cache frequently accessed data',
      'To monitor server health only'
    ],
    correctAnswer: 1,
    explanation: 'A load balancer distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed. This improves availability, reliability, and performance.',
    isPremiumAnswer: false
  },

  // More Amazon Questions
  {
    id: 'qb-amazon-002',
    type: 'behavioral',
    questionText: 'Tell me about a time you took on something significant outside your area of responsibility.',
    context: 'Amazon Leadership Principle: Ownership.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:amazon'],
    tags: ['interview:behavioral', 'skill:leadership', 'amazon:ownership'],
    sampleAnswer: `Situation: I noticed our customer churn had spiked 15% but no one was investigating because it fell between the product and customer success teams' responsibilities. Each thought the other was handling it.

Task: Though I was an engineer with no direct customer responsibility, I decided to investigate because it was clearly hurting the company and no one else was acting.

Action: I pulled churn data and correlated it with product usage patterns. I surveyed recently churned customers (after getting OK from customer success). I found that a feature change we'd made 2 months prior had broken a workflow that power users depended on—but they hadn't complained, they'd just left. I presented findings to both teams and proposed a fix.

Result: We restored the workflow and recovered about 30% of churned customers through outreach. The VP of Product mentioned the investigation in an all-hands as an example of ownership.`,
    evaluationCriteria: [
      'Acted beyond job description',
      'Company-level thinking',
      'Navigated cross-functional boundaries',
      'Significant positive outcome'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Amazon tests whether you think like an owner and act on company problems even when 'not your job'.",
      strongAnswersDemonstrate: [
        "Acting beyond formal responsibilities",
        "Company-level thinking over team-level",
        "Navigating organizational boundaries effectively",
        "Long-term impact over short-term credit"
      ],
      weakAnswersReveal: [
        "Staying in lane even when company needs help",
        "Waiting for permission to address problems",
        "Focusing only on team metrics",
        "Inability to operate cross-functionally"
      ]
    }
  },
  {
    id: 'qb-amazon-003',
    type: 'behavioral',
    questionText: 'Tell me about a time you made a decision that was unpopular but you believed was right.',
    context: 'Amazon Leadership Principle: Have Backbone; Disagree and Commit.',
    difficulty: 'advanced',
    estimatedTimeMinutes: 3,
    companies: ['company:amazon'],
    tags: ['interview:behavioral', 'skill:leadership', 'amazon:have-backbone'],
    sampleAnswer: `Situation: My team wanted to adopt a trendy new framework that would require rewriting significant portions of our codebase. Everyone was excited about learning it, and saying 'no' felt like being the boring person.

Task: I believed the rewrite wasn't justified by any business need and would delay our roadmap by months. I needed to voice dissent without damaging team morale.

Action: I wrote a document comparing our current stack with the proposed one across dimensions that mattered: development velocity, hiring, maintenance burden, and learning curve. I showed that our current stack was actually better for our specific use case. I presented this to the team, acknowledging the appeal of the new technology while focusing on business outcomes.

Result: After discussion, the team agreed to stay with our current stack. A few months later, we heard another team that had adopted the new framework struggled with unexpected complexity.`,
    evaluationCriteria: [
      'Clear, principled reasoning',
      'Data-driven advocacy',
      'Respectful disagreement',
      'Commitment to outcome over popularity'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Amazon wants leaders who voice dissent constructively but commit fully once decisions are made.",
      strongAnswersDemonstrate: [
        "Principled disagreement backed by evidence",
        "Respectful advocacy without damaging relationships",
        "Commitment once decision is made (even if you disagreed)",
        "Courage to voice unpopular but correct positions"
      ],
      weakAnswersReveal: [
        "Going along to get along",
        "Continuing to undermine after decision is made",
        "Being confrontational without substance",
        "Inability to separate ideas from egos"
      ]
    }
  },

  // More Google Questions
  {
    id: 'qb-google-002',
    type: 'behavioral',
    questionText: 'Describe a time you had to make a decision without all the information you wanted.',
    context: 'Google values "bias to action" balanced with analytical rigor.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:google'],
    tags: ['interview:behavioral', 'skill:problem-solving', 'google:googleyness'],
    sampleAnswer: `Situation: During a production incident, we had to decide whether the root cause was our recent deployment or a third-party service issue. Full investigation would take 2+ hours, but users were affected now.

Task: As the on-call engineer, I needed to decide whether to rollback our deployment (safe but slow to re-deploy if wrong) or wait for more data.

Action: I applied a quick heuristic: what's the cost of each wrong decision? Rolling back unnecessarily cost 4 hours to re-deploy. Not rolling back when we should meant continued user impact. I also looked at circumstantial evidence: the third-party service had been stable for months while our deployment was hours old. I decided to rollback.

Result: The rollback fixed the issue. Post-mortem showed it was indeed our code. I documented my decision framework for future on-call engineers.`,
    evaluationCriteria: [
      'Clear reasoning under uncertainty',
      'Appropriate risk assessment',
      'Bias to action with mitigation',
      'Learning applied forward'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Google assesses if you can balance analytical rigor with bias to action when perfect data isn't available.",
      strongAnswersDemonstrate: [
        "Structured approach to uncertainty",
        "Cost-benefit analysis of different choices",
        "Making reversible decisions quickly",
        "Documenting reasoning for future learning"
      ],
      weakAnswersReveal: [
        "Paralysis waiting for complete information",
        "Reckless action without considering risks",
        "Inability to make decisions without certainty",
        "Not learning from past decisions"
      ]
    }
  },
  {
    id: 'qb-google-003',
    type: 'behavioral',
    questionText: 'Tell me about something you\'ve built that you\'re proud of.',
    context: 'Google assesses technical accomplishment and passion for building.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:google'],
    tags: ['interview:behavioral', 'skill:problem-solving', 'google:googleyness'],
    sampleAnswer: `Situation: Our team was spending 5+ hours weekly manually generating reports from multiple data sources. The process was error-prone and everyone dreaded report week.

Task: I proposed building an automated reporting pipeline. No one asked me to—I saw the problem and decided to solve it.

Action: I designed a system using Python and Airflow that pulled from our three data sources, validated data quality, generated reports, and emailed stakeholders. The interesting technical challenge was handling the inconsistent schemas across sources. I documented it thoroughly so others could maintain it.

Result: Reports now generate automatically overnight with zero manual intervention. We reclaimed 260+ hours annually across the team. I'm proud because it wasn't my job, I solved it end-to-end, and it's still running two years later.`,
    evaluationCriteria: [
      'Technical depth and quality',
      'Initiative and ownership',
      'Clear impact',
      'Pride in craftsmanship'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "Google wants to see genuine passion for building and whether you create things that matter without being asked.",
      strongAnswersDemonstrate: [
        "Self-initiated building (not just assigned work)",
        "Technical depth and craftsmanship",
        "Genuine enthusiasm for the work",
        "Sustainable impact over time"
      ],
      weakAnswersReveal: [
        "Only building when assigned",
        "Surface-level technical work",
        "Inability to articulate what makes work meaningful",
        "Building for resume rather than impact"
      ]
    }
  },

  // More McKinsey Questions
  {
    id: 'qb-mckinsey-002',
    type: 'behavioral',
    questionText: 'Describe a time when you created impact in an organization or community.',
    context: 'McKinsey Personal Experience Interview (PEI) - Personal Impact dimension.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:mckinsey'],
    tags: ['interview:behavioral', 'skill:leadership', 'mckinsey:pei'],
    sampleAnswer: `Situation: I noticed that our company's engineering blog had been dormant for 18 months despite having talented engineers. When I asked why, people said 'no time' and 'I don't know what to write about.'

Task: I believed a strong engineering blog would help recruiting, establish thought leadership, and give engineers professional development. I wanted to revive it without it feeling like extra work.

Action: I created a 'blog from your work' system: I interviewed engineers about interesting problems they'd already solved and ghostwrote first drafts for them to refine. I also got leadership to allow 4 hours monthly for blog work.

Result: Within 6 months, we had 12 posts from 8 different authors. Our careers page traffic increased 40%, and 3 candidates mentioned the blog as why they applied. The system is now self-sustaining without my involvement.`,
    evaluationCriteria: [
      'Self-initiated impact',
      'Creative problem-solving',
      'Quantifiable results',
      'Sustainable change'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "McKinsey assesses whether you create lasting change and can mobilize others toward a shared goal.",
      strongAnswersDemonstrate: [
        "Creating change beyond your formal role",
        "Mobilizing others toward shared goals",
        "Sustainable impact that outlasts your involvement",
        "Creative approaches to systemic problems"
      ],
      weakAnswersReveal: [
        "Impact only within narrow job scope",
        "Changes that depend entirely on your continued involvement",
        "Inability to influence without authority",
        "Short-term wins without lasting change"
      ]
    }
  },
  {
    id: 'qb-mckinsey-003',
    type: 'behavioral',
    questionText: 'Tell me about a time you set a challenging goal for yourself and achieved it.',
    context: 'McKinsey Personal Experience Interview (PEI) - Entrepreneurial Drive dimension.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 3,
    companies: ['company:mckinsey'],
    tags: ['interview:behavioral', 'skill:adaptability', 'mckinsey:pei'],
    sampleAnswer: `Situation: I set a goal to pass the CFA Level 1 exam while working full-time as a software engineer, with no finance background. Most candidates are finance professionals who study 300+ hours.

Task: I wanted to broaden my skillset and prove I could master a completely new domain. Success meant passing on the first attempt within 6 months.

Action: I created a detailed study plan working backwards from the exam date, allocating 15 hours weekly. I identified my weakest areas (accounting, fixed income) and front-loaded them. When I fell behind due to a work crunch, I gave up a vacation to catch up.

Result: I passed in the top quartile. Beyond the credential, I proved to myself that I could master unfamiliar material through structured effort. This gave me confidence to later take on a product role that seemed outside my background.`,
    evaluationCriteria: [
      'Self-imposed ambitious goal',
      'Structured approach',
      'Resilience through obstacles',
      'Achievement and learning'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "McKinsey tests for entrepreneurial drive—the internal motivation to set and achieve ambitious goals.",
      strongAnswersDemonstrate: [
        "Self-set ambitious goals (not assigned)",
        "Structured approach to achievement",
        "Perseverance through setbacks",
        "Learning and growth from the journey"
      ],
      weakAnswersReveal: [
        "Goals set by others (externally motivated)",
        "Giving up when facing obstacles",
        "Setting easily achievable goals",
        "Achievement without personal growth"
      ]
    }
  },

  // Situational Questions
  {
    id: 'qb-sit-002',
    type: 'situational',
    questionText: 'Your manager asks you to implement a feature in a way you believe is technically wrong. How do you handle it?',
    context: 'Tests communication, influence, and professional judgment.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 5,
    companies: ['all'],
    tags: ['interview:situational', 'skill:communication', 'skill:judgment'],
    sampleAnswer: `I'd start by making sure I understand their reasoning—there might be context I'm missing (timeline pressure, strategic considerations, constraints I don't see). I'd then share my concerns with specifics: 'I'm worried this approach will cause X problem because Y. Could we consider Z instead?' If they still want to proceed their way and it's not a critical issue, I'd disagree and commit—document my concerns and execute well. If it's a serious issue (security, data integrity), I'd escalate appropriately.`,
    evaluationCriteria: [
      'Seek to understand their perspective first',
      'Present concerns with data/evidence',
      'Offer alternatives',
      'Know when to disagree and commit'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They want to see if you can challenge authority constructively without being insubordinate or passive.",
      strongAnswersDemonstrate: [
        "Seeking to understand before disagreeing",
        "Constructive pushback with evidence",
        "Proposing alternatives, not just objections",
        "Knowing when to commit after disagreeing"
      ],
      weakAnswersReveal: [
        "Immediately complying without voicing concerns",
        "Confrontational pushback without substance",
        "Passive-aggressive compliance",
        "Continuing to resist after decision is final"
      ]
    }
  },
  {
    id: 'qb-sit-003',
    type: 'situational',
    questionText: 'A colleague takes credit for your work in a team meeting. How do you respond?',
    context: 'Tests interpersonal skills and conflict navigation.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 5,
    companies: ['all'],
    tags: ['interview:situational', 'skill:collaboration', 'skill:communication'],
    sampleAnswer: `In the moment, I wouldn't call them out publicly—that creates awkwardness and escalates unnecessarily. Afterward, I'd have a private conversation: 'Hey, I noticed in the meeting you presented the X analysis. I actually put that together—was there a miscommunication?' This assumes positive intent while making my contribution clear. If it was accidental, they'll likely apologize and correct it. If it becomes a pattern, I'd document my work more visibly and mention it to my manager as a pattern, not a single incident.`,
    evaluationCriteria: [
      'Don\'t react emotionally in the moment',
      'Address privately first',
      'Assume positive intent initially',
      'Focus on future prevention'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're testing emotional intelligence and whether you can handle workplace politics professionally.",
      strongAnswersDemonstrate: [
        "Emotional regulation in the moment",
        "Addressing issues directly but privately",
        "Assuming positive intent initially",
        "Focusing on prevention over retaliation"
      ],
      weakAnswersReveal: [
        "Publicly confronting the colleague",
        "Passive avoidance of the issue",
        "Immediate escalation to management",
        "Holding grudges or seeking revenge"
      ]
    }
  },
  {
    id: 'qb-sit-004',
    type: 'situational',
    questionText: 'You\'re leading a project and realize you won\'t meet the deadline. What do you do?',
    context: 'Tests ownership, communication, and problem-solving under pressure.',
    difficulty: 'intermediate',
    estimatedTimeMinutes: 5,
    companies: ['all'],
    tags: ['interview:situational', 'skill:leadership', 'skill:communication'],
    sampleAnswer: `First rule: communicate early, not at the deadline. I'd assess the gap—how much more time do we need and why? Then I'd go to stakeholders with options: 'We're tracking to miss by X days. Here are three options: (1) reduce scope to features A and B, deliver on time; (2) add resources from team Y, deliver 3 days late; (3) full scope, 7 days late. I recommend option 1 because...' Taking ownership while providing choices makes the conversation productive rather than just delivering bad news.`,
    evaluationCriteria: [
      'Early communication (don\'t wait until deadline)',
      'Come with options, not just problems',
      'Take ownership without blame',
      'Propose mitigation plan'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're assessing if you take ownership of problems and communicate proactively rather than hiding issues.",
      strongAnswersDemonstrate: [
        "Early communication before deadline arrives",
        "Bringing solutions not just problems",
        "Taking ownership without blame-shifting",
        "Providing clear options for stakeholders"
      ],
      weakAnswersReveal: [
        "Waiting until the last minute to communicate",
        "Hiding problems hoping they'll resolve",
        "Blaming team or circumstances",
        "Inability to provide mitigation options"
      ]
    }
  },

  // More Culture Fit
  {
    id: 'qb-culture-002',
    type: 'culture_fit',
    questionText: 'How do you handle stress and tight deadlines?',
    context: 'Assesses resilience and self-management.',
    difficulty: 'beginner',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:culture', 'skill:resilience'],
    sampleAnswer: `I actually perform well under pressure—it helps me focus. That said, I've learned to manage stress proactively. When facing tight deadlines, I immediately prioritize ruthlessly and communicate with stakeholders about what's realistic. I break work into smaller chunks so I can see progress. I also make sure to maintain basics like sleep and exercise because I know my judgment deteriorates without them.`,
    evaluationCriteria: [
      'Show you have coping strategies',
      'Give a real example',
      'Acknowledge stress is normal'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They want to know if you have self-awareness about stress and sustainable strategies to perform under pressure.",
      strongAnswersDemonstrate: [
        "Self-awareness about stress triggers",
        "Concrete coping strategies",
        "Ability to prioritize under pressure",
        "Maintaining quality despite deadlines"
      ],
      weakAnswersReveal: [
        "Claiming you never get stressed (not believable)",
        "No concrete strategies for managing pressure",
        "Burning out or becoming ineffective under stress",
        "Stress causing interpersonal problems"
      ]
    }
  },
  {
    id: 'qb-culture-003',
    type: 'culture_fit',
    questionText: 'What motivates you in your work?',
    context: 'Assesses intrinsic motivation and values alignment.',
    difficulty: 'beginner',
    estimatedTimeMinutes: 3,
    companies: ['all'],
    tags: ['interview:culture', 'skill:self-awareness'],
    sampleAnswer: `I'm most motivated by solving meaningful problems and seeing tangible impact from my work. I love the moment when something I built helps a user accomplish their goal—that direct feedback loop is energizing. I'm also motivated by learning; I get restless if I'm not growing. At my last job, I was most engaged when working on our checkout optimization because I could see conversion rates improve weekly based on changes I made.`,
    evaluationCriteria: [
      'Be genuine—forced answers are obvious',
      'Connect to the specific role',
      'Show depth beyond surface motivators'
    ],
    isPremiumAnswer: true,
    intent: {
      hiddenIntent: "They're checking if your motivations align with what the role actually offers day-to-day.",
      strongAnswersDemonstrate: [
        "Genuine intrinsic motivations",
        "Connection between motivation and role",
        "Depth beyond obvious answers (money, prestige)",
        "Self-awareness about what energizes you"
      ],
      weakAnswersReveal: [
        "Generic motivations that could apply anywhere",
        "Motivations that don't match role reality",
        "Only extrinsic motivators (title, compensation)",
        "Lack of self-knowledge about drivers"
      ]
    }
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
