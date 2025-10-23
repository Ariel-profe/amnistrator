"use client"

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, UserAvatar } from "@/components";
import { UserIcon, ShieldIcon, CalendarDaysIcon } from "lucide-react";
import { format } from "date-fns";
import { User } from "@/lib/auth";

interface Props {
    user: User;
};

const ROLE_COLORS: Record<string, string> = {
    admin: "bg-amber-400",
    operator: "bg-blue-400",
    user: "bg-green-400",
};

const ROLE_DICTIONARY: Record<string, string> = {
    admin: "Administrador",
    operator: "Operador",
    user: "Usuario",
};

export const ProfileInformation = ({ user }: Props) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UserIcon className="size-5" />
                    Profile Information
                </CardTitle>
                <CardDescription>
                    Your account details and current status
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex flex-col items-center gap-3">
                        <UserAvatar
                            name={user.name}
                            image={user.image}
                            className="size-32 sm:size-24"
                        />
                        {user.role && (
                            <Badge className={ROLE_COLORS[user.role]}>
                                <ShieldIcon className="size-3" />
                                {ROLE_DICTIONARY[user.role]}
                            </Badge>
                        )}
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-2xl font-semibold">{user.name}</h3>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                <CalendarDaysIcon className="size-4" />
                                Member Since
                            </div>
                            <p className="font-medium">
                                {format(user.createdAt, "MMMM d, yyyy")}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}