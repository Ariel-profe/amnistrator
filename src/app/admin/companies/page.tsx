export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';

import { PageTitle, Button, ContentLayout, CompaniesTable } from '@/components';
import { getCompanies } from '@/actions';

interface Props {
    searchParams: Promise<{ page?: string }>
};

export default async function CompaniesAdminPage({ searchParams }: Props) {

    const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1;

    const companies = await getCompanies();

    const countCompanies = companies?.length === 1 ? "1 empresa" : companies?.length ? `${companies.length} empresas` : "0 empresas";

    return (
        <ContentLayout title="Empresas">
            <PageTitle
                title={`Gestión de ${countCompanies}`}
                description={`Administración de empresas`}
            />

            <div className='mt-5 flex justify-end'>
                <Button>
                    <Link href={`/admin/companies/new`}>Crear empresa</Link>
                </Button>
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