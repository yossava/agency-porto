# Security Documentation

This document outlines the security measures implemented in this project and best practices for maintaining security.

## Overview

This project implements multiple layers of security to protect against common web vulnerabilities including:
- NoSQL Injection
- Cross-Site Scripting (XSS)
- Information Disclosure
- Rate Limiting Bypass
- Input Validation Issues

## Security Measures Implemented

### 1. Input Validation & Sanitization

**Location:** `src/lib/security.ts`

All user inputs are validated and sanitized before being used in database queries or operations:

- **String Sanitization:** Removes MongoDB operators and validates format
- **Slug Validation:** Ensures slugs only contain safe characters (a-z, 0-9, hyphens)
- **ID Validation:** Validates resource IDs format
- **ObjectId Validation:** Validates MongoDB ObjectId format before instantiation
- **Number Validation:** Safely parses and validates numeric inputs with bounds checking

**API Routes Protected:**
- `/api/projects/[id]` - Validates project ID
- `/api/blog/[slug]` - Validates blog post slug
- `/api/blog` - Validates limit parameter
- `/api/contact` - Validates all form inputs with Zod schemas

### 2. NoSQL Injection Prevention

**Vulnerable Pattern (BEFORE):**
```typescript
const project = await getProjectById(params.id); // Direct use of user input
```

**Secured Pattern (AFTER):**
```typescript
const sanitizedId = validateId(params.id); // Validate first
const project = await getProjectById(sanitizedId);
```

All database queries now use validated inputs that:
- Ensure inputs are plain strings
- Remove MongoDB operators (`$`, `{`, `}`)
- Validate against expected patterns
- Apply reasonable length limits

### 3. Error Message Sanitization

**Development vs Production:**
- **Development:** Detailed error messages for debugging
- **Production:** Generic error messages to prevent information disclosure

**Implementation:**
```typescript
export function sanitizeErrorMessage(error: unknown, defaultMessage: string): string {
  if (process.env.NODE_ENV === 'production') {
    return defaultMessage; // Generic message in production
  }
  // Detailed message in development
  return error instanceof Error ? error.message : defaultMessage;
}
```

### 4. Rate Limiting

**Location:** `src/app/api/contact/route.ts`

Contact form submissions are rate-limited to prevent abuse:
- **Limit:** 3 requests per 60 seconds per IP address
- **Implementation:** In-memory for development

**⚠️ Production Warning:**
The current in-memory rate limiting implementation won't work properly with multiple server instances. For production, use:
- Redis-based rate limiting
- Edge middleware rate limiting (Vercel, Cloudflare)
- Dedicated rate limiting service

### 5. Enhanced Form Validation

Contact form uses strict Zod schemas with:
- **Name:** 2-100 characters, letters/spaces/hyphens only
- **Email:** Valid email format, max 255 characters
- **Phone:** Numbers and phone symbols only, max 20 characters
- **Message:** 10-5000 characters
- **Company:** Max 100 characters
- All fields validated against injection patterns

### 6. Metadata Sanitization

User-agent, IP, and referrer headers are truncated to prevent storage issues:
```typescript
const metadata = {
  userAgent: request.headers.get('user-agent')?.substring(0, 200),
  ip: ip.substring(0, 45), // IPv6 max length
  referrer: request.headers.get('referer')?.substring(0, 500),
};
```

### 7. Secure Error Logging

Errors are only logged to console in development:
```typescript
export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
  // In production, send to error tracking service
}
```

### 8. Database Connection Security

- MongoDB connection string stored in environment variables
- `.env` file is in `.gitignore` (never committed to git)
- Connection pooling for better performance
- Server-side only (never exposed to client)

## Environment Variables Security

### Critical Security Rules:

1. **Never commit `.env` to git**
   - ✅ `.env` is in `.gitignore`
   - ✅ Only `.env.example` is committed (without secrets)

2. **Use strong credentials:**
   - Generate strong passwords for MongoDB users
   - Use MongoDB's built-in password generator
   - Rotate credentials periodically

3. **Principle of Least Privilege:**
   - Database user should only have necessary permissions
   - Use read-only users for read operations when possible

