export const revalidate = 0; // Disable revalidation for this page

import Link from 'next/link';

import { getEquipmentByOffice } from '@/actions/common/get-equipments-by-office';
import { PageTitle, Button, EquipmentTable, ContentLayout } from '@/components';
import { OfficeName } from '@/generated/prisma';
import { getServerSession } from '@/lib/get-server-session';
import { unauthorized } from 'next/navigation';
import { getEquipments } from '@/actions';

export default async function EquipmentsAdminPage() {

    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();    
    
    const equipments = await getEquipments();
    
    // Transform the equipment data to match EquipmentTable expected type
    const equipment = equipments.map(item => ({
        ...item,
        reviews: item.reviews.map(review => ({
            id: review.id,
            description: review.description,
            date: review.date,
            boxNumber: review.boxNumber ?? 0, // Handle null values
            priority: review.priority as "alta" | "media" | "baja"
        }))
    }));

    return (
        <ContentLayout title="Equipos">
            <PageTitle
                title={`Gestión de ${equipment.length} equipos`}
                description={`Equipos registrados en el sistema.`}
            />

            <div className='mt-5 flex justify-end'>
                <Button>
                    <Link href={`/admin/relevamientos/equipo/new`}>Crear equipo</Link>
                </Button>
            </div>

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
        </ContentLayout>
    );
}