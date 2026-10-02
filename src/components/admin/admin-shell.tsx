import Link from "next/link";

const navigation = [
  { label: "Dashboard", href: "/admin", icon: "▦" },
  { label: "Users", href: "/admin/users", icon: "◉" },
  { label: "Projects", href: "/admin/projects", icon: "◇", count: "12" },
  { label: "Applications", href: "/admin/applications", icon: "↗", count: "8" },
  { label: "Documents", href: "/admin/documents", icon: "▤" },
  { label: "Categories", href: "/admin/categories", icon: "▧" },
  { label: "Notifications", href: "/admin/notifications", icon: "◌" },
  { label: "Statistics", href: "/admin/statistics", icon: "▥" },
  { label: "Settings", href: "/admin/settings", icon: "⚙" },
];

function Brand() {
  return (
    <Link className="brand admin-brand" href="/" aria-label="AfriLaunch home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>AfriLaunch</span>
    </Link>
  );
}

function AdminNav({ activeHref }: { activeHref: string }) {
  return (
    <nav className="admin-side-nav" aria-label="Administration">
      <p className="admin-nav-label">ADMINISTRATION</p>
      {navigation.map((item) => (
        <Link key={item.label} href={item.href} className={`admin-nav-item${item.href === activeHref ? " is-active" : ""}`} aria-current={item.href === activeHref ? "page" : undefined}>
          <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
          {item.count && <span className="admin-nav-count">{item.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

export default function AdminShell({ children, currentPage, activeHref }: { children: React.ReactNode; currentPage: string; activeHref: string }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Brand />
        <AdminNav activeHref={activeHref} />
        <div className="admin-sidebar-bottom">
          <div className="admin-system-status"><span /><span>All systems operational</span></div>
          <Link className="admin-logout" href="/"><span aria-hidden="true">↪</span> Sign out</Link>
          <div className="admin-sidebar-user"><span className="avatar avatar-medium">MA</span><span><strong>Mariam Adjei</strong><small>Administrator</small></span><span aria-hidden="true">···</span></div>
        </div>
      </aside>

      <div className="admin-main-column">
        <header className="admin-topbar">
          <details className="admin-mobile-nav">
            <summary aria-label="Open admin navigation"><span /><span /><span /></summary>
            <div className="admin-mobile-nav-panel"><Brand /><AdminNav activeHref={activeHref} /><Link className="admin-logout" href="/"><span aria-hidden="true">↪</span> Sign out</Link></div>
          </details>
          <div className="admin-breadcrumb"><span>AfriLaunch</span><span aria-hidden="true">/</span><strong>{currentPage}</strong></div>
          <div className="admin-topbar-actions">
            <label className="admin-search"><span aria-hidden="true">⌕</span><input aria-label="Search admin workspace" placeholder="Search users, projects..." /></label>
            <Link className="admin-notification-button" href="/admin/notifications" aria-label="Notifications"><span aria-hidden="true">♧</span><i /></Link>
            <Link className="admin-profile-button" href="/admin/settings"><span className="avatar avatar-small">MA</span><span>Mariam</span><span aria-hidden="true">⌄</span></Link>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
