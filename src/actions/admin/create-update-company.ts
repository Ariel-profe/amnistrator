"use server";

import { forbidden, unauthorized } from "next/navigation";
import z from "zod";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

const companySchema = z.object({
    id: z.uuid().optional().nullable(),
    name: z.string().min(2).max(50),
    slug: z.string(),
    email: z.email(),
    phone: z.string().min(6).max(15),
    address: z.string().min(5).max(100),
    cuit: z.string().min(7).max(13)
});

export const createUpdateCompany = async (formData: FormData) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    const data = Object.fromEntries(formData);

    const companyParsed = companySchema.safeParse(data);

    if (!companyParsed.success) {
        console.error("Error al validar algun campo:", companyParsed.error.message);
        const firstError = companyParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos de la empresa",
        }
    };

    const company = companyParsed.data;

    const { id, ...rest } = company;

    try {
        await prisma.$transaction(async (tx) => {
            let company;

            if (id) {
                company = await tx.company.update({
                    where: { id: id },
                    data: { ...rest }
                })
            } else {
                company = await tx.company.create({
                    data: { ...rest }
                })
            };

            return company;
        });

        return {
            ok: true,
            message: id ? "Empresa actualizada correctamente" : "Empresa creada correctamente",
        }
    } catch (error) {
        console.error("Error al crear/actualizar la empresa:", error);
        return {
            ok: false,
            message: "500 - Error al crear/actualizar la empresa",
        }
    }
};