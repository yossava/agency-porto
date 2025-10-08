import { NextRequest, NextResponse } from 'next/server';
import { createContactSubmission } from '@/lib/db/contact';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional(),
  locale: z.enum(['id', 'en']),
});

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, number[]>();

function rateLimit(ip: string, maxRequests: number = 3, windowMs: number = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Get metadata
    const metadata = {
      userAgent: request.headers.get('user-agent') || undefined,
      ip: ip !== 'unknown' ? ip : undefined,
      referrer: request.headers.get('referer') || undefined,
    };

    // Save to database
    const result = await createContactSubmission({
      ...validatedData,
      source: 'contact_form',
      metadata,
    });

    // TODO: Send email notification (optional)
    // await sendEmailNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: validatedData.locale === 'id'
        ? 'Pesan berhasil dikirim. Kami akan menghubungi Anda segera.'
        : 'Message sent successfully. We will contact you soon.',
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
