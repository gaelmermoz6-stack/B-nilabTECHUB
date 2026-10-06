import Link from "next/link";

const projects = [
  {
    category: "AgriTech",
    title: "Cultiver mieux, ensemble",
    location: "Kumasi, Ghana",
    description: "Un réseau de producteurs qui rend les récoltes locales plus accessibles aux marchés urbains.",
    status: "Partenaires recherchés",
    image: "project-image-agri",
  },
  {
    category: "Énergie propre",
    title: "L’énergie au plus près",
    location: "Kigali, Rwanda",
    description: "Des solutions solaires abordables pour les petites entreprises et les communautés rurales.",
    status: "En développement",
    image: "project-image-energy",
  },
  {
    category: "Éducation",
    title: "Apprendre sans frontières",
    location: "Abidjan, Côte d’Ivoire",
    description: "Des outils numériques conçus pour ouvrir de nouvelles perspectives aux jeunes talents.",
    status: "Ouvert aux collaborations",
    image: "project-image-education",
  },
];

const questions = [
  {
    question: "À qui s’adresse AfriLaunch ?",
    answer: "AfriLaunch s’adresse aux entrepreneurs, porteurs de projets, partenaires et organisations qui souhaitent contribuer à des initiatives à impact en Afrique.",
  },
  {
    question: "Puis-je présenter mon projet gratuitement ?",
    answer: "La création d’un profil et la présentation d’un projet sont pensées pour être accessibles. Les modalités définitives seront précisées lors du lancement de la plateforme.",
  },
  {
    question: "Quels types d’opportunités puis-je trouver ?",
    answer: "Vous pourrez découvrir des appels à projets, des financements, des programmes d’accompagnement et des opportunités de partenariat.",
  },
  {
    question: "AfriLaunch est-elle disponible dans mon pays ?",
    answer: "La plateforme a vocation à connecter les écosystèmes de plusieurs pays africains. Les pays couverts seront indiqués au fur et à mesure du déploiement.",
  },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand${inverse ? " brand-inverse" : ""}`} href="/" aria-label="AfriLaunch - accueil">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>AfriLaunch</span>
    </Link>
  );
}

function Arrow() {
  return <span aria-hidden="true">&#8594;</span>;
}

export default function Home() {
  return (
    <main id="accueil" className="landing-page">
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <Brand />
          <nav className="landing-nav" aria-label="Navigation principale">
            <Link href="#accueil" aria-current="page">Accueil</Link>
            <Link href="#a-propos">À propos</Link>
            <Link href="#projets">Projets</Link>
            <Link href="#fonctionnement">Fonctionnement</Link>
            <Link href="#faq">FAQ</Link>
          </nav>
          <div className="landing-header-actions">
            <Link className="landing-login" href="/login">Connexion</Link>
            <Link className="button button-primary" href="/register">Créer un compte <Arrow /></Link>
          </div>
          <details className="landing-mobile-menu">
            <summary aria-label="Ouvrir le menu de navigation"><span /><span /><span /></summary>
            <nav aria-label="Navigation mobile">
              <Link href="#accueil">Accueil</Link>
              <Link href="#a-propos">À propos</Link>
              <Link href="#projets">Projets</Link>
              <Link href="#fonctionnement">Fonctionnement</Link>
              <Link href="#faq">FAQ</Link>
              <Link href="/login">Connexion</Link>
              <Link href="/register">Créer un compte</Link>
            </nav>
          </details>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-container landing-hero-grid">
          <div className="landing-hero-copy">
            <p className="landing-kicker"><span /> L’Afrique de demain commence ici</p>
            <h1>Des idées fortes.<br />Un avenir partagé.</h1>
            <p className="landing-hero-description">
              AfriLaunch relie les projets africains ambitieux aux personnes, partenaires et opportunités dont ils ont besoin pour grandir.
            </p>
            <div className="landing-hero-actions">
              <Link className="button button-primary" href="/register">Donnez vie à votre idée <Arrow /></Link>
              <Link className="button button-outline" href="#fonctionnement">Découvrir le fonctionnement</Link>
            </div>
            <div className="landing-hero-note">
              <span className="landing-avatar-stack" aria-hidden="true"><i>AK</i><i>JM</i><i>FN</i></span>
              <span>Pour celles et ceux qui font avancer l’Afrique</span>
            </div>
          </div>
          <div className="landing-hero-visual" role="img" aria-label="Des entrepreneurs africains échangent autour d’une table">
            <div className="landing-visual-label"><span className="landing-live-dot" /> Ensemble, les idées vont plus loin</div>
            <div className="landing-visual-caption">
              <span className="landing-caption-mark" aria-hidden="true">A</span>
              <span><strong>Un écosystème connecté</strong><small>Des idées locales aux résultats durables</small></span>
              <span className="landing-caption-arrow" aria-hidden="true">&#8599;</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-trust" aria-label="AfriLaunch en quelques chiffres">
        <div className="landing-container landing-trust-inner">
          <p className="landing-trust-heading">Un écosystème en pleine croissance<br />pour préparer la suite</p>
          <div className="landing-stat"><strong>250<span>+</span></strong><small>Projets</small></div>
          <div className="landing-stat"><strong>1 200<span>+</span></strong><small>Entrepreneurs</small></div>
          <div className="landing-stat"><strong>80<span>+</span></strong><small>Opportunités</small></div>
          <div className="landing-stat"><strong>18</strong><small>Pays</small></div>
          <p className="landing-stats-note">Chiffres indicatifs de la plateforme</p>
        </div>
      </section>

      <section id="fonctionnement" className="landing-section landing-how">
        <div className="landing-container">
          <div className="landing-section-heading">
            <p className="landing-section-kicker">La simplicité avant tout</p>
            <h2>Faites avancer votre idée.</h2>
            <p>Tout ce qu’il vous faut pour trouver la prochaine étape, au même endroit.</p>
          </div>
          <div className="landing-steps">
            <article className="landing-step"><span className="landing-step-number">01</span><div className="landing-step-icon" aria-hidden="true">↗</div><h3>Présentez votre vision</h3><p>Décrivez votre projet, vos objectifs et le changement que vous souhaitez impulser.</p></article>
            <article className="landing-step"><span className="landing-step-number">02</span><div className="landing-step-icon" aria-hidden="true">⌕</div><h3>Trouvez une opportunité</h3><p>Explorez des financements, des programmes et des partenariats adaptés à vos ambitions.</p></article>
            <article className="landing-step"><span className="landing-step-number">03</span><div className="landing-step-icon" aria-hidden="true">◌</div><h3>Rencontrez les bonnes personnes</h3><p>Échangez avec des entrepreneurs et partenaires qui peuvent vous aider à grandir.</p></article>
            <article className="landing-step"><span className="landing-step-number">04</span><div className="landing-step-icon" aria-hidden="true">↗</div><h3>Créez un impact durable</h3><p>Transformez les bonnes rencontres et ressources en avancées concrètes.</p></article>
          </div>
        </div>
      </section>

      <section id="projets" className="landing-section landing-projects">
        <div className="landing-container">
          <div className="landing-section-heading landing-section-heading-row">
            <div><p className="landing-section-kicker">Des projets qui font la différence</p><h2>Des idées déjà en mouvement.</h2><p>Découvrez quelques initiatives qui transforment leur communauté.</p></div>
            <Link className="landing-text-link" href="/projects">Voir tous les projets <Arrow /></Link>
          </div>
          <div className="landing-project-grid">
            {projects.map((project) => (
              <article className="landing-project-card" key={project.title}>
                <Link href="/projects" className={`landing-project-image ${project.image}`} aria-label={`Voir ${project.title}`}>
                  <span className="landing-project-category">{project.category}</span>
                  <span className="landing-project-open" aria-hidden="true">&#8599;</span>
                </Link>
                <div className="landing-project-content">
                  <p className="landing-project-location"><span aria-hidden="true">&#9679;</span> {project.location}</p>
                  <h3><Link href="/projects">{project.title}</Link></h3>
                  <p className="landing-project-description">{project.description}</p>
                  <div className="landing-project-footer"><span className="badge badge-success">{project.status}</span><Link href="/projects" aria-label={`En savoir plus sur ${project.title}`}><Arrow /></Link></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-benefits" id="a-propos">
        <div className="landing-container landing-benefits-grid">
          <div className="landing-benefits-copy"><p className="landing-section-kicker">Un écosystème plus fort, ensemble</p><h2>Chaque bonne idée mérite de grandir.</h2><p>Trouver le bon soutien ne devrait pas dépendre de son réseau. AfriLaunch rend l’écosystème plus accessible et plus simple à rejoindre.</p><Link className="button landing-button-light" href="/register">Rejoindre l’écosystème <Arrow /></Link></div>
          <div className="landing-benefits-list">
            <article><span>01</span><div><h3>Des opportunités visibles</h3><p>Découvrez des appels, programmes et ressources de tout l’écosystème.</p></div></article>
            <article><span>02</span><div><h3>Des connexions utiles</h3><p>Rencontrez des partenaires qui comprennent vos ambitions et votre contexte.</p></div></article>
            <article><span>03</span><div><h3>Des progrès durables</h3><p>Retrouvez vos projets, prochaines étapes et documents au même endroit.</p></div></article>
          </div>
        </div>
      </section>

      <section className="landing-section landing-opportunities">
        <div className="landing-container landing-opportunity-grid">
          <div className="landing-section-heading"><p className="landing-section-kicker">Bien plus qu’un annuaire</p><h2>Trouvez le soutien adapté à votre prochaine étape.</h2><p>Découvrez des moyens concrets de faire mûrir votre projet.</p><Link className="landing-text-link" href="/opportunities">Parcourir les opportunités <Arrow /></Link></div>
          <div className="landing-opportunity-list">
            <Link href="/opportunities"><span className="landing-opportunity-icon">01</span><span><strong>Financements et subventions</strong><small>Des ressources pour développer votre projet</small></span><Arrow /></Link>
            <Link href="/opportunities"><span className="landing-opportunity-icon">02</span><span><strong>Accélérateurs et programmes</strong><small>Expertise, méthode et accompagnement</small></span><Arrow /></Link>
            <Link href="/opportunities"><span className="landing-opportunity-icon">03</span><span><strong>Partenaires et collaborateurs</strong><small>Des personnes prêtes à construire avec vous</small></span><Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="landing-testimonials">
        <div className="landing-container">
          <div className="landing-section-heading landing-section-heading-row"><div><p className="landing-section-kicker">Au service de vos ambitions</p><h2>Le progrès se construit ensemble.</h2></div><span className="landing-testimonial-mark" aria-hidden="true">“</span></div>
          <div className="landing-quote-grid">
            <figure><blockquote>« Pour une personne qui entreprend, rien ne vaut un chemin clair vers les bonnes personnes et les bonnes opportunités. »</blockquote><figcaption><span className="avatar avatar-medium">AM</span><span><strong>Amara Mensah</strong><small>Entrepreneuse sociale · Accra</small></span></figcaption></figure>
            <figure><blockquote>« Quand les idées locales trouvent le soutien nécessaire, toute la communauté avance. »</blockquote><figcaption><span className="avatar avatar-medium">DK</span><span><strong>David Kamanzi</strong><small>Entrepreneur en énergie propre · Kigali</small></span></figcaption></figure>
          </div>
          <p className="landing-demo-note">Témoignages indicatifs pour la prévisualisation</p>
        </div>
      </section>

      <section id="faq" className="landing-section landing-faq">
        <div className="landing-container landing-faq-grid">
          <div className="landing-section-heading"><p className="landing-section-kicker">À savoir</p><h2>Quelques réponses à vos questions.</h2><p>Vous ne trouvez pas l’information recherchée ? Notre équipe est là pour vous aider.</p><Link className="landing-text-link" href="/contact">Contacter notre équipe <Arrow /></Link></div>
          <div className="landing-faq-list">
            {questions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="landing-final-cta">
        <div className="landing-container landing-final-cta-inner"><div><p className="landing-section-kicker">Votre prochaine étape commence ici</p><h2>Construisons la suite.</h2><p>Présentez votre idée, rencontrez les bonnes personnes et avancez avec AfriLaunch.</p></div><Link className="button landing-button-light" href="/register">Créer mon compte <Arrow /></Link></div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-main"><div className="landing-footer-brand"><Brand inverse /><p>Relier les ambitions africaines<br />aux opportunités qui les font avancer.</p></div><div className="landing-footer-column"><h2>Explorer</h2><Link href="#a-propos">À propos d’AfriLaunch</Link><Link href="#fonctionnement">Fonctionnement</Link><Link href="/projects">Projets</Link><Link href="#faq">FAQ</Link></div><div className="landing-footer-column"><h2>Participer</h2><Link href="/register">Créer un compte</Link><Link href="/login">Connexion</Link><Link href="/contact">Contact</Link></div><div className="landing-footer-column"><h2>Nous contacter</h2><a href="mailto:hello@afrilaunch.africa">hello@afrilaunch.africa</a><span>Construire partout en Afrique</span></div></div>
          <div className="landing-footer-bottom"><span>© 2026 AfriLaunch. Tous droits réservés.</span><div><Link href="/privacy">Confidentialité</Link><Link href="/terms">Conditions</Link></div><span>Pour celles et ceux qui font avancer l’Afrique.</span></div>
        </div>
      </footer>
    </main>
  );
}
