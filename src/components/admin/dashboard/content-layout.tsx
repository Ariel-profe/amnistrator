import { AdminNavbar } from "./admin-navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <AdminNavbar title={title} />
      <div className="container mx-auto px-3 mt-10 lg:mt-20">{children}</div>
    </div>
  );
}