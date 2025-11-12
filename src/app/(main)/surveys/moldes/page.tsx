export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';
import { unauthorized } from 'next/navigation';

import { getEquipmentByOffice } from '@/actions/common/get-equipments-by-office';
import { PageTitle, EquipmentTable } from '@/components';
import { getServerSession } from '@/lib/get-server-session';

export default async function MoldesPage() {

    const session = await getServerSession();
    const user = session?.user;

    if (!user) unauthorized();

    const equipmentData = await getEquipmentByOffice("moldes");
    const equipment = equipmentData.map(item => ({
        ...item,
        reviews: item.reviews.map(review => ({
            ...review,
            boxNumber: review.boxNumber ?? 0
        }))
    }));

    const office = "moldes";    

    return (
        <section className="container mx-auto px-3 mt-10">
            <PageTitle
                title={`Gestión de ${equipment.length} equipos`}
                description={`Administracion de equipos de ${office}`}
            />

            {
                equipment.length === 0
                    ? (
                        <div className='flex justify-center items-center h-[calc(100vh_-_300px)]'>
                            <p>No hay equipos disponibles</p>
                        </div>
                    )
                    : <EquipmentTable
                        userRole={user?.role}
                        equipment={equipment}
                    />
            }
        </section>
    );
}