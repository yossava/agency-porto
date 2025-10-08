import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { validateObjectId } from '@/lib/security';

export interface ContactSubmission {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
  locale: 'id' | 'en';
  status: 'new' | 'read' | 'replied' | 'archived';
  source: string;
  metadata?: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
  };
  createdAt: Date;
  readAt?: Date;
  repliedAt?: Date;
}

/**
 * Create a new contact form submission
 * @param data - Contact submission data
 * @returns Insert result with the new submission ID
 */
export async function createContactSubmission(
  data: Omit<ContactSubmission, '_id' | 'createdAt' | 'status'>
) {
  const db = await getDatabase();

  const submission: ContactSubmission = {
    ...data,
    status: 'new',
    createdAt: new Date(),
  };

  const result = await db
    .collection<ContactSubmission>('contact_submissions')
    .insertOne(submission);

  return result;
}

/**
 * Get all contact submissions with optional status filter
 * @param status - Filter by status (optional)
 * @returns Array of contact submissions
 */
export async function getContactSubmissions(
  status?: 'new' | 'read' | 'replied' | 'archived'
): Promise<ContactSubmission[]> {
  const db = await getDatabase();

  const filter = status ? { status } : {};

  const submissions = await db
    .collection<ContactSubmission>('contact_submissions')
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return submissions;
}

/**
 * Get a single contact submission by ID
 * @param id - Submission ID
 * @returns Contact submission or null if not found
 */
export async function getContactSubmissionById(id: string): Promise<ContactSubmission | null> {
  const db = await getDatabase();

  // Validate ObjectId format before querying
  const objectId = validateObjectId(id);

  const submission = await db
    .collection<ContactSubmission>('contact_submissions')
    .findOne({ _id: objectId });

  return submission;
}

/**
 * Update contact submission status
 * @param id - Submission ID
 * @param status - New status
 * @returns Update result
 */
export async function updateContactSubmissionStatus(
  id: string,
  status: 'new' | 'read' | 'replied' | 'archived'
) {
  const db = await getDatabase();

  // Validate ObjectId format before querying
  const objectId = validateObjectId(id);

  const updateData: any = { status };

  // Set timestamp based on status
  if (status === 'read' && !updateData.readAt) {
    updateData.readAt = new Date();
  }
  if (status === 'replied' && !updateData.repliedAt) {
    updateData.repliedAt = new Date();
  }

  const result = await db
    .collection<ContactSubmission>('contact_submissions')
    .updateOne({ _id: objectId }, { $set: updateData });

  return result;
}

/**
 * Get recent contact submissions
 * @param limit - Maximum number of submissions to return
 * @returns Array of recent submissions
 */
export async function getRecentContactSubmissions(limit: number = 10): Promise<ContactSubmission[]> {
  const db = await getDatabase();

  const submissions = await db
    .collection<ContactSubmission>('contact_submissions')
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return submissions;
}

/**
 * Get contact submissions count by status
 * @returns Object with counts for each status
 */
export async function getContactSubmissionStats() {
  const db = await getDatabase();

  const stats = await db
    .collection<ContactSubmission>('contact_submissions')
    .aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  return stats.reduce((acc, stat) => {
    acc[stat._id] = stat.count;
    return acc;
  }, {} as Record<string, number>);
}
