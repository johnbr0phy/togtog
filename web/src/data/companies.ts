/**
 * Company-specific interview configurations
 *
 * Each company has unique interview processes, stages, and evaluation criteria.
 * This data drives the prep content in /my-prep/[company-slug]
 */

import { InterviewStage, ChecklistItem, SetPieceCategory } from '../types/v3';

// Helper to generate checklist items
function makeChecklist(items: string[]): ChecklistItem[] {
  return items.map((text, i) => ({
    id: `item-${i + 1}`,
    text,
    completed: false,
  }));
}

// =============================================================================
// COMPANY CONFIGURATION TYPE
// =============================================================================

export interface CompanyConfig {
  id: string;
  slug: string;
  name: string;
  role: string;
  logo?: string;
  color: string;  // Brand color for UI accents
  description: string;
  interviewProcess: string;  // Brief overview of their process
  stages: InterviewStage[];
  keyPrinciples?: CompanyPrinciple[];  // Amazon LPs, Google values, etc.
  setPieceCategories: SetPieceCategory[];  // Which categories are most relevant
  tips: string[];  // Company-specific tips
}

export interface CompanyPrinciple {
  id: string;
  name: string;
  description: string;
  exampleQuestions: string[];
}

// =============================================================================
// AMAZON SOFTWARE ENGINEER
// =============================================================================

const AMAZON_LEADERSHIP_PRINCIPLES: CompanyPrinciple[] = [
  {
    id: 'customer-obsession',
    name: 'Customer Obsession',
    description: 'Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust.',
    exampleQuestions: [
      'Tell me about a time you went above and beyond for a customer.',
      'Describe when you had to balance customer needs against business needs.',
      'How do you prioritize when multiple customers have competing demands?',
    ],
  },
  {
    id: 'ownership',
    name: 'Ownership',
    description: 'Leaders are owners. They think long term and don\'t sacrifice long-term value for short-term results.',
    exampleQuestions: [
      'Tell me about a time you took on something outside your area of responsibility.',
      'Describe a time you saw a problem and fixed it without being asked.',
      'When have you made a decision that wasn\'t popular but was right?',
    ],
  },
  {
    id: 'invent-simplify',
    name: 'Invent and Simplify',
    description: 'Leaders expect and require innovation from their teams and always find ways to simplify.',
    exampleQuestions: [
      'Tell me about an innovative solution you created.',
      'Describe a time you simplified a complex process.',
      'How do you encourage innovation in your team?',
    ],
  },
  {
    id: 'are-right-a-lot',
    name: 'Are Right, A Lot',
    description: 'Leaders are right a lot. They have strong judgment and good instincts.',
    exampleQuestions: [
      'Tell me about a time you made a decision with incomplete data.',
      'Describe a situation where your judgment proved correct.',
      'When have you had to change your mind based on new information?',
    ],
  },
  {
    id: 'learn-be-curious',
    name: 'Learn and Be Curious',
    description: 'Leaders are never done learning and always seek to improve themselves.',
    exampleQuestions: [
      'How do you stay current with technology trends?',
      'Tell me about something new you learned recently.',
      'Describe a time you had to quickly learn a new technology.',
    ],
  },
  {
    id: 'hire-develop-best',
    name: 'Hire and Develop the Best',
    description: 'Leaders raise the performance bar with every hire and develop leaders.',
    exampleQuestions: [
      'Tell me about a time you mentored someone.',
      'Describe your approach to giving feedback.',
      'How do you identify high-potential team members?',
    ],
  },
  {
    id: 'insist-highest-standards',
    name: 'Insist on the Highest Standards',
    description: 'Leaders have relentlessly high standards that may seem unreasonably high.',
    exampleQuestions: [
      'Tell me about a time you raised the bar on quality.',
      'Describe when you refused to compromise on standards.',
      'How do you handle situations where others have lower standards?',
    ],
  },
  {
    id: 'think-big',
    name: 'Think Big',
    description: 'Thinking small is a self-fulfilling prophecy. Leaders create bold direction.',
    exampleQuestions: [
      'Tell me about a time you proposed a bold idea.',
      'Describe your vision for [relevant technology/area].',
      'When have you challenged conventional thinking?',
    ],
  },
  {
    id: 'bias-for-action',
    name: 'Bias for Action',
    description: 'Speed matters in business. Many decisions and actions are reversible.',
    exampleQuestions: [
      'Tell me about a time you had to act quickly.',
      'Describe a situation where you took a calculated risk.',
      'How do you balance speed with careful analysis?',
    ],
  },
  {
    id: 'frugality',
    name: 'Frugality',
    description: 'Accomplish more with less. Constraints breed resourcefulness.',
    exampleQuestions: [
      'Tell me about a time you delivered results with limited resources.',
      'Describe how you\'ve reduced costs while maintaining quality.',
      'When have you found a creative solution to a resource constraint?',
    ],
  },
  {
    id: 'earn-trust',
    name: 'Earn Trust',
    description: 'Leaders listen attentively, speak candidly, and treat others respectfully.',
    exampleQuestions: [
      'Tell me about a time you had to rebuild trust.',
      'Describe a difficult conversation you handled professionally.',
      'How do you give feedback that\'s hard to hear?',
    ],
  },
  {
    id: 'dive-deep',
    name: 'Dive Deep',
    description: 'Leaders operate at all levels, stay connected to details, and audit frequently.',
    exampleQuestions: [
      'Tell me about a time you dug into data to find a root cause.',
      'Describe how you stay connected to details while scaling.',
      'When did diving deep reveal something unexpected?',
    ],
  },
  {
    id: 'have-backbone',
    name: 'Have Backbone; Disagree and Commit',
    description: 'Leaders respectfully challenge decisions when they disagree.',
    exampleQuestions: [
      'Tell me about a time you disagreed with your manager.',
      'Describe when you pushed back on a decision.',
      'How do you commit to decisions you disagreed with?',
    ],
  },
  {
    id: 'deliver-results',
    name: 'Deliver Results',
    description: 'Leaders focus on key inputs and deliver with the right quality and timeliness.',
    exampleQuestions: [
      'Tell me about your most significant accomplishment.',
      'Describe a time you delivered under pressure.',
      'How do you prioritize when everything seems urgent?',
    ],
  },
];

