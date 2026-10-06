import Link from "next/link";

const adminNavigation = [
  { label: "Dashboard", href: "/admin", icon: "▦", active: true },
  { label: "Users", href: "/admin/users", icon: "◉" },
  { label: "Projects", href: "/admin/projects", icon: "◇", count: "12" },
  { label: "Applications", href: "/admin/applications", icon: "↗", count: "8" },
  { label: "Documents", href: "/admin/documents", icon: "▤" },
  { label: "Categories", href: "/admin/categories", icon: "▧" },
  { label: "Notifications", href: "/admin/notifications", icon: "◌" },
  { label: "Statistics", href: "/admin/statistics", icon: "▥" },
  { label: "Settings", href: "/admin/settings", icon: "⚙" },
];

const statistics = [
  { label: "Total users", value: "12,840", change: "+8.2%", detail: "vs. previous month", icon: "◉", tone: "blue" },
  { label: "Active users", value: "8,462", change: "+5.4%", detail: "active in last 30 days", icon: "↗", tone: "green" },
  { label: "Total projects", value: "3,216", change: "+12.8%", detail: "vs. previous month", icon: "◇", tone: "blue" },
  { label: "Awaiting review", value: "48", change: "Needs attention", detail: "oldest submitted 4 days ago", icon: "◷", tone: "orange" },
  { label: "Approved projects", value: "2,491", change: "+9.1%", detail: "this month", icon: "✓", tone: "green" },
  { label: "Rejected projects", value: "163", change: "−1.6%", detail: "vs. previous month", icon: "×", tone: "gray" },
];

const activity = [
  { initials: "JM", name: "James Mensah", action: "created a new account", target: "Entrepreneur account", time: "12 min ago", tone: "blue" },
  { initials: "AK", name: "Aïcha Koné", action: "submitted a project", target: "Kijani Harvest Network", time: "38 min ago", tone: "green" },
  { initials: "DN", name: "David Niyonzima", action: "approved a project", target: "Solar for All Initiative", time: "1 hour ago", tone: "orange" },
  { initials: "FO", name: "Fatou Ouédraogo", action: "submitted an application", target: "Women in Agritech Fund", time: "2 hours ago", tone: "violet" },
  { initials: "EO", name: "Emeka Okafor", action: "created a new account", target: "Partner account", time: "3 hours ago", tone: "gray" },
];

function Brand() {
  return (
    <Link className="brand admin-brand" href="/" aria-label="AfriLaunch home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>AfriLaunch</span>
    </Link>
  );
}

