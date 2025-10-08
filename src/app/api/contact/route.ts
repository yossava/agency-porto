import { NextRequest, NextResponse } from 'next/server';
import { createContactSubmission } from '@/lib/db/contact';
import { sanitizeErrorMessage, logError } from '@/lib/security';
import { z } from 'zod';

// Validation schema with strict rules to prevent injection
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .max(20, 'Phone number is too long')
    .regex(/^[0-9\s\-\+\(\)]*$/, 'Phone contains invalid characters')
    .optional(),
  company: z
    .string()
    .max(100, 'Company name is too long')
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
  subject: z
    .string()
    .max(200, 'Subject is too long')
    .optional(),
  locale: z.enum(['id', 'en']),
});

// Simple in-memory rate limiting
// NOTE: This is for development only. In production, use Redis or a
// dedicated rate limiting service to work across multiple server instances.
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

    // Get metadata (sanitized)
    const metadata = {
      userAgent: request.headers.get('user-agent')?.substring(0, 200) || undefined,
      ip: ip !== 'unknown' ? ip.substring(0, 45) : undefined, // IPv6 max length
      referrer: request.headers.get('referer')?.substring(0, 500) || undefined,
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
    logError('API:contact', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: sanitizeErrorMessage(error, 'Failed to submit contact form'),
      },
      { status: 500 }
    );
  }
}
