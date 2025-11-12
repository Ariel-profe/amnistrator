"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge, Button, Calendar, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/components";

import { createUpdateEquipment } from "@/actions/admin/create-update-equipment";
import { primitivoLocations, validEquipmentOs, validEquipmentStatus, validEquipmentRams, validEquipmentMotherboards, validEquipmentVideoCards, validEquipmentStorages, validEquipmentProcessors, buciLocations } from "@/lib/equipment-form-validation";
import { IOffice } from "@/interfaces/office.interface";
import z from "zod";
import { Service, Equipment, Reviews, Company } from "@/generated/prisma";
import { ICategory } from "@/interfaces/category.interface";
import { IoAddOutline, IoSaveOutline, IoTrashOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface Props {
    equipment: Equipment
    & { services: { id: number; description: string; date: string; }[] }
    & { reviews: { id: number; description: string; date: string; boxNumber: number; priority: "alta" | "media" | "baja"; }[] };
    offices: IOffice[];
    categories: ICategory[];
    companies: Company[];
    services: Service[];
    reviews: Reviews[];
};

const equipmentSchema = z.object({
    tag: z.number().min(1, { message: "La etiqueta es obligatoria" }),
    name: z.string().min(3, { message: "El nombre deben tener al menos 3 caracteres" }).max(100),
    slug: z.string(),
    categoryId: z.string().min(1, { message: "La categoría es obligatoria" }),
    officeId: z.string().min(1, { message: "La oficina es obligatoria" }),
    companyId: z.string().optional(),
    location: z.string().min(1, { message: "La ubicación es obligatoria" }),
    status: z.string().min(1, { message: "El estado es obligatorio" }),
    os: z.string().min(1, { message: "El sistema operativo es obligatorio" }),
    processor: z.string().min(1, { message: "El procesador es obligatorio" }),
    ram: z.string().min(1, { message: "La memoria RAM es obligatoria" }),
    motherboard: z.string().min(1, { message: "La placa madre es obligatoria" }),
    videoCard: z.string().min(1, { message: "La placa de video es obligatoria" }),
    storage1: z.string().min(1, { message: "El almacenamiento es obligatorio" }),
    storage2: z.string().optional(),
    services: z.array(z.object({
        id: z.number(),
        description: z.string(),
        date: z.string()
    })),
    reviews: z.array(z.object({
        id: z.number(),
        description: z.string(),
        date: z.string(),
        boxNumber: z.number(),
        priority: z.string()
    }))
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

export const EquipmentForm = ({ equipment, offices, categories, services, reviews, companies }: Props) => {

    const [officeSelected, setOfficeSelected] = useState<string | null>(null)

    const form = useForm<EquipmentFormValues>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: {
            tag: equipment.tag || 0,
            name: equipment.name || "",
            slug: equipment.slug || "",
            officeId: equipment.officeId || "",
            categoryId: equipment.categoryId || "",
            companyId: equipment.companyId || "",
            location: equipment.location || "",
            status: equipment.status || "",
            os: equipment.os || "",
            processor: equipment.processor || "",
            ram: equipment.ram || "",
            motherboard: equipment.motherboard || "",
            videoCard: equipment.videoCard || "",
            storage1: equipment.storage1 || "",
            storage2: equipment.storage2 || "",
            services: services
                ? services.map(item => ({
                    id: item.id,
                    description: item.description || '',
                    date: item.date || '',
                }))
                : [],
            reviews: reviews
                ? reviews.map(item => ({
                    id: item.id,
                    description: item.description || '',
                    date: item.date || '',
                    boxNumber: item.boxNumber || 0,
                    priority: item.priority || '',
                }))
                : []
        }
    });

    const { handleSubmit, watch, setValue, clearErrors, getValues, control, formState: { isSubmitting } } = form;

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

    const onSubmit = async (data: EquipmentFormValues) => {

        const formData = new FormData();

        // Append all form fields to FormData
        if (equipment?.id) {
            formData.append("id", equipment?.id ?? "");
        }
        formData.append("tag", data.tag.toString());
        formData.append("name", data.name);
        formData.append("slug", data.slug);
        formData.append("location", data.location);
        formData.append("categoryId", data.categoryId);
        formData.append("officeId", data.officeId);
        if (data.companyId) {
            formData.append("companyId", data.companyId);
        }
        formData.append("status", data.status);
        formData.append("os", data.os);
        formData.append("processor", data.processor);
        formData.append("ram", data.ram);
        formData.append("motherboard", data.motherboard);
        formData.append("videoCard", data.videoCard);
        formData.append("storage1", data.storage1);
        if (data.storage2) {
            formData.append("storage2", data.storage2);
        };

        data.services.forEach((serviceItem, index) => {
            formData.append(`services[${index}][description]`, serviceItem.description);
            formData.append(`services[${index}][date]`, serviceItem.date);
        });

        data.reviews.forEach((reviewItem, index) => {
            formData.append(`reviews[${index}][description]`, reviewItem.description);
            formData.append(`reviews[${index}][date]`, reviewItem.date);
            formData.append(`reviews[${index}][boxNumber]`, reviewItem.boxNumber.toString());
            formData.append(`reviews[${index}][priority]`, reviewItem.priority);
        });

        const { ok, message } = await createUpdateEquipment(formData);

        if (!ok) {
            toast.error(message);
            return;
        };

        // If the product was created or updated successfully
        toast.success(message);
        router.replace(`/admin/surveys/${offices.find(o => o.id === data.officeId)?.name}`);
    };

    const addServiceItem = () => {
        const items = getValues('services') || [];
        const newId = items.length > 0 ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1 : 1;

        setValue('services', [
            ...items,
            {
                id: newId,
                description: '',
                date: ''
            }
        ]);
    };

    const addReviewItem = () => {
        const items = getValues('reviews') || [];
        const newId = items.length > 0 ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1 : 1;

        setValue('reviews', [
            ...items,
            {
                id: newId,
                description: '',
                date: '',
                boxNumber: 0,
                priority: ''
            }
        ]);
    };

    const removeItem = (index: number, name: "services" | "reviews") => {
        const items = name === 'services' ? getValues('services') || [] : getValues('reviews') || [];
        setValue(name, items.filter((_, i) => i !== index));
    };

    watch('services');
    watch('reviews');

    console.log({ officeSelected });


    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-end gap-x-2">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        variant="outline">
                        Cancelar
                    </Button>
                    <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                    >
                        <IoSaveOutline />
                        {equipment?.id ? "Actualizar" : "Crear"}
                    </LoadingButton>
                </div>

                <div className="grid mb-16 gap-3 mt-5">

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">
                        <FormField
                            control={control}
                            name="tag"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Etiqueta (debe ser única)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            value={field.value === 0 ? '' : field.value}
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="companyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Empresa</FormLabel>
                                    {
                                        companies.length === 0
                                            ? (<p className="text-sm text-muted-foreground">No hay empresas disponibles</p>)
                                            : (
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Seleccionar empresa" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    companies?.map((opt) => (
                                                                        <SelectItem key={opt.id} value={opt.id || ""} className="capitalize">
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
                            control={control}
                            name="officeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Oficina</FormLabel>
                                    {
                                        offices.length === 0
                                            ? (<p className="text-sm text-muted-foreground">No hay oficinas disponibles</p>)
                                            : (
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                            const selectedOffice = offices.find(office => office.id === value);
                                                            setOfficeSelected(selectedOffice?.name || null);
                                                        }}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Seleccionar oficina" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    offices?.map((opt) => (
                                                                        <SelectItem
                                                                            key={opt.id}
                                                                            value={opt.id || ""}
                                                                            className="capitalize"
                                                                        >
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
                    </div>

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
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría</FormLabel>
                                    {
                                        categories.length === 0
                                            ? (<p className="text-sm text-muted-foreground">No hay categorías disponibles</p>)
                                            : (
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Seleccionar categoría" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    categories?.map((opt) => (
                                                                        <SelectItem key={opt.id} value={opt.id || ""} className="capitalize">
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
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">
                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ubicación</FormLabel>
                                    {
                                        !officeSelected ? (
                                            <p className="text-sm text-muted-foreground">Seleccione una oficina primero</p>
                                        ) : (
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Seleccionar ubicación" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup className="grid grid-cols-2">
                                                            {
                                                                officeSelected === 'primitivo'
                                                                    ? primitivoLocations.map((opt) => (
                                                                        <SelectItem key={opt} value={opt || ""}>
                                                                            {opt}
                                                                        </SelectItem>
                                                                    ))
                                                                    : officeSelected === 'buci'
                                                                        ? buciLocations.map((opt) => (
                                                                            <SelectItem key={opt} value={opt || ""}>
                                                                                {opt}
                                                                            </SelectItem>
                                                                        ))
                                                                    : (<SelectItem key="sinUbicacion" value="sinUbicacion">
                                                                        Sin ubicación
                                                                    </SelectItem>)
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
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentStatus.map((opt) => (
                                                            <SelectItem key={opt} value={opt || ""}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-x-1 my-3 text-primary w-full text-sm">
                        <hr className="w-full" />
                        <span className="w-full text-center">Especificaciones técnicas</span>
                        <hr className="w-full" />
                    </div>

                    {/* Specific */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">
                        <FormField
                            control={control}
                            name="os"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sistema Operativo</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar sist operativo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentOs.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="processor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Procesador</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar procesador" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentProcessors.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="ram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Memoria RAM</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar memoria RAM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentRams.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">

                        <FormField
                            control={control}
                            name="motherboard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Placa madre</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar placa madre" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentMotherboards.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="videoCard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Placa de video</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar placa de video" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentVideoCards.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="storage1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Almacenamiento 1</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar almacenamiento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentStorages.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 w-full">
                        <FormField
                            control={control}
                            name="storage2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Almacenamiento 2</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccionar almacenamiento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        validEquipmentStorages.map((opt) => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-x-1 my-3 text-yellow-500 w-full text-sm">
                        <hr className="w-full" />
                        <span className="w-full text-center">Servicio técnico</span>
                        <hr className="w-full" />
                    </div>

                    {/* Service Items */}
                    <div className="flex flex-col mb-2 w-full">
                        <div className="flex justify-end mb-2">
                            <Button
                                type="button"
                                size="sm"
                                onClick={addServiceItem}
                            >
                                <IoAddOutline />
                                Agregar servicio
                            </Button>
                        </div>

                        <ul className="flex flex-col gap-2">
                            {
                                watch("services") && watch("services").map((serviceItem, index) => (
                                    <li key={serviceItem.id} className="mb-4 p-4 border rounded-md grid md:grid-cols-12 gap-2 relative items-center justify-center fadeIn">
                                        <Badge className="absolute left-1/2 top-2 transform -translate-x-1/2" variant="secondary">
                                            Servicio n° {index + 1}
                                        </Badge>

                                        <FormField
                                            control={control}
                                            name={`services.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem className="w-full col-span-9">
                                                    <FormLabel>Descripción</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} placeholder="Colocar una descripción del servicio técnico" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`services.${index}.date`}
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
                                                                autoFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="absolute right-1 top-1 flex items-center justify-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(index, 'services')}
                                            >
                                                <IoTrashOutline color="red" />
                                            </Button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-x-1 my-3 text-rose-500 w-full text-sm">
                        <hr className="w-full" />
                        <span className="w-full text-center">Contingencias</span>
                        <hr className="w-full" />
                    </div>

                    {/* Reviews Items */}
                    <div className="flex flex-col mb-2 w-full">
                        <div className="flex justify-end mb-2">
                            <Button
                                size="sm"
                                type="button"
                                onClick={addReviewItem}
                            >
                                <IoAddOutline />
                                Agregar contingencia
                            </Button>
                        </div>

                        <ul className="flex flex-col gap-2">
                            {
                                watch("reviews") && watch("reviews").map((reviewItem, index) => (
                                    <li key={reviewItem.id} className="mb-4 p-4 border rounded-md grid md:grid-cols-12 gap-2 relative items-center justify-center fadeIn">
                                        <Badge className="absolute left-1/2 top-2 transform -translate-x-1/2" variant="secondary">
                                            Contingencia n° {index + 1}
                                        </Badge>

                                        <FormField
                                            control={control}
                                            name={`reviews.${index}.description`}
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

                                        <FormField
                                            control={control}
                                            name={`reviews.${index}.date`}
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
                                                                        format(new Date(field.value + 'T12:00:00'), "PPP")
                                                                    ) : (
                                                                        <span>Seleccionar fecha</span>
                                                                    )}
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value ? new Date(field.value + 'T12:00:00') : undefined}
                                                                onSelect={(date) => {
                                                                    if (date) {
                                                                        const year = date.getFullYear();
                                                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                                                        const day = String(date.getDate()).padStart(2, '0');
                                                                        field.onChange(`${year}-${month}-${day}`);
                                                                    } else {
                                                                        field.onChange('');
                                                                    }
                                                                }}
                                                                disabled={(date) => date < new Date()}
                                                                autoFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`reviews.${index}.boxNumber`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel>Número de box</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={control}
                                            name={`reviews.${index}.priority`}
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel>Prioridad</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="w-min">
                                                                <SelectValue placeholder="Seleccionar prioridad" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="alta">Alta</SelectItem>
                                                                    <SelectItem value="media">Media</SelectItem>
                                                                    <SelectItem value="baja">Baja</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="absolute right-1 top-1 flex items-center justify-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(index, "reviews")}
                                            >
                                                <IoTrashOutline color="red" />
                                            </Button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </form >
        </Form>
    );
};