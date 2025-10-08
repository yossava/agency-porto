import { ObjectId } from 'mongodb';

/**
 * Validate and sanitize string input to prevent NoSQL injection
 * Ensures the input is a plain string without MongoDB operators
 */
export function sanitizeStringInput(input: string): string {
  // Ensure input is actually a string
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }

  // Remove any MongoDB operators that might be in the string
  const sanitized = input.replace(/^\$/, '');

  // Validate against common patterns that might indicate injection attempts
  if (sanitized.includes('$') || sanitized.includes('{') || sanitized.includes('}')) {
    throw new Error('Invalid characters in input');
  }

  return sanitized.trim();
}

/**
 * Validate slug format (alphanumeric with hyphens)
 */
export function validateSlug(slug: string): string {
  const sanitized = sanitizeStringInput(slug);

  // Slug should only contain lowercase letters, numbers, and hyphens
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slugPattern.test(sanitized)) {
    throw new Error('Invalid slug format');
  }

  // Reasonable length limits
  if (sanitized.length < 1 || sanitized.length > 200) {
    throw new Error('Slug length out of bounds');
  }

  return sanitized;
}

/**
 * Validate project/resource ID format
 */
export function validateId(id: string): string {
  const sanitized = sanitizeStringInput(id);

  // ID should only contain alphanumeric characters and hyphens
  const idPattern = /^[a-zA-Z0-9-_]+$/;

  if (!idPattern.test(sanitized)) {
    throw new Error('Invalid ID format');
  }

  // Reasonable length limits
  if (sanitized.length < 1 || sanitized.length > 100) {
    throw new Error('ID length out of bounds');
  }

  return sanitized;
}

/**
 * Validate MongoDB ObjectId format
 */
export function validateObjectId(id: string): ObjectId {
  // Ensure it's a string
  if (typeof id !== 'string') {
    throw new Error('ObjectId must be a string');
  }

  // ObjectId should be 24 hex characters
  if (!/^[a-f\d]{24}$/i.test(id)) {
    throw new Error('Invalid ObjectId format');
  }

  try {
    return new ObjectId(id);
  } catch (error) {
    throw new Error('Invalid ObjectId');
  }
}

/**
 * Validate and sanitize numeric input
 */
export function validateNumber(
  value: string | number,
  options: { min?: number; max?: number; default?: number } = {}
): number {
  let num: number;

  if (typeof value === 'string') {
    num = parseInt(value, 10);
  } else if (typeof value === 'number') {
    num = value;
  } else {
    if (options.default !== undefined) {
      return options.default;
    }
    throw new Error('Invalid number');
  }

  // Check if parsing resulted in NaN
  if (isNaN(num)) {
    if (options.default !== undefined) {
      return options.default;
    }
    throw new Error('Invalid number');
  }

  // Validate bounds
  if (options.min !== undefined && num < options.min) {
    throw new Error(`Number must be at least ${options.min}`);
  }

  if (options.max !== undefined && num > options.max) {
    throw new Error(`Number must be at most ${options.max}`);
  }

  return num;
}

/**
 * Sanitize error message for client response
 * Prevents leaking sensitive implementation details
 */
export function sanitizeErrorMessage(error: unknown, defaultMessage: string = 'An error occurred'): string {
  // In production, never expose detailed error messages
  if (process.env.NODE_ENV === 'production') {
    return defaultMessage;
  }

  // In development, provide more details for debugging
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}

/**
 * Safe error logger - only logs in development
 */
export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
  // In production, you might want to send to an error tracking service
  // e.g., Sentry, LogRocket, etc.
}
