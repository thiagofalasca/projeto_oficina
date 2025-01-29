'use server';

import { auth } from '@/auth';
import { Role } from '../../constants';
import { redirect } from 'next/navigation';

interface Session {
  user: loggedUser;
}

const handleAuth = async (): Promise<Session | null> => {
  try {
    const session = await auth();
    if (!session?.user) {
      return null;
    }
    return session as Session;
  } catch (error) {
    console.error('Erro ao obter a sessão do usuário:', error);
    return null;
  }
};

export const getCurrentUser = async (): Promise<loggedUser | null> => {
  const session = await handleAuth();
  if (!session) {
    return null;
  }
  return session.user;
};

export const getCurrentRole = async (): Promise<Role | null> => {
  const session = await handleAuth();
  if (!session) {
    return null;
  }
  return session.user.role;
};

export const roleGuard = async (allowedRoles: Role[]) => {
  const role = await getCurrentRole();
  if (!role) redirect('/api/auth/sign-out');
  if (!allowedRoles.includes(role)) redirect('/workshops?notAuthorized=true');
};
