import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import { Navbar, Footer } from "@/components";

export default async function MainLayout({ children }: { children: ReactNode }) {

  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect('/sign-in');
  };

  return (
    <main>
      <Navbar user={user} />
      <div className="min-h-[calc(100vh-22.5rem)]">
        {children}
      </div>
      <Footer />
    </main>
  );
}
