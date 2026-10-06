"use client";

import Link from "next/link";
import { useState } from "react";

type Decision = "Approved" | "Rejected" | "Changes requested";

const project = {
  title: "Kijani Harvest Network",
  category: "Agriculture & Food Systems",
  location: "Accra, Ghana",
  owner: "Aïcha Koné",
  initials: "AK",
  ownerRole: "Founder & CEO",
  email: "aicha.kone@example.com",
  submitted: "June 21, 2026",
  summary: "Connecting smallholder farmers to fair, reliable markets through a locally rooted digital supply network.",
  problem: "Independent farmers often face unpredictable prices, high post-harvest losses and limited access to buyers. Fragmented supply chains make it difficult for urban food businesses to source fresh produce consistently and fairly.",
  solution: "A community-led network that combines local collection hubs with digital tools for coordinating harvest volumes, quality checks and buyer orders.",
  objectives: ["Connect 500 smallholder farmers to reliable buyers.", "Reduce post-harvest losses by 30% across partner communities.", "Create transparent pricing and dependable payment cycles."],
  impact: ["500 farmers connected", "30% less food loss", "3 regions reached"],
  funding: "$85,000 USD",
  timeline: "12 months · Planned start September 2026",
  docs: ["Project overview.pdf", "Impact framework.pdf", "Implementation budget.xlsx"],
};

const decisionContent: Record<Decision, { title: string; text: string; button: string }> = {
  Approved: { title: "Approve this project?", text: "The project will be approved and the owner will be notified.", button: "Confirm approval" },
  Rejected: { title: "Reject this project?", text: "The project will be marked as rejected. This decision will be recorded for the owner.", button: "Confirm rejection" },
  "Changes requested": { title: "Request changes?", text: "The project will return to its owner with the review notes below.", button: "Send change request" },
};

