import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkspaceFrame } from "@/components/dashboard/profile-screen";

const sections = {
  projects: { title: "My Projects", heading: "Mes projets", description: "Retrouvez les projets associés à votre espace." },
  applications: { title: "Applications", heading: "Mes candidatures", description: "Suivez les opportunités auxquelles vous avez postulé." },
  documents: { title: "Documents", heading: "Mes documents", description: "Les documents partagés dans votre espace apparaîtront ici." },
  notifications: { title: "Notifications", heading: "Notifications", description: "Retrouvez ici les actualités de vos projets et candidatures." },
  settings: { title: "Settings", heading: "Paramètres", description: "Les préférences de votre espace seront disponibles ici." },
} as const;

const projects = [
  { id: "kijani-harvest", name: "Kijani Harvest Network", category: "Agriculture", status: "En examen", statusClass: "badge-warning" },
  { id: "solar-for-all", name: "Solar for All Initiative", category: "Énergie propre", status: "Approuvé", statusClass: "badge-success" },
  { id: "mtaa-learning", name: "Mtaa Learning Hub", category: "Éducation", status: "Brouillon", statusClass: "badge-neutral" },
];

type SectionPageProps = { params: Promise<{ section: string }> };

export default async function DashboardSectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  if (!(section in sections)) notFound();
  const content = sections[section as keyof typeof sections];

  return (
    <WorkspaceFrame currentPage={content.title} activeHref={`/dashboard/${section}`}>
      <div className="dashboard-welcome-row">
        <div><p className="dashboard-overline">VOTRE ESPACE</p><h1>{content.heading}</h1><p>{content.description}</p></div>
        {section === "projects" && <Link className="button button-primary" href="/dashboard/projects/new">Créer un projet <span aria-hidden="true">＋</span></Link>}
      </div>
      {section === "projects" ? (
        <section className="dashboard-panel dashboard-projects-panel" aria-label="Liste des projets">
          <div className="dashboard-table-scroll"><table className="dashboard-project-table"><thead><tr><th scope="col">Projet</th><th scope="col">Catégorie</th><th scope="col">Statut</th><th scope="col">Détails</th></tr></thead><tbody>{projects.map((project) => <tr key={project.id}><td data-label="Projet"><span className="dashboard-project-avatar" aria-hidden="true">{project.name.slice(0, 1)}</span><span className="dashboard-project-name">{project.name}</span></td><td data-label="Catégorie">{project.category}</td><td data-label="Statut"><span className={`badge ${project.statusClass}`}>{project.status}</span></td><td data-label="Détails"><Link className="dashboard-row-action" href={`/dashboard/projects/${project.id}`}>Ouvrir <span aria-hidden="true">↗</span></Link></td></tr>)}</tbody></table></div>
        </section>
      ) : (
        <section className="dashboard-panel"><div className="empty-state"><span className="empty-state-mark" aria-hidden="true">◌</span><h2>{content.heading}</h2><p>Cette interface est prête pour la suite du frontend. Aucune donnée n’est connectée dans cet aperçu.</p>{section === "applications" && <Link className="button button-outline" href="/opportunities">Découvrir les opportunités</Link>}</div></section>
      )}
    </WorkspaceFrame>
  );
}
