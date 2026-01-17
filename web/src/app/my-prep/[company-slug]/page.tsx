import { getAllCompanySlugs } from '../../../data/companies';
import CompanyPrepClient from './CompanyPrepClient';

export function generateStaticParams() {
  const slugs = getAllCompanySlugs();
  return slugs.map((slug) => ({
    'company-slug': slug,
  }));
}

export default async function CompanyPrepPage({
  params,
}: {
  params: Promise<{ 'company-slug': string }>;
}) {
  const { 'company-slug': companySlug } = await params;
  return <CompanyPrepClient companySlug={companySlug} />;
}
