import Link from "next/link";
import { Brand } from "@/components/shared/brand";

export function PublicPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <Brand />
          <nav className="landing-nav" aria-label="Navigation principale">
            <Link href="/projects">Projets</Link>
            <Link href="/opportunities">Opportunités</Link>
            <Link href="/#fonctionnement">Comment ça marche</Link>
          </nav>
          <div className="landing-header-actions">
            <Link className="landing-login" href="/login">Connexion</Link>
            <Link className="button button-primary" href="/register">Créer un compte <span aria-hidden="true">→</span></Link>
          </div>
          <details className="landing-mobile-menu">
            <summary aria-label="Ouvrir le menu"><span /><span /><span /></summary>
            <nav aria-label="Navigation mobile">
              <Link href="/projects">Projets</Link>
              <Link href="/opportunities">Opportunités</Link>
              <Link href="/#fonctionnement">Comment ça marche</Link>
              <Link href="/login">Connexion</Link>
              <Link href="/register">Créer un compte</Link>
            </nav>
          </details>
        </div>
      </header>
      {children}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-main">
            <div className="landing-footer-brand"><Brand inverse /><p>Les projets africains méritent les bonnes connexions.</p></div>
            <div className="landing-footer-column"><h2>Explorer</h2><Link href="/projects">Projets</Link><Link href="/opportunities">Opportunités</Link></div>
            <div className="landing-footer-column"><h2>AfriLaunch</h2><Link href="/contact">Nous contacter</Link><Link href="/privacy">Confidentialité</Link><Link href="/terms">Conditions</Link></div>
          </div>
          <div className="landing-footer-bottom"><span>© 2026 AfriLaunch</span><span>Fait pour faire grandir l’Afrique.</span></div>
        </div>
      </footer>
    </main>
  );
}
