"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton, PasswordInput } from "@/components";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.email({ message: "Ingresa un email válido" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
  rememberMe: z.boolean().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit({ email, password, rememberMe }: SignInValues) {
    setError(null);
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Algo salió mal.");
    } else {
      toast.success("Sesión iniciada exitosamente!");
      router.replace(redirect ?? "/home");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="flex items-center justify-center gap-2">
        <img
          src="/amnistrator.png"
          alt="Amnistrator logo"
          className="h-12 w-auto"
        />
        <p className="">
          <span className="text-primary">AMN</span>istrator
        </p>
      </div>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Iniciar sesión</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Ingresa tu email para iniciar sesión en tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Contraseña</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      autoComplete="current-password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Recordarme</FormLabel>
                </FormItem>
              )}
            />

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error.includes("Invalid")
                  ? "Email o contraseña incorrectos."
                  : error.includes("not verified")
                    ? "Email no verificado. Habla con el administrador."
                    : error}
              </div>
            )}

            <LoadingButton type="submit" className="w-full" loading={loading}>
              Iniciar sesión
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t pt-4">
          <p className="text-muted-foreground text-center text-xs">
            ¿No tienes una cuenta?{" "}
            <Link href="/sign-up" className="underline">
              Regístrate
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
