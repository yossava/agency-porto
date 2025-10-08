import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { getAllProjects } from '@/lib/content';
import WorkPageClient from '@/components/work/WorkPageClient';

interface WorkPageProps {
  params: { locale: string };
}

export default async function WorkPage({ params: { locale } }: WorkPageProps) {
  const projects = await getAllProjects();

  return <WorkPageClient locale={locale} projects={projects} />;
}
