import { ReactNode } from 'react'
import { Settings2, Sparkles, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components'
import Link from 'next/link'

export function ClientsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="@container container mx-auto">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Gestión de recursos de tu empresa</h2>
          <p className="mt-4 text-slate-300">Optimiza el manejo de recursos con nuestra plataforma.</p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <Card className="group shadow-zinc-950/5 hover:border-primary/50 transition">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Zap
                  className="size-6 group-hover:rotate-90 transition-transform"
                  aria-hidden
                />
              </CardDecorator>

              <h3 className="mt-2 font-medium">Relevamientos</h3>
            </CardHeader>

            <CardContent className='flex items-center justify-center gap-x-4'>
              <CardDescription className='hover:text-white'>
                <Link href="/surveys/primitivo">Primitivo</Link>
              </CardDescription>
              <CardDescription className='hover:text-white'>
                <Link href="/surveys/buci">BUCI</Link>
              </CardDescription>
              <CardDescription className='hover:text-white'>
                <Link href="/surveys/moldes">Moldes</Link>
              </CardDescription>
            </CardContent>

            <CardFooter className='mt-2 flex justify-center items-center'>
              <p className="text-sm">Relevamientos de los equipos en las diferentes sucursales.</p>
            </CardFooter>
          </Card>

          <Card className="group shadow-zinc-950/5 hover:border-primary/50 transition">
            <Link href="/payments">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Settings2
                    className="size-6 group-hover:rotate-90 transition-transform"
                    aria-hidden
                  />
                </CardDecorator>

                <h3 className="mt-6 font-medium">Abonos</h3>
              </CardHeader>

              <CardFooter className='mt-2 flex justify-center items-center'>
                <p className="mt-3 text-sm">Tener un seguimiento de los abonos mensuales.</p>
              </CardFooter>
            </Link>
          </Card>

          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3 relative">
              <div className='absolute right-2 top-0 text-xs border p-1 rounded-md bg-slate-950'>Pronto</div>
              <CardDecorator>
                <Sparkles
                  className="size-6"
                  aria-hidden
                />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Servicios</h3>
            </CardHeader>

            <CardFooter className='mt-2 flex justify-center items-center'>
              <p className="mt-3 text-sm">Servicios extras para optimizar los recursos de la empresa.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
  </div>
)