const AMAZON_STAGES: InterviewStage[] = [
  {
    id: 'amazon-recruiter-screen',
    name: 'Recruiter Screen',
    slug: 'recruiter-screen',
    format: '30 min phone call',
    duration: '30 minutes',
    whoYouMeet: 'Technical Recruiter',
    order: 1,
    overview: `Amazon's recruiter screen focuses on your background, interest in Amazon specifically, and basic LP alignment. The recruiter will ask about your experience, why Amazon, and often one or two behavioral questions to gauge fit. They're also confirming logistics: level, team preferences, and timeline.`,
    hiddenIntent: `They're filtering for genuine Amazon interest and basic LP alignment. "Why Amazon?" is critical—generic answers about wanting to work at a big company won't cut it. They want to see you've researched Amazon's culture and leadership principles.`,
    assessments: [
      'Genuine interest in Amazon (not just any FAANG)',
      'Basic understanding of Leadership Principles',
      'Communication clarity',
      'Level-appropriate experience',
      'Cultural fit signals',
    ],
    howToPrepare: [
      'Study all 16 Leadership Principles—memorize names and meanings.',
      'Prepare a genuine "Why Amazon?" answer that references specific LPs or products.',
      'Have 2-3 stories ready that naturally demonstrate LPs.',
      'Know your numbers: current comp, expected comp, notice period.',
      'Research the specific team/org you\'re applying to.',
    ],
    commonMistakes: [
      'Generic "Why Amazon?" answers that could apply to any company.',
      'Not knowing the Leadership Principles by name.',
      'Underselling your experience for the target level.',
      'Being vague about compensation expectations.',
    ],
    checklist: makeChecklist([
      'I can name and explain all 16 Leadership Principles',
      'I have a specific, genuine "Why Amazon?" answer',
      'I know my target level (L4, L5, L6, etc.)',
      'I can clearly state my compensation expectations',
      'I\'ve researched the team/org I\'m applying to',
    ]),
  },
  {
    id: 'amazon-online-assessment',
    name: 'Online Assessment (OA)',
    slug: 'online-assessment',
    format: '90-120 min timed assessment',
    duration: '90-120 minutes',
    whoYouMeet: 'Automated system',
    order: 2,
    overview: `Amazon's OA typically includes 2 coding problems and a work simulation section. The coding problems are LeetCode medium difficulty, focusing on arrays, strings, graphs, and trees. The work simulation presents workplace scenarios where you choose responses—these map directly to Leadership Principles.`,
    hiddenIntent: `The coding tests basic competency. The work simulation is equally important—wrong LP signals here can disqualify you. They're looking for ownership, customer obsession, and bias for action in your scenario responses.`,
    assessments: [
      'Algorithmic problem-solving (2 coding questions)',
      'Code quality and efficiency',
      'LP alignment through work simulation scenarios',
      'Time management',
    ],
    howToPrepare: [
      'Practice LeetCode medium problems—focus on arrays, strings, trees, graphs.',
      'Study Amazon\'s work simulation questions (many are shared online).',
      'For work simulation: always choose the most "ownership" and "customer obsession" aligned answers.',
      'Practice with a timer—you can\'t pause the real assessment.',
      'Review BFS/DFS, two pointers, and sliding window patterns.',
    ],
    commonMistakes: [
      'Running out of time on coding problems.',
      'Choosing "neutral" options in work simulation—they want strong LP signals.',
      'Not testing edge cases in coding solutions.',
      'Treating work simulation as hypothetical—answer as if you\'d actually do it.',
    ],
    checklist: makeChecklist([
      'I\'ve solved 50+ LeetCode medium problems',
      'I can implement BFS, DFS, and common patterns quickly',
      'I\'ve reviewed Amazon work simulation questions',
      'I understand which LPs each work simulation scenario tests',
      'I\'ve practiced with a timer',
    ]),
  },
  {
    id: 'amazon-phone-screen',
    name: 'Technical Phone Screen',
    slug: 'phone-screen',
    format: '60 min coding + behavioral',
    duration: '60 minutes',
    whoYouMeet: 'Software Development Engineer',
    order: 3,
    overview: `A 45-60 minute interview split between coding (30-40 min) and behavioral questions (15-20 min). The coding problem is typically LeetCode medium, done on Amazon's Chime platform or a shared doc. Behavioral questions focus on 1-2 Leadership Principles—usually Ownership, Deliver Results, or Customer Obsession.`,
    hiddenIntent: `They're checking: Can you code under pressure while communicating? Do you naturally demonstrate LP behaviors when describing your experience? The behavioral portion carries significant weight—technical skills alone won't advance you.`,
    assessments: [
      'Live coding ability with communication',
      'Problem-solving approach',
      'LP alignment in behavioral responses',
      'Code quality and edge case handling',
      'How you respond to hints',
    ],
    howToPrepare: [
      'Practice coding out loud—explain every decision.',
      'Prepare 6-8 STAR stories that each map to multiple LPs.',
      'Practice on Chime or a shared coding environment.',
      'Have stories ready for: failure, disagreement, customer focus, ownership.',
      'Time yourself: 30 minutes for the coding problem.',
    ],
    commonMistakes: [
      'Coding in silence—they can\'t assess your thinking.',
      'STAR stories without clear metrics or outcomes.',
      'Not naturally connecting stories to LPs.',
      'Spending too long on brute force before optimizing.',
    ],
    checklist: makeChecklist([
      'I can solve a LeetCode medium in 30 minutes while explaining my approach',
      'I have 6-8 STAR stories mapped to Leadership Principles',
      'Each story has quantifiable results',
      'I can smoothly transition from coding to behavioral discussion',
      'I\'ve practiced in a shared coding environment',
    ]),
  },
  {
    id: 'amazon-loop',
    name: 'On-site Loop',
    slug: 'onsite-loop',
    format: '4-5 interviews, 45-60 min each',
    duration: '4-5 hours',
    whoYouMeet: 'SDEs, SDMs, Bar Raiser',
    order: 4,
    overview: `Amazon's loop typically includes 4-5 interviews: 2-3 technical (coding + system design for L5+) and 2-3 behavioral. Each interviewer owns 2-3 Leadership Principles and must gather evidence for those specific LPs. One interviewer is the "Bar Raiser"—an objective evaluator from outside the hiring team.`,
    hiddenIntent: `Every interviewer is gathering LP evidence. They'll ask follow-up questions to probe depth: "What specifically did YOU do?" "What was the metric impact?" The bar raiser is specifically looking for reasons to say no—they're protecting Amazon's hiring bar.`,
    assessments: [
      'Deep LP alignment across all principles',
      'Technical skills (coding, system design)',
      'Ownership and accountability',
      'Specific, measurable impact in stories',
      'How you handle pressure and ambiguity',
    ],
    howToPrepare: [
      'Prepare 2+ stories per LP—interviewers will probe different principles.',
      'For system design: practice Amazon-scale problems (100M+ users).',
      'Stories must have YOUR specific actions, not "we did X."',
      'Prepare for deep follow-ups: "What exactly did you code?" "What was the SQL query?"',
      'Research your interviewers on LinkedIn if names are shared.',
    ],
    commonMistakes: [
      'Using "we" instead of "I"—they need YOUR contribution.',
      'Stories without metrics: "improved performance" vs "reduced latency by 40%."',
      'Not having stories for all 16 LPs.',
      'Treating the bar raiser casually—they have significant influence.',
      'Running out of different stories across interviewers.',
    ],
    checklist: makeChecklist([
      'I have 2+ distinct stories for each Leadership Principle',
      'Every story has specific metrics and outcomes',
      'I use "I" to describe my individual contribution',
      'I\'ve prepared for system design (L5+)',
      'I can answer "What would you do differently?" for each story',
      'I\'ve practiced for 5+ hours of back-to-back interviews',
    ]),
  },
  {
    id: 'amazon-bar-raiser',
    name: 'Bar Raiser Round',
    slug: 'bar-raiser',
    format: '60 min behavioral deep-dive',
    duration: '60 minutes',
    whoYouMeet: 'Bar Raiser (outside hiring team)',
    order: 5,
    overview: `The Bar Raiser is an Amazon-certified interviewer from outside the hiring team. Their job is to be objective and protect Amazon's hiring bar. They'll focus heavily on behavioral questions, digging deep into 3-4 Leadership Principles. They\'re specifically trained to probe for depth and authenticity.`,
    hiddenIntent: `The Bar Raiser is looking for reasons to say no. They want to ensure you're not just saying the right things but have actually demonstrated LP behaviors. They'll ask multiple follow-up questions on each story and may push back to see how you respond.`,
    assessments: [
      'Authenticity in LP stories',
      'Depth of impact and contribution',
      'Self-awareness and growth mindset',
      'Response to challenging questions',
      'Consistency across multiple stories',
    ],
    howToPrepare: [
      'Prepare for deep follow-ups: 3-4 questions on each story.',
      'Be ready to admit what you\'d do differently—they value self-awareness.',
      'Have stories that show growth and learning from failure.',
      'Practice handling pushback: "Are you sure that was the right approach?"',
      'Prepare stories that show Earn Trust and Have Backbone.',
    ],
    commonMistakes: [
      'Surface-level stories that don\'t hold up to probing.',
      'Getting defensive when challenged.',
      'Not admitting mistakes or areas for growth.',
      'Stories that all make you look perfect.',
      'Inconsistencies between stories (dates, roles, outcomes).',
    ],
    checklist: makeChecklist([
      'I can answer 3-4 follow-up questions on each story',
      'I have failure stories that show genuine learning',
      'I can handle pushback without getting defensive',
      'I have stories showing Earn Trust and Have Backbone',
      'My stories are consistent and I won\'t contradict myself',
    ]),
  },
];

