"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/lib/password-validation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, LoadingButton, PasswordInput } from "@/components";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const signUpSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }).min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.email({ message: "Ingresa un email válido" }),
    password: passwordSchema,
    passwordConfirmation: z
      .string()
      .min(1, { message: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirmation"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  
  const [strength, setStrength] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const getStrength = (password: string) => {
    if (password.length === 0) return "";
    
    let score = 0;
    
    // Length scoring
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    
    // Character variety scoring
    if (/[a-z]/.test(password)) score++; // lowercase
    if (/[A-Z]/.test(password)) score++; // uppercase
    if (/\d/.test(password)) score++; // numbers
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) score++; // special chars
    
    // Pattern penalties
    if (/(.)\1{2,}/.test(password)) score--; // repeated characters
    if (/123|abc|qwe|asd|zxc/i.test(password)) score--; // common sequences
    
    // Determine strength based on score
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStrengthWidth = (strength: string) => {
    switch (strength) {
      case "weak":
        return "w-1/4";
      case "medium":
        return "w-2/4";
      case "strong":
        return "w-full";
      default:
        return "w-0";
    }
  };

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case "weak":
        return "Débil";
      case "medium":
        return "Media";
      case "strong":
        return "Fuerte";
      default:
        return "";
    }
  };

  async function onSubmit({ email, password, name }: SignUpValues) {
    setError(null);

    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/email-verified",
    });

    if (error) {
      setError(error.message || "Algo salió mal.");
    } else {
      toast.success("Cuenta creada exitosamente!");
      router.replace("/home");
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-md">
      <div className="flex items-center justify-center gap-2">
        <img
          src="/amnistrator.png"
          alt="Amnistrator logo"
          className="h-12 w-auto"
        />
        <p className="">
          <span className="text-amn">AMN</span>istrator
        </p>
      </div>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Crea una cuenta</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Ingresa tu información para registrarte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="********"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setStrength(getStrength(e.target.value));
                      }}
                    />
                  </FormControl>
                  {field.value && (
                    <div className="space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${getStrengthColor(
                            strength
                          )} ${getStrengthWidth(strength)}`}
                        />
                      </div>
                      <p className={`text-sm font-medium ${
                        strength === "weak" ? "text-red-600" :
                        strength === "medium" ? "text-yellow-600" :
                        strength === "strong" ? "text-green-600" : ""
                      }`}>
                        Seguridad: {getStrengthText(strength)}
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}

            <LoadingButton type="submit" className="w-full" loading={loading}>
              Crear cuenta
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t pt-4">
          <p className="text-muted-foreground text-center text-xs">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/sign-in" className="underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
