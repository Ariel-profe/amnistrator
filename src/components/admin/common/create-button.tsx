import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { Button } from "@/components";

export const CreateButton = ({ title = "", href, size = "sm" }: { title?: string, href: string, size?: "sm" | "icon-sm" }) => {
    return (
        <Button size={size} asChild>
            <Link href={href}>
                <IoAddOutline size={18} />
                {title}
            </Link>
        </Button>
    )
}
