import { title } from "process"
import { TypeOf, z } from "zod"
import { isValidDate } from "../utils"

export const workshopSchema = z.object({
    title: z
        .string()
        .min(1, "Título é obrigatório.")
        .max(50, "Título pode conter no máximo 50 caracteres.")
        .regex(/^[a-zA-Z0-9\s]+$/, "Título pode conter apenas letras, números e espaços")
        .trim(),
    description: z
        .string()
        .min(1, "Descrição é obrigatória.")
        .max(50, "Descrição pode conter no máximo 100 caracteres.")
        .trim(),
    startDate: z
        .string()
        .min(1, "Data obrigatória")
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Campo deve estar no formato DD/MM/YYYY')
        .refine(isValidDate, "Data inválida"),
    endDate: z
        .string()
        .min(1, "Data obrigatória")
        .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Campo deve estar no formato DD/MM/YYYY')
        .refine(isValidDate, "Data inválida"),
})

export type workshopInput = z.infer<typeof workshopSchema>