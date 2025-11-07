"use server";

import prisma from "@/lib/prisma";

export const getCompanyById = async (id: string) => {
    try {
        const company = await prisma.company.findUnique({
            where: { 
                id,
                status: true
            }
        });

        if (!company) return null;

        return company;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener empresa por ID');
    }
};