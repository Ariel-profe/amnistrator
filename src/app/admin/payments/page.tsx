export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';
import { unauthorized } from 'next/navigation';
import { IoAddOutline } from 'react-icons/io5';

import { getPayments } from '@/actions';
import { PageTitle, Button, ContentLayout, PaymentsTable,  } from '@/components';
import { getServerSession } from '@/lib/get-server-session';

export default async function PaymentsAdminPage() {

    const session = await getServerSession();
        const user = session?.user;
        if(!user) unauthorized();   

    const payments = await getPayments();    

    const countPayments = payments?.length === 1 ? "1 abono" : payments?.length ? `${payments.length} abonos` : "0 abonos";

    return (
        <ContentLayout title="Abonos">
            <PageTitle
                title={`Gestión de ${countPayments}`}
                description={`Administración de abonos`}
            />

            <div className='mt-5 flex justify-end'>
                <Button>
                    <Link href={`/admin/payments/new`} className='flex items-center gap-1'>
                        <IoAddOutline />
                        Crear abono
                    </Link>
                </Button>
            </div>

            {
                !payments || payments?.length === 0
                    ? (
                        <div className='flex justify-center items-center h-[calc(100vh_-_300px)]'>
                            <p>No hay abonos disponibles</p>
                        </div>
                    )
                    : <PaymentsTable 
                        payments={payments || []} 
                        userRole={user?.role}
                    />
            }
        </ContentLayout>
    );
}