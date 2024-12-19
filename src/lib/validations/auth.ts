import { z } from 'zod';
import { courses, states } from '@/lib/constants';
import { isValidDate } from '../utils';

const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/\d/, 'Senha deve conter pelo menos um número')
  .regex(/[\W_]/, 'Senha deve conter pelo menos um caractere especial');

const passwordMatchSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Senhas não conferem',
      });
    }
  });

const periodSchema = z
  .object({
    course: z.string(),
    period: z.string(),
  })
  .superRefine((data, ctx) => {
    const course = courses.find((course) => course.id === data.course);
    if (course) {
      const periodString = data.period ? data.period.split('º')[0] : '';
      const periodNumber = parseInt(periodString, 10);
      if (
        isNaN(periodNumber) ||
        periodNumber < 1 ||
        periodNumber > course.totalPeriods
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['period'],
          message: 'Período inválido para o curso selecionado',
        });
      }
    } else {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['course'],
        message: 'Curso inválido',
      });
    }
  });

export const signInSchema = z.object({
  email: z.string().email('Endereço de email inválido').toLowerCase(),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(50, 'Nome pode ter no máximo 50 caracteres')
      .regex(/^[A-Za-z\s]+$/, 'Nome pode conter apenas letras e espaços')
      .trim(),
    cpf: z
      .string()
      .min(1, 'CPF é obrigatório')
      .regex(
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        'Campo deve estar no formato 111.111.111-11'
      ),
    phoneNumber: z
      .string()
      .min(1, 'Numero é obrigatório')
      .regex(
        /^\(\d{2}\) \d{5}(?:-\d{4})?$/,
        'O numero deve estar no formato (11) 11111-1111'
      ),
    birthDate: z
      .string()
      .min(1, 'Data de nascimento é obrigatória')
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Campo deve estar no formato DD/MM/YYYY')
      .refine(isValidDate , 'Data de nascimento inválida'),
    postalCode: z
      .string()
      .min(1, 'CEP é obrigatório')
      .regex(/^\d{5}-\d{3}$/, 'Campo deve estar no formato 11111-111'),
    state: z.enum(states, { message: 'Estado inválido' }),
    address: z
      .string()
      .min(1, 'Endereço é obrigatório')
      .max(50, 'Endereço pode ter no máximo 50 caracteres'),
    ra: z
      .string()
      .min(1, 'RA é obrigatório')
      .regex(/^\d{7}$/, 'RA deve ter 7 digitos'),
    course: z.string(),
    period: z.string(),
    email: z.string().email('Endereço de email inválido').toLowerCase(),
    password: z.string().min(1, 'Senha é obrigatória'),
    confirmPassword: z.string(),
  })
  .and(passwordMatchSchema)
  .and(periodSchema);

export const resetSchema = z.object({
  email: z.string().email('Endereço de email inválido').toLowerCase(),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(1, 'Senha é obrigatória'),
    confirmPassword: z.string(),
  })
  .and(passwordMatchSchema);

export type signInInput = z.infer<typeof signInSchema>;
export type signUpInput = z.infer<typeof signUpSchema>;
export type resetInput = z.infer<typeof resetSchema>;
export type newPasswordInput = z.infer<typeof newPasswordSchema>;
