"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getUsers = async () => {

    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const users = await prisma.user.findMany({
            where: {
                status: true
            },
            orderBy: {
                name: 'desc'
            }
        });
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }

};
