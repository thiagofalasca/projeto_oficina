import { describe, it, expect, vi } from 'vitest';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';

vi.mock('server-only', () => ({}));

describe('Teste das funções de email', () => {
  it('deve retornar { success: true } ao enviar email de redefinição de senha', async () => {
    const result = await sendPasswordResetEmail('teste@example.com', 'token');
    expect(result.success).toBe(true);
  });

  it('deve retornar { success: true } ao enviar email de confirmação', async () => {
    const result = await sendVerificationEmail('teste@example.com', 'token123');
    expect(result.success).toBe(true);
  });

  it('deve retornar { success: false } quando ocorrer erro no envio de email de redefinição', async () => {
    const badToken = {
      toString: () => {
        throw new Error('Token inválido');
      },
    } as unknown as string;
    const result = await sendPasswordResetEmail('teste@example.com', badToken);
    expect(result.success).toBe(false);
  });

  it('deve retornar { success: false } quando ocorrer erro no envio de email de confirmação', async () => {
    const badToken = {
      toString: () => {
        throw new Error('Token inválido');
      },
    } as unknown as string;
    const result = await sendVerificationEmail('teste@example.com', badToken);
    expect(result.success).toBe(false);
  });
});
