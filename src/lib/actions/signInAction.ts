'use server';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signInSchema, signInInput } from '../validations/auth';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserByEmail } from './userActions';
import { generateVerificationToken } from '@/lib/actions/tokenAction';
import { sendVerificationEmail } from '../mail';

export const signInAction = async (
  data: signInInput,
  callbackUrl?: string | null
): Promise<AuthState<signInInput>> => {
  const validatedFields = signInSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { success: false, message: 'Credenciais inválidas' };
  } else if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    if (!verificationToken) {
      return { success: false, message: 'Erro ao gerar token' };
    }

    const emailResult = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    if (!emailResult.success) {
      return {
        success: false,
        message: 'Erro ao enviar email de verificação',
      };
    }
    return {
      success: true,
      message: 'Email de confirmação de conta enviado!',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Credenciais inválidas' };
        default:
          return { success: false, message: 'Erro ao realizar login' };
      }
    }
    throw error;
  }
};
