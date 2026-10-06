"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";

type ProjectDraft = {
  name: string;
  category: string;
  location: string;
  shortDescription: string;
  problem: string;
  solution: string;
  objectives: string;
  audience: string;
  impact: string;
  funding: string;
  resources: string;
  team: string;
  timeline: string;
  startDate: string;
};

type ProjectField = keyof ProjectDraft;
type WizardStatus = { type: "error" | "success" | "info"; message: string } | null;

const initialDraft: ProjectDraft = {
  name: "",
  category: "",
  location: "",
  shortDescription: "",
  problem: "",
  solution: "",
  objectives: "",
  audience: "",
  impact: "",
  funding: "",
  resources: "",
  team: "",
  timeline: "",
  startDate: "",
};

const steps = ["Informations générales", "Détails du projet", "Besoins", "Documents", "Vérification"];
const requiredFields: Partial<Record<number, ProjectField[]>> = {
  0: ["name", "category", "location", "shortDescription"],
  1: ["problem", "solution", "objectives", "audience", "impact"],
  2: ["funding", "team", "timeline"],
};

const labels: Record<ProjectField, string> = {
  name: "Nom du projet",
  category: "Catégorie",
  location: "Lieu",
  shortDescription: "Brève description",
  problem: "Problème traité",
  solution: "Solution proposée",
  objectives: "Objectifs",
  audience: "Public cible",
  impact: "Impact attendu",
  funding: "Besoins de financement",
  resources: "Ressources",
  team: "Équipe",
  timeline: "Calendrier",
  startDate: "Date de début prévue",
};

function WizardField({ field, value, onChange, error, required = false, multiline = false, hint, placeholder }: {
  field: ProjectField;
  value: string;
  onChange: (field: ProjectField, value: string) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  hint?: string;
  placeholder?: string;
}) {
  const id = `project-${field}`;
  return (
    <label className="wizard-field" htmlFor={id}>
      <span>{labels[field]}{required && <i> *</i>}</span>
      {multiline ? (
        <textarea id={id} value={value} onChange={(event) => onChange(field, event.target.value)} placeholder={placeholder} rows={4} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} />
      ) : (
        <input id={id} value={value} onChange={(event) => onChange(field, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} />
      )}
      {hint && !error && <small id={`${id}-hint`}>{hint}</small>}
      {error && <small className="wizard-field-error" id={`${id}-error`}>{error}</small>}
    </label>
  );
}

