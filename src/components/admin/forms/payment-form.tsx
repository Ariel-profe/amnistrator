"use client";

import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSaveOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Payment, Month } from "@/generated/prisma";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";
import { createUpdatePayment } from "@/actions";

interface Props {
    payment: Payment
    months: Month[];
};

const paymentSchema = z.object({
    monthId: z.number().min(1, { message: "El mes es obligatorio" }),
    totalHours: z.number().max(100).optional(),
    summary: z.string().optional()
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export const PaymentForm = ({ payment, months }: Props) => {

    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            monthId: payment.monthId || 0,
            totalHours: payment.totalHours || 0,
            summary: payment.summary || ""
        }
    });

    const router = useRouter();

    const onSubmit = async (data: PaymentFormValues) => {
        const formData = new FormData();

        // Append all form fields to FormData
        if (payment?.id) {
            formData.append("id", payment?.id ?? "");
        }

        formData.append("monthId", data.monthId.toString());
        formData.append("totalHours", data.totalHours?.toString() ?? "");
        formData.append("summary", data.summary ?? "");

        const { ok, message } = await createUpdatePayment(formData);

        if (!ok) {
            toast.error(message);
            return;
        };

        // If the product was created or updated successfully
        toast.success(message);
        router.replace("/admin/payments");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-end gap-x-2">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        variant="outline">
                        Cancelar
                    </Button>
                    <LoadingButton
                        type="submit"
                        loading={form.formState.isSubmitting}
                    >
                        <IoSaveOutline />
                        {payment?.id ? "Actualizar" : "Crear"}
                    </LoadingButton>
                </div>

                <div className="grid gap-4 w-full max-w-2xl mt-5">
                    <FormField
                        control={form.control}
                        name="monthId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mes</FormLabel>
                                {
                                    months.length === 0
                                        ? (<p className="text-sm text-muted-foreground">No hay meses disponibles</p>)
                                        : (
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                                    value={field.value > 0 ? field.value.toString() : ""}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Seleccionar mes" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {
                                                                months?.map((opt) => (
                                                                    <SelectItem key={opt.id} value={opt.id.toString()} className="capitalize">
                                                                        {opt.name}
                                                                    </SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        )
                                }
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="totalHours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total de Horas</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resumen</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Colocar un resumen del mes" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form >
        </Form>
    );
};