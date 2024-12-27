import React, { Suspense } from 'react';
import SignInForm from '@/components/auth/SignInForm';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
};

const SignInPage = () => {
  return (
    <section className="auth-card max-w-md">
      <AuthHeader
        titleSize="lg"
        title="Entrar"
        subText="Por favor, preencha seus dados"
      />
      <Suspense>
        <SignInForm />
      </Suspense>
      <AuthFooter
        description="Não tem uma conta?"
        link="/auth/sign-up"
        linkText="Criar Conta"
      />
    </section>
  );
};

export default SignInPage;
