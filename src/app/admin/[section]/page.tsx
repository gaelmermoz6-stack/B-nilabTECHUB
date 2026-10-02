import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";

const sections = {
  users: { title: "Users", description: "Manage the people using AfriLaunch." },
  applications: { title: "Applications", description: "Review applications submitted to the platform." },
  documents: { title: "Documents", description: "Review files shared with project submissions." },
  categories: { title: "Categories", description: "Manage the categories used to organize projects." },
  notifications: { title: "Notifications", description: "Review platform announcements and alerts." },
  statistics: { title: "Statistics", description: "Explore activity across the AfriLaunch preview." },
  settings: { title: "Settings", description: "Review administration preferences." },
  activity: { title: "Activity", description: "Review recent activity across the platform." },
} as const;

type AdminSectionPageProps = { params: Promise<{ section: string }> };

export default async function AdminSectionPage({ params }: AdminSectionPageProps) {
  const { section } = await params;
  if (!(section in sections)) notFound();
  const content = sections[section as keyof typeof sections];

  return (
    <AdminShell currentPage={content.title} activeHref={`/admin/${section}`}>
      <div className="admin-page-heading"><div><p className="dashboard-overline">ADMINISTRATION</p><h1>{content.title}</h1><p>{content.description}</p></div></div>
      <section className="admin-panel">
        <div className="empty-state"><span className="empty-state-mark" aria-hidden="true">◌</span><h2>{content.title}</h2><p>This frontend preview is ready for its next implementation phase. No data is connected here.</p><Link className="button button-outline" href="/admin">Back to overview</Link></div>
      </section>
    </AdminShell>
  );
}
