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