// =============================================================================
// GOOGLE SOFTWARE ENGINEER
// =============================================================================

const GOOGLE_STAGES: InterviewStage[] = [
  {
    id: 'google-recruiter-screen',
    name: 'Recruiter Call',
    slug: 'recruiter-call',
    format: '30 min phone call',
    duration: '30 minutes',
    whoYouMeet: 'Technical Recruiter',
    order: 1,
    overview: `Google's recruiter call covers your background, interest in Google, and role fit. They'll discuss team preferences, level expectations, and timeline. Unlike Amazon, Google recruiters rarely ask behavioral questions—this is primarily logistics and qualification screening.`,
    hiddenIntent: `They're checking basic qualification fit and genuine interest. Google gets millions of applications—they're filtering for candidates worth investing interview time in. Strong communication and clear career narrative matter.`,
    assessments: [
      'Qualification fit for target level',
      'Communication clarity',
      'Genuine interest in Google',
      'Career trajectory alignment',
      'Logistical fit (location, timeline)',
    ],
    howToPrepare: [
      'Know your target level (L3-L7) and understand what each requires.',
      'Prepare a clear "Why Google?" answer beyond "it\'s a great company."',
      'Research the specific product area/team you\'re interested in.',
      'Have your compensation expectations ready.',
      'Prepare questions about the interview process and timeline.',
    ],
    commonMistakes: [
      'Not having a specific team or product area interest.',
      'Unrealistic level expectations.',
      'Generic answers that could apply to any tech company.',
      'Not asking questions about the process.',
    ],
    checklist: makeChecklist([
      'I know my target level and can justify it',
      'I have specific Google products/teams I\'m interested in',
      'I can articulate "Why Google?" specifically',
      'I know my compensation expectations',
      'I understand Google\'s interview process',
    ]),
  },
  {
    id: 'google-phone-screen',
    name: 'Technical Phone Screen',
    slug: 'phone-screen',
    format: '45 min coding interview',
    duration: '45 minutes',
    whoYouMeet: 'Software Engineer',
    order: 2,
    overview: `A 45-minute technical phone screen done on Google Docs. You'll solve 1-2 coding problems while sharing your screen. Google interviewers expect you to write real, working code—not pseudocode. They'll evaluate your approach, communication, and code quality.`,
    hiddenIntent: `Can you write clean, correct code while explaining your thinking? Google values elegant solutions and strong fundamentals. They're also checking if you can handle ambiguity—initial problem statements are often intentionally vague.`,
    assessments: [
      'Algorithmic problem-solving',
      'Code quality and correctness',
      'Communication while coding',
      'Handling ambiguity (asking clarifying questions)',
      'Time and space complexity analysis',
    ],
    howToPrepare: [
      'Practice on Google Docs—it has no syntax highlighting or autocomplete.',
      'Focus on medium-hard LeetCode problems.',
      'Always clarify inputs, outputs, and constraints before coding.',
      'Practice writing clean, readable code without IDE help.',
      'Master complexity analysis—they always ask.',
    ],
    commonMistakes: [
      'Starting to code before understanding the problem.',
      'Writing pseudocode instead of real code.',
      'Not asking clarifying questions.',
      'Forgetting to analyze time/space complexity.',
      'Not testing your code with examples.',
    ],
    checklist: makeChecklist([
      'I can write clean code in Google Docs without syntax help',
      'I always ask clarifying questions before coding',
      'I can analyze time and space complexity for any solution',
      'I test my code by tracing through examples',
      'I\'ve solved 100+ LeetCode problems',
    ]),
  },
  {
    id: 'google-onsite-coding',
    name: 'On-site Coding Interviews',
    slug: 'onsite-coding',
    format: '2-3 coding interviews, 45 min each',
    duration: '2-3 hours',
    whoYouMeet: 'Software Engineers',
    order: 3,
    overview: `Google's on-site includes 2-3 coding interviews, each 45 minutes with a different engineer. Problems range from LeetCode medium to hard. You'll code on a whiteboard or Google Docs. Each interviewer submits independent feedback—consistency across all rounds is essential.`,
    hiddenIntent: `They're evaluating problem-solving depth, not just whether you get the answer. Can you optimize a brute force solution? Handle edge cases? Write code that would actually work in production? They want to see how you think, not just that you've memorized solutions.`,
    assessments: [
      'Problem decomposition',
      'Multiple approaches (brute force → optimized)',
      'Clean, production-quality code',
      'Edge case handling',
      'Communication and collaboration',
    ],
    howToPrepare: [
      'Practice explaining your thought process continuously.',
      'Always start with brute force, then optimize.',
      'Focus on: arrays, trees, graphs, dynamic programming, recursion.',
      'Practice on whiteboard—spacing and legibility matter.',
      'Time yourself: 35 minutes to solve, 10 to discuss.',
    ],
    commonMistakes: [
      'Jumping to the optimal solution without showing progression.',
      'Poor whiteboard organization.',
      'Not verbalizing your thought process.',
      'Ignoring hints from the interviewer.',
      'Writing code that wouldn\'t actually compile.',
    ],
    checklist: makeChecklist([
      'I can articulate brute force before optimizing',
      'I\'m comfortable with whiteboard coding',
      'I continuously explain my thinking',
      'I handle edge cases methodically',
      'I can implement DP, graph algorithms, and tree traversals',
    ]),
  },
  {
    id: 'google-system-design',
    name: 'System Design Interview',
    slug: 'system-design',
    format: '45 min system design',
    duration: '45 minutes',
    whoYouMeet: 'Senior Software Engineer',
    order: 4,
    overview: `Required for L5+ (Senior). You'll design a large-scale system (like YouTube, Google Search, or Gmail) in 45 minutes. The interviewer expects you to drive the conversation, make trade-offs, and go deep on specific components. This tests architecture skills, not coding.`,
    hiddenIntent: `Can you think at Google scale? They want to see: structured approach, understanding of distributed systems, ability to make and justify trade-offs, and knowledge of where complexity lives. Going deep on one component is better than staying shallow everywhere.`,
    assessments: [
      'Structured approach to ambiguous problems',
      'Scalability and distributed systems knowledge',
      'Trade-off analysis and justification',
      'Deep technical knowledge in specific areas',
      'Communication and whiteboarding skills',
    ],
    howToPrepare: [
      'Study: load balancing, caching, databases (SQL vs NoSQL), message queues, CDNs.',
      'Practice designing: URL shortener, Twitter, Uber, YouTube, web crawler.',
      'Have a framework: requirements → high-level → deep dive → scale.',
      'Know back-of-envelope math: QPS, storage, bandwidth calculations.',
      'Be ready to go deep on database design and API structure.',
    ],
    commonMistakes: [
      'Not gathering requirements before designing.',
      'Staying too high-level without going deep anywhere.',
      'Ignoring scalability until the end.',
      'Not doing back-of-envelope calculations.',
      'Proposing solutions without understanding trade-offs.',
    ],
    checklist: makeChecklist([
      'I have a system design framework I follow',
      'I can do back-of-envelope capacity estimates',
      'I understand CAP theorem and database trade-offs',
      'I\'ve practiced 10+ system design problems',
      'I can go deep on: caching, sharding, replication',
    ]),
  },
  {
    id: 'google-googleyness',
    name: 'Googleyness & Leadership',
    slug: 'googleyness',
    format: '45 min behavioral',
    duration: '45 minutes',
    whoYouMeet: 'Software Engineer or Manager',
    order: 5,
    overview: `"Googleyness" is Google's term for culture fit and leadership potential. This behavioral interview assesses: how you navigate ambiguity, handle disagreement, approach collaboration, and contribute to an inclusive environment. It's structured differently from Amazon's LP interviews.`,
    hiddenIntent: `Do you embody Google's values? They're looking for intellectual humility (admitting what you don't know), collaborative approach (not lone wolf), handling ambiguity (comfort with incomplete information), and inclusive behavior (elevating others).`,
    assessments: [
      'Intellectual humility and self-awareness',
      'Collaboration and teamwork',
      'Navigating ambiguity',
      'Inclusive leadership behaviors',
      'Handling disagreement constructively',
    ],
    howToPrepare: [
      'Prepare stories showing: collaboration, handling ambiguity, admitting mistakes.',
      'Google values "we" as much as "I"—show team orientation.',
      'Have stories about inclusive behaviors and supporting others.',
      'Prepare for "tell me about a time you were wrong."',
      'Show intellectual curiosity and love of learning.',
    ],
    commonMistakes: [
      'Being too "I-focused"—Google values collaboration.',
      'Not showing intellectual humility.',
      'Stories that make everyone else look bad.',
      'Not having examples of supporting diverse perspectives.',
      'Appearing rigid or uncomfortable with ambiguity.',
    ],
    checklist: makeChecklist([
      'I have stories showing team collaboration',
      'I can discuss times I was wrong or changed my mind',
      'I have examples of supporting inclusive environments',
      'I show comfort with ambiguity in my stories',
      'I demonstrate intellectual curiosity and humility',
    ]),
  },
  {
    id: 'google-hiring-committee',
    name: 'Hiring Committee Review',
    slug: 'hiring-committee',
    format: 'Internal review (no candidate)',
    duration: 'N/A',
    whoYouMeet: 'You don\'t—this is internal',
    order: 6,
    overview: `Unlike most companies, Google interviewers don't make hiring decisions. All interview feedback goes to an independent Hiring Committee (HC) who reviews packets without meeting candidates. The HC decides hire/no-hire based solely on written feedback.`,
    hiddenIntent: `This means: every interviewer's notes matter equally, there's no "key person" to impress, and your performance must be consistent across all rounds. The HC also looks at level fit—they may offer L4 if you interviewed for L5.`,
    assessments: [
      'Consistency across all interview rounds',
      'Written feedback strength and specificity',
      'Level-appropriate depth',
      'No major red flags in any round',
    ],
    howToPrepare: [
      'Understand that there\'s no single interviewer to impress—all rounds matter equally.',
      'Be consistent—contradictions across interviews are red flags.',
      'Give interviewers strong signals to write about (specific examples, clear reasoning).',
      'Ask your recruiter about the HC process and timeline.',
    ],
    commonMistakes: [
      'Treating some interviews as more important than others.',
      'Giving vague answers that don\'t create write-up material.',
      'Inconsistency in stories or self-assessment across rounds.',
      'Not understanding that interviewers don\'t make the decision.',
    ],
    checklist: makeChecklist([
      'I understand that all interviewers contribute equally to my packet',
      'I give specific, quotable examples in every interview',
      'My stories are consistent across all rounds',
      'I\'ve asked my recruiter about the HC timeline',
    ]),
  },
];

