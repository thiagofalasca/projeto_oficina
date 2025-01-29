'use server';

import { db } from '@/db';
import { roleGuard } from './auth/authActions';
import { eq } from 'drizzle-orm';
import { professors } from '@/db/schema';

export const fetchProfessorOptions = async (): Promise<ProfessorOption[]> => {
  await roleGuard(['admin', 'superadmin']);

  try {
    const results = await db.query.professors.findMany({
      columns: { id: true },
      with: { user: { columns: { name: true } } },
    });

    return results
      .map((professor) => ({
        value: professor.id,
        label: professor.user.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    throw new Error('Erro ao buscar professores');
  }
};

export const getProfessorIdByUserId = async (
  userId: string
): Promise<string | null> => {
  await roleGuard(['admin', 'superadmin']);

  try {
    const professor = await db.query.professors.findFirst({
      columns: { id: true },
      where: eq(professors.userId, userId),
    });

    return professor?.id ?? null;
  } catch (error) {
    console.error('Erro ao buscar professor por userId:', error);
    throw new Error('Erro ao buscar professor por userId');
  }
};
