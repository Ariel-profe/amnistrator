import { AdminNavbar } from "./admin-navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <AdminNavbar title={title} />
      <section className="container mx-auto px-3 2xl:px-0 mt-10">{children}</section>
    </div>
  );
}