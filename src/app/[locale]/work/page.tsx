import { getAllProjects } from '@/lib/content';
import WorkPageClient from '@/components/work/WorkPageClient';
import { generatePageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

interface WorkPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: WorkPageProps): Promise<Metadata> {
  return generatePageMetadata('work', locale as 'id' | 'en');
}

export default async function WorkPage({ params: { locale } }: WorkPageProps) {
  const projects = await getAllProjects();

  return <WorkPageClient locale={locale} projects={projects} />;
}
