import 'server-only';
import { db } from '@/db';
import { students, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getStudentByUserId = async (
  userId: string
): Promise<Student | null> => {
  const [student] = await db
    .select({
      id: students.id,
      name: users.name,
      ra: students.ra,
    })
    .from(students)
    .innerJoin(users, eq(students.userId, users.id))
    .where(eq(students.userId, userId))
    .limit(1);

  return student ?? null;
};
