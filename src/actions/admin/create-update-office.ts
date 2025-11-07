"use server";

import { forbidden, unauthorized } from "next/navigation";
import z from "zod";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

const officeSchema = z.object({
    id: z.uuid().optional().nullable(),
    name: z.string().min(3).max(50)
});

export const createUpdateOffice = async (formData: FormData) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    const data = Object.fromEntries(formData);

    let officeParsed = officeSchema.safeParse(data);

    if (!officeParsed.success) {
        console.error("Error al validar algun campo:", officeParsed.error.message);
        const firstError = officeParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos de la empresa",
        }
    };

    const office = officeParsed.data;

    const { id, ...rest } = office;

    try {
        await prisma.$transaction(async (tx) => {
            let office;

            if (id) {
                office = await tx.office.update({
                    where: { id: id },
                    data: { name: rest.name as any }
                })
            } else {
                office = await tx.office.create({
                    data: { name: rest.name as any }
                })
            };

            return office;
        });

        return {
            ok: true,
            message: id ? "Oficina actualizada correctamente" : "Oficina creada correctamente",
        }
    } catch (error) {
        console.error("Error al crear/actualizar la oficina:", error);
        return {
            ok: false,
            message: "500 - Error al crear/actualizar la oficina",
        }
    }
};