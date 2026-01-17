import { getAllCompanySlugs, getCompanyStages } from '../../../../../data/companies';
import CompanyStageClient from './CompanyStageClient';

export function generateStaticParams() {
  const companySlugs = getAllCompanySlugs();
  const params: { 'company-slug': string; slug: string }[] = [];

  companySlugs.forEach((companySlug) => {
    const stages = getCompanyStages(companySlug);
    stages.forEach((stage) => {
      params.push({
        'company-slug': companySlug,
        slug: stage.slug,
      });
    });
  });

  return params;
}

export default async function CompanyStageDetailPage({
  params,
}: {
  params: Promise<{ 'company-slug': string; slug: string }>;
}) {
  const { 'company-slug': companySlug, slug } = await params;
  return <CompanyStageClient companySlug={companySlug} stageSlug={slug} />;
}
