export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';
import { unauthorized } from 'next/navigation';

import { getEquipmentByOffice } from '@/actions/common/get-equipments-by-office';
import { PageTitle, Button, EquipmentTable } from '@/components';
import { getServerSession } from '@/lib/get-server-session';

export default async function PrimitivoPage() {

    const session = await getServerSession();
    const user = session?.user;

    if (!user) unauthorized();

    const equipmentData = await getEquipmentByOffice("primitivo");
    const equipment = equipmentData.map(item => ({
        ...item,
        reviews: item.reviews.map(review => ({
            ...review,
            boxNumber: review.boxNumber ?? 0
        }))
    }));

    const office = "primitivo";

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