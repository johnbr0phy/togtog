import { SET_PIECE_CATEGORIES } from '../../../../types/v3';
import CategoryDetailClient from './CategoryDetailClient';

export function generateStaticParams() {
  return SET_PIECE_CATEGORIES.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CategoryDetailClient categoryId={id} />;
}
