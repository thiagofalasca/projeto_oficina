'use server';

import { db } from '@/db';
import { workshopEnrollments } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { expirePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser, roleGuard } from '../auth/authActions';
import { getStudentByUserId } from '../studentActions';

const deleteEnrollment = async (studentId: string, workshopId: string) => {
  try {
    await db
      .delete(workshopEnrollments)
      .where(
        and(
          eq(workshopEnrollments.studentId, studentId),
          eq(workshopEnrollments.workshopId, workshopId)
        )
      );
  } catch (error) {
    console.error('Erro ao remover estudante:', error);
    redirect(`/workshops/${workshopId}?enrollmentError=true`);
  }
};

export const removeEnrollment = async (
  studentId: string,
  workshopId: string
): Promise<void> => {
  await roleGuard(['admin', 'superadmin']);

  await deleteEnrollment(studentId, workshopId);

  expirePath(`/workshops/${workshopId}`);
  redirect(`/workshops/${workshopId}?deleted=true`);
};

export const cancelEnrollment = async (workshopId: string): Promise<void> => {
  await roleGuard(['user', 'admin', 'superadmin']);

  const user = await getCurrentUser();
  if (!user) redirect('/api/auth/sign-out');

  const student = await getStudentByUserId(user.id);
  if (!student) {
    redirect(`/workshops/${workshopId}?enrollmentError=true`);
  }

  await deleteEnrollment(student.id, workshopId);

  expirePath(`/workshops`);
  redirect(`/workshops`);
};
