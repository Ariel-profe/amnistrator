"use client";

import Link from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IoPencilSharp } from 'react-icons/io5';
import { Payment, PaymentItem } from '@/generated/prisma';

import { HandleAddUpdatePaymentItem, HandleDeleteButton, HandleViewPayment } from '@/components';

interface Props {
    payments: (
        Payment 
        & { month: { name: string } }
        & { paymentItems: PaymentItem[] }
    )[];
    userRole: string;
};

export const PaymentsTable = ({ payments, userRole }: Props) => {

    const columns: GridColDef[] = [
        { field: 'month', headerName: 'Mes', width: 200 },
        { field: 'totalHours', headerName: 'Total Horas', width: 200 },
        {
            field: 'view',
            headerName: 'Ver',
            width: 150,
            renderCell: ({ row }: GridRenderCellParams) => {
                const foundPayment = payments.find(eq => eq.id === row.id);
                if (!foundPayment) return null;
                return (
                    <HandleViewPayment payment={foundPayment} />
                )
            }
        },
        {
            field: 'addPayment',
            headerName: 'Servicios',
            width: 150,
            renderCell: ({ row }: GridRenderCellParams) => {
                const foundPayment = payments.find(eq => eq.id === row.id);
                if (!foundPayment) return null;
                return (
                    <HandleAddUpdatePaymentItem paymentId={foundPayment.id} />
                )
            }
        },
        {
            field: 'edit',
            headerName: "Editar",
            cellClassName: 'text-gray-100',
            headerClassName: 'text-gray-900',
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Link href={`/admin/surveys/equipment/${row.slug}`} className="hover:underline text-blue-600 hover:text-blue-800 flex items-center h-full justify-center">
                        <IoPencilSharp size={20} />
                    </Link>
                )
            }
        },
        {
            field: 'delete',
            headerName: 'Eliminar',
            cellClassName: 'text-gray-100',
            headerClassName: 'text-gray-900',
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <HandleDeleteButton id={row.id} model="payment" />
                )
            }
        },
    ];

    const rows = payments.map(item => ({
        id: item.id,
        month: item.month.name,
        totalHours: item.totalHours
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
};