import { redirect } from "next/navigation";

import { PageTitle, ContentLayout, CategoryForm } from "@/components";
import { getCategoryById } from "@/actions";

interface Props {
    params: Promise<{ id: string }>
};

export default async function CategoryByIdAdminPage({ params }: Props) {

    const id = (await params).id;

    const category = await getCategoryById(id);

    if ((!category || 'ok' in category) && id !== 'new') {
        redirect("/admin/categorias");
    };

    const title = id === 'new' ? "Crear categoría" : "Editar categoría";

    return (
        <ContentLayout title={title}>

            <PageTitle
                title={title}
                description="Administra la información de la categoría."
            />
            <CategoryForm category={(category && 'ok' in category) ? {} : category ?? {}} />
        </ContentLayout>
    )
}