4. **Environment-specific configurations:**
   - Different credentials for development/staging/production
   - Never reuse production credentials in development

## Server/Client Component Separation

### Security Architecture:

```
Client Components (Browser)
    ↓ props only (serialized data)
Server Components (Node.js)
    ↓ validated queries
Database (MongoDB)
```

**Rules:**
- ✅ Client components receive data as props
- ✅ No database imports in client components
- ✅ All validation happens server-side
- ✅ MongoDB connection is server-side only

## API Route Security Checklist

For each API route, ensure:

- [ ] Input validation using `src/lib/security.ts` utilities
- [ ] Sanitized error messages (no implementation details leaked)
- [ ] Proper error logging (development only)
- [ ] Appropriate HTTP status codes
- [ ] Rate limiting for write operations
- [ ] Input length limits
- [ ] Type validation (Zod schemas for complex inputs)

## Security Best Practices for Development

### 1. Adding New API Routes

```typescript
import { validateId, sanitizeErrorMessage, logError } from '@/lib/security';

export async function GET(request: NextRequest, { params }) {
  try {
    // 1. Validate all inputs
    const sanitizedId = validateId(params.id);

    // 2. Use validated input
    const data = await getData(sanitizedId);

    // 3. Return data
    return NextResponse.json({ success: true, data });
  } catch (error) {
    // 4. Log securely
    logError('API:route-name', error);

    // 5. Return sanitized error
    return NextResponse.json(
      { success: false, error: sanitizeErrorMessage(error, 'Operation failed') },
      { status: 500 }
    );
  }
}
```

### 2. Database Queries

Always use the validation helpers before database operations:

```typescript
// ❌ DON'T: Direct use of user input
const user = await db.collection('users').findOne({ id: userId });

// ✅ DO: Validate first
const sanitizedId = validateId(userId);
const user = await db.collection('users').findOne({ id: sanitizedId });
```

### 3. Environment Variables

```typescript
// ❌ DON'T: Expose secrets to client
const API_KEY = process.env.SECRET_API_KEY; // In client component

// ✅ DO: Keep secrets server-side
// In server component or API route only
const API_KEY = process.env.SECRET_API_KEY;
```

## Production Deployment Checklist

Before deploying to production:

- [ ] Verify `.env` is in `.gitignore`
- [ ] Confirm no secrets in git history
- [ ] Set `NODE_ENV=production` in environment
- [ ] Use production MongoDB cluster (not shared with dev)
- [ ] Enable MongoDB access control and authentication
- [ ] Restrict MongoDB network access (IP whitelist)
- [ ] Implement proper rate limiting (Redis or edge middleware)
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS appropriately
- [ ] Set security headers (Content-Security-Policy, etc.)
- [ ] Regular security audits with `npm audit`
- [ ] Keep dependencies up to date

## Monitoring & Incident Response

### What to Monitor:

1. **Failed Authentication Attempts:** Unusual patterns might indicate attacks
2. **Rate Limit Violations:** Track IPs hitting rate limits
3. **Validation Failures:** Spike in validation errors might indicate probing
4. **Error Rates:** Sudden increase could indicate issues or attacks
5. **Database Performance:** Slow queries might indicate inefficient or malicious queries

### Incident Response:

1. **Identify:** Use logs to identify the issue
2. **Contain:** Block malicious IPs, disable affected features
3. **Investigate:** Determine scope and impact
4. **Remediate:** Fix vulnerability, update code
5. **Document:** Record incident and response for future reference

## Known Limitations

1. **Rate Limiting:** Current implementation is in-memory and won't work across multiple server instances in production. Migration to Redis recommended.

2. **Input Validation:** While comprehensive, new attack vectors are constantly discovered. Stay updated with OWASP guidelines.

3. **Error Logging:** Currently logs to console. Production should use dedicated logging service.

## Security Updates

To keep security up to date:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Contact

For security issues, please report to: [your-security-email@domain.com]

**DO NOT** create public GitHub issues for security vulnerabilities.

## License

This security documentation is part of the project and follows the same license.
