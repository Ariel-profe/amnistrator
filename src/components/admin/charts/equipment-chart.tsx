"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

export const description = "An interactive area chart";

interface ChartDataItem {
    date: string;
    equipments: number;
}

interface Equipment {
    createdAt: string; // or Date
    // ... other equipment properties
}

interface Props {
    totalEquipments?: number;
    equipments?: Equipment[];
    title?: string;
    description?: string;
}

const chartConfig = {
    equipments: {
        label: "Equipos",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

// Generate date range from October to today
function generateDateRange(startMonth: number, startYear: number): string[] {
    const dates: string[] = [];
    const start = new Date(startYear, startMonth, 1);
    const end = new Date();
    
    const current = new Date(start);
    while (current <= end) {
        dates.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
    }
    
    return dates;
}

// Transform equipment data to chart format
function transformEquipmentsToChartData(equipments: Equipment[]): ChartDataItem[] {
    const currentYear = new Date().getFullYear();
    const dateRange = generateDateRange(10, currentYear); // november = month 10 (0-indexed)
    
    const dateCounts: Record<string, number> = {};
    
    // Initialize all dates with 0
    dateRange.forEach(date => {
        dateCounts[date] = 0;
    });

    // Count equipments per date
    equipments.forEach((equipment) => {
        const date = new Date(equipment.createdAt);
        const dateStr = date.toISOString().split('T')[0];
        
        if (dateCounts[dateStr] !== undefined) {
            dateCounts[dateStr] += 1;
        }
    });

    return Object.entries(dateCounts)
        .map(([date, count]) => ({
            date,
            equipments: count,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function EquipmentChart({
    totalEquipments,
    equipments = [],
    title = "Total de equipos",
    description = "Registrados desde octubre"
}: Props) {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("90d");

    const chartData = React.useMemo(() => 
        transformEquipmentsToChartData(equipments),
        [equipments]
    );

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const now = new Date();
        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }
        const startDate = new Date(now);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    const displayTotal = totalEquipments ?? equipments.length;

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {title}
                    <span className="text-2xl font-bold text-primary">
                        {displayTotal.toLocaleString()}
                    </span>
                </CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">{description}</span>
                    <span className="@[540px]/card:hidden">Desde octubre</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Últimos 3 meses" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Últimos 3 meses
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Últimos 30 días
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Últimos 7 días
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillEquipments" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-equipments)" stopOpacity={1.0} />
                                <stop offset="95%" stopColor="var(--color-equipments)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("es-ES", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            defaultIndex={isMobile ? -1 : 10}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("es-ES", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area dataKey="equipments" type="natural" fill="url(#fillEquipments)" stroke="var(--color-equipments)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
