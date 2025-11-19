"use server";

import prisma from "@/lib/prisma";

export const getEquipmentsByDate = async() => {

    try {
        const equipments = await prisma.equipment.findMany({
            where: { isActive: true },
            select: {
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return equipments;
    } catch (error) {
        console.error("Error fetching equipments by date:", error);
        return [];
    }
};