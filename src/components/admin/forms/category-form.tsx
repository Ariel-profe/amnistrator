"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { Category } from "@/generated/prisma";
import { createUpdateCategory } from "@/actions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton } from "@/components";
import { IoSaveOutline } from "react-icons/io5";

interface Props {
    category?: Category;
};

const categorySchema = z.object({
    name: z.string().min(3, { message: "El nombre deben tener al menos 3 caracteres" }).max(50),
    slug: z.string()
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export const CategoryForm = ({ category }: Props) => {

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || "",
            slug: category?.slug || ""
        }
    });

    const { handleSubmit, watch, setValue, clearErrors, control } = form;

    const router = useRouter();

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

    const onSubmit = async (data: CategoryFormValues) => {
        const formData = new FormData();

        // Append all form fields to FormData
        if (category?.id) {
            formData.append("id", category?.id ?? "");
        }
        formData.append("name", data.name);
        formData.append("slug", data.slug);

        const { ok, message } = await createUpdateCategory(formData);

        if (!ok) {
            toast.error(message);
            return;
        };

        // If the product was created or updated successfully
        toast.success(message);
        router.replace("/admin/categories");
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
                        {category?.id ? "Actualizar" : "Crear"}
                    </LoadingButton>
                </div>

                <div className="grid mb-16 gap-3 mt-5">
                    {/* Required */}
                    <div className="grid grid-cols-2 gap-x-4 w-full">
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
                    </div>
                </div>
            </form>
        </Form>
    );
};