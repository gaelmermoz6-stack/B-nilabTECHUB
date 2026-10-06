import AdminShell from "@/components/admin/admin-shell";
import ProjectReview from "@/components/admin/project-review";

export default async function AdminProjectReviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <AdminShell currentPage="Project review" activeHref="/admin/projects"><ProjectReview projectId={projectId} /></AdminShell>;
}
