'use server';

import { signUpSchema, signUpInput } from '../validations/auth';
import { createUser, validateUser } from './userActions';
import { generateVerificationToken } from '@/lib/actions/tokenAction';
import { sendVerificationEmail } from '../mail';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const signUpAction = async (
  data: signUpInput
): Promise<AuthState<signUpInput>> => {
  const validatedFields = signUpSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      validationErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userData = validatedFields.data;

  const existingData = await validateUser(
    userData.email,
    userData.cpf,
    userData.ra
  );
  if (!existingData.success) {
    return { success: false, message: existingData.message };
  }

  const createUserResult = await createUser(userData);
  if (!createUserResult.success) {
    return { success: false, message: createUserResult.message };
  }

  const verificationToken = await generateVerificationToken(userData.email);
  if (!verificationToken) {
    return { success: false, message: 'Erro ao gerar token' };
  }

  const emailResult = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );
  if (!emailResult.success) {
    return { success: false, message: 'Erro ao enviar email de verificação' };
  }

  revalidatePath('/auth/sign-up/mail-sent');
  redirect('/auth/sign-up/mail-sent');
};
