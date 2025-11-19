"use client";

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  alternativo: {
    label: "Alternativo",
    color: "blue",
  },
  fuera_de_servicio: {
    label: "Fuera de servicio",
    color: "red",
  },
  operativo: {
    label: "Operativo",
    color: "green",
  },
  revision: {
    label: "Revisión",
    color: "orange",
  },
  solicitado: {
    label: "Solicitado",
    color: "yellow",
  },
} satisfies ChartConfig;

interface Props {
  equipmentsByStatus: { status: string }[];
};

export function StatusPieChart({ equipmentsByStatus }: Props) { 

  const statusCounts = equipmentsByStatus.reduce((acc, equipment) => {
    acc[equipment.status] = (acc[equipment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([status, quantity]) => ({
    status: status.toLowerCase().replace(/\s+/g, '_'),
    quantity,
    fill: `var(--color-${status.toLowerCase().replace(/\s+/g, '_')})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Estado de los equipos</CardTitle>
        <CardDescription>Agosto - Diciembre 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-white mx-auto aspect-square max-h-[250px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="quantity" hideLabel />}
            />
            <Pie data={chartData} dataKey="quantity">
              <LabelList
                dataKey="status"
                className="fill-background font-semibold"
                stroke="none"
                position="outside"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
