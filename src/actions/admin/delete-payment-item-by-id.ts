"use server";

import { forbidden, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePaymentItemById = async (paymentItemId: number) => {
    const session = await getServerSession();
    const user = session?.user;
    if(!user) unauthorized();
    if(user.role !== "admin") forbidden();

    try {
        const paymentItemDB = await prisma.paymentItem.delete({
            where: { id: paymentItemId }
        });

        if(!paymentItemDB) {
            return {
                ok: false,
                error: "No se encontró el servicio de abono"
            };
        };

        revalidatePath(`/admin/payments`);

        return {
            ok: true,
            message: "Servicio de abono eliminado correctamente"
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "500 - Error al eliminar el servicio de abono"
        };
    }
};