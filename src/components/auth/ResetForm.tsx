'use client';

import { resetSchema, resetInput } from '@/lib/validations/auth';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/CustomInput';
import FormMessage from '@/components/FormMessage';
import FormButton from '@/components/FormButton';
import { resetAction } from '@/lib/actions/resetAction';

const ResetForm = () => {
  const [messageState, setMessageState] = useState<MessageState>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<resetInput>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control, setError } = form;

  const onSubmit = async (data: resetInput) => {
    startTransition(async () => {
      const result = await resetAction(data);
      setMessageState(result);

      if (result.validationErrors?.email) {
        setError('email', { message: result.validationErrors.email[0] });
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
        {messageState && (
          <FormMessage
            success={messageState.success}
            message={messageState.message}
          />
        )}
        <FormButton isLoading={isPending}>Alterar senha</FormButton>
      </form>
    </Form>
  );
};

export default ResetForm;
