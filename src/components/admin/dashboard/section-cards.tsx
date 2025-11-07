import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props{
    totalEquipments: number;
    primitivoEquipments?: number;
    buciEquipments?: number;
    moldesEquipments?: number;
};

export function SectionCards({totalEquipments, primitivoEquipments, buciEquipments, moldesEquipments}: Props) {
    return (
        <div className="flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 @container/card:gap-6">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total de equipos OSAR:</CardDescription>
                    <CardTitle className="text-2xl font-semibold text-center tabular-nums @[250px]/card:text-3xl">{totalEquipments}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total de equipos Primitivo:</CardDescription>
                    <CardTitle className="text-2xl font-semibold text-center tabular-nums @[250px]/card:text-3xl">{primitivoEquipments}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total equipos BUCI:</CardDescription>
                    <CardTitle className="text-2xl font-semibold text-center tabular-nums @[250px]/card:text-3xl">{buciEquipments}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total equipos Moldes:</CardDescription>
                    <CardTitle className="text-2xl font-semibold text-center tabular-nums @[250px]/card:text-3xl">{moldesEquipments}</CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <TrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
            </Card>
        </div>
    );
}