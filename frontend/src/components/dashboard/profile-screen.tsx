import Link from "next/link";

type ProfileMode = "view" | "edit";

const sections = [
  { label: "Dashboard", icon: "▦", href: "/dashboard" },
  { label: "My Profile", icon: "◉", href: "/dashboard/profile", active: true },
  { label: "My Projects", icon: "◇", href: "/dashboard/projects" },
  { label: "Applications", icon: "↗", href: "/dashboard/applications", count: "2" },
  { label: "Documents", icon: "▤", href: "/dashboard/documents" },
  { label: "Notifications", icon: "◌", href: "/dashboard/notifications", count: "3" },
  { label: "Settings", icon: "⚙", href: "/dashboard/settings" },
];

function Brand() {
  return (
    <Link className="brand dashboard-brand" href="/" aria-label="AfriLaunch home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>AfriLaunch</span>
    </Link>
  );
}

function SidebarNavigation({ activeHref = "/dashboard/profile" }: { activeHref?: string }) {
  return (
    <nav className="dashboard-side-nav" aria-label="Main navigation">
      <p className="dashboard-nav-label">WORKSPACE</p>
      {sections.map((item) => (
        <Link key={item.label} href={item.href} className={`dashboard-nav-item${item.href === activeHref ? " is-active" : ""}`} aria-current={item.href === activeHref ? "page" : undefined}>
          <span className="dashboard-nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
          {item.count && <span className="dashboard-nav-count">{item.count}</span>}
        </Link>
      ))}
    </nav>
  );
}

export function WorkspaceFrame({ children, currentPage = "My Profile", activeHref = "/dashboard/profile" }: { children: React.ReactNode; currentPage?: string; activeHref?: string }) {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Brand />
        <SidebarNavigation activeHref={activeHref} />
        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-plan-note"><span className="dashboard-plan-mark" aria-hidden="true">↗</span><strong>Keep your project moving</strong><span>Explore opportunities matched to your goals.</span><Link href="/projects">Explore opportunities <span aria-hidden="true">→</span></Link></div>
          <Link className="dashboard-logout" href="/"><span aria-hidden="true">↪</span> Log out</Link>
          <div className="dashboard-sidebar-user"><span className="avatar avatar-medium">AK</span><span><strong>Aïcha Koné</strong><small>Project founder</small></span><span className="dashboard-user-menu" aria-hidden="true">···</span></div>
        </div>
      </aside>
      <div className="dashboard-main-column">
        <header className="dashboard-topbar">
          <details className="dashboard-mobile-nav">
            <summary aria-label="Open dashboard navigation"><span /><span /><span /></summary>
            <div className="dashboard-mobile-nav-panel"><Brand /><SidebarNavigation activeHref={activeHref} /><Link className="dashboard-logout" href="/"><span aria-hidden="true">↪</span> Log out</Link></div>
          </details>
          <div className="dashboard-breadcrumb"><Link href="/dashboard">Workspace</Link><span aria-hidden="true">/</span><strong>{currentPage}</strong></div>
          <div className="dashboard-topbar-actions">
            <label className="dashboard-search"><span aria-hidden="true">⌕</span><input aria-label="Search your workspace" placeholder="Search anything..." /></label>
            <Link className="dashboard-top-icon" href="/dashboard/notifications" aria-label="Notifications"><span aria-hidden="true">♧</span><i /></Link>
            <Link className="dashboard-top-profile" href="/dashboard/profile"><span className="avatar avatar-small">AK</span><span>Aïcha</span><span aria-hidden="true">⌄</span></Link>
          </div>
        </header>
        <main className="dashboard-content profile-content">{children}</main>
      </div>
    </div>
  );
}

function ProfileHeader({ mode }: { mode: ProfileMode }) {
  return (
    <>
      <div className="profile-page-heading">
        <div><p className="dashboard-overline">YOUR WORKSPACE</p><h1>{mode === "view" ? "My profile" : "Edit profile"}</h1><p>{mode === "view" ? "Your professional identity, all in one place." : "Keep your information clear and up to date."}</p></div>
        <Link className="button button-outline profile-cancel" href="/dashboard/profile">Cancel</Link>
      </div>
      <section className="dashboard-panel profile-hero" aria-label="Profile summary">
        <div className="profile-avatar" aria-label="Aïcha Koné">AK</div>
        <div className="profile-identity"><span className="badge badge-success">PROFILE COMPLETE · 72%</span><h2>Aïcha Koné</h2><p>Founder &amp; CEO <span aria-hidden="true">·</span> Kijani Harvest Network</p><div className="profile-location"><span aria-hidden="true">⌖</span> Accra, Ghana</div></div>
        <div className="profile-hero-action"><div className="profile-completion"><span>Profile strength</span><strong>72%</strong><span className="dashboard-progress-track"><i /></span><small>A few details will help partners find you.</small></div>{mode === "view" && <Link className="button button-primary" href="/dashboard/profile/edit">Edit profile <span aria-hidden="true">↗</span></Link>}</div>
      </section>
    </>
  );
}

