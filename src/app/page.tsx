import dataFlowLogo from "@/assets/data-flow.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Image
            src={dataFlowLogo}
            alt="DataFlow logo"
            width={80}
            height={80}
            className="border-muted rounded-md"
          />
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          DataFlow 
        </h1>
        <p className="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
          Software de administración de datos para organizar y optimizar tu empresa, creado por{" "}
          <Link
            href="https://www.youtube.com/c/codinginflow?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            AMN Consultora Informática
          </Link>
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/dashboard">Panel de administración</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-in">Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
