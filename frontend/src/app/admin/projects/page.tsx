import AdminShell from "@/components/admin/admin-shell";
import ProjectManagement from "@/components/admin/project-management";

export default function AdminProjectsPage() {
  return <AdminShell currentPage="Projects" activeHref="/admin/projects"><ProjectManagement /></AdminShell>;
}
