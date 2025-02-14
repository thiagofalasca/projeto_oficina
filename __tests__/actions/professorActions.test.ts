import { describe, it, expect, vi } from 'vitest';
import { db } from '@/db';
import { professors } from '@/db/schema';
import {
  fetchProfessorOptions,
  getProfessorIdByUserId,
} from '@/lib/actions/professorActions';
import { eq } from 'drizzle-orm';

vi.mock('server-only', () => ({}));

vi.mock('@/lib/actions/auth/authActions', () => ({
  roleGuard: vi.fn(),
}));

describe('Professor Actions', () => {
  describe('fetchProfessorOptions', () => {
    it('retorna opções ordenadas de professores', async () => {
      const findManyMock = vi.fn().mockResolvedValue([
        { id: '2', user: { name: 'Professor 2' } },
        { id: '1', user: { name: 'Professor 1' } },
      ]);
      db.query.professors.findMany = findManyMock;

      const options = await fetchProfessorOptions();

      expect(options).toEqual([
        { value: '1', label: 'Professor 1' },
        { value: '2', label: 'Professor 2' },
      ]);
    });

    it('lança erro quando a consulta falha', async () => {
      db.query.professors.findMany = vi
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(fetchProfessorOptions()).rejects.toThrow(
        'Erro ao buscar professores'
      );
    });
  });

  describe('getProfessorIdByUserId', () => {
    it('retorna professor id quando encontrado', async () => {
      const findFirstMock = vi.fn().mockResolvedValue({ id: '123' });
      db.query.professors.findFirst = findFirstMock;

      const professorId = await getProfessorIdByUserId('user1');

      expect(professorId).toBe('123');
      expect(findFirstMock).toHaveBeenCalledWith({
        columns: { id: true },
        where: eq(professors.userId, 'user1'),
      });
    });

    it('retorna null quando professor não é encontrado', async () => {
      db.query.professors.findFirst = vi.fn().mockResolvedValue(null);

      const professorId = await getProfessorIdByUserId('user2');
      expect(professorId).toBeNull();
    });

    it('lança erro quando a consulta falha', async () => {
      db.query.professors.findFirst = vi
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(getProfessorIdByUserId('user1')).rejects.toThrow(
        'Erro ao buscar professor por userId'
      );
    });
  });
});
