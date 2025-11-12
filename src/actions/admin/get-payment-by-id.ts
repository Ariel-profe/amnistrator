"use server";

import prisma from "@/lib/prisma";

export const getPaymentById = async (id: string) => {
    try {
        const payment = await prisma.payment.findUnique({
            where: { 
                id,
                status: true
            },
            include: {
                month: {
                    select: {
                        id: true
                    }
                }
            }
        });

        if (!payment) return null;

        return payment;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener abono por ID');
    }
};