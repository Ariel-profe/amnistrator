"use server";

import { unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getEquipmentByOffice = async (officeName: string) => {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();

    const equipment = await prisma.equipment.findMany({
        include: {
            office: {
                select: {
                    name: true
                }
            },
            services: true,
            reviews: {
                select: {
                    id: true,
                    description: true,
                    date: true,
                    boxNumber: true,
                    priority: true,
                    user: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
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
};