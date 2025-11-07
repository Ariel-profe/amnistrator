"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteOfficeById = async (officeId: string) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();
    if(user.role !== "admin") forbidden();

    try {
        const officeDB = await prisma.office.delete({
            where: { id: officeId }
        });

        if(!officeDB) {
            return {
                ok: false,
                error: "No se encontró la oficina"
            };
        };

        revalidatePath(`/admin/oficinas`);

        return {
            ok: true,
            message: "Oficina eliminada correctamente"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "500 - Error al eliminar la oficina"
        };
    }
};