import ProjectDetail from "@/components/dashboard/project-detail";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <ProjectDetail projectId={projectId} />;
}
