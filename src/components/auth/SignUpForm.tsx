'use client';

import { signUpSchema, signUpInput } from '@/lib/validations/auth';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courses } from '@/lib/constants';
import { signUpAction } from '@/lib/actions/signUpAction';
import { Form } from '../ui/form';
import CustomInput from '@/components/CustomInput';
import CustomSelect from '@/components/CustomSelect';
import FormMessage from '@/components/FormMessage';
import FormButton from '@/components/FormButton';
import {
  getCourseOptions,
  getPeriodOptions,
  getStateOptions,
} from '@/lib/utils';

const SignUpForm = () => {
  const [messageState, setMessageState] = useState<MessageState>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      cpf: '',
      phoneNumber: '',
      birthDate: '',
      postalCode: '',
      state: undefined,
      address: '',
      ra: '',
      course: '',
      period: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, control, setError } = form;

  const selectedCourseId = form.watch('course');
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const stateOptions = getStateOptions();
  const courseOptions = getCourseOptions();
  const periodOptions = getPeriodOptions(selectedCourse || null);

  const onSubmit = async (data: signUpInput) => {
    startTransition(async () => {
      const result = await signUpAction(data);
      setMessageState(result);

      if (result.validationErrors) {
        Object.entries(result.validationErrors).forEach(([field, messages]) => {
          setError(field as keyof signUpInput, { message: messages[0] });
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          control={control}
          name="name"
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          maskName="name"
        />
        <CustomInput
          control={control}
          name="cpf"
          label="CPF"
          placeholder="Digite seu cpf"
          maskName="cpf"
        />
        <div className="flex gap-4">
          <CustomInput
            control={control}
            name="phoneNumber"
            label="Numero de Telefone"
            maskName="phoneNumber"
            placeholder="Digite seu numero de telefone"
          />
          <CustomInput
            control={control}
            name="birthDate"
            label="Data de Nascimento"
            placeholder="Digite sua data de nascimento"
            maskName="birthDate"
          />
        </div>
        <div className="flex gap-4">
          <CustomInput
            control={control}
            name="postalCode"
            label="CEP"
            placeholder="Digite seu CEP"
            maskName="postalCode"
          />
          <CustomSelect
            control={control}
            name="state"
            label="Estado"
            placeholder="Selecione seu estado"
            options={stateOptions}
          />
        </div>
        <CustomInput
          control={control}
          name="address"
          label="Endereço"
          placeholder="Digite seu endereço"
        />
        <CustomInput
          control={control}
          name="ra"
          label="RA"
          placeholder="Digite seu RA"
          maskName="ra"
        />
        <div className="flex gap-4">
          <div className="w-2/3">
            <CustomSelect
              control={control}
              name="course"
              label="Curso"
              placeholder="Selecione seu curso"
              options={courseOptions}
            />
          </div>
          <div className="w-1/3">
            <CustomSelect
              control={control}
              name="period"
              label="Período"
              placeholder="Selecione seu período"
              options={periodOptions}
              disabled={!selectedCourse}
            />
          </div>
        </div>
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
        />
        <CustomInput
          control={control}
          name="confirmPassword"
          label="Confirme sua senha"
          placeholder="Digite sua senha novamente"
          type="password"
        />
        {messageState && (
          <FormMessage
            success={messageState.success}
            message={messageState.message}
          />
        )}
        <FormButton isLoading={isPending}>Criar Conta</FormButton>
      </form>
    </Form>
  );
};

export default SignUpForm;
