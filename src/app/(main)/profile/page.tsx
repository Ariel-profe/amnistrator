import type { Metadata } from "next";
import { EmailForm, LogoutEverywhereButton, PageTitle, PasswordForm, ProfileDetailsForm } from "@/components";
import { getServerSession } from "@/lib/get-server-session";
import { forbidden } from "next/navigation";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Página de perfil de usuario"
};

export default async function ProfilePage() {

  const session = await getServerSession();
  const user = session?.user;

  if (!user || user.role !== "admin") forbidden();

  return (
    <section className="container mx-auto px-3 mt-10">
      <div className="space-y-6">
        <PageTitle
          title="Perfil de usuario"
          description="Puede ver y actualizar los detalles de tu cuenta, correo electrónico y contraseña."
        />
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
    </section>
  );
}