// =============================================================================
// MCKINSEY CONSULTANT
// =============================================================================

const MCKINSEY_PEI_DIMENSIONS: CompanyPrinciple[] = [
  {
    id: 'personal-impact',
    name: 'Personal Impact',
    description: 'Leading change, influencing without authority, driving outcomes through others.',
    exampleQuestions: [
      'Tell me about a time you led a significant change.',
      'Describe when you had to influence someone without authority over them.',
      'How did you get buy-in for an unpopular idea?',
    ],
  },
  {
    id: 'entrepreneurial-drive',
    name: 'Entrepreneurial Drive',
    description: 'Building something from scratch, taking initiative, creating value independently.',
    exampleQuestions: [
      'Tell me about something you built from nothing.',
      'Describe a time you identified an opportunity others missed.',
      'When have you taken significant initiative?',
    ],
  },
  {
    id: 'leadership',
    name: 'Inclusive Leadership',
    description: 'Bringing out the best in teams, developing others, creating inclusive environments.',
    exampleQuestions: [
      'Tell me about a time you developed someone else.',
      'Describe how you brought a struggling team together.',
      'When did you create an inclusive environment?',
    ],
  },
  {
    id: 'courageous-change',
    name: 'Courageous Change',
    description: 'Navigating ambiguity, resilience through failure, adapting to uncertainty.',
    exampleQuestions: [
      'Tell me about a significant failure and what you learned.',
      'Describe a time you had to adapt to major uncertainty.',
      'When did you have to be courageous in a professional setting?',
    ],
  },
];

