import { redirect } from "next/navigation";

import { PageTitle, ContentLayout, OfficeForm } from "@/components";
import { getOfficeById } from "@/actions";

interface Props {
    params: Promise<{ id: string }>
};

export default async function OfficeByIdAdminPage({ params }: Props) {

    const id = (await params).id;

    const office = await getOfficeById(id);

    if ((!office || 'ok' in office) && id !== 'new') {
        redirect("/admin/offices");
    };

    const title = id === 'new' ? "Crear oficina" : "Editar oficina";

    return (
        <ContentLayout title={title}>
            <PageTitle
                title={title}
                description="Administra la información de la oficina."
            />
            <OfficeForm office={(office && 'ok' in office) ? undefined : office ?? undefined} />
        </ContentLayout>
    )
}
