import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/db/blog';
import { validateNumber, sanitizeErrorMessage, logError } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');

    let posts;

    if (featured === 'true') {
      // Validate limit parameter with safe bounds
      const limit = limitParam
        ? validateNumber(limitParam, { min: 1, max: 100, default: 3 })
        : 3;

      posts = await getFeaturedBlogPosts(limit);
    } else {
      posts = await getAllBlogPosts();
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    logError('API:blog', error);

    // Return appropriate error based on type
    if (error instanceof Error && error.message.includes('Invalid')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid parameters',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: sanitizeErrorMessage(error, 'Failed to fetch blog posts'),
      },
      { status: 500 }
    );
  }
}
