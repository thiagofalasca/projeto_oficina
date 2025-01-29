'use server';

import { db } from '@/db';
import { students, users, workshopEnrollments } from '@/db/schema';
import { ENROLLMENTS_PER_PAGE } from '@/lib/constants';
import { eq, sql } from 'drizzle-orm';

export const fetchEnrollmentPages = async (
  workshopId: string
): Promise<number> => {
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(workshopEnrollments)
      .innerJoin(students, eq(workshopEnrollments.studentId, students.id))
      .innerJoin(users, eq(students.userId, users.id))
      .where(eq(workshopEnrollments.workshopId, workshopId));

    return Math.ceil(result.count / ENROLLMENTS_PER_PAGE);
  } catch (error) {
    console.error('Erro ao buscar páginas de matrículas:', error);
    throw new Error('Erro ao buscar páginas de matrículas');
  }
};
