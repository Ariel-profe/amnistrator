"use client";

import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";

interface ResendVerificationButtonProps {
  email: string;
}

export function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resendVerificationEmail() {
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    const {error} = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/email-verified"
    })

    setIsLoading(false);

    if(error){
      setError(error.message || "Error al reenviar el correo de verificación. Intenta nuevamente.");
    } else {
      setSuccess("Correo de verificación reenviado exitosamente.");
    }
  };

  return (
    <div className="space-y-4">
      {success && (
        <div role="status" className="text-sm text-green-600">
          {success}
        </div>
      )}
      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <LoadingButton
        onClick={resendVerificationEmail}
        className="w-full"
        loading={isLoading}
      >
        Reenviar correo de verificación
      </LoadingButton>
    </div>
  );
}
