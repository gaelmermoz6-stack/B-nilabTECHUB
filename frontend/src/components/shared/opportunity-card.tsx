import Link from "next/link";
import { Badge, Card } from "@/components/ui/primitives";

export type Opportunity = { slug: string; category: string; title: string; organization: string; location: string; deadline: string; amount: string; tone: "info" | "success" | "warning" };

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Card className="opportunity-card">
      <div className="opportunity-card-top"><Badge tone={opportunity.tone}>{opportunity.category}</Badge><span className="opportunity-deadline">Clôture · {opportunity.deadline}</span></div>
      <h3><Link href={`/opportunities/${opportunity.slug}`}>{opportunity.title}</Link></h3>
      <p className="opportunity-organization">{opportunity.organization}</p>
      <div className="opportunity-card-bottom"><span>{opportunity.location}</span><strong>{opportunity.amount}</strong></div>
    </Card>
  );
}
