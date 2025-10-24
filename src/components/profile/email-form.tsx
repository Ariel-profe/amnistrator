"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Card, CardContent, CardHeader, CardTitle, LoadingButton, Input} from "@/components";
import { authClient } from "@/lib/auth-client";

export const updateEmailSchema = z.object({
  newEmail: z.email({ message: "Enter a valid email" }),
});

export type UpdateEmailValues = z.infer<typeof updateEmailSchema>;

interface EmailFormProps {
  currentEmail: string;
}

export function EmailForm({ currentEmail }: EmailFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: currentEmail,
    },
  });

  async function onSubmit({newEmail}: UpdateEmailValues) {
    setStatus(null);
    setError(null);

    const {error} = await authClient.changeEmail({ 
      newEmail: newEmail,
      callbackURL: "/email-verified"
    });

    if (error) {
      setError(error.message || "Hubo un error al solicitar el cambio de email");
    } else {
      setStatus("Se ha enviado un email de verificación para el nuevo correo");
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar email</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nuevo email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nuevo@email.com"
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
            {status && (
              <div role="status" className="text-sm text-green-600">
                {status}
              </div>
            )}
            <LoadingButton type="submit" loading={loading}>
              Solicitar cambio
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
