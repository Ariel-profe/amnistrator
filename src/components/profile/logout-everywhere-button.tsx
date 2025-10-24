"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function LogoutEverywhereButton() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogoutEverywhere() {
    setLoading(true);
    const {error} = await authClient.revokeSessions();

    setLoading(false);

    if (error) {
      toast.error(error.message || "Error al cerrar sesión en todos los dispositivos.");
    }else {
      toast.success("Has cerrado sesión en todos los dispositivos.");
      router.replace("/sign-in");
    }
  }

  return (
    <LoadingButton
      variant="destructive"
      onClick={handleLogoutEverywhere}
      loading={loading}
      className="w-full"
    >
      Cerrar sesión en dispositivos
    </LoadingButton>
  );
}
