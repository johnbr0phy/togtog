import { SET_PIECE_CATEGORIES } from '../../../../types/v3';
import CategoryDetailClient from './CategoryDetailClient';

export function generateStaticParams() {
  return SET_PIECE_CATEGORIES.map((category) => ({
    id: category.id,
  }));
}

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  return <CategoryDetailClient categoryId={params.id} />;
}
