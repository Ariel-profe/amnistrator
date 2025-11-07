"use server";

import prisma from "@/lib/prisma";

export const getServicesById = async (equipmentId: string) => {

    try {
        const services = await prisma.service.findMany({
            where: {
                equipmentId: equipmentId,
                status: true
            }
        });
        return services;
    } catch (error) {
        console.error(error);
        return [];
    }
};