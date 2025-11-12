"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSaveOutline } from "react-icons/io5";
import z from "zod";
import { toast } from "sonner";

import { Office } from "@/generated/prisma";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton } from "@/components";

import { createUpdateOffice } from "@/actions";

interface Props {
    office: Office | undefined;
};

const officeSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(50)
});

type OfficeFormValues = z.infer<typeof officeSchema>;

export const OfficeForm = ({ office }: Props) => {

    const form = useForm<OfficeFormValues>({
        resolver: zodResolver(officeSchema),
        defaultValues: {
            name: office?.name || ""
        }
    });

    const router = useRouter();

    const onSubmit = async (data: OfficeFormValues) => {
        const formData = new FormData();

        // Append all form fields to FormData
        if (office?.id) {
            formData.append("id", office?.id ?? "");
        }

        formData.append("name", data.name);

        const { ok, message } = await createUpdateOffice(formData);

        if (!ok) {
            toast.error(message);
            return;
        };

        // If the product was created or updated successfully
        toast.success(message);
        router.replace("/admin/offices");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-end">
                    <LoadingButton
                        type="submit"
                        loading={form.formState.isSubmitting}
                    >
                        <IoSaveOutline />
                        {office?.id ? "Actualizar" : "Crear"}
                    </LoadingButton>
                </div>

                <div className="grid mb-16 gap-3 mt-5">
                    {/* Required */}
                    <div className="grid grid-cols-2 gap-x-4 w-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};