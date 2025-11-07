"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOutIcon, ShieldIcon, UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button } from "@/components";
import { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface Props {
  user: User;
}

export function UserDropdown({ user }: Props) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          ) : (
            <UserIcon />
          )}
          <span className="max-w-[12rem] truncate">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="size-4" /> <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        {user.role === "admin" && <AdminItem />}
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AdminItem() {
  return (
    <DropdownMenuItem asChild>
      <Link href="/admin" className="text-blue-500">
        <ShieldIcon className="size-4 text-blue-500" /> <span>Administración</span>
      </Link>
    </DropdownMenuItem>
  );
}

function SignOutItem() {
  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || 'Error al cerrar sesión');
      return;
    } else {
      toast.success('Sesión cerrada');
      window.location.href = '/';
    }
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon className="size-4 text-destructive" /> <span className="text-destructive">Salir</span>
    </DropdownMenuItem>
  );
}
