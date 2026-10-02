import ProjectWizard from "@/components/dashboard/project-wizard";
import { WorkspaceFrame } from "@/components/dashboard/profile-screen";

export default function CreateProjectPage() {
  return <WorkspaceFrame currentPage="Create Project" activeHref="/dashboard/projects"><ProjectWizard /></WorkspaceFrame>;
}
