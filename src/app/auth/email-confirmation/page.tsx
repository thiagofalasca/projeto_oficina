import { Suspense } from 'react';
import EmailConfirmation from '@/components/auth/EmailConfirmation';

export default function EmailConfirmationPage() {
  return (
    <Suspense>
      <EmailConfirmation />
    </Suspense>
  );
}
