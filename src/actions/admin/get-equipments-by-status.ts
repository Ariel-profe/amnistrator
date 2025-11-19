"use server";

import prisma from "@/lib/prisma";

export const getEquipmentsByStatus = async() => {

    try {
        const equipments = await prisma.equipment.findMany({
            where: { isActive: true },
            select: {
                status: true,
            }
        });

        return equipments;
    } catch (error) {
        console.error("Error fetching equipments by date:", error);
        return [];
    }
};