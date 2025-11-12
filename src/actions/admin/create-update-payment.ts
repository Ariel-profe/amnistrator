"use server";

import { forbidden, unauthorized } from "next/navigation";
import z from "zod";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

const paymentSchema = z.object({
    id: z.uuid().optional().nullable(),
    monthId: z.number().min(1, "El mes es obligatorio"),
    totalHours: z.number().optional().nullable(),
    summary: z.string().optional().nullable(),
});

export const createUpdatePayment = async (formData: FormData) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    const data = Object.fromEntries(formData);

    // Convert string values to appropriate types
    const processedData = {
        ...data,
        monthId: data.monthId ? Number(data.monthId) : undefined,
        totalHours: data.totalHours ? Number(data.totalHours) : undefined,
    };

    const paymentParsed = paymentSchema.safeParse(processedData);

    if (!paymentParsed.success) {
        console.error("Error al validar algun campo:", paymentParsed.error.message);
        const firstError = paymentParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos del abono",
        }
    };

    const payment = paymentParsed.data;

    const { id, ...rest } = payment;

    try {
        await prisma.$transaction(async (tx) => {
            let payment;

            if (id) {
                payment = await tx.payment.update({
                    where: { id: id },
                    data: { 
                        ...rest,
                        monthId: rest.monthId
                    }
                })
            } else {
                payment = await tx.payment.create({
                    data: { 
                        ...rest,
                        monthId: rest.monthId
                    }
                })
            };

            return payment;
        });

        return {
            ok: true,
            message: id ? "Abono actualizado correctamente" : "Abono creado correctamente",
        }
    } catch (error) {
        console.error("Error al crear/actualizar el abono:", error);
        if(error instanceof Error && error.message.includes("Unique constraint failed on the fields: (`monthId`)")) {
            return {
                ok: false,
                message: "400 - Ya existe un abono para este mes",
            }
        }
        
        return {
            ok: false,
            message: "500 - Error al crear/actualizar el abono",
        }
    }
};