"use client";

import { Label, Switch, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components"
import { useSidebar, useStore } from "@/hooks";

export const DashboardTooltip = () => {

    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { settings, setSettings } = sidebar;

    return (
        <TooltipProvider>
            <div className="flex gap-6 mt-6">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is-hover-open"
                                onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                                checked={settings.isHoverOpen}
                            />
                            <Label htmlFor="is-hover-open">Abrir con cursor encima</Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Al pasar el cursor sobre la barra lateral en vista móvil, se abrirá</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="disable-sidebar"
                                onCheckedChange={(x) => setSettings({ disabled: x })}
                                checked={settings.disabled}
                            />
                            <Label htmlFor="disable-sidebar">Deshabilitar barra lateral</Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ocultar barra lateral</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
}
