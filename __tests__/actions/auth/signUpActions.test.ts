import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateUser, createUser } from '@/lib/actions/userActions';
import { generateVerificationToken } from '@/lib/actions/tokenAction';
import { sendVerificationEmail } from '@/lib/mail';
import { redirect } from 'next/navigation';
import { expirePath } from 'next/cache';
import { signUpInput } from '@/lib/validations/auth';
import { mockUserData, validUser } from '@/tests/mocks/mocked-data';
import { signUpAction } from '@/lib/actions/auth/signUpAction';

vi.mock('server-only', () => ({}));

vi.mock('@/lib/actions/userActions', () => ({
  validateUser: vi.fn(),
  createUser: vi.fn(),
}));

vi.mock('@/lib/actions/tokenAction', () => ({
  generateVerificationToken: vi.fn(),
}));

vi.mock('@/lib/mail', () => ({
  sendVerificationEmail: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('next/cache', () => ({
  expirePath: vi.fn(),
}));

describe('Sign Up Action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar erro de validação quando campos são inválidos', async () => {
    const invalidData = {
      ...mockUserData,
      email: 'invalid-email',
    };

    const result = await signUpAction(invalidData);

    expect(result.success).toBe(false);
    expect(result.validationErrors).toBeDefined();
  });

  it('deve retornar erro quando validação de usuário falha', async () => {
    vi.mocked(validateUser).mockResolvedValueOnce({
      success: false,
      message: 'Email já cadastrado',
    });

    const result = await signUpAction(mockUserData);

    expect(result).toEqual({
      success: false,
      message: 'Email já cadastrado',
    });
  });

  it('deve retornar erro quando falha ao criar usuário', async () => {
    vi.mocked(validateUser).mockResolvedValueOnce({ success: true });
    vi.mocked(createUser).mockResolvedValueOnce({
      success: false,
      message: 'Erro ao criar usuário',
    });

    const result = await signUpAction(mockUserData);

    expect(result).toEqual({
      success: false,
      message: 'Erro ao criar usuário',
    });
  });

  it('deve retornar erro quando falha ao gerar token', async () => {
    vi.mocked(validateUser).mockResolvedValueOnce({ success: true });
    vi.mocked(createUser).mockResolvedValueOnce({ success: true });
    vi.mocked(generateVerificationToken).mockResolvedValueOnce(null);

    const result = await signUpAction(mockUserData);

    expect(result).toEqual({
      success: false,
      message: 'Erro ao gerar token',
    });
  });

  it('deve retornar erro quando falha ao enviar email', async () => {
    vi.mocked(validateUser).mockResolvedValueOnce({ success: true });
    vi.mocked(createUser).mockResolvedValueOnce({ success: true });
    vi.mocked(generateVerificationToken).mockResolvedValueOnce(
      'valid-token' as any
    );
    vi.mocked(sendVerificationEmail).mockResolvedValueOnce({ success: false });

    const result = await signUpAction(mockUserData);

    expect(result).toEqual({
      success: false,
      message: 'Erro ao enviar email de verificação',
    });
  });

  it('deve redirecionar após cadastro com sucesso', async () => {
    vi.mocked(validateUser).mockResolvedValueOnce({ success: true });
    vi.mocked(createUser).mockResolvedValueOnce({ success: true });
    vi.mocked(generateVerificationToken).mockResolvedValueOnce(
      'valid-token' as any
    );
    vi.mocked(sendVerificationEmail).mockResolvedValueOnce({ success: true });

    await signUpAction(mockUserData);

    expect(expirePath).toHaveBeenCalledWith('/auth/sign-up/mail-sent');
    expect(redirect).toHaveBeenCalledWith('/auth/sign-up/mail-sent');
  });
});
