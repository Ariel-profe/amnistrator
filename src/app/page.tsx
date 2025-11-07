import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from '../lib/get-server-session';

export default async function InitialPage() {

    const session = await getServerSession();
    if (session?.user) {
        redirect('/home');
    };

    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <div className="mx-auto max-w-3xl text-center">
                <div className="flex items-center justify-center gap-4">
                    <Image
                        src="/amnistrator.png"
                        alt="AMNistrator logo"
                        width={80}
                        height={80}
                        className="border-muted rounded-md"
                    />
                </div>
                <h1 className="text-3xl font-semibold sm:text-4xl">
                    <span className="text-primary">AMN</span>istrator
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
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Link
                        href="/home"
                        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80"
                    >
                        Panel de control
                    </Link>
                    <Link
                        href="/sign-in"
                        className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </main>
    );
}