function ProfileSection({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return <section className={`dashboard-panel profile-section ${className}`}><div className="profile-section-heading"><h2>{title}</h2></div><div className="profile-section-body">{children}</div></section>;
}

function ProfileDetails() {
  return (
    <div className="profile-sections-grid">
      <ProfileSection title="Personal information">
        <div className="profile-detail-grid"><div><span>Full name</span><strong>Aïcha Koné</strong></div><div><span>Preferred name</span><strong>Aïcha</strong></div><div><span>Pronouns</span><strong>She / her</strong></div><div><span>Date of birth</span><strong>Not provided</strong></div></div>
      </ProfileSection>
      <ProfileSection title="Contact information">
        <div className="profile-detail-grid"><div><span>Email address</span><strong>aicha.kone@example.com <em className="profile-verified">Verified</em></strong></div><div><span>Phone number</span><strong>+233 24 555 0184</strong></div><div><span>Website</span><strong>kijaniharvest.org</strong></div><div><span>Location</span><strong>Accra, Ghana</strong></div></div>
      </ProfileSection>
      <ProfileSection title="Professional information">
        <div className="profile-detail-grid"><div><span>Current role</span><strong>Founder &amp; CEO</strong></div><div><span>Organization</span><strong>Kijani Harvest Network</strong></div><div><span>Experience</span><strong>5–8 years</strong></div><div><span>Industry</span><strong>Agriculture &amp; food systems</strong></div></div>
      </ProfileSection>
      <ProfileSection title="Skills">
        <div className="profile-skill-list"><span>Social entrepreneurship</span><span>Agribusiness</span><span>Partnership development</span><span>Community building</span><span>Project management</span></div>
      </ProfileSection>
      <ProfileSection title="Biography" className="profile-biography-section">
        <p className="profile-biography">I’m building practical connections between smallholder farmers and growing urban markets. At Kijani Harvest Network, our team works with local communities to strengthen food systems, create fairer routes to market and help independent producers grow sustainably.</p>
      </ProfileSection>
      <ProfileSection title="Documents">
        <div className="profile-document-list">
          <article><span className="profile-document-icon" aria-hidden="true">PDF</span><span><strong>Company overview</strong><small>PDF · 2.4 MB · Added Jun 12, 2026</small></span><Link href="/dashboard/documents" aria-label="View company overview document">↗</Link></article>
          <article><span className="profile-document-icon profile-document-green" aria-hidden="true">PDF</span><span><strong>Founder biography</strong><small>PDF · 860 KB · Added May 28, 2026</small></span><Link href="/dashboard/documents" aria-label="View founder biography document">↗</Link></article>
        </div>
      </ProfileSection>
      <ProfileSection title="Account information" className="profile-account-section">
        <div className="profile-detail-grid"><div><span>Account type</span><strong>Entrepreneur</strong></div><div><span>Member since</span><strong>March 2025</strong></div><div><span>Email status</span><strong><em className="profile-verified">Verified</em></strong></div><div><span>Profile visibility</span><strong>Visible to partners</strong></div></div>
      </ProfileSection>
    </div>
  );
}

function ProfileEditForm() {
  return (
    <form className="profile-edit-form">
      <ProfileSection title="Personal information">
        <div className="profile-form-grid"><label className="profile-field"><span>First name <i>*</i></span><input defaultValue="Aïcha" required autoComplete="given-name" /></label><label className="profile-field"><span>Last name <i>*</i></span><input defaultValue="Koné" required autoComplete="family-name" /></label><label className="profile-field"><span>Preferred name</span><input defaultValue="Aïcha" autoComplete="nickname" /></label><label className="profile-field"><span>Pronouns</span><select defaultValue="she-her"><option value="she-her">She / her</option><option value="he-him">He / him</option><option value="they-them">They / them</option><option value="none">Prefer not to say</option></select></label></div>
      </ProfileSection>
      <ProfileSection title="Contact information">
        <div className="profile-form-grid"><label className="profile-field"><span>Email address <i>*</i></span><input type="email" defaultValue="aicha.kone@example.com" required autoComplete="email" /><small>Used for account updates and important notifications.</small></label><label className="profile-field"><span>Phone number <i>*</i></span><input type="tel" defaultValue="+233 24 555 0184" required autoComplete="tel" /><small>Include your country code.</small></label><label className="profile-field"><span>City</span><input defaultValue="Accra" autoComplete="address-level2" /></label><label className="profile-field"><span>Country</span><select defaultValue="ghana"><option value="ghana">Ghana</option><option value="kenya">Kenya</option><option value="nigeria">Nigeria</option><option value="rwanda">Rwanda</option><option value="other">Other</option></select></label><label className="profile-field profile-field-wide"><span>Website</span><input defaultValue="kijaniharvest.org" aria-invalid="true" aria-describedby="website-error" /><small id="website-error" className="profile-field-error">Add https:// to make this a valid web address.</small></label></div>
      </ProfileSection>
      <ProfileSection title="Professional information">
        <div className="profile-form-grid"><label className="profile-field"><span>Current role <i>*</i></span><input defaultValue="Founder & CEO" required /></label><label className="profile-field"><span>Organization</span><input defaultValue="Kijani Harvest Network" /></label><label className="profile-field"><span>Experience</span><select defaultValue="5-8"><option value="0-2">0–2 years</option><option value="3-4">3–4 years</option><option value="5-8">5–8 years</option><option value="9+">9+ years</option></select></label><label className="profile-field"><span>Industry</span><select defaultValue="agriculture"><option value="agriculture">Agriculture &amp; food systems</option><option value="energy">Clean energy</option><option value="education">Education</option><option value="health">Health</option><option value="technology">Technology</option></select></label></div>
      </ProfileSection>
      <ProfileSection title="Skills">
        <label className="profile-field"><span>Skills and expertise</span><input defaultValue="Social entrepreneurship, Agribusiness, Partnership development, Community building, Project management" /><small>Separate each skill with a comma.</small></label>
      </ProfileSection>
      <ProfileSection title="Biography">
        <label className="profile-field"><span>About you</span><textarea defaultValue="I’m building practical connections between smallholder farmers and growing urban markets. At Kijani Harvest Network, our team works with local communities to strengthen food systems, create fairer routes to market and help independent producers grow sustainably." rows={5} /><small>Share your experience, focus and what you hope to achieve.</small></label>
      </ProfileSection>
      <ProfileSection title="Documents">
        <div className="profile-document-list profile-edit-documents"><article><span className="profile-document-icon" aria-hidden="true">PDF</span><span><strong>Company overview</strong><small>PDF · 2.4 MB</small></span><button type="button" aria-label="Remove company overview">Remove</button></article><article><span className="profile-document-icon profile-document-green" aria-hidden="true">PDF</span><span><strong>Founder biography</strong><small>PDF · 860 KB</small></span><button type="button" aria-label="Remove founder biography">Remove</button></article></div>
        <button className="profile-add-document" type="button"><span aria-hidden="true">＋</span> Add a document</button>
      </ProfileSection>
      <ProfileSection title="Account information" className="profile-account-section">
        <div className="profile-detail-grid"><div><span>Account type</span><strong>Entrepreneur</strong></div><div><span>Member since</span><strong>March 2025</strong></div><div><span>Email status</span><strong><em className="profile-verified">Verified</em></strong></div><div><span>Profile visibility</span><strong>Visible to partners</strong></div></div>
      </ProfileSection>
      <div className="profile-form-actions"><p><span aria-hidden="true">i</span> Required fields are marked with an asterisk.</p><div><Link className="button button-outline" href="/dashboard/profile">Cancel</Link><button className="button button-primary" type="button">Save changes</button></div></div>
    </form>
  );
}

export default function ProfileScreen({ mode }: { mode: ProfileMode }) {
  return (
    <WorkspaceFrame currentPage={mode === "view" ? "My Profile" : "Edit profile"}>
      <ProfileHeader mode={mode} />
      {mode === "view" ? <ProfileDetails /> : <ProfileEditForm />}
      <p className="dashboard-demo-note">Sample profile content for preview</p>
    </WorkspaceFrame>
  );
}
