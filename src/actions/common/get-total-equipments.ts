"use server";

import prisma from "@/lib/prisma";

export const getTotalEquipments = async () => {
    try {
        return await prisma.equipment.count();
    } catch (error) {
        console.log(error);
        return 0;
    }
};