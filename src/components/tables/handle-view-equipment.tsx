import { IoEyeOutline } from "react-icons/io5";
import { Equipment } from "@/generated/prisma";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Button } from "@/components";
import { format } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
    solicitado: "text-yellow-500",
    revision: "text-orange-500",
    "fuera de servicio": "text-red-500",
    alternativo: "text-blue-500",
    operativo: "text-green-500",
};

interface Props {
    equipment: (Equipment 
    & { office: { name: string } } 
    & { services: { id: number; description: string; date: string }[] } 
    & { reviews:
        {   id: number; 
            description: string; 
            date: string;
            boxNumber: number; 
            priority: string; 
          
        }[] }
    & { category: { name: string } }        
    ) | null;
};

export const HandleViewEquipment = ({ equipment }: Props) => {        
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="link">
                        <IoEyeOutline className="text-blue-700" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="uppercase">
                            {equipment?.tag} - {equipment?.name}
                        </DialogTitle>
                        <div className="grid grid-cols-2">
                            <div>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Oficina: <span className="font-normal text-slate-200">{equipment?.office?.name}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Ubicación: <span className="font-normal text-slate-200">{equipment?.location}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Categoría: <span className="font-normal text-slate-200">{equipment?.category?.name}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Estado: <span className={`font-normal ${STATUS_COLORS[equipment?.status || ""]}`}>{equipment?.status || ""}</span>
                                </DialogDescription>
                            </div>
                            <div>
                                <p className="text-xs text-blue-400">Especificaciones técnicas:</p>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Sistema operativo: <span className="font-normal text-slate-200">{equipment?.os}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Procesador: <span className="font-normal text-slate-200">{equipment?.processor}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Memoria RAM: <span className="font-normal text-slate-200">{equipment?.ram}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Placa madre: <span className="font-normal text-slate-200">{equipment?.motherboard}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Tarjeta gráfica: <span className="font-normal text-slate-200">{equipment?.videoCard}</span>
                                </DialogDescription>
                                <DialogDescription className="flex items-center gap-x-1">
                                    Almacenamiento: <span className="font-normal text-slate-200">{equipment?.storage1}</span>
                                </DialogDescription>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-4 border-t border-slate-700 max-w-sm mx-auto w-full" />

                        {/* Servicio tecnico */}
                        <DialogTitle className="text-sm mb-2 text-yellow-500">Servicio técnico:</DialogTitle>
                        {
                            equipment?.services && equipment.services.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 max-h-60 overflow-y-auto pr-2">
                                    {equipment.services.map((service) => (
                                        <li key={service.id} className="text-sm text-slate-200">
                                            <span className="text-slate-400">(Fecha: {format(new Date(service.date), 'dd/MM/yyyy')})</span>
                                            {" "}-
                                            <span> {service.description} </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-400">No hay servicios técnicos disponibles.</p>
                            )
                        }

                        {/* Divider */}
                        <div className="my-4 border-t border-slate-700 max-w-sm mx-auto w-full" />

                        {/* Contingencias */}
                        <DialogTitle className="text-sm mb-2 text-red-500">Contingencias:</DialogTitle>
                        {
                            equipment?.reviews && equipment.reviews.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1 max-h-60 overflow-y-auto pr-2">
                                    {equipment.reviews.map((review) => (
                                        <li key={review.id} className="text-sm text-slate-200">
                                            <span className="text-muted-foreground">{format(new Date(review.date), 'dd/MM/yyyy')}</span>
                                            {" "}-
                                            <span> {review.description} </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-400">No hay contingencias disponibles.</p>
                            )
                        }
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cerrar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};