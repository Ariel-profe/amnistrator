export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';

import { getUsers } from '@/actions';
import { Button, ContentLayout, PageTitle, UsersTable } from '@/components';

export default async function UsersAdminPage() {

    const users = await getUsers();

    return (
        <ContentLayout title='Usuarios'>
            <PageTitle title='Usuarios' />

            <div className='mt-5 flex justify-end'>
                <Button>
                    <Link href="/admin/users/new">Crear usuario</Link>
                </Button>
            </div>

            <UsersTable users={users} />
        </ContentLayout>
    );
}