import { redirect } from "next/navigation";

import { PageTitle, ContentLayout, CompanyForm } from "@/components";
import { getCompanyById } from "@/actions";

interface Props {
    params: Promise<{ id: string }>
};

export default async function CompanyByIdAdminPage({ params }: Props) {

    const id = (await params).id;

    const company = await getCompanyById(id);

    if ((!company || 'ok' in company) && id !== 'new') {
        redirect("/admin/companies");
    };

    const title = id === 'new' ? "Crear empresa" : "Editar empresa";

    return (
        <ContentLayout title={title}>

            <PageTitle
                title={title}
                description="Administra la información de la empresa."
            />
            <CompanyForm company={company ?? {}} />
        </ContentLayout>
    )
}
