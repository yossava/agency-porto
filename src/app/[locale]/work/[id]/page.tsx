import { getProjectById, getAllProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/work/ProjectDetailClient';

interface ProjectPageProps {
  params: { locale: string; id: string };
}

export function generateStaticParams() {
  const projects = getAllProjects();
  const locales = ['en', 'id'];

  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      id: project.id,
    }))
  );
}

export default function ProjectPage({ params: { locale, id } }: ProjectPageProps) {
  const project = getProjectById(id);
  const currentLocale = locale as 'en' | 'id';

  if (!project) {
    notFound();
  }

  // Get related projects (same category)
  const allProjects = getAllProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== id && p.category[currentLocale] === project.category[currentLocale])
    .slice(0, 3);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} locale={currentLocale} />;
}
