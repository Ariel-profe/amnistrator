"use server";

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { unauthorized } from "next/navigation";
import z from "zod";

const paymentItemSchema = z.object({
    id: z.number().optional(),
    date: z.string().min(1, "La fecha es obligatoria"),
    description: z.string().min(1, "La descripción es obligatoria"),
    startTime: z.string().min(1, "La hora de inicio es obligatoria"),
    endTime: z.string().min(1, "La hora de finalización es obligatoria"),
    amountOfHours: z.number().min(1, "La cantidad de horas es obligatoria"),
    availableHours: z.number().min(1, "Las horas disponibles son obligatorias"),
    paymentId: z.string().min(1, "El ID del servicio de abono es obligatorio"),
});

export const createUpdatePaymentItem = async(formData: FormData) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();    

    const data = Object.fromEntries(formData);    

    // Convert numeric fields from string to number
    const parsedData = {
        ...data,
        id: data.id ? Number(data.id) : undefined,
        amountOfHours: data.amountOfHours ? Number(data.amountOfHours) : undefined,
        availableHours: data.availableHours ? Number(data.availableHours) : undefined,
    };

    const paymentItemParsed = paymentItemSchema.safeParse(parsedData);

    if(!paymentItemParsed.success) {
        console.error("Error al validar algun campo:", paymentItemParsed.error.message);
        const firstError = paymentItemParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos del servicio de abono",
        }
    };

    const paymentItem = paymentItemParsed.data;

    const { id, ...rest } = paymentItem;

    try {
            await prisma.$transaction(async (tx) => {
                let paymentItem;
    
                if (id) {
                    paymentItem = await tx.paymentItem.update({
                        where: { id: id },
                        data: { 
                            ...rest,
                            paymentId: rest.paymentId,
                        }
                    })
                } else {
                    paymentItem = await tx.paymentItem.create({
                        data: { 
                            ...rest,
                            paymentId: rest.paymentId,
                        }
                    })
                };
    
                return paymentItem;
            });
    
            return {
                ok: true,
                message: id ? "Servicio actualizado correctamente" : "Servicio creado correctamente",
            }
        } catch (error) {
            console.error("Error al crear/actualizar el servicio:", error);
            return {
                ok: false,
                message: "500 - Error al crear/actualizar el servicio",
            }
        }
};