const MCKINSEY_STAGES: InterviewStage[] = [
  {
    id: 'mckinsey-application',
    name: 'Application & Resume Screen',
    slug: 'application-screen',
    format: 'Written application',
    duration: 'N/A',
    whoYouMeet: 'Recruiting team',
    order: 1,
    overview: `McKinsey's application includes your resume, cover letter, and often a digital assessment (Solve). The Solve game tests problem-solving through an ecosystem simulation. Your resume is scored on leadership, achievement, and impact. McKinsey values elite academics and measurable accomplishments.`,
    hiddenIntent: `They're filtering for "spiky" profiles—exceptional achievement in something, not just well-rounded competence. One Olympic athlete or startup founder story beats five "good" experiences. The Solve assessment tests pattern recognition and systems thinking.`,
    assessments: [
      'Exceptional achievement in any domain',
      'Quantifiable impact on resume',
      'Leadership and initiative signals',
      'Problem-solving (Solve assessment)',
      'Academic and professional pedigree',
    ],
    howToPrepare: [
      'Quantify every accomplishment on your resume: revenue, percentage improvements, scale.',
      'Highlight "spiky" achievements—exceptional performance in any area.',
      'Practice the McKinsey Solve assessment (ecosystem game).',
      'Cover letter should show genuine McKinsey interest, not generic consulting interest.',
      'If your school isn\'t a target, emphasize other exceptional achievements.',
    ],
    commonMistakes: [
      'Generic resume without quantified impact.',
      'Cover letter that could apply to any consulting firm.',
      'Not preparing for the Solve assessment.',
      'Underselling unique or exceptional achievements.',
    ],
    checklist: makeChecklist([
      'Every resume bullet has quantified impact',
      'I\'ve highlighted my most exceptional achievements',
      'I\'ve practiced the Solve assessment',
      'My cover letter is McKinsey-specific',
      'I can discuss each resume item in depth',
    ]),
  },
  {
    id: 'mckinsey-pei-prep',
    name: 'PEI Story Preparation',
    slug: 'pei-prep',
    format: 'Self-preparation',
    duration: 'N/A',
    whoYouMeet: 'N/A',
    order: 2,
    overview: `McKinsey's Personal Experience Interview (PEI) tests four dimensions: Personal Impact, Entrepreneurial Drive, Inclusive Leadership, and Courageous Change. Each interview includes one PEI question that's probed deeply for 10-15 minutes. You need one exceptional story per dimension.`,
    hiddenIntent: `PEI stories must show YOU driving extraordinary outcomes, not participating in team success. They want evidence of consulting potential: influencing stakeholders, driving change, leading without authority. Average stories don't cut it—they need to be genuinely impressive.`,
    assessments: [
      'Depth and authenticity of stories',
      'Personal agency and ownership',
      'Measurable impact',
      'Ability to handle 10+ follow-up questions',
      'Self-awareness and reflection',
    ],
    howToPrepare: [
      'Prepare one deep story for each PEI dimension (4 total minimum).',
      'Stories should be 3-5 minutes with room for 10+ follow-up questions.',
      'Focus on YOUR actions: "I convinced," "I led," "I decided."',
      'Quantify impact: revenue, percentage changes, scale affected.',
      'Prepare answers for: "What would you do differently?" "What did you learn?"',
    ],
    commonMistakes: [
      'Stories that are too short or lack depth for follow-ups.',
      'Using "we" instead of "I"—McKinsey wants YOUR contribution.',
      'Stories without measurable outcomes.',
      'Only having one story per dimension (you may be asked multiple questions).',
      'Choosing "safe" stories instead of genuinely impressive ones.',
    ],
    checklist: makeChecklist([
      'I have 4+ stories mapped to PEI dimensions',
      'Each story is 3-5 minutes with room for deep follow-up',
      'Stories use "I" to describe my personal contribution',
      'Every story has quantified impact',
      'I can answer "What would you do differently?" for each',
    ]),
  },
  {
    id: 'mckinsey-case-fundamentals',
    name: 'Case Fundamentals',
    slug: 'case-fundamentals',
    format: 'Self-preparation',
    duration: 'N/A',
    whoYouMeet: 'N/A',
    order: 3,
    overview: `McKinsey cases test structured thinking, business acumen, and communication. You'll face profitability, market entry, growth strategy, and M&A cases. Unlike other firms, McKinsey emphasizes interviewer-led cases where they guide the structure, but you're expected to add insight.`,
    hiddenIntent: `They're testing if you can structure ambiguity, think commercially, and communicate like a consultant. The "aha insight" matters—they want to see genuine business intuition, not just framework application. Your ability to synthesize and recommend is critical.`,
    assessments: [
      'Structured problem decomposition',
      'Business judgment and intuition',
      'Quantitative reasoning and mental math',
      'Hypothesis-driven thinking',
      'Clear communication and synthesis',
    ],
    howToPrepare: [
      'Learn core frameworks: profitability, 3Cs, 4Ps, Porter\'s forces.',
      'Practice mental math daily: percentages, growth rates, market sizing.',
      'Do 30+ practice cases with partners before real interviews.',
      'Practice synthesizing: "Based on X, Y, Z, I recommend..."',
      'Study McKinsey\'s recent cases and industry focus areas.',
    ],
    commonMistakes: [
      'Applying frameworks robotically without adapting.',
      'Avoiding numbers—always do the math.',
      'Forgetting to synthesize and recommend at the end.',
      'Not asking clarifying questions before structuring.',
      'Over-complicating the framework.',
    ],
    checklist: makeChecklist([
      'I can structure a profitability case in 2 minutes',
      'I can do percentage calculations quickly',
      'I\'ve done 30+ practice cases',
      'I always end with a clear recommendation',
      'I can adapt frameworks to specific situations',
    ]),
  },
  {
    id: 'mckinsey-round-1',
    name: 'First Round Interviews',
    slug: 'round-1',
    format: '2 interviews, 45-60 min each',
    duration: '2 hours total',
    whoYouMeet: 'Associates or Engagement Managers',
    order: 4,
    overview: `Round 1 includes two interviews, each with a case and a PEI question. Cases are typically interviewer-led, where they provide structure and ask specific questions. PEI questions probe deeply into one story per interview. Both interviewers must recommend "advance" for you to proceed.`,
    hiddenIntent: `They're testing basic consulting competency. Can you think structured under pressure? Do you have genuine leadership stories? Are you coachable (responding well to interviewer guidance)? They expect candidates to struggle—they're watching how you recover.`,
    assessments: [
      'Structured thinking under pressure',
      'Business acumen and judgment',
      'PEI story depth and authenticity',
      'Communication clarity',
      'Coachability and response to guidance',
    ],
    howToPrepare: [
      'Practice interviewer-led cases—follow their structure, don\'t force your own.',
      'Have PEI stories ready for all four dimensions.',
      'Practice transitioning smoothly between case and PEI.',
      'Research your interviewers on LinkedIn if names are shared.',
      'Prepare questions about McKinsey and the interviewer\'s experience.',
    ],
    commonMistakes: [
      'Fighting the interviewer\'s structure instead of following it.',
      'PEI stories that are too short or surface-level.',
      'Not adapting case approach to the specific question asked.',
      'Forgetting to synthesize at the end of the case.',
      'Not asking thoughtful questions at the end.',
    ],
    checklist: makeChecklist([
      'I can follow an interviewer-led case structure',
      'My PEI stories can withstand 10+ follow-up questions',
      'I practice transitioning between case and PEI',
      'I\'ve researched McKinsey\'s recent work and values',
      'I have thoughtful questions for interviewers',
    ]),
  },
  {
    id: 'mckinsey-round-2',
    name: 'Final Round Interviews',
    slug: 'round-2',
    format: '2-3 interviews, 45-60 min each',
    duration: '2-3 hours total',
    whoYouMeet: 'Partners and Senior Partners',
    order: 5,
    overview: `Final round interviews are with Partners—senior leaders who've run major client engagements. Cases may be based on their real client work. PEI questions dig even deeper, often exploring the same story from multiple angles. Partners are evaluating: "Would I put this person in front of my clients?"`,
    hiddenIntent: `Partners are protecting the McKinsey brand. They're asking: Is this person client-ready? Do they have genuine leadership presence? Can they handle the ambiguity and pressure of real engagements? They want consultants who will make them look good.`,
    assessments: [
      'Executive presence and confidence',
      'Deep business insight',
      'Client-ready communication',
      'Leadership maturity',
      'Genuine fit with McKinsey culture',
    ],
    howToPrepare: [
      'Cases may be harder and more ambiguous—practice uncertainty.',
      'Partners will probe PEI stories even deeper—know every detail.',
      'Research Partner backgrounds and their practice areas.',
      'Practice confident, concise communication.',
      'Be ready to discuss McKinsey\'s values and why they resonate with you.',
    ],
    commonMistakes: [
      'Being intimidated by Partner seniority.',
      'PEI stories that fall apart under deep probing.',
      'Not demonstrating genuine interest in consulting.',
      'Hedging instead of making clear recommendations.',
      'Forgetting that Partner interviews are also assessing "fit."',
    ],
    checklist: makeChecklist([
      'I\'m comfortable with senior executive presence',
      'My PEI stories hold up to 15+ follow-ups',
      'I can handle ambiguous, unstructured cases',
      'I communicate with confidence and clarity',
      'I genuinely understand why McKinsey, not just "consulting"',
    ]),
  },
];

