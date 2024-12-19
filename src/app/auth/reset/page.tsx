import React from 'react';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import ResetForm from '@/components/auth/ResetForm';

const ResetPage = () => {
  return (
    <section className="auth-card max-w-md">
      <AuthHeader
        titleSize="md"
        title="Recuperação de Senha"
        subText="Digite seu email para alterar sua senha"
      />
      <ResetForm />
      <AuthFooter link="/auth/sign-in" linkText="Voltar para o login" />
    </section>
  );
};

export default ResetPage;
