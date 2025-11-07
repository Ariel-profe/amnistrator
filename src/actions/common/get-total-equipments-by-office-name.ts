"use server";

import { OfficeName } from "@/generated/prisma";
import prisma from "@/lib/prisma";

export const getTotalEquipmentsByOfficeName = async (name: OfficeName) => {
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