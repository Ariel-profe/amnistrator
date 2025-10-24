import { Metadata } from "next";
import AdminPanelLayout from "@/components/admin/dashboard/admin-panel-layout";
import { getServerSession } from "@/lib/get-server-session";
import { forbidden } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const session = await getServerSession();
  const user = session?.user;

  return (
    <div className="flex min-h-screen flex-col">
      <AdminPanelLayout>
        {children}
      </AdminPanelLayout>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};
