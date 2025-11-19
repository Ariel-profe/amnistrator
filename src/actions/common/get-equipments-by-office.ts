"use server";

import prisma from "@/lib/prisma";

export const getEquipmentByOffice = async (officeName: string) => {

    try {
        const equipment = await prisma.equipment.findMany({
            include: {
                category: true,
                office: true,
                company: true,
                user: true,
                reviews: true,
                services: true
            },
            orderBy: {
                name: 'desc'
            },
            where: {
                isActive: true,
                office: {
                    name: officeName
                }
            }
        });
    
        return equipment
        
    } catch (error) {
        console.log(error);
        return [];
    }

};