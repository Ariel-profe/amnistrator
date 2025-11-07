
import { useForm } from "react-hook-form";
import z from "zod";
import { IoAddOutline } from "react-icons/io5";
import { format } from "date-fns";
import { Dialog, DialogClose, DialogContent, Popover, PopoverTrigger, PopoverContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button, Calendar, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Textarea, Form, LoadingButton } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdateReview } from '@/actions';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
    equipmentId: string;
};

const reviewSchema = z.object({
    description: z.string().min(1, "La descripción es requerida"),
    date: z.string().min(1, "La fecha es requerida"),
    boxNumber: z.number().min(0, "El número de box debe ser mayor o igual a 0").optional(),
    priority: z.string().min(1, "La prioridad es requerida")
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export const HandleAddReviews = ({ equipmentId }: Props) => {

    const router = useRouter();
    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            description: "",
            date: new Date().toISOString().split('T')[0],
            boxNumber: 0,
            priority: ""
        }
    });

    const onSubmit = async (data: ReviewFormValues) => {

        const formData = new FormData();

        formData.append("equipmentId", equipmentId);
        formData.append("description", data.description);
        formData.append("date", data.date);
        formData.append("boxNumber", data.boxNumber?.toString() || "0");
        formData.append("priority", data.priority);

        const { ok, message } = await createUpdateReview(formData);

        if (!ok) {
            toast.error(message);
            return;
        }

        toast.success(message);
        form.reset();
        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="">
                    <IoAddOutline />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <DialogHeader>
                            <DialogTitle>Agregar contingencia</DialogTitle>
                        </DialogHeader>

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
                            control={form.control}
                            name="boxNumber"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Número de box</FormLabel>
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
                            name="priority"
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

                        <DialogFooter className="flex gap-2">
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