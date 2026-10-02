import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Avatar } from "@/components/ui/primitives";
import { Brand } from "@/components/shared/brand";

const userLinks = [
  ["/dashboard", "Vue d’ensemble", "⌂"],
  ["/dashboard/projects", "Mes projets", "▤"],
  ["/dashboard/applications", "Candidatures", "↗"],
  ["/dashboard/documents", "Documents", "▧"],
  ["/dashboard/notifications", "Notifications", "◉"],
  ["/dashboard/settings", "Paramètres", "⚙"],
];
const adminLinks = [
  ["/admin", "Vue d’ensemble", "⌂"],
  ["/admin/users", "Utilisateurs", "◎"],
  ["/admin/projects", "Projets", "▤"],
  ["/admin/applications", "Candidatures", "↗"],
  ["/admin/categories", "Catégories", "▦"],
  ["/admin/documents", "Documents", "▧"],
  ["/admin/notifications", "Notifications", "◉"],
  ["/admin/statistics", "Statistiques", "▥"],
  ["/admin/settings", "Paramètres", "⚙"],
];

export function WorkspaceShell({ children, admin = false, activePath = "" }: { children: React.ReactNode; admin?: boolean; activePath?: string }) {
  const links = admin ? adminLinks : userLinks;
  const name = admin ? "Équipe AfriLaunch" : "Aminata Koné";
  return (
    <div className="workspace">
      <aside className="workspace-sidebar">
        <div className="workspace-brand"><Brand inverse /></div>
        <p className="sidebar-caption">{admin ? "ADMINISTRATION" : "ESPACE PERSONNEL"}</p>
        <nav className="workspace-nav" aria-label="Navigation de l’espace">
          {links.map(([href, label, icon]) => <Link className={activePath === href ? "workspace-nav-link is-active" : "workspace-nav-link"} href={href} key={href}><span aria-hidden="true">{icon}</span>{label}{label === "Notifications" && !admin && <i className="nav-unread" />}</Link>)}
        </nav>
        <div className="sidebar-help"><span className="help-icon">?</span><strong>Besoin d’aide ?</strong><p>Notre équipe est là pour vous accompagner.</p><Link href="/contact">Contacter le support <span aria-hidden="true">→</span></Link></div>
      </aside>
      <div className="workspace-main">
        <header className="workspace-topbar"><div className="mobile-workspace-brand"><Brand inverse /></div><div className="workspace-topbar-actions"><button className="icon-button" aria-label="Rechercher">⌕</button><Link className="topbar-bell" href={admin ? "/admin/notifications" : "/dashboard/notifications"} aria-label="Notifications">◉<i /></Link><span className="topbar-divider" /><UserButton /><div className="topbar-user"><strong>{name}</strong><span>{admin ? "Administrateur" : "Porteuse de projet"}</span></div></div></header>
        <main className="workspace-content">{children}</main>
      </div>
    </div>
  );
}
