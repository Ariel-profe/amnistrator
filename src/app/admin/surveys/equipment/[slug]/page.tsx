import { redirect } from "next/navigation";

import { PageTitle, EquipmentForm, ContentLayout } from "@/components";
import { getEquipmentBySlug } from "@/actions/common/get-equipment-by-slug";
import { getCategories, getCompanies, getOffices, getReviewsByEquipmentId } from "@/actions";
import { getServicesById } from "@/actions/admin/get-services-by-id";

interface Props {
    params: Promise<{ slug: string }>
};

export default async function EquipmentAdminPage({ params }: Props) {

    const slug = (await params).slug;

    const [equipment, offices, categories, services, reviews, companies] = await Promise.all([
        getEquipmentBySlug(slug),
        getOffices(),
        getCategories(),
        getServicesById(slug === 'new' ? '' : (await getEquipmentBySlug(slug))?.id || ''),
        getReviewsByEquipmentId(slug === 'new' ? '' : (await getEquipmentBySlug(slug))?.id || ''),
        getCompanies()
    ]);

    if (!equipment && slug !== 'new') {
        redirect("/admin");
    };

    const title = slug === 'new' ? "Crear equipo" : "Editar equipo";

    return (
        <ContentLayout title={title}>
            <PageTitle
                title={title}
                description="Administra la información del equipo."
            />
            <EquipmentForm
                equipment={equipment as any ?? {}}
                offices={offices}
                categories={categories}
                services={services}
                reviews={reviews}
                companies={companies}
            />
        </ContentLayout>
    )
}
