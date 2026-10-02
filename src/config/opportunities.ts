import type { Opportunity } from "@/components/shared/opportunity-card";

export const opportunities: Opportunity[] = [
  { slug: "green-futures-accelerator", category: "Accélération", title: "Green Futures Accelerator", organization: "Climate Innovation Fund", location: "Ghana · Afrique de l’Ouest", deadline: "30 septembre 2026", amount: "Jusqu’à 25 000 $", tone: "success" },
  { slug: "africa-food-systems", category: "Financement", title: "Africa Food Systems Challenge", organization: "Regional Impact Partners", location: "Afrique subsaharienne", deadline: "15 octobre 2026", amount: "Jusqu’à 50 000 $", tone: "info" },
  { slug: "learning-equity-fellowship", category: "Programme", title: "Learning Equity Fellowship", organization: "Future Skills Network", location: "Côte d’Ivoire · Rwanda", deadline: "2 novembre 2026", amount: "Accompagnement", tone: "warning" },
];
