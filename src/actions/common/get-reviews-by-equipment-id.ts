"use server";

import prisma from "@/lib/prisma";

export const getReviewsByEquipmentId = async(equipmentId: string) => {

    try {
        const reviews = await prisma.reviews.findMany({
            where: {
                equipmentId: equipmentId
            }
        });
        return reviews;
    } catch (error) {
        console.error(error);
        return [];
    }
};