import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-3">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - No autorizado</h1>
          <p className="text-muted-foreground">Por favor, inicie sesión para continuar.</p>
        </div>
        <div>
          <Button asChild>
            <Link href="/sign-in">Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
