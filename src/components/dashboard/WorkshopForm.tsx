"use client"
import { workshopInput, workshopSchema } from "@/lib/validations/workshop"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import CustomInput from "../CustomInput"
import { useState, useTransition } from "react"
import FormButton from "../FormButton"
import FormMessage from "../FormMessage"

const WorkshopForm = () => {
    const [messageState, setMessageState] = useState<MessageState>({})
    const [isPending, startTransition] = useTransition()

    const form = useForm<workshopInput>({
        resolver: zodResolver(workshopSchema),
        defaultValues: {
            title: "",
            description: "",
            startDate: "",
            endDate: ""
        }
    })

    const { handleSubmit, control, setError } = form

    const onSubmit = async (data: workshopInput) => {
        /*startTransition(async () => {
            const result = await createWorkshop(data)
            setMessageState(result)

            if (result.validationErrors) {
                Object.entries(result.validationErrors).forEach(([field, messages]) => {
                    setError(field as keyof workshopInput, { message: messages[0] });
                });
            }
        })*/
       console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput control={control} name="title" label="Título" placeholder="Digite o título" maskName="nameMask" />
                <CustomInput control={control} name="description" label="Descrição" placeholder="Digite a descrição" />
                <CustomInput control={control} name="startDate" label="Data de início" placeholder="Digite a data de início" maskName="dateMask" />
                <CustomInput control={control} name="endDate" label="Data de término" placeholder="Digite a data de término" maskName="dateMask" />
                {messageState && (
                    <FormMessage success={messageState.success} message={messageState.message} />
                )}
                <FormButton isLoading={isPending}>Cadastrar Workshop</FormButton>
            </form>
        </Form>
    )
}

export default WorkshopForm