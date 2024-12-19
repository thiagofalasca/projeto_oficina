'use client';

import { signInSchema, signInInput } from '@/lib/validations/auth';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import CustomInput from '@/components/CustomInput';
import FormMessage from '@/components/FormMessage';
import FormButton from '@/components/FormButton';
import Link from 'next/link';
import { signInAction } from '@/lib/actions/signInAction';
import { useSearchParams } from 'next/navigation';

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [messageState, setMessageState] = useState<MessageState>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<signInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control, setError } = form;

  const onSubmit = async (data: signInInput) => {
    startTransition(async () => {
      const result = await signInAction(data, callbackUrl);
      setMessageState(result);
      if (result.validationErrors) {
        Object.entries(result.validationErrors).forEach(([field, messages]) => {
          setError(field as keyof signInInput, { message: messages[0] });
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          control={control}
          name="email"
          label="Email"
          placeholder="Digite seu email"
          maskName="email"
        />
        <CustomInput
          control={control}
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          description={
            <div className="mt-1 flex gap-1 text-sm">
              <p className="text-gray-600">Esqueceu sua senha?</p>
              <Link href={'/auth/reset'} className="auth-link text-blue-700">
                Recuperar senha
              </Link>
            </div>
          }
        />
        {messageState && (
          <FormMessage
            success={messageState.success}
            message={messageState.message}
          />
        )}
        <FormButton isLoading={isPending}>Entrar</FormButton>
      </form>
    </Form>
  );
};

export default SignInForm;
