
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, ContentLayout, EmailVerificationAlert, ProfileInformation } from "@/components";
import { getServerSession } from "@/lib/get-server-session";
import { unauthorized } from "next/navigation";

export default async function DashboardPage() {

  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  return (
    <ContentLayout title="Panel administrativo">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Panel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mt-10 space-y-6'>
        { !user.emailVerified && <EmailVerificationAlert />}
        <ProfileInformation user={user} />
      </div>
    </ContentLayout>
  );
}

