import Link from "next/link";
import { WorkspaceFrame } from "@/components/dashboard/profile-screen";

const projects = [
  { name: "Kijani Harvest Network", category: "Agriculture", status: "Under review", statusClass: "badge-warning", updated: "Today, 9:42 AM" },
  { name: "Solar for All Initiative", category: "Clean energy", status: "Approved", statusClass: "badge-success", updated: "Yesterday" },
  { name: "Mtaa Learning Hub", category: "Education", status: "Draft", statusClass: "badge-neutral", updated: "Jun 18, 2026" },
];

export default function DashboardPage() {
  return (
    <WorkspaceFrame currentPage="Dashboard" activeHref="/dashboard">
        <div className="dashboard-welcome-row">
          <div><p className="dashboard-overline">LUNDI 22 JUIN 2026</p><h1>Bonjour, Aïcha <span aria-hidden="true">✦</span></h1><p>Voici l’activité récente de vos projets.</p></div>
          <Link className="button button-primary dashboard-create-button" href="/dashboard/projects/new"><span aria-hidden="true">＋</span> Créer un projet</Link>
        </div>

        <section className="dashboard-stat-grid" aria-label="Statistiques des projets">
          <article className="dashboard-stat-card"><div className="dashboard-stat-heading"><span>Total des projets</span><span className="dashboard-stat-icon stat-icon-blue" aria-hidden="true">◇</span></div><div className="dashboard-stat-value">08</div><p><span className="dashboard-stat-trend">+2</span> depuis le mois dernier</p><span className="dashboard-stat-spark spark-blue" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></article>
          <article className="dashboard-stat-card"><div className="dashboard-stat-heading"><span>Projets en brouillon</span><span className="dashboard-stat-icon stat-icon-gray" aria-hidden="true">▤</span></div><div className="dashboard-stat-value">02</div><p>Prêts à être complétés</p><span className="dashboard-stat-spark spark-gray" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></article>
          <article className="dashboard-stat-card"><div className="dashboard-stat-heading"><span>En cours d’examen</span><span className="dashboard-stat-icon stat-icon-orange" aria-hidden="true">◷</span></div><div className="dashboard-stat-value">01</div><p>Examen généralement sous 5 jours</p><span className="dashboard-stat-spark spark-orange" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></article>
          <article className="dashboard-stat-card"><div className="dashboard-stat-heading"><span>Projets approuvés</span><span className="dashboard-stat-icon stat-icon-green" aria-hidden="true">✓</span></div><div className="dashboard-stat-value">03</div><p><span className="dashboard-stat-trend">+1</span> ce mois-ci</p><span className="dashboard-stat-spark spark-green" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span></article>
        </section>

        <div className="dashboard-main-grid">
          <section className="dashboard-panel dashboard-projects-panel" aria-labelledby="projects-heading">
            <div className="dashboard-panel-heading"><div><h2 id="projects-heading">Projets récents</h2><p>Suivez l’avancement de vos derniers projets.</p></div><Link href="/dashboard/projects">Tout voir <span aria-hidden="true">→</span></Link></div>
            <div className="dashboard-table-scroll">
              <table className="dashboard-project-table">
                <thead><tr><th scope="col">Nom du projet</th><th scope="col">Catégorie</th><th scope="col">Statut</th><th scope="col">Dernière mise à jour</th><th scope="col"><span className="visually-hidden">Action</span></th></tr></thead>
                <tbody>{projects.map((project) => <tr key={project.name}>
                  <td data-label="Nom du projet"><span className="dashboard-project-avatar" aria-hidden="true">{project.name.slice(0, 1)}</span><span className="dashboard-project-name">{project.name}<small>Présentation du projet</small></span></td>
                  <td data-label="Catégorie">{project.category}</td>
                  <td data-label="Statut"><span className={`badge ${project.statusClass}`}>{project.status}</span></td>
                  <td data-label="Dernière mise à jour">{project.updated}</td>
                  <td data-label="Action"><Link className="dashboard-row-action" href="/dashboard/projects" aria-label={`Voir ${project.name}`}>Voir <span aria-hidden="true">↗</span></Link></td>
                </tr>)}</tbody>
              </table>
            </div>
            <Link className="dashboard-empty-link" href="/dashboard/projects/new">Vous avez une nouvelle idée ? Créez un projet <span aria-hidden="true">→</span></Link>
          </section>

          <section className="dashboard-panel dashboard-quick-panel" aria-labelledby="quick-heading">
            <div className="dashboard-panel-heading"><div><h2 id="quick-heading">Actions rapides</h2><p>Passez à la prochaine étape.</p></div></div>
            <div className="dashboard-quick-list">
              <Link href="/dashboard/projects/new"><span className="dashboard-quick-icon quick-blue" aria-hidden="true">＋</span><span><strong>Créer un projet</strong><small>Présentez votre idée à l’écosystème</small></span><span className="dashboard-quick-arrow" aria-hidden="true">→</span></Link>
              <Link href="/dashboard/profile/edit"><span className="dashboard-quick-icon quick-green" aria-hidden="true">◉</span><span><strong>Compléter votre profil</strong><small>Ajoutez votre expérience et vos compétences</small></span><span className="dashboard-quick-arrow" aria-hidden="true">→</span></Link>
              <Link href="/dashboard/documents"><span className="dashboard-quick-icon quick-orange" aria-hidden="true">▤</span><span><strong>Ajouter un document</strong><small>Gardez vos fichiers importants à portée de main</small></span><span className="dashboard-quick-arrow" aria-hidden="true">→</span></Link>
            </div>
            <div className="dashboard-profile-progress"><div><span>Profil complété</span><strong>72 %</strong></div><span className="dashboard-progress-track"><i /></span><Link href="/dashboard/profile/edit">Compléter votre profil <span aria-hidden="true">→</span></Link></div>
          </section>

          <section className="dashboard-panel dashboard-application-panel" aria-labelledby="application-heading">
            <div className="dashboard-panel-heading"><div><h2 id="application-heading">Suivi des candidatures</h2><p>Votre dernière candidature à une opportunité.</p></div><Link href="/dashboard/applications">Tout voir <span aria-hidden="true">→</span></Link></div>
            <article className="dashboard-application-card">
              <div className="dashboard-application-title"><span className="dashboard-opportunity-mark" aria-hidden="true">G</span><span><strong>Green Futures Accelerator</strong><small>Climate Innovation Fund · Ghana</small></span><span className="badge badge-warning">En examen</span></div>
              <div className="dashboard-application-progress"><div className="dashboard-application-step is-complete"><i>✓</i><span>Envoyée</span></div><span className="dashboard-application-line is-complete" /><div className="dashboard-application-step is-current"><i>2</i><span>En examen</span></div><span className="dashboard-application-line" /><div className="dashboard-application-step"><i>3</i><span>Décision</span></div></div>
              <div className="dashboard-application-foot"><span>Envoyée le 16 juin 2026</span><Link href="/dashboard/applications">Voir la candidature <span aria-hidden="true">→</span></Link></div>
            </article>
          </section>

          <section className="dashboard-panel dashboard-notifications-panel" aria-labelledby="notifications-heading">
            <div className="dashboard-panel-heading"><div><h2 id="notifications-heading">Notifications</h2><p>Restez informé de l’activité.</p></div><Link href="/dashboard/notifications">Tout voir</Link></div>
            <div className="dashboard-notification-list">
              <article><span className="dashboard-notification-icon notification-green" aria-hidden="true">✓</span><div><p><strong>Votre projet a été approuvé</strong><span>Solar for All Initiative peut maintenant être partagé.</span></p><small>Il y a 2 h</small></div></article>
              <article><span className="dashboard-notification-icon notification-blue" aria-hidden="true">↗</span><div><p><strong>Nouvelle opportunité correspondante</strong><span>3 programmes correspondent à vos centres d’intérêt.</span></p><small>Hier</small></div></article>
            </div>
            <div className="dashboard-notification-empty"><span aria-hidden="true">✓</span>Vous êtes à jour. Aucune autre notification.</div>
          </section>
        </div>
        <p className="dashboard-demo-note">Contenu illustratif pour la prévisualisation de l’interface</p>
      </WorkspaceFrame>
    );
}
