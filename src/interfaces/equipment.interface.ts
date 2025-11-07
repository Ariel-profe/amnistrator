
type Location = "sin ubicacion" | "datos" | "finanzas" | "sala de reuniones" | "administracion" | "deposito" | "rack";
type Status = "solicitado" | "revision" | "fuera de servicio" | "alternativo" | "operativo";
type Office = {name: string, id: string};

export interface IEquipment {
    id?: string;
    tag: number;
    name: string;
    slug: string;
    location: Location;
    status: Status;
    os: string;
    processor: string;
    ram: string;
    motherboard: string;
    videoCard: string;
    storage: string;
    createdAt?: Date;
    updatedAt?: Date;
    // Relations
    office: Office;
    categoryId: string;
    officeId: string;
    advice?: IAdvice[];
    reviews?: Reviews[];
};

interface IAdvice {
    id: number;
    description: string;
    date: string
    createdAt?: Date;
    updatedAt?: Date;
    // Relations
    equipmentId: string;
};

interface Reviews {
    id: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    // Relations
    equipmentId: string;
}