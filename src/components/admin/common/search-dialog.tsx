"use client";
import * as React from "react";

import { LayoutDashboard, ChartBar, Gauge, ShoppingBag, Search } from "lucide-react";

import { Button, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/components";

const searchItems = [
    { group: "Dashboards", icon: LayoutDashboard, label: "Home" },
    { group: "Dashboards", icon: ChartBar, label: "Relevamientos", disabled: true },
    { group: "Dashboards", icon: Gauge, label: "Servicios", disabled: true },
    { group: "Dashboards", icon: ShoppingBag, label: "Abonos", disabled: true }
];

export function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <Button
                variant="outline"
                className="text-muted-foreground font-normal hover:no-underline"
                onClick={() => setOpen(true)}
            >
                <Search className="size-4" />
                Buscar...
                <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Buscar relevamientos, abonos y más…" />
                <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
                        <React.Fragment key={group}>
                            {i !== 0 && <CommandSeparator />}
                            <CommandGroup heading={group} key={group}>
                                {searchItems
                                    .filter((item) => item.group === group)
                                    .map((item) => (
                                        <CommandItem className="!py-1.5" key={item.label} onSelect={() => setOpen(false)}>
                                            {item.icon && <item.icon />}
                                            <span>{item.label}</span>
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </React.Fragment>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    );
}