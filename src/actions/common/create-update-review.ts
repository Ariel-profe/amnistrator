"use server";

import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { unauthorized } from "next/navigation";
import z from "zod";

const reviewSchema = z.object({
    id: z.number().optional(),
    description: z.string().min(1).max(500),
    date: z.string(),
    boxNumber: z.number().min(0).optional(),
    priority: z.string().min(1).max(50),
    equipmentId: z.string(),
    userId: z.string()
});

export const createUpdateReview = async(formData: FormData) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();

    const data = Object.fromEntries(formData);

    const reviewParsed = reviewSchema.safeParse(data);    

    if(!reviewParsed.success) {
        console.error("Error al validar algun campo:", reviewParsed.error.message);
        const firstError = reviewParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos de la revisión",
        }
    };

    const review = reviewParsed.data;

    const { id, ...rest } = review;

    try {
            await prisma.$transaction(async (tx) => {
                let review;
    
                if (id) {
                    review = await tx.reviews.update({
                        where: { id: id },
                        data: { 
                            ...rest,
                            equipmentId: rest.equipmentId,
                            userId: user.id
                        }
                    })
                } else {
                    review = await tx.reviews.create({
                        data: { 
                            ...rest,
                            equipmentId: rest.equipmentId,
                            userId: user.id 
                        }
                    })
                };
    
                return review;
            });
    
            return {
                ok: true,
                message: id ? "Contingencia actualizada correctamente" : "Contingencia creada correctamente",
            }
        } catch (error) {
            console.error("Error al crear/actualizar la contingencia:", error);
            return {
                ok: false,
                message: "500 - Error al crear/actualizar la contingencia",
            }
        }
};