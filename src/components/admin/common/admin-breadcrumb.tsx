import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components";
import { IoHomeOutline } from "react-icons/io5";

interface AdminBreadcrumbProps {
    title: string;
};

let previousPage: string | null = null;

export const AdminBreadcrumb = ({title }: AdminBreadcrumbProps) => {

    switch (title) {
        case 'primitivo':
        case 'buci':
        case 'moldes':
            previousPage = 'Relevamientos'; 
            break;    
        default:
            previousPage = null;
            break;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/admin'><IoHomeOutline /></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{previousPage}</BreadcrumbPage>
                </BreadcrumbItem>
                {previousPage && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize" >{title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}