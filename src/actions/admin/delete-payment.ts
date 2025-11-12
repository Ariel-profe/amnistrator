"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePayment = async (paymentId: string) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();
    if(user.role !== "admin") forbidden();

    try {
        const paymentDB = await prisma.payment.delete({
            where: { id: paymentId }
        });

        if(!paymentDB) {
            return {
                ok: false,
                error: "No se encontró el Abono"
            };
        };

        revalidatePath(`/admin/payments`);

        return {
            ok: true,
            message: "Abono eliminado correctamente"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "500 - Error al eliminar el Abono"
        };
    }
};