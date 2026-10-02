import { PublicPageFrame } from "@/components/shared/public-page-frame";
import { OpportunityCard } from "@/components/shared/opportunity-card";
import { opportunities } from "@/config/opportunities";

export default function OpportunitiesPage() {
  return (
    <PublicPageFrame>
      <section className="landing-section"><div className="landing-container">
        <div className="landing-section-heading"><p className="landing-section-kicker">OPPORTUNITÉS</p><h1>Le bon soutien pour votre prochaine étape.</h1><p>Parcourez les programmes et financements présentés dans l’aperçu AfriLaunch.</p></div>
        <div className="opportunity-directory">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.slug} opportunity={opportunity} />)}</div>
        <p className="landing-demo-note">Opportunités de démonstration. Les candidatures ne sont pas transmises depuis cet aperçu.</p>
      </div></section>
    </PublicPageFrame>
  );
}
