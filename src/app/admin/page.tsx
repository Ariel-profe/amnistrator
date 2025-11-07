
import type { Metadata } from "next";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, ContentLayout, EmailVerificationAlert, ProfileInformation, GlobalAnalyticsChart, DashboardTooltip } from "@/components";
import { getServerSession } from "@/lib/get-server-session";
import { SectionCards } from "@/components/admin/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/admin/dashboard/chart-area-interactive";
import { getTotalEquipments, getTotalEquipmentsByOfficeName } from "@/actions";

export const metadata: Metadata = {
  title: "Panel administrativo",
  description: "Página del panel administrativo de usuario"
};

export default async function AdminDashboardPage() {

  const [session, totalEquipments, primitivoEquipments, buciEquipments, moldesEquipments] = await Promise.all([
    getServerSession(),
    getTotalEquipments(),
    getTotalEquipmentsByOfficeName('primitivo'),
    getTotalEquipmentsByOfficeName('buci'),
    getTotalEquipmentsByOfficeName('moldes'),
  ]);
  
  const user = session?.user;

  if (!user) unauthorized();

  return (
    <ContentLayout title="Panel general">
      <DashboardTooltip />

      <div className='mt-10 space-y-6'>
        {!user.emailVerified && <EmailVerificationAlert />}
        <ProfileInformation user={user} />
        <SectionCards 
          totalEquipments={totalEquipments}
          primitivoEquipments={primitivoEquipments}
          buciEquipments={buciEquipments}
          moldesEquipments={moldesEquipments}
        />
        <ChartAreaInteractive />
      </div>
    </ContentLayout>
  );
}

