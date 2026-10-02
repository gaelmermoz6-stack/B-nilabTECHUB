import Link from "next/link";
import { PreviewForm } from "@/components/shared/preview-form";

export default function ForgotPasswordPage() {
  return (
    <main className="register-page">
      <section className="register-intro" aria-label="Présentation d’AfriLaunch"><div className="register-intro-inner"><Link className="register-brand" href="/" aria-label="AfriLaunch, accueil"><span className="register-brand-mark" aria-hidden="true"><i /><i /><i /></span><span>AfriLaunch</span></Link><div className="register-pitch"><p className="register-eyebrow">Votre espace AfriLaunch</p><h1>Retrouvez<br />votre accès.</h1><p className="register-description">Une étape simple pour reprendre le fil de vos projets.</p></div><p className="register-footnote">Pensé pour les bâtisseurs d’Afrique.</p></div></section>
      <section className="register-form-panel" aria-labelledby="reset-title"><div className="register-form-wrap"><div className="register-form-heading"><p className="register-eyebrow register-eyebrow-dark">RÉCUPÉRATION DU COMPTE</p><h2 id="reset-title">Mot de passe oublié ?</h2><p>Saisissez l’adresse liée à votre compte.</p></div><PreviewForm mode="password" /><p className="register-login"><Link href="/login">Retour à la connexion</Link></p></div></section>
    </main>
  );
}
