"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis, LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button, ScrollArea, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, CollapseMenuButton, Badge } from "@/components";
import { cn } from "@/lib/utils";
import { getCommonMenuList } from "@/lib/sidebar-menu-list";
import { authClient } from "@/lib/auth-client";
import { IoAddOutline } from "react-icons/io5";

interface MenuProps {
  isOpen: boolean | undefined;
};

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getCommonMenuList(pathname);

  const onLogout = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || 'Error al cerrar sesión');
      return;
    } else {
      toast.success('Sesión cerrada');
      window.location.href = '/sign-in';
    }
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block overflow-hidden border-r">
      <nav className="mt-2 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href = "", label, icon: Icon, active, submenus, createHref, disabled }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <div className="w-full flex justify-center items-center relative">
                              <Button
                                variant={
                                  (active === undefined &&
                                    pathname === href) ||
                                    active
                                    ? "outline"
                                    : "ghost"
                                }
                                className="w-full justify-start h-10 mb-1"
                                asChild
                              >
                                <Link href={href}>
                                  <span
                                    className={cn(isOpen === false ? "" : "mr-1")}
                                  >
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      "max-w-[200px] truncate",
                                      isOpen === false
                                        ? "-translate-x-96 opacity-0"
                                        : "translate-x-0 opacity-100"
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                              {createHref && (
                                <Button variant="ghost" className="ml-auto p-0 w-8 h-8 absolute right-1" asChild>
                                  <Link href={createHref}>
                                    <IoAddOutline />
                                  </Link>
                                </Button>
                              )}{
                                disabled && (
                                  <Badge variant="outline" className="bg-yellow-800 absolute right-1">Pro</Badge>
                                )
                              }
                            </div>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full justify-center h-10 text-destructive"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Salir
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Salir</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}