export default function ProjectWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ProjectDraft>(initialDraft);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<ProjectField, string>>>({});
  const [status, setStatus] = useState<WizardStatus>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(field: ProjectField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  function validateStep() {
    const nextErrors: Partial<Record<ProjectField, string>> = {};
    for (const field of requiredFields[step] ?? []) {
      if (!draft[field].trim()) nextErrors[field] = `Le champ « ${labels[field]} » est obligatoire.`;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", message: "Veuillez remplir les champs obligatoires avant de continuer." });
      return false;
    }
    setStatus(null);
    return true;
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles((current) => [...current, ...selectedFiles]);
    setStatus(null);
    event.target.value = "";
  }

  function saveDraft() {
    setStatus({ type: "info", message: "Brouillon enregistré dans cet aperçu. Aucune information n’a été envoyée ni conservée." });
  }

  async function submitProject() {
    setIsLoading(true);
    setStatus(null);
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    setIsLoading(false);
    setIsSubmitted(true);
  }

  function renderStep() {
    if (step === 0) {
      return (
        <div className="wizard-form-grid">
          <WizardField field="name" value={draft.name} onChange={updateField} error={errors.name} required placeholder="Ex. : Kijani Harvest Network" />
          <label className="wizard-field" htmlFor="project-category"><span>Catégorie <i>*</i></span><select id="project-category" value={draft.category} onChange={(event) => updateField("category", event.target.value)} aria-invalid={Boolean(errors.category)}><option value="">Choisir une catégorie</option><option>Agriculture et systèmes alimentaires</option><option>Énergie propre</option><option>Éducation</option><option>Santé</option><option>Inclusion financière</option><option>Technologie</option><option>Autre</option></select>{errors.category && <small className="wizard-field-error">{errors.category}</small>}</label>
          <WizardField field="location" value={draft.location} onChange={updateField} error={errors.location} required placeholder="Ville, pays" />
          <WizardField field="shortDescription" value={draft.shortDescription} onChange={updateField} error={errors.shortDescription} required multiline placeholder="Décrivez votre projet en une ou deux phrases claires." hint="Restez concis. Ce résumé apparaîtra dans les listes de projets." />
        </div>
      );
    }

    if (step === 1) {
      return (
        <div className="wizard-form-grid">
          <WizardField field="problem" value={draft.problem} onChange={updateField} error={errors.problem} required multiline placeholder="À quel problème souhaitez-vous répondre ?" />
          <WizardField field="solution" value={draft.solution} onChange={updateField} error={errors.solution} required multiline placeholder="Comment votre projet répond-il à ce problème ?" />
          <WizardField field="objectives" value={draft.objectives} onChange={updateField} error={errors.objectives} required multiline placeholder="Quels sont les principaux résultats visés ?" />
          <WizardField field="audience" value={draft.audience} onChange={updateField} error={errors.audience} required multiline placeholder="Qui bénéficiera de ce projet ?" />
          <WizardField field="impact" value={draft.impact} onChange={updateField} error={errors.impact} required multiline placeholder="Quel changement attendez-vous et comment le mesurerez-vous ?" />
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="wizard-form-grid">
          <label className="wizard-field" htmlFor="project-funding"><span>Besoins de financement <i>*</i></span><div className="wizard-input-affix"><span>$</span><input id="project-funding" inputMode="numeric" value={draft.funding} onChange={(event) => updateField("funding", event.target.value)} placeholder="Ex. : 25 000" aria-invalid={Boolean(errors.funding)} /></div>{errors.funding && <small className="wizard-field-error">{errors.funding}</small>}<small>Indiquez un montant approximatif en dollars américains.</small></label>
          <label className="wizard-field" htmlFor="project-timeline"><span>Calendrier <i>*</i></span><select id="project-timeline" value={draft.timeline} onChange={(event) => updateField("timeline", event.target.value)} aria-invalid={Boolean(errors.timeline)}><option value="">Choisir une durée</option><option>Moins de 6 mois</option><option>6 à 12 mois</option><option>1 à 2 ans</option><option>Plus de 2 ans</option></select>{errors.timeline && <small className="wizard-field-error">{errors.timeline}</small>}</label>
          <WizardField field="startDate" value={draft.startDate} onChange={updateField} placeholder="Ex. : septembre 2026" hint="Quand prévoyez-vous de démarrer le projet ?" />
          <WizardField field="resources" value={draft.resources} onChange={updateField} multiline placeholder="Équipement, expertise, locaux ou partenariats utiles." hint="Indiquez les ressources non financières nécessaires au projet." />
          <WizardField field="team" value={draft.team} onChange={updateField} error={errors.team} required multiline placeholder="Qui dirige le projet ? Quelles compétences sont représentées ?" />
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="wizard-documents">
          <label className="wizard-upload-zone" htmlFor="project-files">
            <input id="project-files" type="file" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg" onChange={handleFiles} />
            <span className="wizard-upload-icon" aria-hidden="true">↑</span>
            <strong>Déposez vos fichiers ici ou <u>parcourez vos dossiers</u></strong>
            <small>PDF, Word, PowerPoint, Excel ou images · 10 Mo maximum par fichier</small>
          </label>
          <div className="wizard-documents-heading"><span>Documents du projet</span><small>{files.length} {files.length === 1 ? "fichier" : "fichiers"}</small></div>
          {files.length > 0 ? (
            <div className="wizard-file-list">{files.map((file, index) => <div className="wizard-file-row" key={`${file.name}-${file.lastModified}-${index}`}><span className="wizard-file-icon" aria-hidden="true">{file.name.split(".").pop()?.slice(0, 3).toUpperCase()}</span><span className="wizard-file-info"><strong>{file.name}</strong><small>{(file.size / (1024 * 1024)).toFixed(2)} Mo</small></span><span className="badge badge-success">Prêt</span><button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Retirer ${file.name}`}>×</button></div>)}</div>
          ) : (
            <div className="wizard-empty-files"><span aria-hidden="true">▤</span><strong>Aucun document ajouté</strong><small>Ajoutez des pièces justificatives ou poursuivez sans document.</small></div>
          )}
          <div className="alert alert-info wizard-document-note">Les documents aident à comprendre votre projet. Évitez de transmettre des informations personnelles confidentielles.</div>
        </div>
      );
    }

    return (
      <div className="wizard-review">
        <div className="wizard-review-intro"><span className="wizard-review-check" aria-hidden="true">✓</span><p><strong>Une dernière vérification.</strong><span>Relisez les informations avant l’envoi.</span></p></div>
        <section className="wizard-review-section"><div><h3>Informations générales</h3><button type="button" onClick={() => setStep(0)}>Modifier</button></div><dl><dt>Nom du projet</dt><dd>{draft.name || "Non renseigné"}</dd><dt>Catégorie</dt><dd>{draft.category || "Non renseignée"}</dd><dt>Lieu</dt><dd>{draft.location || "Non renseigné"}</dd><dt>Brève description</dt><dd>{draft.shortDescription || "Non renseignée"}</dd></dl></section>
        <section className="wizard-review-section"><div><h3>Détails du projet</h3><button type="button" onClick={() => setStep(1)}>Modifier</button></div><dl><dt>Problème traité</dt><dd>{draft.problem || "Non renseigné"}</dd><dt>Solution proposée</dt><dd>{draft.solution || "Non renseignée"}</dd><dt>Objectifs</dt><dd>{draft.objectives || "Non renseignés"}</dd><dt>Public cible</dt><dd>{draft.audience || "Non renseigné"}</dd><dt>Impact attendu</dt><dd>{draft.impact || "Non renseigné"}</dd></dl></section>
        <section className="wizard-review-section"><div><h3>Besoins</h3><button type="button" onClick={() => setStep(2)}>Modifier</button></div><dl><dt>Besoins de financement</dt><dd>{draft.funding ? `${draft.funding} $ US` : "Non renseignés"}</dd><dt>Ressources</dt><dd>{draft.resources || "Non renseignées"}</dd><dt>Équipe</dt><dd>{draft.team || "Non renseignée"}</dd><dt>Calendrier</dt><dd>{draft.timeline || "Non renseigné"}{draft.startDate ? ` · ${draft.startDate}` : ""}</dd></dl></section>
        <section className="wizard-review-section"><div><h3>Documents</h3><button type="button" onClick={() => setStep(3)}>Modifier</button></div>{files.length ? <ul>{files.map((file, index) => <li key={`${file.name}-${index}`}>{file.name}<span className="badge badge-success">Prêt</span></li>)}</ul> : <p className="wizard-no-documents">Aucun document justificatif ajouté.</p>}</section>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <section className="dashboard-panel wizard-success-state" role="status">
        <span className="wizard-success-icon" aria-hidden="true">✓</span><p className="dashboard-overline">APERÇU DU PROJET</p><h1>Votre projet est prêt.</h1><p>Ceci est un aperçu : aucun projet n’a été envoyé ni enregistré dans un compte.</p><div><Link className="button button-outline" href="/dashboard">Retour au tableau de bord</Link><button className="button button-primary" type="button" onClick={() => { setIsSubmitted(false); setStep(0); }}>Créer un autre projet</button></div>
      </section>
    );
  }

  return (
    <div className="project-wizard">
      <div className="profile-page-heading wizard-page-heading">
        <div><p className="dashboard-overline">MES PROJETS</p><h1>Créer un projet</h1><p>Présentez à l’écosystème le projet que vous développez.</p></div>
        <button className="button button-outline wizard-save-top" type="button" onClick={saveDraft}>Enregistrer le brouillon</button>
      </div>

      <section className="dashboard-panel wizard-panel" aria-label="Formulaire de création de projet">
        <div className="wizard-stepper" aria-label={`Étape ${step + 1} sur ${steps.length}`}>
          {steps.map((label, index) => <div className={`wizard-step${index === step ? " is-current" : ""}${index < step ? " is-complete" : ""}`} key={label}><span className="wizard-step-number">{index < step ? "✓" : String(index + 1).padStart(2, "0")}</span><span className="wizard-step-label">{label}</span></div>)}
        </div>

        <div className="wizard-body">
          <div className="wizard-step-heading"><p className="dashboard-overline">ÉTAPE {String(step + 1).padStart(2, "0")} SUR 05</p><h2>{steps[step]}</h2><p>{step === 0 ? "Présentez les informations essentielles de votre projet." : step === 1 ? "Expliquez le besoin et le changement que vous souhaitez apporter." : step === 2 ? "Précisez les moyens nécessaires pour concrétiser votre projet." : step === 3 ? "Ajoutez des documents utiles à la compréhension du projet." : "Vérifiez toutes les informations avant l’envoi."}</p></div>
          {status && <div className={`wizard-alert alert ${status.type === "error" ? "alert-danger" : status.type === "success" ? "alert-success" : "alert-info"}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</div>}
          {renderStep()}
        </div>

        <div className="wizard-footer">
          <div>{step > 0 && <button className="button button-outline" type="button" onClick={() => { setStep((current) => current - 1); setStatus(null); }}>← Précédent</button>}</div>
          <div><button className="button button-ghost wizard-save-inline" type="button" onClick={saveDraft}>Enregistrer le brouillon</button>{step < steps.length - 1 ? <button className="button button-primary" type="button" onClick={() => { if (validateStep()) setStep((current) => current + 1); }}>Étape suivante <span aria-hidden="true">→</span></button> : <button className="button button-primary" type="button" disabled={isLoading} onClick={submitProject}>{isLoading ? <><span className="wizard-spinner" aria-hidden="true" />Envoi…</> : <>Soumettre le projet <span aria-hidden="true">→</span></>}</button>}</div>
        </div>
      </section>
      <p className="wizard-privacy-note"><span aria-hidden="true">⌑</span> Les détails de votre projet ne seront partagés avec les partenaires concernés qu’après vérification.</p>
    </div>
  );
}
