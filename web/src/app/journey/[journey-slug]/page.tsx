import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJourney, getJourneySlugs } from '@/data/modules';
import JourneyOverviewClient from './JourneyOverviewClient';

interface PageProps {
  params: Promise<{ 'journey-slug': string }>;
}

export async function generateStaticParams() {
  return getJourneySlugs().map((slug) => ({
    'journey-slug': slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'journey-slug': journeySlug } = await params;
  const journey = getJourney(journeySlug);

  if (!journey) {
    return { title: 'Journey Not Found' };
  }

  return {
    title: `${journey.title} | togtog`,
    description: journey.description,
  };
}

export default async function JourneyOverviewPage({ params }: PageProps) {
  const { 'journey-slug': journeySlug } = await params;
  const journey = getJourney(journeySlug);

  if (!journey) {
    notFound();
  }

  return <JourneyOverviewClient journey={journey} />;
}
