import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '@/lib/db/projects';
import { validateId, sanitizeErrorMessage, logError } from '@/lib/security';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate and sanitize the ID parameter to prevent NoSQL injection
    const sanitizedId = validateId(params.id);

    const project = await getProjectById(sanitizedId);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    logError('API:projects/[id]', error);

    // Return appropriate error based on type
    if (error instanceof Error && error.message.includes('Invalid')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid project ID',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: sanitizeErrorMessage(error, 'Failed to fetch project'),
      },
      { status: 500 }
    );
  }
}
