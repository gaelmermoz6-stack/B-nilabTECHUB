"use client";

import Link from "next/link";
import { useState } from "react";
import { WorkspaceFrame } from "@/components/dashboard/profile-screen";

type PreviewRole = "owner" | "admin";
type ProjectStatus = "Draft" | "Under review" | "Approved" | "Changes requested" | "Rejected";

const project = {
  name: "Kijani Harvest Network",
  category: "Agriculture & Food Systems",
  location: "Accra, Ghana",
  owner: "Aïcha Koné",
  ownerRole: "Founder & CEO",
  summary: "Connecting smallholder farmers to fair, reliable markets through a locally rooted digital supply network.",
  description: "Kijani Harvest Network helps smallholder farmers reach growing urban markets with fewer intermediaries. By coordinating aggregation, quality standards and buyer relationships, the project creates a more predictable route from harvest to household.",
  problem: "Independent farmers often face unpredictable prices, high post-harvest losses and limited access to buyers. Fragmented supply chains make it difficult for urban food businesses to source fresh produce consistently and fairly.",
  solution: "A community-led network that combines local collection hubs with simple digital tools for coordinating harvest volumes, quality checks and buyer orders.",
  objectives: ["Connect 500 smallholder farmers to reliable buyers.", "Reduce post-harvest losses by 30% across partner communities.", "Create transparent pricing and dependable payment cycles.", "Build a repeatable model for two additional regions."],
  impact: [
    { value: "500", label: "farmers connected" },
    { value: "30%", label: "less food loss" },
    { value: "3", label: "regions reached" },
  ],
  funding: "$85,000 USD",
  fundingUse: "Collection hub equipment, farmer onboarding, logistics coordination and platform development.",
  timeline: [
    { date: "Q2 2026", title: "Pilot preparation", description: "Confirm farmer groups, collection partners and first buyers.", state: "complete" },
    { date: "Q3 2026", title: "Launch in Greater Accra", description: "Open the first collection hub and coordinate initial harvests.", state: "current" },
    { date: "Q4 2026", title: "Expand farmer network", description: "Onboard new communities and evaluate early outcomes.", state: "upcoming" },
    { date: "Q1 2027", title: "Regional growth", description: "Prepare the model for additional regions.", state: "upcoming" },
  ],
  documents: [
    { name: "Project overview", detail: "PDF · 2.4 MB · Updated Jun 12, 2026" },
    { name: "Impact framework", detail: "PDF · 1.1 MB · Updated Jun 10, 2026" },
    { name: "Implementation budget", detail: "XLSX · 840 KB · Updated Jun 08, 2026" },
  ],
  updates: [
    { date: "June 18, 2026", title: "Pilot partners confirmed", detail: "Two farmer cooperatives and four local buyers have confirmed their participation in the first phase." },
    { date: "June 04, 2026", title: "Community discovery completed", detail: "The team completed listening sessions with growers across three communities in Greater Accra." },
  ],
};

const statusClasses: Record<ProjectStatus, string> = {
  Draft: "badge-neutral",
  "Under review": "badge-warning",
  Approved: "badge-success",
  "Changes requested": "badge-info",
  Rejected: "badge-neutral",
};

