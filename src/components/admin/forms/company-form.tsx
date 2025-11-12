"use client";

import { useEffect, useState } from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "sonner";

import { Company } from "@/generated/prisma";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton } from "@/components";

import { createUpdateCompany } from "@/actions";

interface Props {
    company?: Company;
};

const companySchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(50),
    slug: z.string(),
    email: z.email({ message: "Ingresa un email válido" }),
    phone: z.string().min(6, { message: "El teléfono debe tener al menos 6 números" }).max(15, { message: "El teléfono debe tener como máximo 15 números" }),
    address: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres" }).max(100, { message: "La dirección debe tener como máximo 100 caracteres" }),
    cuit: z.string().min(7, { message: "El CUIT debe tener al menos 7 números" }).max(13, { message: "El CUIT debe tener como máximo 13 números" })
});

type CompanyFormValues = z.infer<typeof companySchema>;

export const CompanyForm = ({ company }: Props) => {

    const [error, setError] = useState<string | null>(null);

    const form = useForm<CompanyFormValues>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: company?.name || "",
            slug: company?.slug || "",
            email: company?.email || "",
            phone: company?.phone || "",
            address: company?.address || "",
            cuit: company?.cuit || ""
        }
    });

    const { handleSubmit, watch, setValue, clearErrors, control } = form;

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'name') {
                const regex = /[^a-zA-Z0-9_]/gi;
                // Replace spaces, hyphens, commas, and dots with underscores
                const newSlug = value.name
                    ?.trim()
                    .replaceAll(' ', '_')
                    .replaceAll('-', '_')
                    .replaceAll(',', '_')
                    .replaceAll('.', '_')
                    .replaceAll(regex, '')
                    .toLocaleLowerCase() || '';
                setValue('slug', newSlug);
                if (newSlug) {
                    clearErrors('slug');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, clearErrors]);

    const router = useRouter();

    const onSubmit = async (data: CompanyFormValues) => {
        setError(null);
        const formData = new FormData();

        // Append all form fields to FormData
        if (company?.id) {
            formData.append("id", company?.id ?? "");
        }

        formData.append("name", data.name);
        formData.append("slug", data.slug);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("address", data.address);
        formData.append("cuit", data.cuit);

        const { ok, message } = await createUpdateCompany(formData);

        if (!ok) {
            toast.error(message);
            return;
        };

        // If the product was created or updated successfully
        toast.success(message);
        router.replace("/admin/companies");
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-end">
                    <LoadingButton
                        type="submit"
                        loading={form.formState.isSubmitting}
                    >
                        <IoSaveOutline />
                        {company?.id ? "Actualizar" : "Crear"}
                    </LoadingButton>
                </div>

                <div className="grid mb-16 gap-3 mt-5">
                    {/* Required */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">
                        <FormField
                            control={control}
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

                        <FormField
                            control={control}
                            name="slug"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="email"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">

                        <FormField
                            control={control}
                            name="phone"
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="tel" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="address"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dirección</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="cuit"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CUIT</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {error && (
                    <div role="alert" className="text-sm text-red-a600">
                        {error}
                    </div>
                )}
            </form>
        </Form>
    );
};