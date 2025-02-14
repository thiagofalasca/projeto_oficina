'use server';

import { roleGuard } from '../auth/authActions';
import { students, users, workshopEnrollments } from '@/db/schema';
import { eq, ilike, or, sql } from 'drizzle-orm';
import { db } from '@/db';
import { expirePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  IdentifierInput,
  IdentifierSchema,
  KeyInput,
  KeySchema,
} from '@/lib/validations/workshop';
import { getStudentByUserId } from '../studentActions';

const checkExistingEnrollment = async (
  workshopId: string,
  studentId: string
) => {
  const [enrollment] = await db
    .select()
    .from(workshopEnrollments)
    .where(
      sql`${workshopEnrollments.workshopId} = ${workshopId} AND 
          ${workshopEnrollments.studentId} = ${studentId}`
    )
    .limit(1);

  return enrollment;
};

const handleEnrollment = async (
  workshopId: string,
  studentId: string
): Promise<MessageState> => {
  const existingEnrollment = await checkExistingEnrollment(
    workshopId,
    studentId
  );

  if (existingEnrollment) {
    return { success: false, message: 'Estudante já matriculado' };
  }

  await db.insert(workshopEnrollments).values({
    workshopId,
    studentId,
    status: 'Matriculado',
  });

  return { success: true };
};

export const adminEnrollStudent = async (
  workshopId: string,
  data: IdentifierInput
): Promise<ResultState<IdentifierInput>> => {
  await roleGuard(['admin', 'superadmin']);
  const validatedFields = IdentifierSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { identifier } = validatedFields.data;

  try {
    const student = await db
      .select({
        id: students.id,
      })
      .from(students)
      .innerJoin(users, eq(students.userId, users.id))
      .where(or(eq(students.ra, identifier), ilike(users.email, identifier)))
      .limit(1);

    if (!student || student.length === 0) {
      return { success: false, message: 'Estudante não encontrado' };
    }

    const result = await handleEnrollment(workshopId, student[0].id);
    if (!result.success) return result;
  } catch (error) {
    console.error('Erro ao adicionar estudante:', error);
    return { success: false, message: 'Erro ao adicionar estudante.' };
  }

  expirePath(`/workshops/${workshopId}`);
  redirect(`/workshops/${workshopId}?enrolled=true`);
};

export const selfEnrollStudent = async (
  workshop: Workshop,
  userId: string,
  data: KeyInput
): Promise<ResultState<KeyInput>> => {
  await roleGuard(['user']);

  const validatedFields = KeySchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    if (workshop.key && workshop.key !== validatedFields.data.key) {
      return { success: false, message: 'Chave de acesso incorreta' };
    }

    const student = await getStudentByUserId(userId);
    if (!student) {
      return { success: false, message: 'Estudante não encontrado' };
    }

    const result = await handleEnrollment(workshop.id, student.id);
    if (!result.success) return result;
  } catch (error) {
    console.error('Erro ao realizar inscrição:', error);
    return { success: false, message: 'Erro ao realizar inscrição' };
  }

  expirePath(`/workshops/${workshop.id}`);
  redirect(`/workshops/${workshop.id}?enrolled=true`);
};
