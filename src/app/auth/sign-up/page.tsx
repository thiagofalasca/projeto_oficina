import React from 'react';
import SignUpForm from '@/components/auth/SignUpForm';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';

const SignUpPage = () => {
  return (
    <section className="auth-card max-w-2xl">
      <AuthHeader
        titleSize="lg"
        title="Criar Conta"
        subText="Por favor, preencha seus dados"
      />
      <SignUpForm />
      <AuthFooter
        description="Já tem uma conta?"
        link="/auth/sign-in"
        linkText="Entrar"
      />
    </section>
  );
};

export default SignUpPage;
