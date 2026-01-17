import { Position } from '@/lib/types';

export const positions: Record<string, Position> = {
  'google-software-engineer': {
    slug: 'google-software-engineer',
    company: 'Google',
    role: 'Software Engineer',
    industry: 'Big Tech',
    headline: 'Ace Your Google SWE Interview',
    subheadline: 'Master the coding, system design, and behavioral rounds with insider strategies from engineers who\'ve been there.',
    bullets: [
      'Learn the exact LeetCode patterns Google asks most frequently',
      'System design frameworks used by L5+ engineers',
      'Behavioral prep for Googleyness and Leadership',
    ],
    ctaText: 'Start Preparing Now',
    metaDescription: 'Comprehensive Google Software Engineer interview prep. Master coding, system design, and behavioral interviews with proven strategies.',
    interviewRounds: 5,
    avgPrepTime: '8-12 weeks',
    difficulty: 'Very Hard',
    modules: [
      { id: 'M001', name: 'Data Structures & Algorithms', duration: '40 hrs', description: 'Master the core DSA patterns tested at Google' },
      { id: 'M002', name: 'System Design', duration: '30 hrs', description: 'Design scalable systems like Google engineers' },
      { id: 'M004', name: 'Behavioral Interview Mastery', duration: '10 hrs', description: 'Nail the Googleyness and Leadership questions' },
      { id: 'C002', name: 'Google Deep Dive', duration: '15 hrs', description: 'Company-specific culture, values, and interview quirks' },
    ],
    price: 197,
    faqs: [
      {
        question: 'How long should I prepare for a Google interview?',
        answer: 'Most successful candidates spend 8-12 weeks preparing, dedicating 2-3 hours per day. If you\'re already strong in DSA, you might need less time.',
      },
      {
        question: 'What\'s the Google interview process like?',
        answer: 'Google typically has 5 rounds: 2 coding interviews, 1 system design (for L4+), and 2 behavioral/Googleyness rounds. All are conducted by different interviewers.',
      },
      {
        question: 'Do I get lifetime access?',
        answer: 'Yes! Once you purchase, you have unlimited access to all materials forever, including any future updates.',
      },
      {
        question: 'What if I don\'t pass my interview?',
        answer: 'We offer a 7-day money-back guarantee. If you\'re not satisfied with the content, we\'ll refund your purchase.',
      },
    ],
  },

  'amazon-software-engineer': {
    slug: 'amazon-software-engineer',
    company: 'Amazon',
    role: 'Software Engineer',
    industry: 'Big Tech',
    headline: 'Crack the Amazon SDE Interview',
    subheadline: 'Master Leadership Principles, coding rounds, and system design with Amazon-specific strategies.',
    bullets: [
      'Deep dive into all 16 Leadership Principles with example answers',
      'Amazon\'s unique bar raiser round preparation',
      'System design patterns for AWS-scale problems',
    ],
    ctaText: 'Start Your Prep',
    metaDescription: 'Complete Amazon Software Engineer interview prep. Learn Leadership Principles, coding patterns, and system design for Amazon interviews.',
    interviewRounds: 5,
    avgPrepTime: '6-10 weeks',
    difficulty: 'Hard',
    modules: [
      { id: 'M001', name: 'Data Structures & Algorithms', duration: '40 hrs', description: 'Master coding patterns Amazon loves' },
      { id: 'M002', name: 'System Design', duration: '30 hrs', description: 'Design for AWS-scale distributed systems' },
      { id: 'C001', name: 'Amazon Leadership Principles', duration: '20 hrs', description: 'Master all 16 LPs with STAR stories' },
      { id: 'M004', name: 'Behavioral Interview Mastery', duration: '10 hrs', description: 'Ace the Bar Raiser round' },
    ],
    price: 197,
    faqs: [
      {
        question: 'How important are Leadership Principles?',
        answer: 'Extremely important. Amazon evaluates every candidate against their 16 Leadership Principles. You\'ll need 2-3 strong STAR stories for each principle.',
      },
      {
        question: 'What is the Bar Raiser round?',
        answer: 'The Bar Raiser is an Amazonian from outside the hiring team who ensures hiring standards stay high. They focus heavily on Leadership Principles and long-term potential.',
      },
      {
        question: 'How many coding rounds are there?',
        answer: 'Typically 2 coding rounds focused on data structures, algorithms, and object-oriented design. Amazon often asks about optimizing for scale.',
      },
      {
        question: 'Do I get lifetime access?',
        answer: 'Yes! Unlimited access forever, including all future updates to the content.',
      },
    ],
  },

  'mckinsey-consultant': {
    slug: 'mckinsey-consultant',
    company: 'McKinsey',
    role: 'Consultant',
    industry: 'Consulting',
    headline: 'Land Your McKinsey Offer',
    subheadline: 'Master case interviews and PEI with frameworks used by successful McKinsey consultants.',
    bullets: [
      'Proven case interview frameworks for any business problem',
      'Personal Experience Interview (PEI) story development',
      'McKinsey-specific problem-solving approach',
    ],
    ctaText: 'Begin Case Prep',
    metaDescription: 'McKinsey consultant interview prep. Master case interviews, PEI, and the McKinsey Problem Solving approach.',
    interviewRounds: 4,
    avgPrepTime: '8-12 weeks',
    difficulty: 'Very Hard',
    modules: [
      { id: 'M009', name: 'Case Interview Frameworks', duration: '35 hrs', description: 'Master profitability, market entry, M&A, and more' },
      { id: 'C005', name: 'McKinsey PEI Mastery', duration: '15 hrs', description: 'Develop compelling stories for Personal Experience Interview' },
      { id: 'M004', name: 'Behavioral Interview Mastery', duration: '10 hrs', description: 'Leadership and impact stories that resonate' },
      { id: 'I003', name: 'Mental Math Drills', duration: '10 hrs', description: 'Quick calculations under pressure' },
    ],
    price: 197,
    faqs: [
      {
        question: 'What is the McKinsey interview process?',
        answer: 'McKinsey has 2-3 rounds, each with a case interview and Personal Experience Interview (PEI). Cases test problem-solving; PEI tests leadership and personal impact.',
      },
      {
        question: 'How many cases should I practice?',
        answer: 'Most successful candidates practice 30-50 cases before their interview. Quality matters more than quantity—focus on improving your structure and communication.',
      },
      {
        question: 'What is the PEI?',
        answer: 'The Personal Experience Interview is McKinsey\'s behavioral round. You\'ll share stories demonstrating leadership, personal impact, and ability to drive change.',
      },
      {
        question: 'Do I need a business background?',
        answer: 'No! McKinsey hires from diverse backgrounds. Our prep covers all the business fundamentals you\'ll need.',
      },
    ],
  },
};

export function getPositionBySlug(slug: string): Position | undefined {
  return positions[slug];
}

export function getAllPositions(): Position[] {
  return Object.values(positions);
}

export function getAllSlugs(): string[] {
  return Object.keys(positions);
}
