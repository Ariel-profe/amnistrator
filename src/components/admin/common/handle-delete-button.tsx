"use client"

import { useState } from "react";
import { toast } from "sonner";
import { IoTrashOutline, IoWarningOutline } from "react-icons/io5";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, LoadingButton } from "@/components";
import { deleteOfficeById, deleteEquipmentById, deleteUserById, deletePaymentItemById, deletePayment, deleteCompanyById, deleteCategoryById } from "@/actions";

export const HandleDeleteButton = ({ id, model }: { id: string | number, model: string }) => {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
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
            } else if(model === "company") {
                const { message, ok } = await deleteCompanyById(id as string);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            } else if(model === "category") {
                const { message, ok } = await deleteCategoryById(id as string);
                if (ok) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            }
            setLoading(false);
        } catch (error) {
            toast.error("Error al eliminar el elemento");
            setLoading(false);
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
                        <LoadingButton 
                            loading={loading} 
                            type="submit" 
                            variant="destructive"
                            onClick={handleDelete}
                        >Eliminar</LoadingButton>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
