"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategoryById = async (categoryId: string) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();
    if(user.role !== "admin") forbidden();

    try {
        const categoryDB = await prisma.category.update({
            where: { id: categoryId },
            data: { status: false }
        });

        if(!categoryDB) {
            return {
                ok: false,
                error: "No se encontró la categoría"
            };
        };

        revalidatePath(`/admin/categories`);

        return {
            ok: true,
            message: "Categoría eliminada correctamente"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "500 - Error al eliminar la categoría"
        };
    }
};