export default function ProjectReview({ projectId }: { projectId: string }) {
  const [status, setStatus] = useState<Decision | "Under review">("Under review");
  const [decision, setDecision] = useState<Decision | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function openDecision(nextDecision: Decision) {
    setDecision(nextDecision);
    setReviewNote("");
    setError("");
  }

  function confirmDecision() {
    if (!decision) return;
    if (decision === "Changes requested" && !reviewNote.trim()) {
      setError("Add a note so the project owner knows what to update.");
      return;
    }
    setStatus(decision);
    setNotice(`${project.title} marked as ${decision.toLowerCase()} in this preview. No notification was sent.`);
    setDecision(null);
  }

  return (
    <div className="admin-review-page">
      <div className="admin-review-breadcrumb"><Link href="/admin">Dashboard</Link><span>/</span><Link href="/admin/projects">Projects</Link><span>/</span><strong>Review project</strong></div>
      <div className="admin-page-heading admin-review-heading"><div><p className="dashboard-overline">PROJECT REVIEW <span>·</span> {projectId.slice(0, 8).toUpperCase()}</p><h1>Review project</h1><p>Assess the submission and record a clear next step.</p></div><Link className="admin-review-back" href="/admin/projects">← Back to projects</Link></div>
      {notice && <div className="alert alert-success admin-review-notice" role="status">{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}

      <div className="admin-review-layout">
        <div className="admin-review-main">
          <section className="admin-panel admin-review-overview">
            <div className="admin-review-cover" role="img" aria-label="Farmland and agricultural landscape"><div><span className="admin-review-category">{project.category}</span><span className="admin-review-location">⌖ {project.location}</span></div></div>
            <div className="admin-review-title-block"><div className="admin-review-badges"><span className="badge badge-info">{project.category}</span><span className={`badge ${status === "Approved" ? "badge-success" : status === "Under review" ? "badge-warning" : status === "Changes requested" ? "badge-info" : "badge-neutral"}`}>{status}</span></div><h2>{project.title}</h2><p>{project.summary}</p><div className="admin-review-owner-inline"><span className="admin-table-avatar">{project.initials}</span><span><strong>{project.owner}</strong><small>{project.ownerRole} · {project.location}</small></span><span className="admin-review-submitted">Submitted {project.submitted}</span></div></div>
          </section>

          <section className="admin-panel admin-review-section"><div className="admin-review-section-heading"><span>01</span><h2>Problem &amp; solution</h2></div><div className="admin-review-copy-grid"><article><h3>Problem</h3><p>{project.problem}</p></article><article><h3>Proposed solution</h3><p>{project.solution}</p></article></div></section>

          <section className="admin-panel admin-review-section"><div className="admin-review-section-heading"><span>02</span><h2>Objectives &amp; expected impact</h2></div><ul className="admin-review-objectives">{project.objectives.map((objective, index) => <li key={objective}><span>{String(index + 1).padStart(2, "0")}</span>{objective}</li>)}</ul><div className="admin-review-impact">{project.impact.map((item) => <span key={item}>{item}</span>)}</div></section>

          <section className="admin-panel admin-review-section"><div className="admin-review-section-heading"><span>03</span><h2>Funding &amp; timeline</h2></div><div className="admin-review-funding"><div><small>FUNDING REQUEST</small><strong>{project.funding}</strong><span>Collection hub equipment, farmer onboarding, logistics and platform development.</span></div><div><small>PROJECT TIMELINE</small><strong>{project.timeline}</strong><span>Initial pilot followed by a measured regional expansion.</span></div></div></section>

          <section className="admin-panel admin-review-section" id="review-documents"><div className="admin-review-section-heading"><span>04</span><h2>Supporting documents</h2><span className="admin-doc-count">{project.docs.length} files</span></div><div className="admin-review-documents">{project.docs.map((document) => <article key={document}><span className="admin-review-file-icon" aria-hidden="true">{document.endsWith("xlsx") ? "XLS" : "PDF"}</span><span><strong>{document}</strong><small>{document.endsWith("xlsx") ? "840 KB · Uploaded June 20, 2026" : "1.8 MB · Uploaded June 20, 2026"}</small></span><button type="button" aria-label={`Preview ${document}`}>Preview <span aria-hidden="true">↗</span></button></article>)}</div></section>

          <section className="admin-panel admin-review-section"><div className="admin-review-section-heading"><span>05</span><h2>Review checklist</h2></div><div className="admin-review-checklist"><label><input type="checkbox" defaultChecked /><span>Project goals and proposed outcomes are clearly described.</span></label><label><input type="checkbox" defaultChecked /><span>Target community and location are identified.</span></label><label><input type="checkbox" /><span>Funding request is consistent with the project timeline.</span></label><label><input type="checkbox" /><span>Supporting documents have been reviewed.</span></label></div></section>
        </div>

        <aside className="admin-review-sidebar" aria-label="Review controls">
          <section className="admin-panel admin-review-side-card"><div className="admin-review-side-heading"><h2>Review status</h2><span className={`badge ${status === "Approved" ? "badge-success" : status === "Under review" ? "badge-warning" : status === "Changes requested" ? "badge-info" : "badge-neutral"}`}>{status}</span></div><p>{status === "Under review" ? "This submission is in the review queue." : `This project has been marked ${status.toLowerCase()} in the current preview.`}</p><div className="admin-review-steps"><div className="is-complete"><span>✓</span><span><strong>Submitted</strong><small>{project.submitted}</small></span></div><i className="is-complete" /><div className={status === "Under review" ? "is-current" : "is-complete"}><span>{status === "Under review" ? "2" : "✓"}</span><span><strong>Admin review</strong><small>{status === "Under review" ? "In progress" : "Completed"}</small></span></div><i className={status === "Under review" ? "" : "is-complete"} /><div className={status === "Under review" ? "" : "is-current"}><span>{status === "Under review" ? "3" : "✓"}</span><span><strong>Owner notified</strong><small>{status === "Under review" ? "Next step" : "Preview only"}</small></span></div></div></section>

          <section className="admin-panel admin-review-side-card"><div className="admin-review-side-heading"><h2>Project owner</h2><Link href="/admin/users" aria-label="View user management">↗</Link></div><div className="admin-review-owner-card"><span className="avatar avatar-medium">{project.initials}</span><span><strong>{project.owner}</strong><small>{project.ownerRole}</small><small>{project.email}</small></span></div><Link className="admin-review-owner-link" href="/admin/users">View user profile →</Link></section>

          <section className="admin-panel admin-review-side-card admin-review-actions"><div className="admin-review-side-heading"><h2>Decision</h2><span className="admin-review-lock" aria-hidden="true">◈</span></div><p>Choose an outcome after reviewing the submission and its documents.</p><div className="admin-review-action-buttons"><button className="button button-primary" type="button" onClick={() => openDecision("Approved")} disabled={status === "Approved"}><span aria-hidden="true">✓</span> Approve project</button><button className="button button-outline" type="button" onClick={() => openDecision("Changes requested")} disabled={status === "Rejected"}><span aria-hidden="true">↻</span> Request changes</button><button className="button button-danger" type="button" onClick={() => openDecision("Rejected")} disabled={status === "Rejected"}><span aria-hidden="true">×</span> Reject project</button></div><small className="admin-review-preview-note">Actions update this preview only.</small></section>

          <section className="admin-panel admin-review-side-card"><div className="admin-review-side-heading"><h2>Submission details</h2></div><dl className="admin-review-meta"><dt>Project ID</dt><dd>{projectId}</dd><dt>Submitted</dt><dd>{project.submitted}</dd><dt>Category</dt><dd>{project.category}</dd><dt>Location</dt><dd>{project.location}</dd><dt>Review SLA</dt><dd>5 business days</dd></dl></section>
        </aside>
      </div>
      <p className="admin-demo-note">Sample submission for interface preview. No review decision is sent to a server.</p>

      {decision && <div className="admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDecision(null); }}><section className="admin-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="review-dialog-title" aria-describedby="review-dialog-text"><button className="admin-dialog-close" type="button" onClick={() => setDecision(null)} aria-label="Close dialog">×</button><span className={`admin-dialog-icon dialog-${decision === "Approved" ? "approve" : decision === "Rejected" ? "reject" : "changes"}`} aria-hidden="true">{decision === "Approved" ? "✓" : decision === "Rejected" ? "×" : "↻"}</span><p className="dashboard-overline">FINAL REVIEW STEP</p><h2 id="review-dialog-title">{decisionContent[decision].title}</h2><p id="review-dialog-text">{decisionContent[decision].text}</p>{decision !== "Approved" && <label className="admin-dialog-reason">{decision === "Rejected" ? "Reason (optional)" : "Note for the project owner"}<textarea value={reviewNote} onChange={(event) => { setReviewNote(event.target.value); setError(""); }} rows={3} placeholder={decision === "Rejected" ? "Add context for the project record..." : "Explain what the owner should update..."} aria-invalid={Boolean(error)} />{error && <small>{error}</small>}</label>}<div className="admin-dialog-actions"><button className="button button-outline" type="button" onClick={() => setDecision(null)}>Go back</button><button className={`button ${decision === "Rejected" ? "button-danger" : "button-primary"}`} type="button" onClick={confirmDecision}>{decisionContent[decision].button}</button></div></section></div>}
    </div>
  );
}
