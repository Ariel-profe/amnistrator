"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getCompanies = async () => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const companies = await prisma.company.findMany({
            where: { status: true },
            orderBy: { name: 'asc' }
        });

        return companies;
    } catch (error) {
        console.log(error);
        return [];
    }
};