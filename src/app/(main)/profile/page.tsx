import type { Metadata } from "next";
import { ContentLayout, EmailForm, LogoutEverywhereButton, PasswordForm, ProfileDetailsForm } from "@/components";
import { getServerSession } from "@/lib/get-server-session";
import { forbidden, unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Página de perfil de usuario"
};

export default async function ProfilePage() {
  
  const session = await getServerSession();
  const user = session?.user;

  if(!user) unauthorized();
  if(user.role !== "admin") forbidden();

  return (
    <ContentLayout title="Perfil">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Perfil de usuario</h1>
          <p className="text-muted-foreground">
            Puede ver y actualizar los detalles de tu cuenta, correo electrónico y contraseña.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <ProfileDetailsForm user={user} />
          </div>
          <div className="flex-1 space-y-6">
            <EmailForm currentEmail={user.email} />
            <PasswordForm />
            <LogoutEverywhereButton />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
