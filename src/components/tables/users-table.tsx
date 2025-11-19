"use client";

import { changeUserEmailVerified, changeUserRole } from '@/actions';
import { User } from '@/lib/auth';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { toast } from 'sonner';
import { HandleDeleteButton } from '@/components';

interface Props {
    users: User[];
};

export const UsersTable = ({ users }: Props) => {

    const onChangeUserRole = async (userId: string, role: string) => {
        const { ok, message } = await changeUserRole(userId, role);

        if (!ok) {
            toast.error(message);
            return;
        }
        toast.success(message);
    };

    const onChangeUserEmailVerified = async (userId: string, emailVerified: boolean) => {
        const { ok, message } = await changeUserEmailVerified(userId, emailVerified);

        if (!ok) {
            toast.error(message);
            return;
        }
        toast.success(message);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#ID', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Nombre', width: 300 },
        { field: 'loginCount', headerName: 'Visitas', width: 200 },
        {
            field: 'role', headerName: 'Rol', width: 150,
            renderCell: ({ row }) => {
                return (
                    <select
                        value={row.role}
                        onChange={e => onChangeUserRole(row.id, e.target.value)}
                        className='text-sm text-secondary w-32 p-2'
                    >
                        <option value="admin">Admin</option>
                        <option value="operator">Operador</option>
                        <option value="user">Usuario</option>
                    </select>
                )
            },
        },
        {
            field: 'emailVerified', headerName: 'Email Verificado', width: 150,
            renderCell: ({ row }) => {
                return (
                    <select
                        value={row.emailVerified}
                        onChange={e => onChangeUserEmailVerified(row.id, e.target.value === 'true')}
                        className='text-sm text-secondary w-32 p-2'
                    >
                        <option value="true">Verificado</option>
                        <option value="false">No Verificado</option>
                    </select>
                )
            },
        },
        {
            field: 'delete',
            headerName: 'Eliminar',
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <HandleDeleteButton id={row.id} model="user" />
                )
            }
        },
    ];

    const rows = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        loginCount: user.loginCount
    }));

    return (
        <div className="grid fadeIn mt-10">
            <div className='container h-[650px] w-full'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        </div>
    )
}
