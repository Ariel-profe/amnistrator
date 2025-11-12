"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";

export const getPayments = async () => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) unauthorized();
    if (user.role !== 'admin') forbidden();

    try {
        const payments = await prisma.payment.findMany({
            where: { status: true },
            include: {
                month: true,
                paymentItems: true
            },
        });

        return payments;
    } catch (error) {
        console.log(error);
        return [];
    }
};