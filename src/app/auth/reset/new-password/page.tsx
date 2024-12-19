import React, { Suspense } from 'react';
import NewPassword from '@/components/auth/NewPassword';

const NewPasswordPage = () => {
  return (
    <Suspense>
      <NewPassword />
    </Suspense>
  );
};

export default NewPasswordPage;
