/**
 * Stage data and helpers
 * Full content for 5 core interview stages
 */

import { InterviewStage, ChecklistItem } from '../types';

// Helper to generate checklist items
function makeChecklist(items: string[]): ChecklistItem[] {
  return items.map((text, i) => ({
    id: `item-${i + 1}`,
    text,
    completed: false,
  }));
}

/**
 * Full stage data with content
 */
export const STAGES: InterviewStage[] = [
  // =========================================================================
  // PHONE SCREEN
  // =========================================================================
  {
    id: 'phone-screen',
    name: 'Phone Screen',
    slug: 'phone-screen',
    format: '30-45 min video or phone call',
    duration: '30-45 minutes',
    whoYouMeet: 'Recruiter or Hiring Manager',
    order: 1,

    overview: `The phone screen is typically your first live conversation with the company. It's a filtering stage designed to quickly assess whether you meet the basic requirements and are worth bringing in for more intensive interviews. The conversation is usually casual but structured, covering your background, interest in the role, and logistical fit (salary expectations, start date, location). While it feels low-stakes, this is where most candidates are eliminated—often for easily avoidable reasons.`,

    hiddenIntent: `They're not deeply evaluating your skills yet. They're checking: Can this person communicate clearly? Do they seem genuinely interested? Are there any obvious red flags? Will they waste the team's time in later rounds?`,

    assessments: [
      'Communication clarity and professionalism',
      'Genuine interest in the role and company',
      'Basic qualification match (experience, skills)',
      'Cultural fit signals (attitude, energy)',
      'Logistical alignment (salary, location, timeline)',
      'Red flag detection (negativity, job-hopping patterns)',
    ],

    howToPrepare: [
      'Research the company thoroughly—know their products, recent news, competitors, and mission. Interviewers notice when you haven\'t done basic homework.',
      'Prepare your "tell me about yourself" response (2 minutes max). Focus on relevant experience and why you\'re interested in THIS role.',
      'Have 3-5 thoughtful questions ready about the role, team, or company. "What does success look like in the first 90 days?" shows you\'re thinking ahead.',
      'Know your numbers: current/expected salary, notice period, and availability. Hesitation here creates doubt.',
      'Test your technology 15 minutes early. Bad audio or video creates an immediately negative impression.',
      'Find a quiet space with good lighting. Background noise and dark rooms are distracting.',
      'Have your resume and the job description open for reference.',
      'Prepare a concise explanation for any resume gaps or job changes.',
    ],

    commonMistakes: [
      'Rambling answers that go over 2 minutes. Recruiters screen dozens of candidates and value conciseness.',
      'Speaking negatively about current or past employers. Even if justified, it raises red flags about your professionalism.',
      'Not having questions prepared. "No questions" signals low interest or poor preparation.',
      'Being vague about salary expectations. Know your range and state it confidently.',
      'Treating it as "just a recruiter call." Recruiters have significant influence on whether you advance.',
      'Poor audio/video quality or distracting background. It suggests you don\'t take the opportunity seriously.',
      'Interrupting the interviewer. Let them finish before responding.',
      'Forgetting the company name or mixing up details. It happens more than you\'d think.',
    ],

    checklist: makeChecklist([
      'I\'ve researched the company (products, news, mission, competitors)',
      'I can deliver my "tell me about yourself" in under 2 minutes',
      'I have 3-5 thoughtful questions prepared',
      'I know my salary expectations and can state them confidently',
      'I\'ve tested my video/audio setup',
      'I have a quiet, well-lit space for the call',
      'I can explain any resume gaps or job changes positively',
      'I have the job description and my resume accessible',
      'I\'ve set a calendar reminder 15 minutes before',
      'I\'ve prepared a brief explanation of why I want THIS specific role',
    ]),
  },

  // =========================================================================
  // TECHNICAL ROUND
  // =========================================================================
  {
    id: 'technical',
    name: 'Technical Round',
    slug: 'technical',
    format: '45-60 min coding + discussion',
    duration: '45-60 minutes',
    whoYouMeet: 'Senior Engineer or Tech Lead',
    order: 2,

    overview: `The technical round evaluates your hands-on engineering abilities. Depending on the company, this might involve live coding (solving algorithmic problems while sharing your screen), system design (architecting a solution to a complex problem), or technical discussion (deep-diving into your past projects). Most companies use a combination. The interviewer is watching not just whether you get the right answer, but how you think, communicate, and handle being stuck.`,

    hiddenIntent: `They're evaluating your problem-solving process more than the final answer. Can you break down ambiguous problems? Do you think out loud so they can follow your reasoning? How do you handle hints? Do you write clean, working code under pressure? Would you be someone they'd want to debug a production issue with at 2am?`,

    assessments: [
      'Problem-solving approach and structured thinking',
      'Coding ability (syntax, correctness, efficiency)',
      'Communication while working (thinking out loud)',
      'Handling ambiguity and asking clarifying questions',
      'Response to hints and feedback',
      'Code quality (readability, edge cases, testing mindset)',
      'Technical depth in relevant areas',
      'System design thinking (for senior roles)',
    ],

    howToPrepare: [
      'Practice coding problems daily for at least 2-3 weeks before interviews. Use LeetCode, HackerRank, or similar platforms.',
      'Focus on core data structures: arrays, strings, hash maps, trees, graphs, stacks, queues. Know when to use each.',
      'Master common patterns: two pointers, sliding window, BFS/DFS, dynamic programming, binary search.',
      'Practice thinking out loud while coding. Record yourself and review—most people are worse at this than they think.',
      'For system design: study scalability concepts (load balancing, caching, database sharding, message queues).',
      'Review your past projects deeply. Be ready to discuss technical decisions, trade-offs, and what you\'d do differently.',
      'Do mock interviews with friends or use services like Pramp or interviewing.io. Real practice beats solo prep.',
      'Learn to recognize when you\'re stuck and practice asking for hints gracefully.',
    ],

    commonMistakes: [
      'Jumping straight into coding without understanding the problem. Always clarify inputs, outputs, and constraints first.',
      'Coding in silence. The interviewer can\'t give partial credit if they don\'t know your thought process.',
      'Refusing to ask for hints when stuck. Using hints well shows you\'re coachable, not weak.',
      'Giving up or getting visibly frustrated. Composure under pressure is part of what they\'re testing.',
      'Ignoring edge cases (empty inputs, single elements, very large inputs). Mention them even if you don\'t code them.',
      'Over-engineering the solution. Start with a working brute force, then optimize if time allows.',
      'Not testing your code. Walk through a simple example before saying you\'re done.',
      'Poor time management—spending 30 minutes on one part and rushing the rest.',
    ],

    checklist: makeChecklist([
      'I\'ve practiced 50+ coding problems in the last month',
      'I can explain my problem-solving approach out loud while coding',
      'I know the time/space complexity of common operations (array, hash map, tree)',
      'I can implement BFS, DFS, and binary search from memory',
      'I\'ve done at least 2-3 mock interviews with another person',
      'I can discuss trade-offs in system design (SQL vs NoSQL, monolith vs microservices)',
      'I\'ve reviewed my past projects and can discuss technical decisions in depth',
      'I have a strategy for when I get stuck (clarify, simplify, ask for hint)',
      'I can write clean, readable code under time pressure',
      'I know how to test my code by walking through examples',
    ]),
  },

  // =========================================================================
  // BEHAVIORAL ROUND
  // =========================================================================
  {
    id: 'behavioral',
    name: 'Behavioral Round',
    slug: 'behavioral',
    format: '45-60 min structured interview',
    duration: '45-60 minutes',
    whoYouMeet: 'Hiring Manager or HR',
    order: 3,

    overview: `The behavioral round uses your past experiences to predict future performance. Interviewers will ask you to describe specific situations you've faced and how you handled them. They're looking for concrete examples, not hypotheticals. Most questions follow themes: leadership, teamwork, conflict, failure, and achievement. The key is having well-prepared stories that you can adapt to different questions—these are your "set pieces."`,

    hiddenIntent: `Past behavior is the best predictor of future behavior. They want to see evidence that you've actually demonstrated the competencies they need, not just that you know the right things to say. They're also assessing self-awareness: can you reflect honestly on what worked and what didn't?`,

    assessments: [
      'Concrete examples of relevant competencies',
      'Self-awareness and ability to reflect',
      'Communication clarity and structure (STAR format)',
      'Alignment with company values and culture',
      'Leadership signals (even in non-leadership roles)',
      'How you handle failure and learn from mistakes',
      'Collaboration and conflict resolution skills',
      'Growth mindset and adaptability',
    ],

    howToPrepare: [
      'Prepare 5-7 "set piece" stories from your experience that demonstrate different competencies. Each story should flex to answer multiple questions.',
      'Use the STAR format: Situation (context), Task (your responsibility), Action (what YOU did), Result (outcome with metrics if possible).',
      'Focus on YOUR actions, not the team\'s. "We" should become "I led..." or "I contributed by..."',
      'Include at least one genuine failure story. Interviewers are suspicious of candidates who\'ve never failed.',
      'Quantify results wherever possible: "reduced load time by 40%" beats "improved performance."',
      'Practice delivering your stories in 2-3 minutes. Longer answers lose the interviewer\'s attention.',
      'Prepare for follow-up questions: "What would you do differently?" "What did you learn?"',
      'Research the company\'s values and prepare examples that align with them.',
    ],

    commonMistakes: [
      'Giving hypothetical answers ("I would...") instead of real examples ("I did...").',
      'Being vague or generic. "I\'m a team player" means nothing without a specific story.',
      'Taking too much credit or not enough. Be honest about your individual contribution.',
      'Speaking negatively about others in your stories. Focus on what YOU did, not others\' failures.',
      'Not having a failure story ready. "I can\'t think of one" sounds like you lack self-awareness.',
      'Rambling beyond 3 minutes. Practice concise delivery.',
      'Forgetting the Result. Always close with the outcome and what you learned.',
      'Using the same story for every question. It suggests limited experience.',
    ],

    checklist: makeChecklist([
      'I have 5-7 prepared stories covering different competencies',
      'Each story follows STAR format and takes 2-3 minutes to deliver',
      'I can quantify results in most of my stories',
      'I have at least one genuine failure story with lessons learned',
      'I\'ve practiced my stories out loud (not just in my head)',
      'I\'ve researched the company\'s values and have aligned examples',
      'I can answer "What would you do differently?" for each story',
      'I use "I" statements to clarify my individual contribution',
      'I have stories for: leadership, teamwork, conflict, failure, achievement',
      'I\'ve prepared thoughtful questions about the team and role',
    ]),
  },

  // =========================================================================
  // CASE STUDY ROUND
  // =========================================================================
  {
    id: 'case-study',
    name: 'Case Study Round',
    slug: 'case-study',
    format: '30-45 min business problem',
    duration: '30-45 minutes',
    whoYouMeet: 'Senior Consultant or Manager',
    order: 4,

    overview: `Case study interviews present you with a business problem to analyze in real-time. Common in consulting, product management, and strategy roles, they test your structured thinking, business acumen, and communication under pressure. You'll be given limited information and expected to ask clarifying questions, develop a framework, analyze the problem, and make a recommendation. The interviewer is your collaborator, not your adversary—they want to see how you think, not trick you.`,

    hiddenIntent: `They're testing whether you can structure ambiguous problems, think commercially, and communicate complex ideas clearly. Can you break down a messy problem into manageable pieces? Do you ask smart questions? Can you do quick mental math? Most importantly, do you land on a clear recommendation, or do you hedge endlessly?`,

    assessments: [
      'Structured problem-solving approach',
      'Business acumen and commercial awareness',
      'Ability to ask clarifying questions',
      'Mental math and quantitative reasoning',
      'Communication clarity under pressure',
      'Creativity and insight generation',
      'Ability to synthesize and make recommendations',
      'Collaboration and receptiveness to guidance',
    ],

    howToPrepare: [
      'Learn common case frameworks: profitability, market entry, M&A, pricing, growth strategy. But adapt them—don\'t apply robotically.',
      'Practice mental math daily: percentages, market sizing, growth rates. Speed matters.',
      'Do 15-20 practice cases with a partner before real interviews. Solo practice has limited value.',
      'Always start by clarifying the objective. "Just to confirm, you want me to recommend whether to enter this market?"',
      'Take notes and structure your thinking visibly. Draw frameworks on paper/whiteboard.',
      'Practice market sizing questions: "How many gas stations in the US?" Break down methodically.',
      'Always end with a clear recommendation. "Based on X, Y, Z, I recommend we proceed because..."',
      'Study the company\'s actual business and recent deals. Cases often relate to real situations.',
    ],

    commonMistakes: [
      'Diving into analysis without clarifying the question. You might solve the wrong problem.',
      'Applying frameworks robotically. Frameworks should guide, not constrain your thinking.',
      'Forgetting the original question. Keep linking back to what you were asked.',
      'Avoiding numbers. If you don\'t know, estimate and show your logic.',
      'Not asking for data that exists. The interviewer often has more information—ask for it.',
      'Getting lost in details and losing the big picture.',
      'Hedging instead of recommending. "It depends" is not a conclusion.',
      'Poor time management—spending too long on one area.',
    ],

    checklist: makeChecklist([
      'I know 4-5 common case frameworks and when to use each',
      'I can do percentage calculations quickly in my head',
      'I\'ve completed 15+ practice cases with a partner',
      'I know how to structure a market sizing question',
      'I can draw a clear framework on paper in under a minute',
      'I always start by clarifying the objective',
      'I practice ending with a clear, justified recommendation',
      'I\'ve researched the company\'s business model and recent news',
      'I can stay calm and structured when I don\'t know the answer',
      'I know how to ask for additional data during the case',
    ]),
  },

  // =========================================================================
  // FINAL ROUND / ONSITE
  // =========================================================================
  {
    id: 'final-round',
    name: 'Final Round / Onsite',
    slug: 'final-round',
    format: '4-6 hours multiple interviews',
    duration: '4-6 hours',
    whoYouMeet: 'Multiple team members',
    order: 5,

    overview: `The final round (often called the "onsite" even when virtual) is a marathon of back-to-back interviews with multiple team members. You'll typically face a mix of technical, behavioral, and culture-fit conversations. Each interviewer evaluates a specific competency and submits independent feedback. The goal is to get a complete picture of you as a candidate. Consistency across interviews is crucial—a strong morning and weak afternoon raises concerns.`,

    hiddenIntent: `They're looking for consistency. Are you the same person in interview 1 and interview 5? Can you maintain energy and quality over a long day? They're also triangulating: if multiple interviewers ask about the same topic, do your answers align? Finally, the team is asking: "Would I want to work with this person every day?"`,

    assessments: [
      'Consistency across multiple interviews',
      'Stamina and composure over a long day',
      'Technical depth when probed by specialists',
      'Cultural fit with the team',
      'Collaboration signals during pair activities',
      'Genuine interest and enthusiasm (sustained)',
      'How you handle lunch/casual conversations',
      'Questions you ask (quality and consistency)',
    ],

    howToPrepare: [
      'Know your stories cold. You\'ll repeat variations of them multiple times—slight changes are fine, contradictions are not.',
      'Prepare for the full day physically: sleep well, eat a good breakfast, bring snacks and water.',
      'Research each interviewer if their names are shared. LinkedIn, company bios, recent talks.',
      'Have 10+ questions ready—you\'ll be asked "any questions?" 4-6 times. Vary them by interviewer.',
      'Prepare for casual conversations (lunch, breaks). These are still evaluations.',
      'Practice your 2-minute "about me" until it\'s natural. You\'ll give it multiple times.',
      'Plan your energy management. It\'s okay to ask for a short break between sessions.',
      'Have a consistent "Why this company?" answer that sounds genuine, not rehearsed.',
    ],

    commonMistakes: [
      'Treating lunch or breaks as off-the-record. Everything is part of the evaluation.',
      'Energy crash in the afternoon. Pace yourself and stay engaged.',
      'Contradicting yourself across interviews. Keep your stories consistent.',
      'Using the exact same questions with every interviewer. Tailor to their role.',
      'Complaining about the process being long or tiring. They know it\'s a lot—stay positive.',
      'Letting your guard down after a good interview. Stay consistent until you\'re out the door.',
      'Not sending thank-you notes. A brief email to the recruiter mentioning specific conversations stands out.',
      'Forgetting interviewer names. Write them down between sessions.',
    ],

    checklist: makeChecklist([
      'I\'ve confirmed the schedule and know who I\'m meeting',
      'I\'ve researched each interviewer (LinkedIn, company bio)',
      'I have 10+ varied questions prepared',
      'I can deliver my "about me" naturally in 2 minutes',
      'I\'ve slept well and planned meals/snacks for energy',
      'I have consistent answers for likely repeated questions',
      'I\'m prepared for casual conversations (lunch, breaks)',
      'I have a genuine "Why this company?" answer',
      'I know it\'s okay to ask for breaks if needed',
      'I have thank-you email content drafted',
    ]),
  },
];

/**
 * Get a stage by its URL slug
 */
export function getStageBySlug(slug: string): InterviewStage | null {
  return STAGES.find((s) => s.slug === slug) || null;
}

/**
 * Get a stage by its ID
 */
export function getStageById(id: string): InterviewStage | null {
  return STAGES.find((s) => s.id === id) || null;
}

/**
 * Get all stages in order
 */
export function getAllStages(): InterviewStage[] {
  return [...STAGES].sort((a, b) => a.order - b.order);
}
