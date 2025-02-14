'use server';

import { db } from '@/db';
import { students, users, workshopEnrollments } from '@/db/schema';
import { ENROLLMENTS_PER_PAGE, enrollmentStatus } from '@/lib/constants';
import { eq, sql } from 'drizzle-orm';
import { roleGuard } from '../auth/authActions';

const getEnrollmentsOrder = () => {
  return [
    sql`
      CASE
        WHEN ${workshopEnrollments.status} = ${enrollmentStatus[0]} THEN 1
        WHEN ${workshopEnrollments.status} = ${enrollmentStatus[1]} THEN 2
        ELSE 3
      END
    `,
    users.name,
  ];
};

export const fetchEnrollments = async (
  workshopId: string,
  page: number
): Promise<Enrollment[]> => {
  await roleGuard(['user', 'admin', 'superadmin']);
  const offset = (page - 1) * ENROLLMENTS_PER_PAGE;

  try {
    return await db
      .select({
        id: students.id,
        name: users.name,
        email: users.email,
        ra: students.ra,
        status: workshopEnrollments.status,
      })
      .from(workshopEnrollments)
      .innerJoin(students, eq(workshopEnrollments.studentId, students.id))
      .innerJoin(users, eq(students.userId, users.id))
      .where(eq(workshopEnrollments.workshopId, workshopId))
      .orderBy(...getEnrollmentsOrder())
      .limit(ENROLLMENTS_PER_PAGE)
      .offset(offset);
  } catch (error) {
    console.error('Erro ao buscar matrículas:', error);
    throw new Error('Erro ao buscar matrículas');
  }
};
