"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getCategories = async () => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const categories = await prisma.category.findMany({
            where: { status: true },
            orderBy: { name: 'asc' }
        });

        return categories;
    } catch (error) {
        console.log(error);
        return [];
    }
};