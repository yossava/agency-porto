import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/db/blog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let posts;

    if (featured === 'true') {
      posts = await getFeaturedBlogPosts(limit ? parseInt(limit) : 3);
    } else {
      posts = await getAllBlogPosts();
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch blog posts',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
