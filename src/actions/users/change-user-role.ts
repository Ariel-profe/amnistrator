"use server";

import { revalidatePath } from "next/cache";
import { forbidden, unauthorized } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-server-session";

export const changeUserRole = async (userId: string, role: string) => {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {

        const newRole = role === 'admin' ? 'admin' : role === 'operator' ? 'operator' : 'user';

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });

        revalidatePath('/admin/users');

        return {
            ok: true,
            message: `El rol del usuario "${user.name}" ha sido cambiado a "${role}".`
        };

    } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error);
        return {
            ok: false,
            message: 'Ocurrió un error al cambiar el rol del usuario.'
        };
    }
};