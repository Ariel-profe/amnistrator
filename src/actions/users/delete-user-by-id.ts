"use server";

import { forbidden, unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const deleteUserById = async (userId: string): Promise<{ ok: boolean; message: string }> => {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const userDB = await prisma.user.findUnique({ where: { id: userId } });

        if (!userDB) {
            return {
                ok: false,
                message: "Usuario no encontrado"
            };
        }

        await prisma.user.update({ where: { id: userId }, data: { status: false } });

        // Revalidate the path to update the cache
        revalidatePath(`/admin/users`);

        return {
            ok: true,
            message: "Usuario eliminado correctamente"
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: "500 - Error al eliminar el usuario"
        };
    }
};