import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicPageFrame } from "@/components/shared/public-page-frame";

const documents = {
  privacy: { title: "Politique de confidentialité", summary: "La présente page décrit les principes de confidentialité prévus pour AfriLaunch." },
  terms: { title: "Conditions d’utilisation", summary: "La présente page décrit les conditions prévues pour l’utilisation d’AfriLaunch." },
} as const;

type LegalPageProps = { params: Promise<{ document: string }> };

export default async function LegalPage({ params }: LegalPageProps) {
  const { document } = await params;
  if (!(document in documents)) notFound();
  const content = documents[document as keyof typeof documents];

  return (
    <PublicPageFrame>
      <section className="landing-section"><div className="landing-container">
        <div className="landing-section-heading"><p className="landing-section-kicker">AFRILAUNCH</p><h1>{content.title}</h1><p>{content.summary}</p></div>
        <div className="dashboard-panel"><div className="empty-state"><h2>Document de prévisualisation</h2><p>Le texte juridique définitif sera publié avant la mise en service de la plateforme.</p><Link className="button button-outline" href="/">Retour à l’accueil</Link></div></div>
      </div></section>
    </PublicPageFrame>
  );
}
