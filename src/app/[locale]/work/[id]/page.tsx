import { getProjectById, getRelatedProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/work/ProjectDetailClient';

interface ProjectPageProps {
  params: { locale: string; id: string };
}

export default async function ProjectPage({ params: { locale, id } }: ProjectPageProps) {
  const currentLocale = locale as 'en' | 'id';
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Get related projects (same category)
  const relatedProjects = await getRelatedProjects(
    id,
    project.category[currentLocale],
    currentLocale,
    3
  );

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} locale={currentLocale} />;
}
