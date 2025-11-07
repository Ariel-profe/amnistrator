"use server";

import { forbidden, unauthorized } from "next/navigation";
import z from "zod";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { Equipment, Prisma } from '../../generated/prisma/index';

const equipmentSchema = z.object({
    id: z.uuid().optional().nullable(),
    tag: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(0))),
    name: z.string().min(3).max(100),
    slug: z.string().min(3).max(100),
    location: z.enum(["sinUbicacion", "datos", "finanzas", "salaDeReuniones", "administracion", "deposito", "rack"]),
    status: z.enum(["solicitado", "revision", "fueraDeServicio", "alternativo", "operativo"]),
    os: z.string().min(2).max(50),
    processor: z.string().min(2).max(50),
    ram: z.string().min(2).max(50),
    motherboard: z.string().min(2).max(50),
    videoCard: z.string().min(2).max(50),
    storage: z.string().min(2).max(50)
})

export const createUpdateEquipment = async (formData: FormData) => {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    const data = Object.fromEntries(formData);

    let productParsed = equipmentSchema.safeParse(data);

    if (!productParsed.success) {
        console.error("Error al validar algun campo:", productParsed.error.message);
        const firstError = productParsed.error.issues[0];
        return {
            ok: false,
            message: firstError?.message || "400 - Error de validación en los datos del equipo",
        }
    };

    const equipment = productParsed.data;
    equipment.slug = equipment.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = equipment;

    let servicesItems: { 
        description: string; 
        date: string 
    }[] = [];

    let reviewsItems: { 
        description: string; 
        date: string; 
        boxNumber?: number; 
        priority: "alta" | "media" | "baja";
    }[] = [];
    let index = 0;

    while (true) {
        const description = data[`services[${index}][description]`];
        const date = data[`services[${index}][date]`];

        if (!description && !date) break;

        servicesItems.push({
            description: description as string,
            date: date as string,
        });

        index++;
    };

    index = 0; // Reset index for reviews
    while (true){
        const description = data[`reviews[${index}][description]`];
        const date = data[`reviews[${index}][date]`];
        const boxNumber = data[`reviews[${index}][boxNumber]`];
        const priority = data[`reviews[${index}][priority]`];

        if (!description && !date && !priority) break;

        reviewsItems.push({
            description: description as string,
            date: date as string,
            boxNumber: Number(boxNumber) as number,
            priority: priority as "alta" | "media" | "baja",
        });

        index++;
    };

    try {

        await prisma.$transaction(async (tx) => {
            let equipment: Equipment;

            if (id) {
                equipment = await tx.equipment.update({
                    where: { id: id },
                    data: {
                        ...rest,
                        officeId: data.officeId as string,
                        categoryId: data.categoryId as string,
                        companyId: data.companyId as string,
                        userId: user.id
                    }
                });

                await tx.service.deleteMany({
                    where: { equipmentId: equipment.id }
                });

                await tx.reviews.deleteMany({
                    where: { equipmentId: equipment.id }
                });

                if (servicesItems.length > 0) {
                    await Promise.all(
                        servicesItems.map(serviceItem =>
                            tx.service.create({
                                data: {
                                    description: serviceItem.description,
                                    date: serviceItem.date,
                                    equipmentId: equipment.id,
                                    userId: user.id
                                }
                            })
                        )
                    );
                };

                if (reviewsItems.length > 0) {
                    await Promise.all(
                        reviewsItems.map(reviewItem =>
                            tx.reviews.create({
                                data: {
                                    description: reviewItem.description,
                                    date: reviewItem.date,
                                    boxNumber: reviewItem.boxNumber,
                                    priority: reviewItem.priority,
                                    equipmentId: equipment.id,
                                    userId: user.id
                                }
                            })
                        )
                    );
                };
                
            } else {
                equipment = await tx.equipment.create({
                    data: {
                        ...rest,
                        officeId: data.officeId as string,
                        categoryId: data.categoryId as string,
                        companyId: data.companyId as string,
                        userId: user.id
                    }
                });

                if (servicesItems.length > 0) {
                    await Promise.all(
                        servicesItems.map(serviceItem =>
                            tx.service.create({
                                data: {
                                    description: serviceItem.description,
                                    date: serviceItem.date,
                                    equipmentId: equipment.id,
                                    userId: user.id
                                }
                            })
                        )
                    );
                };

                if (reviewsItems.length > 0) {
                    await Promise.all(
                        reviewsItems.map(reviewItem =>
                            tx.reviews.create({
                                data: {
                                    description: reviewItem.description,
                                    date: reviewItem.date,
                                    boxNumber: reviewItem.boxNumber,
                                    priority: reviewItem.priority,
                                    equipmentId: equipment.id,
                                    userId: user.id
                                }
                            })
                        )
                    );
                }
            }
            return { equipment };
        });

        return {
            ok: true,
            message: id ? "Equipo actualizado correctamente" : "Equipo creado correctamente",
        };

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.error('Unique constraint failed:', error.message);
                console.error('Detalles del error:', error.meta);
                return {
                    ok: false,
                    message: 'Ya existe un equipo con ese tag o slug.',
                };
            }
        } else if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
            console.error('Error al crear o actualizar el equipo:', error.message);

            const errorField = (error as any).meta?.target?.[0];

            return {
                ok: false,
                message: `${errorField === 'tag' ? 'esa etiqueta ya existe' : errorField === 'slug' ? 'ese slug ya existe' : errorField === 'name' ? 'ese nombre ya existe' : error}.`,
            }
        }

        return {
            ok: false,
            message: 'Error al crear o actualizar el equipo.',
        };
    }
};
