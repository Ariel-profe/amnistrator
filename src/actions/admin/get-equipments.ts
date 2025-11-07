"use server";

import prisma from "@/lib/prisma";

export const getEquipments = async() => {

    try {
        const equipments = await prisma.equipment.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                office: true,
                company: true,
                user: true,
                reviews: true,
                services: true
            }
        });

        return equipments;
    } catch (error) {
        console.error("Error fetching equipments:", error);
        return [];
    }
};