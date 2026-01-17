import { STAGES } from '../../../data/stages';
import StagePageClient from './StagePageClient';

// Generate static paths for all stages
export function generateStaticParams() {
  return STAGES.map((stage) => ({
    slug: stage.slug,
  }));
}

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <StagePageClient slug={slug} />;
}
