"use server";

import prisma from "@/lib/prisma";

export const getTotalPayments = async () => {
    try {
        return await prisma.payment.count();
    } catch (error) {
        console.log(error);
        return 0;
    }
};