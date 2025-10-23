import { AdminSidebar } from "@/components";

import { cn } from "@/lib/utils";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
 
  return (
    <>
      <AdminSidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300 lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}