function AdminNav() {
  return (
    <nav className="admin-side-nav" aria-label="Administration">
      <p className="admin-nav-label">ADMINISTRATION</p>
      {adminNavigation.map((item) => (
        <Link key={item.label} href={item.href} className={`admin-nav-item${item.active ? " is-active" : ""}`} aria-current={item.active ? "page" : undefined}>
          <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
          {item.count && <span className="admin-nav-count">{item.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

function ProjectsChart() {
  return (
    <div className="admin-chart-wrap">
      <div className="admin-chart-summary"><strong>+18.6%</strong><span>compared to previous period</span></div>
      <svg className="admin-line-chart" viewBox="0 0 600 190" role="img" aria-label="Projects created monthly: Jan 142, Feb 168, Mar 154, Apr 212, May 238, Jun 276">
        <defs><linearGradient id="projects-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2da66f" stopOpacity=".18" /><stop offset="100%" stopColor="#2da66f" stopOpacity="0" /></linearGradient></defs>
        {[24, 63, 102, 141].map((y) => <line key={y} x1="42" x2="590" y1={y} y2={y} className="admin-chart-gridline" />)}
        <text x="4" y="27">300</text><text x="4" y="66">225</text><text x="4" y="105">150</text><text x="4" y="144">75</text>
        <path d="M48 130 C90 120 107 119 145 109 S210 113 244 88 S315 84 344 72 S417 79 445 54 S520 50 584 25 L584 144 L48 144 Z" fill="url(#projects-area)" />
        <path d="M48 130 C90 120 107 119 145 109 S210 113 244 88 S315 84 344 72 S417 79 445 54 S520 50 584 25" className="admin-chart-line" />
        {[[48,130],[145,109],[244,88],[344,72],[445,54],[584,25]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="3.5" className="admin-chart-point" />)}
        {[[48,"Jan"],[145,"Feb"],[244,"Mar"],[344,"Apr"],[445,"May"],[584,"Jun"]].map(([x, label]) => <text key={String(x)} x={Number(x)} y="169" textAnchor="middle">{label}</text>)}
      </svg>
    </div>
  );
}

function UsersChart() {
  return (
    <div className="admin-chart-wrap">
      <div className="admin-chart-summary"><strong>+11.3%</strong><span>compared to previous period</span></div>
      <svg className="admin-line-chart" viewBox="0 0 600 190" role="img" aria-label="New users monthly: Jan 820, Feb 1040, Mar 980, Apr 1380, May 1590, Jun 1840">
        {[24, 63, 102, 141].map((y) => <line key={y} x1="42" x2="590" y1={y} y2={y} className="admin-chart-gridline" />)}
        <text x="2" y="27">2,000</text><text x="7" y="66">1,500</text><text x="7" y="105">1,000</text><text x="14" y="144">500</text>
        <path d="M48 118 C87 108 110 113 145 101 S212 109 244 79 S311 88 344 69 S411 68 445 45 S521 40 584 22" className="admin-chart-line admin-chart-line-blue" />
        {[[48,118],[145,101],[244,79],[344,69],[445,45],[584,22]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="3.5" className="admin-chart-point admin-chart-point-blue" />)}
        {[[48,"Jan"],[145,"Feb"],[244,"Mar"],[344,"Apr"],[445,"May"],[584,"Jun"]].map(([x, label]) => <text key={String(x)} x={Number(x)} y="169" textAnchor="middle">{label}</text>)}
      </svg>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Brand />
        <AdminNav />
        <div className="admin-sidebar-bottom">
          <div className="admin-system-status"><span /><span>All systems operational</span></div>
          <Link className="admin-logout" href="/"><span aria-hidden="true">↪</span> Sign out</Link>
          <div className="admin-sidebar-user"><span className="avatar avatar-medium">MA</span><span><strong>Mariam Adjei</strong><small>Administrator</small></span><span aria-hidden="true">···</span></div>
        </div>
      </aside>

      <div className="admin-main-column">
        <header className="admin-topbar">
          <details className="admin-mobile-nav"><summary aria-label="Open admin navigation"><span /><span /><span /></summary><div className="admin-mobile-nav-panel"><Brand /><AdminNav /><Link className="admin-logout" href="/"><span aria-hidden="true">↪</span> Sign out</Link></div></details>
          <div className="admin-breadcrumb"><span>AfriLaunch</span><span aria-hidden="true">/</span><strong>Dashboard</strong></div>
          <div className="admin-topbar-actions">
            <label className="admin-search"><span aria-hidden="true">⌕</span><input aria-label="Search admin workspace" placeholder="Search users, projects..." /></label>
            <Link className="admin-notification-button" href="/admin/notifications" aria-label="Notifications"><span aria-hidden="true">♧</span><i /></Link>
            <Link className="admin-profile-button" href="/admin/settings"><span className="avatar avatar-small">MA</span><span>Mariam</span><span aria-hidden="true">⌄</span></Link>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-page-heading"><div><p className="dashboard-overline">MONDAY, JUNE 22, 2026</p><h1>Dashboard</h1><p>Here’s the latest across your AfriLaunch ecosystem.</p></div><label className="admin-period-select"><span aria-hidden="true">▦</span><select aria-label="Select analytics period" defaultValue="30"><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">This year</option></select></label></div>

          <section className="admin-stat-grid" aria-label="Platform statistics">
            {statistics.map((item) => <article className="admin-stat-card" key={item.label}><div className="admin-stat-top"><span>{item.label}</span><span className={`admin-stat-icon tone-${item.tone}`} aria-hidden="true">{item.icon}</span></div><strong className="admin-stat-value">{item.value}</strong><div className="admin-stat-foot"><span className={item.tone === "orange" ? "admin-stat-attention" : item.tone === "gray" ? "admin-stat-neutral" : "admin-stat-positive"}>{item.change}</span><span>{item.detail}</span></div></article>)}
          </section>

          <section className="admin-chart-grid" aria-label="Platform analytics">
            <article className="admin-panel admin-chart-panel"><div className="admin-panel-heading"><div><h2>Projects over time</h2><p>New projects submitted each month</p></div><button type="button" className="admin-chart-menu" aria-label="Project chart options">···</button></div><ProjectsChart /><div className="admin-chart-legend"><span className="legend-green" />Projects created</div></article>
            <article className="admin-panel admin-chart-panel"><div className="admin-panel-heading"><div><h2>Users over time</h2><p>New user registrations each month</p></div><button type="button" className="admin-chart-menu" aria-label="Users chart options">···</button></div><UsersChart /><div className="admin-chart-legend"><span className="legend-blue" />New users</div></article>
            <article className="admin-panel admin-category-panel"><div className="admin-panel-heading"><div><h2>Project categories</h2><p>Distribution by focus area</p></div><button type="button" className="admin-chart-menu" aria-label="Category chart options">···</button></div><div className="admin-donut-layout"><div className="admin-donut" role="img" aria-label="Project category distribution: agriculture 32%, technology 24%, energy 18%, education 15%, other 11%"><div><strong>3,216</strong><span>projects</span></div></div><ul className="admin-chart-legend-list"><li><i className="legend-swatch swatch-blue" /><span>Agriculture</span><strong>32%</strong></li><li><i className="legend-swatch swatch-green" /><span>Technology</span><strong>24%</strong></li><li><i className="legend-swatch swatch-orange" /><span>Clean energy</span><strong>18%</strong></li><li><i className="legend-swatch swatch-sky" /><span>Education</span><strong>15%</strong></li><li><i className="legend-swatch swatch-gray" /><span>Other</span><strong>11%</strong></li></ul></div></article>
            <article className="admin-panel admin-status-panel"><div className="admin-panel-heading"><div><h2>Application status</h2><p>Current application pipeline</p></div><button type="button" className="admin-chart-menu" aria-label="Application chart options">···</button></div><div className="admin-status-summary"><strong>1,482</strong><span>total applications</span><span className="badge badge-warning">8 need review</span></div><div className="admin-status-bars"><div><span><i>Under review</i><strong>428</strong></span><span className="admin-bar-track"><i className="bar-review" /></span></div><div><span><i>Approved</i><strong>796</strong></span><span className="admin-bar-track"><i className="bar-approved" /></span></div><div><span><i>Rejected</i><strong>163</strong></span><span className="admin-bar-track"><i className="bar-rejected" /></span></div><div><span><i>Withdrawn</i><strong>95</strong></span><span className="admin-bar-track"><i className="bar-withdrawn" /></span></div></div><Link className="admin-panel-link" href="/admin/applications">Review applications <span aria-hidden="true">→</span></Link></article>
          </section>

          <section className="admin-panel admin-activity-panel"><div className="admin-panel-heading"><div><h2>Recent activity</h2><p>A live view of what’s happening across the platform.</p></div><Link href="/admin/activity">View activity log <span aria-hidden="true">→</span></Link></div><div className="admin-activity-table-wrap"><table className="admin-activity-table"><thead><tr><th scope="col">Activity</th><th scope="col">Type</th><th scope="col">Related item</th><th scope="col">Time</th><th scope="col"><span className="visually-hidden">Open activity</span></th></tr></thead><tbody>{activity.map((item) => <tr key={`${item.name}-${item.action}`}><td data-label="Activity"><span className={`admin-activity-avatar activity-${item.tone}`}>{item.initials}</span><span className="admin-activity-description"><strong>{item.name}</strong><small>{item.action}</small></span></td><td data-label="Type"><span className={`admin-activity-type type-${item.tone}`}>{item.action.includes("account") ? "New user" : item.action.includes("project") && item.action.includes("approved") ? "Approval" : item.action.includes("project") ? "New project" : "Submission"}</span></td><td data-label="Related item">{item.target}</td><td data-label="Time">{item.time}</td><td data-label="Open"><Link href="/admin/activity" aria-label={`View activity from ${item.name}`}>↗</Link></td></tr>)}</tbody></table></div></section>

          <p className="admin-demo-note">Illustrative platform metrics and activity for interface preview</p>
        </main>
      </div>
    </div>
  );
}
