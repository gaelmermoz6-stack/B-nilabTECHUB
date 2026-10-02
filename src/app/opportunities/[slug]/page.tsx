import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicPageFrame } from "@/components/shared/public-page-frame";
import { opportunities } from "@/config/opportunities";

type OpportunityPageProps = { params: Promise<{ slug: string }> };

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const { slug } = await params;
  const opportunity = opportunities.find((item) => item.slug === slug);
  if (!opportunity) notFound();

  return (
    <PublicPageFrame>
      <section className="landing-section"><div className="landing-container">
        <div className="landing-section-heading"><p className="landing-section-kicker">{opportunity.category.toUpperCase()}</p><h1>{opportunity.title}</h1><p>{opportunity.organization} · {opportunity.location}</p></div>
        <section className="dashboard-panel"><div className="empty-state"><span className="badge badge-info">Clôture · {opportunity.deadline}</span><h2>À propos de cette opportunité</h2><p>Cette opportunité est présentée comme aperçu frontend. Les critères et la candidature seront disponibles dans une prochaine phase.</p><strong>{opportunity.amount}</strong><div><Link className="button button-primary" href="/register">Créer un compte <span aria-hidden="true">→</span></Link> <Link className="button button-outline" href="/opportunities">Toutes les opportunités</Link></div></div></section>
      </div></section>
    </PublicPageFrame>
  );
}
