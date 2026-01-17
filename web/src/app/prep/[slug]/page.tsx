import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPositionBySlug, getAllSlugs } from '@/data/positions';
import { HeroSection } from '@/components/HeroSection';
import { ModulesSection } from '@/components/ModulesSection';
import { SocialProofSection } from '@/components/SocialProofSection';
import { PricingSection } from '@/components/PricingSection';
import { FAQSection } from '@/components/FAQSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const position = getPositionBySlug(slug);

  if (!position) {
    return { title: 'Position Not Found' };
  }

  return {
    title: `${position.company} ${position.role} Interview Prep | InterviewPrep`,
    description: position.metaDescription,
    openGraph: {
      title: position.headline,
      description: position.subheadline,
      type: 'website',
    },
  };
}

export default async function PrepPage({ params }: PageProps) {
  const { slug } = await params;
  const position = getPositionBySlug(slug);

  if (!position) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <HeroSection position={position} />
      <ModulesSection position={position} />
      <SocialProofSection company={position.company} />
      <PricingSection position={position} />
      <FAQSection position={position} />
    </main>
  );
}
