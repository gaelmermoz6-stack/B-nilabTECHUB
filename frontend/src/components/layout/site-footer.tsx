import Link from "next/link";
import { Brand } from "@/components/shared/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand-block"><Brand inverse /><p>Les projets africains méritent les bonnes connexions.</p></div>
        <div className="footer-links"><span>Explorer</span><Link href="/opportunities">Opportunités</Link><Link href="/#fonctionnement">Comment ça marche</Link></div>
        <div className="footer-links"><span>AfriLaunch</span><Link href="/#a-propos">À propos</Link><Link href="/contact">Nous contacter</Link></div>
        <p className="footer-copyright">© {new Date().getFullYear()} AfriLaunch. Fait pour faire grandir l’Afrique.</p>
      </div>
    </footer>
  );
}
