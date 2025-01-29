'use server';

import { db } from '@/db';
import {
  professors,
  students,
  users,
  workshopEnrollments,
  workshops,
} from '@/db/schema';
import { WORKSHOPS_PER_PAGE, workshopStatus } from '@/lib/constants';
import { and, desc, eq, ilike, or, sql } from 'drizzle-orm';

const getBaseQuery = () => {
  return db
    .select({
      id: workshops.id,
      title: workshops.title,
      description: workshops.description,
      startDate: workshops.startDate,
      endDate: workshops.endDate,
      status: workshops.status,
      key: workshops.key,
      professor: {
        id: professors.id,
        name: users.name,
        email: users.email,
      },
      enrollmentsCount: sql<number>`
      (SELECT COUNT(*)
       FROM ${workshopEnrollments} we
       WHERE we.workshop_id = ${workshops.id})
    `.mapWith(Number),
    })
    .from(workshops)
    .innerJoin(professors, eq(workshops.professorId, professors.id))
    .innerJoin(users, eq(professors.userId, users.id))
    .groupBy(workshops.id, professors.id, users.name, users.email);
};

const getWorkshopsOrder = () => {
  return [
    sql`
      CASE
        WHEN ${workshops.status} = ${workshopStatus[0]} THEN 1
        WHEN ${workshops.status} = ${workshopStatus[1]} THEN 2
        WHEN ${workshops.status} = ${workshopStatus[2]} THEN 3
        WHEN ${workshops.status} = ${workshopStatus[3]} THEN 4
        ELSE 5
      END
    `,
    desc(workshops.createdAt),
  ];
};

export const fetchWorkshops = async (
  query: string,
  page: number,
  user: loggedUser
): Promise<Workshop[]> => {
  const offset = (page - 1) * WORKSHOPS_PER_PAGE;

  try {
    const baseQuery = getBaseQuery().leftJoin(
      workshopEnrollments,
      eq(workshops.id, workshopEnrollments.workshopId)
    );

    let conditions = or(
      ilike(workshops.title, `%${query}%`),
      sql`${workshops.status}::text ILIKE ${'%' + query + '%'}`,
      ilike(users.name, `%${query}%`)
    );

    if (user.role === 'admin') {
      conditions = and(eq(users.id, user.id!), conditions);
    } else if (user.role === 'user') {
      baseQuery.innerJoin(
        students,
        eq(workshopEnrollments.studentId, students.id)
      );
      conditions = and(eq(students.userId, user.id!), conditions);
    }

    return await baseQuery
      .where(conditions)
      .orderBy(...getWorkshopsOrder())
      .limit(WORKSHOPS_PER_PAGE)
      .offset(offset);
  } catch (error) {
    console.error('Erro ao buscar workshops:', error);
    throw new Error('Erro ao buscar workshops.');
  }
};

export const fetchAvailableWorkshops = async (
  query: string,
  page: number,
  userId: string
): Promise<Workshop[]> => {
  const offset = (page - 1) * WORKSHOPS_PER_PAGE;

  try {
    const baseQuery = getBaseQuery();

    return await baseQuery
      .where(
        and(
          eq(workshops.status, workshopStatus[0]),
          or(
            ilike(workshops.title, `%${query}%`),
            ilike(users.name, `%${query}%`)
          ),
          sql`NOT EXISTS (
            SELECT 1 FROM ${workshopEnrollments} we
            INNER JOIN ${students} s ON we.student_id = s.id
            WHERE we.workshop_id = ${workshops.id}
            AND s.user_id = ${userId}
          )`
        )
      )
      .orderBy(desc(workshops.createdAt))
      .limit(WORKSHOPS_PER_PAGE)
      .offset(offset);
  } catch (error) {
    console.error('Erro ao buscar workshops:', error);
    throw new Error('Erro ao buscar workshops.');
  }
};

export const fetchWorkshopById = async (id: string): Promise<Workshop> => {
  try {
    const baseQuery = getBaseQuery();

    const [result] = await baseQuery
      .leftJoin(
        workshopEnrollments,
        eq(workshops.id, workshopEnrollments.workshopId)
      )
      .where(eq(workshops.id, id));

    return result;
  } catch (error) {
    console.error('Erro ao buscar workshop:', error);
    throw new Error('Erro ao buscar workshop.');
  }
};
