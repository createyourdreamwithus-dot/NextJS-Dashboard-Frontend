'use client';

import SubCategories from '@/Screens/Categories/SubCategories/SubCategories';
import { useParams } from 'next/navigation';

export default function SubcategoryPage() {
  const { slug } = useParams(); 

  return (
    <div>
      <SubCategories slug={slug as string} />
    </div>
  );
}
