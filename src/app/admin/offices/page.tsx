export const revalidate = 0; // Disable revalidation for this page

import { PageTitle, ContentLayout, OfficesTable, CreateButton } from '@/components';
import { getOffices } from '@/actions/admin/get-offices';

export default async function OfficesAdminPage() {

    const offices = await getOffices();

    const countOffices = offices?.length === 1 ? "1 oficina" : offices?.length ? `${offices.length} oficinas` : "0 oficinas";

    return (
        <ContentLayout title="Oficinas">
            <PageTitle
                title={`Gestión de ${countOffices}`}
                description={`Administración de oficinas`}
            />

            <div className='mt-5 flex justify-end'>
                <CreateButton title="Crear oficina" href="/admin/offices/new" />
            </div>

            {
                !offices || offices?.length === 0
                    ? (
                        <div className='flex justify-center items-center h-[calc(100vh_-_300px)]'>
                            <p>No hay oficinas disponibles</p>
                        </div>
                    )
                    : <OfficesTable offices={offices || []} />
            }
        </ContentLayout>
    );
}