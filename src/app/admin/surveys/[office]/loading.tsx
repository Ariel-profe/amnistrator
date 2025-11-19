import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <section className="mx-auto w-full px-4 h-screen flex items-center justify-center">
      <div className="animate-spin space-y-6">
        <Loader2 className="mx-auto h-10 w-10 text-primary" />
      </div>
    </section>
  );
}