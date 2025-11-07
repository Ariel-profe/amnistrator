"use server";

import { forbidden, unauthorized } from "next/navigation";
import z from "zod";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

const categorySchema = z.object({
    id: z.uuid().optional().nullable(),
    name: z.string().min(3).max(50),
    slug: z.string().min(3).max(50)
});

export const createUpdateCategory = async (formData: FormData) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    const data = Object.fromEntries(formData);

    let categoryParsed = categorySchema.safeParse(data);

   if (!categoryParsed.success) {
        console.error("Error al validar algun campo:", categoryParsed.error.message);
        const firstError = categoryParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos de la empresa",
        }
    };

    const category = categoryParsed.data;

    const { id, ...rest } = category;

    try {
        await prisma.$transaction(async (tx) => {
            let category;

            if (id) {
                category = await tx.category.update({
                    where: { id: id },
                    data: { 
                        name: rest.name as any,
                        slug: rest.slug as any
                    }
                })
            } else {
                category = await tx.category.create({
                    data: { 
                        name: rest.name as any,
                        slug: rest.slug as any
                    }
                })
            };

            return category;
        });

        return {
            ok: true,
            message: id ? "Categoría actualizada correctamente" : "Categoría creada correctamente",
        }
    } catch (error) {
        console.error("Error al crear/actualizar la categoría:", error);
        return {
            ok: false,
            message: "500 - Error al crear/actualizar la categoría",
        }
    }
};