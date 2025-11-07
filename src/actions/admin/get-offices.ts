"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getOffices = async () => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const offices = await prisma.office.findMany({
            orderBy: { name: 'asc' }
        });

        return offices;
    } catch (error) {
        console.log(error);
        return [];
    }
};