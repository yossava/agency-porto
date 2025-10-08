import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getFeaturedProjects } from '@/lib/db/projects';

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
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
