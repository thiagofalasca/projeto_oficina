"use client"

import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import FormMessage from '@/components/FormMessage';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import { useSearchParams } from 'next/navigation';
import { emailConfirmation } from '@/lib/actions/emailConfirmationAction';
import { useState, useEffect } from 'react';

const EmailConfirmation = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [messageState, setMessageState] = useState<MessageState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setMessageState({ success: false, message: 'Faltando token' });
        setIsLoading(false);
        return;
      }
      const result = await emailConfirmation(token);
      setMessageState(result);
      setIsLoading(false);
    };

    confirmEmail();
  }, [token]);
  const isSuccess = messageState.success;

  const Icon = isSuccess ? CheckCircle : AlertCircle;
  const variant = isSuccess ? 'success' : 'error';
  const title = isSuccess ? 'Email Verificado' : 'Falha na Verificação';
  const subText = isSuccess
    ? 'Seu e-mail foi verificado com sucesso. Você já pode entrar em sua conta.'
    : 'Ocorreu um erro ao verificar seu e-mail. Por favor, tente novamente.';
  const iconClass = `auth-icon ${isSuccess ? 'text-green-500' : 'text-red-500'}`;

  return (
    <>
      {isLoading ? (
        <Loader2 className="mx-auto h-20 w-20 animate-spin text-blue-500" />
      ) : (
        <section className="auth-card max-w-lg">
          <Icon className={iconClass} />
          <AuthHeader variant={variant} title={title} subText={subText} />
          <FormMessage
            success={messageState.success}
            message={messageState.message}
          />
          <AuthFooter link="/auth/sign-in" linkText="Voltar para o login" />
        </section>
      )}
    </>
  );
};

export default EmailConfirmation;
