"use server";

import { unauthorized, forbidden } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteEquipmentById = async (id: string) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try{
        const equipmentDB = await prisma.equipment.update({
            where: {
                id
            },
            data: {
                isActive: false
            }
        });

        if(!equipmentDB) {
            return {
                ok: false,
                message: "Equipo no encontrado"
            };
        };

        revalidatePath(`/admin`);

        return {
            ok: true,
            message: "Equipo eliminado correctamente"
        };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: "Error al eliminar el equipo"
        };
    }
};