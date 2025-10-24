import type { Metadata } from "next";
import { forbidden, redirect, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import { ResendVerificationButton } from "@/components";

export const metadata: Metadata = {
  title: "Verifica tu email",
  description: "Página para verificar el email del usuario"
};

export default async function VerifyEmailPage() {
  
  const session = await getServerSession();
  const user = session?.user;

  if(!user) unauthorized();
  if(user.role !== "admin") forbidden();
  if(user.emailVerified) redirect("/dashboard");



  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Verifica tu email</h1>
          <p className="text-muted-foreground">
            Se envió un correo de verificación a tu bandeja de entrada.
          </p>
        </div>
        <ResendVerificationButton email={user.email} />
      </div>
    </main>
  );
}