export default function ProjectDetail({ projectId }: { projectId: string }) {
  const [role, setRole] = useState<PreviewRole>("owner");
  const [ownerStatus, setOwnerStatus] = useState<ProjectStatus>("Draft");
  const [adminStatus, setAdminStatus] = useState<ProjectStatus>("Under review");
  const [notice, setNotice] = useState("");
  const status = role === "owner" ? ownerStatus : adminStatus;

  function submitProject() {
    setOwnerStatus("Under review");
    setNotice("Project submitted for review in this preview. Nothing was sent to a server.");
  }

  function reviewProject(decision: "Approved" | "Rejected" | "Changes requested") {
    setAdminStatus(decision);
    setNotice(`Preview updated: project marked “${decision}”. No review action was submitted.`);
  }

  return (
    <WorkspaceFrame currentPage="Project details" activeHref="/dashboard/projects">
      <div className="project-detail-page">
        <div className="project-detail-breadcrumb"><Link href="/dashboard">Workspace</Link><span>/</span><Link href="/dashboard/projects">My Projects</Link><span>/</span><strong>Project details</strong></div>

        <div className="project-detail-topline">
          <div><p className="dashboard-overline">PROJECT OVERVIEW <span>·</span> REF {projectId.toUpperCase()}</p><h1>Project details</h1><p>Review the project, its progress and the next steps.</p></div>
          <div className="project-role-preview" aria-label="Preview project actions by role"><span>Preview as</span><div role="group" aria-label="Select preview role"><button type="button" className={role === "owner" ? "is-selected" : ""} onClick={() => { setRole("owner"); setNotice(""); }}>Entrepreneur</button><button type="button" className={role === "admin" ? "is-selected" : ""} onClick={() => { setRole("admin"); setNotice(""); }}>Administrator</button></div></div>
        </div>

        <section className="project-detail-cover" aria-label="Project cover image">
          <div className="project-detail-cover-shade" />
          <div className="project-detail-cover-content"><span className="project-category-badge">{project.category}</span><span className="project-cover-location"><span aria-hidden="true">⌖</span> {project.location}</span></div>
          <span className="project-cover-mark" aria-hidden="true">K</span>
        </section>

        <div className="project-detail-title-row">
          <div className="project-detail-title"><div><span className="badge badge-info">{project.category}</span><span className={`badge ${statusClasses[status]}`}>{status}</span></div><h2>{project.name}</h2><p>{project.summary}</p></div>
          <div className="project-owner-inline"><span className="avatar avatar-medium">AK</span><span><small>PROJECT OWNER</small><strong>{project.owner}</strong><em>{project.ownerRole}</em></span></div>
        </div>

        {notice && <div className="alert alert-info project-detail-notice" role="status">{notice}</div>}

        <div className="project-detail-layout">
          <div className="project-detail-main">
            <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><h2>About this project</h2><span aria-hidden="true">01</span></div><p className="project-detail-description">{project.description}</p><div className="project-detail-meta"><span><small>LOCATION</small><strong>{project.location}</strong></span><span><small>CATEGORY</small><strong>{project.category}</strong></span><span><small>LAST UPDATED</small><strong>June 18, 2026</strong></span></div></section>

            <div className="project-detail-two-up">
              <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><h2>The problem</h2><span aria-hidden="true">02</span></div><p className="project-detail-body-copy">{project.problem}</p></section>
              <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><h2>Our solution</h2><span aria-hidden="true">03</span></div><p className="project-detail-body-copy">{project.solution}</p></section>
            </div>

            <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><h2>Project objectives</h2><span aria-hidden="true">04</span></div><ul className="project-objectives">{project.objectives.map((objective, index) => <li key={objective}><span>{String(index + 1).padStart(2, "0")}</span>{objective}</li>)}</ul></section>

            <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><div><h2>Expected impact</h2><p>What success could look like for participating communities.</p></div><span aria-hidden="true">05</span></div><div className="project-impact-grid">{project.impact.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div><p className="project-impact-footnote">Projected outcomes shared by the project team.</p></section>

            <section className="dashboard-panel project-detail-panel" id="timeline"><div className="project-detail-panel-heading"><div><h2>Project timeline</h2><p>Planned milestones for the first phase.</p></div><span aria-hidden="true">06</span></div><div className="project-timeline">{project.timeline.map((milestone) => <article className={`project-timeline-item is-${milestone.state}`} key={milestone.title}><span className="project-timeline-marker" aria-hidden="true">{milestone.state === "complete" ? "✓" : ""}</span><div><small>{milestone.date}</small><h3>{milestone.title}</h3><p>{milestone.description}</p></div></article>)}</div></section>

            <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><div><h2>Funding &amp; resources</h2><p>What the project needs to reach its next milestones.</p></div><span aria-hidden="true">07</span></div><div className="project-funding-summary"><span className="project-funding-icon" aria-hidden="true">$</span><span><small>FUNDING TARGET</small><strong>{project.funding}</strong></span><span className="badge badge-warning">Seeking support</span></div><p className="project-detail-body-copy">{project.fundingUse}</p><div className="project-resource-tags"><span>Collection equipment</span><span>Market access</span><span>Logistics partners</span><span>Digital product support</span></div></section>

            <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><div><h2>Project documents</h2><p>Files shared by the project owner.</p></div><span aria-hidden="true">08</span></div><div className="project-documents-list">{project.documents.map((document) => <article key={document.name}><span className="profile-document-icon" aria-hidden="true">{document.name === "Implementation budget" ? "XLS" : "PDF"}</span><span><strong>{document.name}</strong><small>{document.detail}</small></span><Link href="/dashboard/documents" aria-label={`View ${document.name}`}>↗</Link></article>)}</div></section>

            <section className="dashboard-panel project-detail-panel"><div className="project-detail-panel-heading"><div><h2>Project updates</h2><p>Recent notes from the team.</p></div><span aria-hidden="true">09</span></div><div className="project-updates-list">{project.updates.map((update) => <article key={update.title}><span className="project-update-dot" aria-hidden="true" /><div><small>{update.date}</small><h3>{update.title}</h3><p>{update.detail}</p></div></article>)}</div></section>
          </div>

          <aside className="project-detail-sidebar" aria-label="Project information and actions">
            <section className="dashboard-panel project-side-card"><div className="project-side-heading"><h2>Project status</h2><span className={`badge ${statusClasses[status]}`}>{status}</span></div><p>{role === "admin" ? "This project is awaiting an administrative review." : status === "Draft" ? "Your project has not been submitted for review yet." : "Your project has been sent to the AfriLaunch team for review."}</p><div className="project-status-track"><span className="is-done"><i>✓</i><span>Created</span></span><i className={status === "Draft" ? "" : "is-done"} /><span className={status === "Draft" ? "" : "is-current"}><i>{status === "Draft" ? "2" : "✓"}</i><span>Review</span></span><i /><span><i>3</i><span>Decision</span></span></div><Link href="#timeline">View project timeline <span aria-hidden="true">→</span></Link></section>

            <section className="dashboard-panel project-side-card"><div className="project-side-heading"><h2>Project owner</h2><Link href="/dashboard/profile" aria-label="View owner profile">↗</Link></div><div className="project-owner-card"><span className="avatar avatar-large">AK</span><div><strong>{project.owner}</strong><small>{project.ownerRole}</small><small>{project.location}</small></div></div><Link className="project-owner-profile-link" href="/dashboard/profile">View profile <span aria-hidden="true">→</span></Link></section>

            <section className="dashboard-panel project-side-card project-action-card"><div className="project-side-heading"><h2>{role === "admin" ? "Review actions" : "Important actions"}</h2><span aria-hidden="true">⋯</span></div>{role === "owner" ? <><p>Choose what you’d like to do next.</p><div className="project-action-list"><Link className="button button-outline" href={`/dashboard/projects/${projectId}/edit`}><span aria-hidden="true">↗</span> Edit project</Link><button className="button button-primary" type="button" onClick={submitProject} disabled={ownerStatus === "Under review"}><span aria-hidden="true">↑</span> {ownerStatus === "Under review" ? "Submitted for review" : "Submit project"}</button><Link className="button button-ghost" href="#timeline"><span aria-hidden="true">◷</span> Track status</Link></div>{ownerStatus === "Under review" && <small className="project-action-helper">This project is already in the review queue.</small>}</> : <><p>Review this submission and record the next step.</p><div className="project-action-list"><button className="button button-primary" type="button" onClick={() => reviewProject("Approved")}><span aria-hidden="true">✓</span> Approve project</button><button className="button button-outline" type="button" onClick={() => reviewProject("Changes requested")}><span aria-hidden="true">↻</span> Request changes</button><button className="button button-danger" type="button" onClick={() => reviewProject("Rejected")}><span aria-hidden="true">×</span> Reject project</button></div></>}</section>

            <section className="project-side-help"><span aria-hidden="true">i</span><p><strong>Need help?</strong><span>Our team can help with project details and submission requirements.</span><Link href="/contact">Contact support <span aria-hidden="true">→</span></Link></p></section>
          </aside>
        </div>
        <p className="dashboard-demo-note">Sample project information. Role switch and actions are a UI preview only.</p>
      </div>
    </WorkspaceFrame>
  );
}
