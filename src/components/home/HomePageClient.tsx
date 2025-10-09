'use client';

import { ReactNode } from 'react';
import CursorTrail from '@/components/effects/CursorTrail';

interface HomePageClientProps {
  children: ReactNode;
}

export default function HomePageClient({ children }: HomePageClientProps) {
  return (
    <>
      <CursorTrail />
      {children}
    </>
  );
}
