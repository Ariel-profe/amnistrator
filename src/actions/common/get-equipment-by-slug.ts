"use server";

import prisma from "@/lib/prisma";

export const getEquipmentBySlug = async (slug: string) => {

    try {
        const equipment = await prisma.equipment.findFirst({
            include: {
                category: true,
                office: true,
                company: true,
                user: true,
                reviews: true,
                services: true
            },
            where: {
                slug: slug
            }
        })

        if (!equipment) return null;

        return {
            ...equipment,
            office: equipment.office.name,
            services: equipment.services ? equipment.services.map(service => {
                return {
                    description: service.description,
                    date: service.date,
                }
            }) : [],
            reviews: equipment.reviews ? equipment.reviews.map(review => review.description) : [],
        };

    } catch (error) {
        console.error("Error al obtener el equipo por slug:", error);
        throw new Error("Error al obtener el equipo por slug");
    }
};