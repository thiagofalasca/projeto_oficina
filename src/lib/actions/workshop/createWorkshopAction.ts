'use server';

import { workshopInput, workshopSchema } from '@/lib/validations/workshop';
import { roleGuard } from '../auth/authActions';
import { formatDateToISO } from '@/lib/utils';
import { db } from '@/db';
import { expirePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { workshops } from '@/db/schema';

export const createWorkshop = async (
  data: workshopInput
): Promise<ResultState<workshopInput>> => {
  await roleGuard(['admin', 'superadmin']);

  const validatedFields = workshopSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const workshopData = validatedFields.data;

  try {
    await db.insert(workshops).values({
      title: workshopData.title,
      description: workshopData.description,
      professorId: workshopData.professorId,
      key: workshopData.key,
      startDate: formatDateToISO(workshopData.startDate),
      endDate: formatDateToISO(workshopData.endDate),
      status: workshopData.status,
    });
  } catch (error) {
    console.error('Erro ao criar workshop:', error);
    return { success: false, message: 'Erro ao criar workshop.' };
  }
  expirePath('/workshops');
  redirect('/workshops?created=true');
};
