"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCompanyById = async (companyId: string) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();
    if(user.role !== "admin") forbidden();

    try {
        const companyDB = await prisma.company.update({
            where: { id: companyId },
            data: { status: false }
        });

        if(!companyDB) {
            return {
                ok: false,
                error: "No se encontró la empresa"
            };
        };

        revalidatePath(`/admin/companies`);

        return {
            ok: true,
            message: "Empresa eliminada correctamente"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "500 - Error al eliminar la empresa"
        };
    }
};