"use server";

import prisma from "@/lib/prisma";

export const getTotalEquipmentsByOfficeName = async (name: string) => {
    try {
        return await prisma.equipment.count({
            where: {
                office: {
                    name: name
                }
            }
        });       
    } catch (error) {
        console.log(error);
        return 0;
    }
};