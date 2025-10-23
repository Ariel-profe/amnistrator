import Link from "next/link";
import { Button } from "@/components";
import { MailIcon } from "lucide-react";

export function EmailVerificationAlert() {
    return (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800/50 dark:bg-yellow-950/30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MailIcon className="size-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-yellow-800 dark:text-yellow-200">
                        Por favor, verifica tu dirección de correo electrónico para activar tu cuenta.
                    </span>
                </div>
                <Button size="sm" asChild>
                    <Link href="/verify-email">Verificar email</Link>
                </Button>
            </div>
        </div>
    );
}