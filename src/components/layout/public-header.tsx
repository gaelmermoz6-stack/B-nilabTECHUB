import Link from "next/link";
import { Brand } from "@/components/shared/brand";
import { ButtonLink } from "@/components/ui/primitives";

const links = [
  { href: "/opportunities", label: "Opportunités" },
  { href: "/#fonctionnement", label: "Comment ça marche" },
  { href: "/#a-propos", label: "À propos" },
];

export function PublicHeader() {
  return (
    <header className="public-header">
      <div className="public-header-inner">
        <Brand />
        <nav className="public-nav" aria-label="Navigation principale">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <div className="public-actions">
          <Link className="login-link" href="/login">Connexion</Link>
          <ButtonLink href="/register">Créer un compte <span aria-hidden="true">↗</span></ButtonLink>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Ouvrir le menu"><span /><span /><span /></summary>
          <nav aria-label="Navigation mobile">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/login">Connexion</Link>
            <Link href="/register">Créer un compte</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
