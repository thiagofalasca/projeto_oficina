'use server';

import { db } from '@/db';
import {
  professors,
  students,
  users,
  workshopEnrollments,
  workshops,
} from '@/db/schema';
import { and, eq, ilike, or, sql } from 'drizzle-orm';
import { WORKSHOPS_PER_PAGE, workshopStatus } from '../../constants';
import { roleGuard } from '../auth/authActions';

const getCountQuery = () => {
  return db
    .select({
      count: sql<number>`COUNT(DISTINCT ${workshops.id})`.mapWith(Number),
    })
    .from(workshops)
    .innerJoin(professors, eq(workshops.professorId, professors.id))
    .innerJoin(users, eq(professors.userId, users.id));
};

export const fetchWorkshopsPages = async (
  query: string,
  user: loggedUser
): Promise<number> => {
  await roleGuard(['user', 'admin', 'superadmin']);
  try {
    const baseQuery = getCountQuery();

    const conditions = or(
      ilike(workshops.title, `%${query}%`),
      sql`${workshops.status}::text ILIKE ${'%' + query + '%'}`,
      ilike(users.name, `%${query}%`)
    );

    switch (user.role) {
      case 'superadmin':
        baseQuery.where(conditions);
        break;

      case 'admin':
        baseQuery.where(and(eq(users.id, user.id!), conditions));
        break;

      default:
        baseQuery
          .leftJoin(
            workshopEnrollments,
            eq(workshops.id, workshopEnrollments.workshopId)
          )
          .innerJoin(students, eq(workshopEnrollments.studentId, students.id))
          .where(and(eq(students.userId, user.id!), conditions));
        break;
    }

    const [result] = await baseQuery;
    return Math.ceil(result.count / WORKSHOPS_PER_PAGE);
  } catch (error) {
    console.error(`Erro ao buscar páginas:`, error);
    throw new Error('Erro ao buscar páginas.');
  }
};

export const fetchAvailableWorkshopsPages = async (
  query: string,
  userId: string
): Promise<number> => {
  await roleGuard(['user', 'admin', 'superadmin']);
  try {
    const [result] = await getCountQuery().where(
      and(
        eq(workshops.status, workshopStatus[0]),
        ilike(workshops.title, `%${query}%`),
        ilike(users.name, `%${query}%`),
        sql`NOT EXISTS (
            SELECT 1 FROM ${workshopEnrollments} we
            INNER JOIN ${students} s ON we.student_id = s.id
            WHERE we.workshop_id = ${workshops.id}
            AND s.user_id = ${userId}
          )`
      )
    );

    return Math.ceil(result.count / WORKSHOPS_PER_PAGE);
  } catch (error) {
    console.error('Erro ao buscar total de páginas:', error);
    throw new Error('Erro ao buscar total de páginas');
  }
};
