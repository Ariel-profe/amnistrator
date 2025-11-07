"use server";

import prisma from "@/lib/prisma";

export const getOfficeById = async (id: string) => {
    try {
        const office = await prisma.office.findUnique({
            where: { id }
        });

        if (!office) return null;

        return office;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener oficina por ID');
    }
};