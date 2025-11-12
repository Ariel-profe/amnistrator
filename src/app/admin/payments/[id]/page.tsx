import { redirect } from "next/navigation";

import { PageTitle, ContentLayout, PaymentForm } from "@/components";
import { getMonths, getPaymentById } from "@/actions";
import { Payment } from "@/generated/prisma";

interface Props {
    params: Promise<{ id: string }>
};

export default async function PaymentByIdAdminPage({ params }: Props) {

    const id = (await params).id;

    const [payment, months] = await Promise.all([
        getPaymentById(id),
        getMonths()
    ]);

    if ((!payment || 'ok' in payment) && id !== 'new') {
        redirect("/admin/payments");
    };

    const title = id === 'new' ? "Crear abono" : "Editar abono";

    return (
        <ContentLayout title={title}>

            <PageTitle
                title={title}
                description="Administra la información del abono."
            />
            <PaymentForm
                payment={payment && 'ok' in payment ? {} as Payment : payment ?? {} as Payment}
                months={months}
            />
        </ContentLayout>
    )
}
