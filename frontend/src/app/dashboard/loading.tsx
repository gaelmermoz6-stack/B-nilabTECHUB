import Link from "next/link";

const placeholders = ["Vue d’ensemble", "Mon profil", "Mes projets", "Candidatures", "Documents", "Notifications", "Paramètres"];

export default function DashboardLoading() {
  return (
    <div className="dashboard-shell" aria-busy="true" aria-label="Chargement du tableau de bord">
      <aside className="dashboard-sidebar">
        <Link className="brand dashboard-brand" href="/" aria-label="AfriLaunch, accueil">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>AfriLaunch</span>
        </Link>
        <nav className="dashboard-side-nav" aria-label="Navigation principale">
          <p className="dashboard-nav-label">ESPACE PERSONNEL</p>
          {placeholders.map((label, index) => <div className={`dashboard-nav-item${index === 0 ? " is-active" : ""}`} key={label}><span className="dashboard-nav-icon dashboard-skeleton-icon" /><span>{label}</span></div>)}
        </nav>
      </aside>
      <main className="dashboard-loading-main">
        <header className="dashboard-loading-topbar"><span className="dashboard-skeleton-block" /><span className="dashboard-skeleton-block dashboard-skeleton-short" /></header>
        <div className="dashboard-loading-content">
          <p className="dashboard-overline">VOTRE ESPACE</p>
          <div className="dashboard-skeleton-block dashboard-skeleton-title" />
          <div className="dashboard-skeleton-block dashboard-skeleton-subtitle" />
          <div className="dashboard-loading-stats">{[1, 2, 3, 4].map((item) => <div className="dashboard-panel dashboard-loading-stat" key={item}><span className="dashboard-skeleton-block dashboard-skeleton-label" /><span className="dashboard-skeleton-block dashboard-skeleton-number" /><span className="dashboard-skeleton-block dashboard-skeleton-foot" /></div>)}</div>
          <div className="dashboard-panel dashboard-loading-table"><span className="dashboard-skeleton-block dashboard-skeleton-title-small" />{[1, 2, 3].map((item) => <span className="dashboard-skeleton-block dashboard-skeleton-row" key={item} />)}</div>
          <p className="dashboard-loading-status"><span className="dashboard-loading-spinner" aria-hidden="true" /> Chargement de votre espace…</p>
        </div>
      </main>
    </div>
  );
}
