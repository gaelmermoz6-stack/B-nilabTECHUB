import Link from "next/link";
import { PublicPageFrame } from "@/components/shared/public-page-frame";

const projects = [
  { category: "AgriTech", title: "Cultiver mieux, ensemble", location: "Kumasi, Ghana", description: "Un réseau de producteurs qui rend les récoltes locales plus accessibles aux marchés urbains.", status: "Partenaires recherchés", image: "project-image-agri" },
  { category: "Énergie propre", title: "L’énergie au plus près", location: "Kigali, Rwanda", description: "Des solutions solaires abordables pour les petites entreprises et les communautés rurales.", status: "En développement", image: "project-image-energy" },
  { category: "Éducation", title: "Apprendre sans frontières", location: "Abidjan, Côte d’Ivoire", description: "Des outils numériques conçus pour ouvrir de nouvelles perspectives aux jeunes talents.", status: "Ouvert aux collaborations", image: "project-image-education" },
];

export default function ProjectsPage() {
  return (
    <PublicPageFrame>
      <section className="landing-section landing-projects"><div className="landing-container">
        <div className="landing-section-heading"><p className="landing-section-kicker">PROJETS AFRILAUNCH</p><h1>Des idées déjà en mouvement.</h1><p>Découvrez des initiatives qui font grandir leurs communautés.</p></div>
        <div className="landing-project-grid">{projects.map((project) => <article className="landing-project-card" key={project.title}><div className={`landing-project-image ${project.image}`} aria-hidden="true"><span className="landing-project-category">{project.category}</span></div><div className="landing-project-content"><p className="landing-project-location">{project.location}</p><h2>{project.title}</h2><p className="landing-project-description">{project.description}</p><div className="landing-project-footer"><span className="badge badge-success">{project.status}</span><Link href="/register" aria-label={`Rejoindre AfriLaunch pour découvrir ${project.title}`}>Découvrir <span aria-hidden="true">→</span></Link></div></div></article>)}</div>
      </div></section>
    </PublicPageFrame>
  );
}
