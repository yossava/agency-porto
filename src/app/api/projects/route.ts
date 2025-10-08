import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getFeaturedProjects } from '@/lib/db/projects';
import { sanitizeErrorMessage, logError } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    let projects;

    if (featured === 'true') {
      projects = await getFeaturedProjects();
    } else {
      projects = await getAllProjects();
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    logError('API:projects', error);
    return NextResponse.json(
      {
        success: false,
        error: sanitizeErrorMessage(error, 'Failed to fetch projects'),
      },
      { status: 500 }
    );
  }
}
