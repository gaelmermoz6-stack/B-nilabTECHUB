import { PreviewForm } from "@/components/shared/preview-form";
import { PublicPageFrame } from "@/components/shared/public-page-frame";

export default function ContactPage() {
  return (
    <PublicPageFrame>
      <section className="landing-section"><div className="landing-container landing-faq-grid">
        <div className="landing-section-heading"><p className="landing-section-kicker">CONTACT</p><h1>Parlons de votre projet.</h1><p>Notre équipe est là pour répondre à vos questions sur AfriLaunch.</p><a className="landing-text-link" href="mailto:hello@afrilaunch.africa">hello@afrilaunch.africa</a></div>
        <section className="dashboard-panel"><div className="empty-state"><h2>Écrire à l’équipe</h2><p>Le formulaire ci-dessous est un aperçu et ne transmet pas de message.</p><PreviewForm mode="contact" /></div></section>
      </div></section>
    </PublicPageFrame>
  );
}
