"use server"

import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { getServerSession } from "@/lib/get-server-session";
import { ModeToggle, SheetMenu, UserDropdown, SearchDialog, Button, AdminBreadcrumb, CreateButton } from "@/components";

interface NavbarProps {
  title: string;
};

export async function AdminNavbar({ title }: NavbarProps) {

  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="sticky top-0 z-10 w-full shadow backdrop-blur border-b border-slate-900">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <AdminBreadcrumb title={title} />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {
            user.role === 'admin' && (
              <CreateButton title="Crear equipo" href="/admin/surveys/equipment/new" />
            )
          }
          <SearchDialog />
          <ModeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}