"use server";

import { revalidatePath } from "next/cache";
import { forbidden, unauthorized } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-server-session";

export const changeUserEmailVerified = async (userId: string, emailVerified: boolean) => {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { emailVerified }
        });

        revalidatePath('/admin/users');

        return {
            ok: true,
            message: `La verificación del correo de "${user.name}" ha sido cambiada a "${emailVerified === true ? 'verificado' : 'no verificado'}".`
        };

    } catch (error) {
        console.error('Error al cambiar la verificación del correo del usuario:', error);
        return {
            ok: false,
            message: 'Ocurrió un error al cambiar la verificación del correo del usuario.'
        };
    }
};