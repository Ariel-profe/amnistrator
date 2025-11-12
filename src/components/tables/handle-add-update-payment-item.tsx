
"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { IoAddOutline, IoPencilOutline } from "react-icons/io5";
import { format } from "date-fns";
import { Dialog, DialogClose, DialogContent, Popover, PopoverTrigger, PopoverContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, Calendar, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Form, LoadingButton } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdatePaymentItem } from '@/actions';
import { toast } from "sonner";
import { PaymentItem } from "@/generated/prisma";

interface Props {
    paymentId: string;
    paymentItem?: PaymentItem;
};

const paymentItemSchema = z.object({
    date: z.string().min(1, "La fecha es requerida"),
    description: z.string().min(1, "La descripción es requerida"),
    startTime: z.string().min(1, "La hora de inicio es requerida"),
    endTime: z.string().min(1, "La hora de fin es requerida"),
    amountOfHours: z.number().min(1, "La cantidad de horas debe ser mayor o igual a 1"),
    availableHours: z.number().min(0, "Las horas disponibles deben ser mayores o iguales a 0")
});

type PaymentItemFormValues = z.infer<typeof paymentItemSchema>;

export const HandleAddUpdatePaymentItem = ({ paymentId, paymentItem }: Props) => {

    const form = useForm<PaymentItemFormValues>({
        resolver: zodResolver(paymentItemSchema),
        defaultValues: {
            description: paymentItem?.description || "",
            date: paymentItem?.date || new Date().toISOString().split('T')[0],
            startTime: paymentItem?.startTime || "",
            endTime: paymentItem?.endTime || "",
            amountOfHours: paymentItem?.amountOfHours || 1,
            availableHours: paymentItem?.availableHours || 0
        }
    });

    const onSubmit = async (data: PaymentItemFormValues) => {

        const formData = new FormData();

        if (paymentItem) formData.append("id", paymentItem.id.toString());
        formData.append("date", data.date);
        formData.append("description", data.description);
        formData.append("startTime", data.startTime);
        formData.append("endTime", data.endTime);
        formData.append("amountOfHours", data.amountOfHours.toString());
        formData.append("availableHours", data.availableHours.toString());
        formData.append("paymentId", paymentId);

        const { ok, message } = await createUpdatePaymentItem(formData);

        if (!ok) {
            toast.error(message);
            return;
        };

        toast.success(message);
        form.reset();
        // Close the dialog
        const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
        closeButton?.click();
    };    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="">
                    {
                        paymentItem ? (
                            <IoPencilOutline size={20} />
                        ) : (
                            <IoAddOutline size={20} />
                        )
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <DialogHeader>
                            <DialogTitle>Agregar servicio</DialogTitle>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Fecha</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="text-left font-normal"
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value + 'T00:00:00'), "PPP")
                                                    ) : (
                                                        <span>Seleccionar fecha</span>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value + 'T00:00:00') : undefined}
                                                onSelect={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                                                disabled={(date) => date > new Date()}
                                                autoFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full col-span-7">
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Colocar una descripción de la contingencia" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startTime"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Hora de inicio</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="time" value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endTime"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Hora de finalización</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="time" value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="amountOfHours"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Cantidad de horas</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                                min={0}
                                                step={1}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="availableHours"
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Horas disponibles</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                                min={0}
                                                step={1}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="flex gap-2 mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <LoadingButton
                                type="submit"
                                loading={form.formState.isSubmitting}
                            >
                                Guardar
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};