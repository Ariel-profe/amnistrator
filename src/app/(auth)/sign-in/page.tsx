import type { Metadata } from "next";
import { SignInForm } from "@/components";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión en AMNistrator para continuar",
};

export default function SignIn() {
  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      <SignInForm />
    </main>
  );
}
