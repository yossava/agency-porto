import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/lib/db/blog';
import { validateSlug, sanitizeErrorMessage, logError } from '@/lib/security';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Validate and sanitize the slug parameter to prevent NoSQL injection
    const sanitizedSlug = validateSlug(params.slug);

    const post = await getBlogPostBySlug(sanitizedSlug);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    logError('API:blog/[slug]', error);

    // Return appropriate error based on type
    if (error instanceof Error && error.message.includes('Invalid')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid blog post slug',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: sanitizeErrorMessage(error, 'Failed to fetch blog post'),
      },
      { status: 500 }
    );
  }
}
