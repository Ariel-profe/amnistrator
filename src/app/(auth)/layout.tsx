import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  
  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect("/home");

  return children;
}
