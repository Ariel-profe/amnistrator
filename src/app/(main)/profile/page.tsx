import type { Metadata } from "next";
import { ContentLayout, EmailForm, LogoutEverywhereButton, PasswordForm, ProfileDetailsForm } from "@/components";

export const metadata: Metadata = {
  title: "Perfil",
};

export default function ProfilePage() {
  // TODO: Check for authentication

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
            <ProfileDetailsForm />
          </div>
          <div className="flex-1 space-y-6">
            <EmailForm currentEmail="tu.nuevo.email@email.com" />
            <PasswordForm />
            <LogoutEverywhereButton />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
