import WorkshopForm from "@/components/dashboard/WorkshopForm"

const WorkshopPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-blue-50 font-inter">
            <section className="auth-card max-w-2xl">
                <WorkshopForm />
            </section>
        </main>
    )
}

export default WorkshopPage