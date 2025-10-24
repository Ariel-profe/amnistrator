import type { Metadata } from "next";
import { SignUpForm } from "../../../components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea una cuenta en AMNistrator para continuar",
};

export default function SignUp() {
  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      <SignUpForm />
    </main>
  );
}
