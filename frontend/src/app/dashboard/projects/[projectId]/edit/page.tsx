import { ProjectEditPreview } from "@/components/dashboard/project-edit-preview";
import { WorkspaceFrame } from "@/components/dashboard/profile-screen";

type EditProjectPageProps = { params: Promise<{ projectId: string }> };

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectId } = await params;
  return <WorkspaceFrame currentPage="Edit Project" activeHref="/dashboard/projects"><ProjectEditPreview projectId={projectId} /></WorkspaceFrame>;
}
