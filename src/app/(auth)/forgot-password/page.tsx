import type { Metadata } from "next";
import { ForgotPasswordForm } from "../../../components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      <div className="space-y-6 w-full">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Recuperación de contraseña</h1>
          <p className="text-muted-foreground">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