// =============================================================================
// COMPANY CONFIGURATIONS
// =============================================================================

export const COMPANIES: CompanyConfig[] = [
  {
    id: 'amazon-sde',
    slug: 'amazon-software-engineer',
    name: 'Amazon',
    role: 'Software Development Engineer',
    color: '#FF9900',
    description: 'Prepare for Amazon\'s unique LP-focused interview process',
    interviewProcess: 'Amazon evaluates candidates against 16 Leadership Principles. Every interview—technical and behavioral—includes LP assessment. The Bar Raiser ensures hiring bar consistency.',
    stages: AMAZON_STAGES,
    keyPrinciples: AMAZON_LEADERSHIP_PRINCIPLES,
    setPieceCategories: ['leadership', 'achievement', 'challenges', 'conflict', 'growth', 'teamwork'],
    tips: [
      'Every answer should naturally connect to Leadership Principles',
      'Use "I" not "we"—Amazon wants YOUR specific contribution',
      'Quantify everything: percentages, dollars, time saved',
      'Prepare 2+ stories per LP—you\'ll be asked multiple times',
      'The Bar Raiser\'s job is to find reasons to say no',
    ],
  },
  {
    id: 'google-swe',
    slug: 'google-software-engineer',
    name: 'Google',
    role: 'Software Engineer',
    color: '#4285F4',
    description: 'Master Google\'s technical-heavy interview process',
    interviewProcess: 'Google emphasizes technical depth with coding and system design interviews. The Hiring Committee makes decisions based on written feedback, not individual interviewers.',
    stages: GOOGLE_STAGES,
    setPieceCategories: ['teamwork', 'technical', 'growth', 'challenges', 'leadership'],
    tips: [
      'Technical skills matter most—practice coding daily',
      'Show intellectual humility and collaboration',
      'Googleyness values "we" as much as "I"',
      'All interviewers contribute equally to your packet',
      'The Hiring Committee, not interviewers, makes the decision',
    ],
  },
  {
    id: 'mckinsey-consultant',
    slug: 'mckinsey-consultant',
    name: 'McKinsey',
    role: 'Business Analyst / Associate',
    color: '#0A3D7F',
    description: 'Excel at McKinsey\'s case and PEI interviews',
    interviewProcess: 'McKinsey uses case interviews to test problem-solving and PEI (Personal Experience Interview) to assess leadership potential. Partners make final hiring decisions.',
    stages: MCKINSEY_STAGES,
    keyPrinciples: MCKINSEY_PEI_DIMENSIONS,
    setPieceCategories: ['leadership', 'achievement', 'challenges', 'growth'],
    tips: [
      'PEI stories must be genuinely exceptional, not just "good"',
      'Cases test structured thinking, not memorized frameworks',
      'Practice mental math daily',
      'Always end with a clear recommendation',
      'Partner interviews assess client-readiness',
    ],
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getCompanyBySlug(slug: string): CompanyConfig | null {
  return COMPANIES.find(c => c.slug === slug) || null;
}

export function getCompanyById(id: string): CompanyConfig | null {
  return COMPANIES.find(c => c.id === id) || null;
}

export function getCompanyStages(companySlug: string): InterviewStage[] {
  const company = getCompanyBySlug(companySlug);
  return company?.stages || [];
}

export function getCompanyStageBySlug(companySlug: string, stageSlug: string): InterviewStage | null {
  const stages = getCompanyStages(companySlug);
  return stages.find(s => s.slug === stageSlug) || null;
}

export function getAllCompanySlugs(): string[] {
  return COMPANIES.map(c => c.slug);
}
