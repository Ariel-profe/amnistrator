export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';

import { PageTitle, Button, ContentLayout, CategoriesTable, CreateButton } from '@/components';
import { getCategories } from '@/actions';

interface Props {
    searchParams: Promise<{ page?: string }>
};

export default async function CategoriesAdminPage({ searchParams }: Props) {

    const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1;

    const categories = await getCategories();

    const countCategories = categories?.length === 1 ? "1 categoría" : categories?.length ? `${categories.length} categorías` : "0 categorías";

    return (
        <ContentLayout title="Categorías">
            <PageTitle
                title={`Gestión de ${countCategories}`}
                description={`Administración de categorías`}
            />

            <div className='mt-5 flex justify-end'>
                <CreateButton title="Crear categoría" href="/admin/categories/new" />
            </div>

            {
                !categories || categories?.length === 0
                    ? (
                        <div className='flex justify-center items-center h-[calc(100vh_-_300px)]'>
                            <p>No hay categorías disponibles</p>
                        </div>
                    )
                    : <CategoriesTable categories={categories || []} />
            }
        </ContentLayout>
    );
}