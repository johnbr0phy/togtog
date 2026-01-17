import { STAGES } from '../../../data/stages';
import StagePageClient from './StagePageClient';

// Generate static paths for all stages
export function generateStaticParams() {
  return STAGES.map((stage) => ({
    slug: stage.slug,
  }));
}

export default function StagePage({ params }: { params: { slug: string } }) {
  return <StagePageClient slug={params.slug} />;
}
