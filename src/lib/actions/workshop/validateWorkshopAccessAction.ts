'use server';

import { db } from '@/db';
import {
  professors,
  students,
  workshopEnrollments,
  workshops,
} from '@/db/schema';
import { and, eq, sql } from 'drizzle-orm';

export const validateWorkshopAccess = async (
  workshopId: string,
  user: loggedUser
): Promise<boolean> => {
  try {
    if (user.role === 'superadmin') return true;

    if (user.role === 'admin') {
      const [isOwner] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(workshops)
        .innerJoin(professors, eq(workshops.professorId, professors.id))
        .where(
          and(eq(workshops.id, workshopId), eq(professors.userId, user.id))
        );

      return isOwner.count > 0;
    }

    const [isEnrolled] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(workshopEnrollments)
      .innerJoin(students, eq(workshopEnrollments.studentId, students.id))
      .where(
        and(
          eq(workshopEnrollments.workshopId, workshopId),
          eq(students.userId, user.id)
        )
      );

    return isEnrolled.count > 0;
  } catch (error) {
    console.error('Erro ao validar acesso ao workshop:', error);
    return false;
  }
};
