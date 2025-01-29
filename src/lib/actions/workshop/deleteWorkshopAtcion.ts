'use server';

import { db } from '@/db';
import { roleGuard } from '../auth/authActions';
import { workshopEnrollments, workshops } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { expirePath } from 'next/cache';

export const deleteWorkshop = async (id: string): Promise<void> => {
  await roleGuard(['admin', 'superadmin']);

  try {
    await db.transaction(async (tx) => {
      await tx
        .delete(workshopEnrollments)
        .where(eq(workshopEnrollments.workshopId, id));

      await tx.delete(workshops).where(eq(workshops.id, id));
    });
  } catch (error) {
    console.error('Erro ao deletar workshop:', error);
    redirect(`/workshops/${id}?deleteError=true`);
  }
  expirePath('/workshops');
  redirect('/workshops?deleted=true');
};
