
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { ContentLayout, EmailVerificationAlert, ProfileInformation, DashboardTooltip, SectionCards, EquipmentChart } from "@/components";
import { getServerSession } from "@/lib/get-server-session";
import { getTotalPayments, getTotalEquipmentsByOfficeName } from "@/actions";

export const metadata: Metadata = {
  title: "Panel administrativo",
  description: "Página del panel administrativo de usuario"
};

export default async function AdminDashboardPage() {

  const [session, totalPayments, primitivoEquipments, buciEquipments, moldesEquipments] = await Promise.all([
    getServerSession(),
    getTotalPayments(),
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
          totalPayments={totalPayments}
          primitivoEquipments={primitivoEquipments}
          buciEquipments={buciEquipments}
          moldesEquipments={moldesEquipments}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <EquipmentChart />
          <EquipmentChart />
          <EquipmentChart />
          <EquipmentChart />
        </div>
      </div>
    </ContentLayout>
  );
}

