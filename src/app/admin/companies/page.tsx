export const revalidate = 0; // Disable revalidation for this page

import { getCompanies } from '@/actions';
import { PageTitle, ContentLayout, CompaniesTable, CreateButton } from '@/components';

export default async function CompaniesAdminPage() {
    const companies = await getCompanies();

    const countCompanies = companies?.length === 1 ? "1 empresa" : companies?.length ? `${companies.length} empresas` : "0 empresas";

    return (
        <ContentLayout title="Empresas">
            <PageTitle
                title={`Gestión de ${countCompanies}`}
                description={`Administración de empresas`}
            />

            <div className='mt-5 flex justify-end'>
                <CreateButton title="Crear empresa" href="/admin/companies/new" />
            </div>

            {
                !companies || companies?.length === 0
                    ? (
                        <div className='flex justify-center items-center h-[calc(100vh_-_300px)]'>
                            <p>No hay empresas disponibles</p>
                        </div>
                    )
                    : <CompaniesTable companies={companies || []} />
            }
        </ContentLayout>
    );
}