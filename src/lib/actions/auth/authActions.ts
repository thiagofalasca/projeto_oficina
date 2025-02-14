'use server';

import { auth } from '@/auth';
import { Role } from '../../constants';
import { redirect } from 'next/navigation';

interface Session {
  user: loggedUser | undefined;
}

export const getCurrentUser = async (): Promise<loggedUser | undefined> => {
  const session = (await auth()) as Session;
  return session?.user;
};

export const getCurrentRole = async (): Promise<Role | undefined> => {
  const session = await auth();
  return session?.user?.role;
};

export const roleGuard = async (allowedRoles: Role[]) => {
  const role = await getCurrentRole();
  if (!role) redirect('/api/auth/sign-out');
  if (!allowedRoles.includes(role)) redirect('/workshops');
};
