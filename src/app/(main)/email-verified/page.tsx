import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email verificado",
  description: "Página que confirma que el email del usuario ha sido verificado exitosamente."
};

export default function EmailVerifiedPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Verificación de email</h1>
          <p className="text-muted-foreground">
            Tu email ha sido verificado exitosamente.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard">Ir al panel</Link>
        </Button>
      </div>
    </main>
  );
}
