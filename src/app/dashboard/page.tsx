import { Button } from '@/components/ui/button';
import React from 'react';
import { signOut } from '@/auth';

const DashboardPage = async () => {
  return (
    <div>
      Dashboard page
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/auth/sign-in' });
        }}
      >
        <Button type="submit">Sair</Button>
      </form>
    </div>
  );
};

export default DashboardPage;
