import { getProjectById, getRelatedProjects } from '@/lib/content';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/work/ProjectDetailClient';
import { generateProjectMetadata, generateProjectSchema } from '@/lib/seo';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: { locale: string; id: string };
}

export async function generateMetadata({
  params: { locale, id },
}: ProjectPageProps): Promise<Metadata> {
  const currentLocale = locale as 'en' | 'id';
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return generateProjectMetadata(project, currentLocale);
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

  // Generate JSON-LD structured data
  const projectSchema = generateProjectSchema(project, currentLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} locale={currentLocale} />
    </>
  );
}
