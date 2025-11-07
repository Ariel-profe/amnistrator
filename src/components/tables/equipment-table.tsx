"use client";

import Link from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IoAddOutline, IoPencilSharp } from 'react-icons/io5';
import { Equipment } from '@/generated/prisma';

import { HandleDeleteButton } from '@/components';
import { HandleViewEquipment } from './handle-view-equipment';
import clsx from 'clsx';
import { HandleAddReviews } from './handle-add-reviews';

interface Props {
    equipment: (
        Equipment
        & { office: { name: string } }
        & { services: { id: number; description: string; date: string }[] }
        & { reviews: { id: number; description: string; date: string, boxNumber: number, priority: string }[] }
    )[];
    userRole: string;
};

const STATUS_COLORS: Record<string, string> = {
    solicitado: "bg-yellow-500",
    revision: "bg-orange-500",
    "fuera de servicio": "bg-red-500",
    alternativo: "bg-blue-500",
    operativo: "bg-green-500",
};

export const EquipmentTable = ({ equipment, userRole }: Props) => {
    const columns: GridColDef[] = [
        { field: 'tag', headerName: 'Etiqueta', width: 150 },
        { field: 'name', headerName: 'Nombre', width: 300 },
        { field: 'os', headerName: 'Sistema Operativo', width: 200 },
        { field: 'processor', headerName: 'Procesador', width: 200 },
        { field: 'ram', headerName: 'RAM', width: 100 },
        {
            field: 'status', headerName: 'Estado', width: 100,
            renderCell: ({ row }: GridRenderCellParams) => {
                const colorClass = STATUS_COLORS[row.status as string] || "text-gray-500";
                return (
                    <div className='flex items-center gap-x-2'>
                        <div className={clsx("h-2 w-2 rounded-full",
                            colorClass
                        )} />
                        {row.status}
                    </div>
                )
            }
        },
        {
            field: 'view',
            headerName: 'Ver',
            renderCell: ({ row }: GridRenderCellParams) => {
                const foundEquipment = equipment.find(eq => eq.id === row.id);
                if (!foundEquipment) return null;
                return (
                    <HandleViewEquipment equipment={foundEquipment} />
                )
            }
        },
        {
            field: 'addReview',
            headerName: "Contingencia",
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <HandleAddReviews equipmentId={row.id} />
                )
            }
        },
        {
            field: 'edit',
            headerName: "Editar",
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Link href={`/admin/reports/equipment/${row.slug}`} className="hover:underline text-blue-600 hover:text-blue-800 flex items-center h-full justify-center">
                        <IoPencilSharp size={20} />
                    </Link>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Eliminar',
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <HandleDeleteButton id={row.id} model="equipment" />
                )
            }
        },
    ];

    const rows = equipment.map(item => ({
        id: item.id,
        tag: item.tag,
        name: item.name,
        slug: item.slug,
        office: item.office.name,
        os: item.os,
        processor: item.processor,
        ram: item.ram,
        status: item.status,
    }));

    return (
        <div className="grid fadeIn mt-10">
            <div className='container h-[650px] w-full'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                edit: userRole === "admin" ? true : false,
                                delete: userRole === "admin" ? true : false,
                                addReview: userRole === "user" ? true : false,
                            }
                        }
                    }}
                    showToolbar
                />
            </div>
        </div>
    )
}
