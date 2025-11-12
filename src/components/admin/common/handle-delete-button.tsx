"use client"

import { toast } from "sonner";
import { IoTrashOutline, IoWarningOutline } from "react-icons/io5";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from "@/components";
import { deleteOfficeById, deleteEquipmentById, deleteUserById, deletePaymentItemById, deletePayment } from "@/actions";

export const HandleDeleteButton = ({ id, model }: { id: string | number, model: string }) => {
    const handleDelete = async () => {
        try {
            if (model === "office") {
                const { message, ok } = await deleteOfficeById(id as string);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            } else if (model === "equipment") {
                const { message, ok } = await deleteEquipmentById(id as string);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            } else if (model === "user") {
                const { message, ok } = await deleteUserById(id as string);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            } else if (model === "paymentItem") {
                const { message, ok } = await deletePaymentItemById(id as number);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            } else if(model === "payment") {
                const { message, ok } = await deletePayment(id as string);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            }
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const modelTitle = 
                model === "office" ? "la oficina" : 
                model === "equipment" ? "el equipo" : 
                model === "user" ? "el usuario" : 
                model === "paymentItem" ? "el servicio" :
                model === "payment" ? "el abono" :
                "este elemento";

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="link" size="icon">
                        <IoTrashOutline className="text-destructive" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {`¿Deseas eliminar ${modelTitle}?`}
                        </DialogTitle>
                        <DialogDescription className="flex items-center gap-x-1 text-yellow-500">
                            <IoWarningOutline />
                            Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive" onClick={handleDelete}>Eliminar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
