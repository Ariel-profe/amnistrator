import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      {token ? (
        <ResetPasswordUI token={token} />
      ) : (
        <div role="alert" className="text-red-600">
          Token inválido.
        </div>
      )}
    </main>
  );
}

interface ResetPasswordUIProps {
  token: string;
}

function ResetPasswordUI({ token }: ResetPasswordUIProps) {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
        <p className="text-muted-foreground">Ingresa tu nueva contraseña.</p>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
