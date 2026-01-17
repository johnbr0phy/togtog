import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJourney, getJourneySlugs, getJourneyStepSlugs, getStepBySlug } from '@/data/modules';
import JourneyStepClient from './JourneyStepClient';

interface PageProps {
  params: Promise<{ 'journey-slug': string; 'step-slug': string }>;
}

export async function generateStaticParams() {
  const params: Array<{ 'journey-slug': string; 'step-slug': string }> = [];

  for (const journeySlug of getJourneySlugs()) {
    const stepSlugs = getJourneyStepSlugs(journeySlug);
    for (const stepSlug of stepSlugs) {
      params.push({
        'journey-slug': journeySlug,
        'step-slug': stepSlug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'journey-slug': journeySlug, 'step-slug': stepSlug } = await params;
  const journey = getJourney(journeySlug);
  const stepData = getStepBySlug(journeySlug, stepSlug);

  if (!journey || !stepData) {
    return { title: 'Step Not Found' };
  }

  return {
    title: `${stepData.step.title} | ${journey.title} | togtog`,
    description: stepData.step.subtitle || `Learn about ${stepData.step.title}`,
  };
}

export default async function JourneyStepPage({ params }: PageProps) {
  const { 'journey-slug': journeySlug, 'step-slug': stepSlug } = await params;
  const journey = getJourney(journeySlug);

  if (!journey) {
    notFound();
  }

  const stepData = getStepBySlug(journeySlug, stepSlug);
  if (!stepData) {
    notFound();
  }

  return (
    <JourneyStepClient journeySlug={journeySlug} stepSlug={stepSlug} journey={journey} />
  );
}
