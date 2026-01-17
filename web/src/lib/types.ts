export interface Position {
  slug: string;
  company: string;
  role: string;
  level?: string;
  industry: string;
  logoUrl?: string;

  // Marketing copy
  headline: string;
  subheadline: string;
  bullets: string[];
  ctaText: string;
  metaDescription: string;

  // Interview details
  interviewRounds: number;
  avgPrepTime: string;
  difficulty: 'Medium' | 'Hard' | 'Very Hard';

  // Modules included
  modules: {
    id: string;
    name: string;
    duration: string;
    description: string;
  }[];

  // Pricing
  price: number;

  // FAQ
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Module {
  id: string;
  name: string;
  category: 'universal' | 'company' | 'industry' | 'role';
  duration: string;
  description: string;
}

export type QuestionType = 'behavioral' | 'technical' | 'case_study' | 'situational' | 'culture_fit' | 'multiple_choice';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuestionIntent {
  hiddenIntent: string;           // What they're really testing (1 sentence)
  strongAnswersDemonstrate: string[];  // What good answers show
  weakAnswersReveal: string[];    // What bad answers expose
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  context?: string;
  difficulty: Difficulty;
  estimatedTimeMinutes?: number;
  companies: string[];
  tags: string[];

  // For multiple choice
  options?: string[];
  correctAnswer?: number;
  explanation?: string;

  // For behavioral/situational
  sampleAnswer?: string;
  evaluationCriteria?: string[];

  // For case study
  frameworkHint?: string;
  keyAreas?: string[];

  // Premium content (blurred in free tier)
  isPremiumAnswer: boolean;

  // Hidden intent (H1)
  intent?: QuestionIntent;
}
