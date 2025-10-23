import type { Metadata } from "next";
import { forbidden, unauthorized } from "next/navigation";
import { ContentLayout } from "@/components";
import { getServerSession } from "@/lib/get-server-session";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  
  const session = await getServerSession();
  const user = session?.user;

  if(!user) unauthorized();
  if(user.role !== "admin") forbidden();

  return (
    <ContentLayout title="Administración">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Administración</h1>
          <p className="text-muted-foreground">
            Tienes acceso de administrador.
          </p>
        </div>
      </div>
    </ContentLayout>
  );
}
