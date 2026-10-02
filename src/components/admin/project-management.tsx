"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "Under review" | "Approved" | "Rejected" | "Changes requested" | "Draft";
type ReviewAction = "Approved" | "Rejected" | "Changes requested";
type Project = { id: string; title: string; owner: string; initials: string; email: string; category: string; submitted: string; status: Status };

const initialProjects: Project[] = [
  { id: "kijani-harvest-network", title: "Kijani Harvest Network", owner: "Aïcha Koné", initials: "AK", email: "aicha.kone@example.com", category: "Agriculture", submitted: "2026-06-21", status: "Under review" },
  { id: "solar-for-all-initiative", title: "Solar for All Initiative", owner: "David Niyonzima", initials: "DN", email: "david.n@example.com", category: "Clean energy", submitted: "2026-06-20", status: "Under review" },
  { id: "mtaa-learning-hub", title: "Mtaa Learning Hub", owner: "Fatou Ouédraogo", initials: "FO", email: "fatou.o@example.com", category: "Education", submitted: "2026-06-19", status: "Approved" },
  { id: "afya-community-care", title: "Afya Community Care", owner: "James Mensah", initials: "JM", email: "james.m@example.com", category: "Healthcare", submitted: "2026-06-17", status: "Changes requested" },
  { id: "marketlink-cooperative", title: "MarketLink Cooperative", owner: "Emeka Okafor", initials: "EO", email: "emeka.o@example.com", category: "Technology", submitted: "2026-06-15", status: "Under review" },
  { id: "her-power-finance", title: "HerPower Finance", owner: "Nana Boateng", initials: "NB", email: "nana.b@example.com", category: "Financial inclusion", submitted: "2026-06-11", status: "Rejected" },
  { id: "clean-water-collective", title: "Clean Water Collective", owner: "Grace Amani", initials: "GA", email: "grace.a@example.com", category: "Healthcare", submitted: "2026-06-09", status: "Draft" },
  { id: "farmwise-connect", title: "FarmWise Connect", owner: "Peter Mwangi", initials: "PM", email: "peter.m@example.com", category: "Agriculture", submitted: "2026-06-03", status: "Under review" },
];
const dateFilterReference = new Date("2026-06-22T00:00:00Z").getTime();

const statusStyles: Record<Status, string> = {
  "Under review": "badge-warning",
  Approved: "badge-success",
  Rejected: "badge-neutral",
  "Changes requested": "badge-info",
  Draft: "badge-neutral",
};

const actionCopy: Record<ReviewAction, { title: string; description: string; button: string }> = {
  Approved: { title: "Approve project", description: "This project will be marked as approved and the owner will be notified in the platform.", button: "Confirm approval" },
  Rejected: { title: "Reject project", description: "This project will be marked as rejected. You can include a reason for the project record.", button: "Confirm rejection" },
  "Changes requested": { title: "Request changes", description: "Send the project back to its owner with a clear note about the changes required.", button: "Send change request" },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [dateRange, setDateRange] = useState("Any time");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<{ projectId: string; action: ReviewAction } | null>(null);
  const [reason, setReason] = useState("");
  const [dialogError, setDialogError] = useState("");
  const [notice, setNotice] = useState("");
  const pageSize = 6;

  const filteredProjects = projects.filter((project) => {
    const query = search.trim().toLowerCase();
    const matchesQuery = !query || `${project.title} ${project.owner} ${project.email}`.toLowerCase().includes(query);
    const matchesCategory = category === "All categories" || project.category === category;
    const matchesStatus = status === "All statuses" || project.status === status;
    const daysAgo = Math.floor((dateFilterReference - new Date(`${project.submitted}T00:00:00Z`).getTime()) / 86_400_000);
    const matchesDate = dateRange === "Any time" || (dateRange === "Last 7 days" && daysAgo <= 7) || (dateRange === "Last 30 days" && daysAgo <= 30);
    return matchesQuery && matchesCategory && matchesStatus && matchesDate;
  });
  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const visibleProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);
  const pendingCount = projects.filter((project) => project.status === "Under review").length;

  function updateFilter(update: () => void) {
    update();
    setPage(1);
  }

  function openAction(projectId: string, action: ReviewAction) {
    setDialog({ projectId, action });
    setReason("");
    setDialogError("");
  }

  function confirmAction() {
    if (!dialog) return;
    if (dialog.action === "Changes requested" && !reason.trim()) {
      setDialogError("Add a short note describing the requested changes.");
      return;
    }
    setProjects((current) => current.map((project) => project.id === dialog.projectId ? { ...project, status: dialog.action } : project));
    const project = projects.find((item) => item.id === dialog.projectId);
    setNotice(`${project?.title ?? "Project"} marked as ${dialog.action.toLowerCase()} in this preview. No notification was sent.`);
    setDialog(null);
  }

  function clearFilters() {
    setSearch("");
    setCategory("All categories");
    setStatus("All statuses");
    setDateRange("Any time");
    setPage(1);
  }

  return (
    <div className="admin-projects-page">
      <div className="admin-page-heading admin-projects-heading"><div><p className="dashboard-overline">ADMINISTRATION</p><h1>Project management</h1><p>Review submissions and manage projects across the ecosystem.</p></div><span className="admin-queue-count"><i />{pendingCount} awaiting review</span></div>

      {notice && <div className="alert alert-success admin-action-notice" role="status">{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}

      <section className="admin-panel admin-projects-panel" aria-label="Project management table">
        <div className="admin-projects-toolbar">
          <label className="admin-project-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={(event) => updateFilter(() => setSearch(event.target.value))} placeholder="Search projects or owners..." aria-label="Search projects or owners" /></label>
          <label className="admin-project-filter"><span className="visually-hidden">Category</span><select value={category} onChange={(event) => updateFilter(() => setCategory(event.target.value))}><option>All categories</option><option>Agriculture</option><option>Clean energy</option><option>Education</option><option>Financial inclusion</option><option>Healthcare</option><option>Technology</option></select></label>
          <label className="admin-project-filter"><span className="visually-hidden">Status</span><select value={status} onChange={(event) => updateFilter(() => setStatus(event.target.value))}><option>All statuses</option><option>Under review</option><option>Approved</option><option>Rejected</option><option>Changes requested</option><option>Draft</option></select></label>
          <label className="admin-project-filter admin-date-filter"><span className="visually-hidden">Submission date</span><select value={dateRange} onChange={(event) => updateFilter(() => setDateRange(event.target.value))}><option>Any time</option><option>Last 7 days</option><option>Last 30 days</option></select></label>
          <button className="admin-clear-filters" type="button" onClick={clearFilters}>Reset</button>
        </div>
        <div className="admin-projects-table-wrap">
          <table className="admin-projects-table">
            <thead><tr><th scope="col">Project</th><th scope="col">Owner</th><th scope="col">Category</th><th scope="col">Submitted</th><th scope="col">Status</th><th scope="col"><span className="visually-hidden">Actions</span></th></tr></thead>
            <tbody>{visibleProjects.map((project) => (
              <tr key={project.id}>
                <td data-label="Project"><span className="admin-project-mark" aria-hidden="true">{project.title.slice(0, 1)}</span><span className="admin-project-cell-title"><Link href={`/admin/projects/${project.id}`}>{project.title}</Link><small>Project ID · {project.id.slice(0, 8).toUpperCase()}</small></span></td>
                <td data-label="Owner"><span className="admin-owner-cell"><span className="admin-table-avatar">{project.initials}</span><span><strong>{project.owner}</strong><small>{project.email}</small></span></span></td>
                <td data-label="Category">{project.category}</td>
                <td data-label="Submitted">{formatDate(project.submitted)}</td>
                <td data-label="Status"><span className={`badge ${statusStyles[project.status]}`}>{project.status}</span></td>
                <td data-label="Actions"><div className="admin-project-row-actions"><Link href={`/dashboard/projects/${project.id}`} aria-label={`View ${project.title}`}>View</Link><Link className="admin-review-link" href={`/admin/projects/${project.id}`}>Review</Link><details className="admin-row-menu"><summary aria-label={`More actions for ${project.title}`}>···</summary><div><button type="button" onClick={() => openAction(project.id, "Approved")}>Approve</button><button type="button" onClick={() => openAction(project.id, "Rejected")}>Reject</button><button type="button" onClick={() => openAction(project.id, "Changes requested")}>Request changes</button></div></details></div></td>
              </tr>
            ))}</tbody>
          </table>
          {filteredProjects.length === 0 && <div className="admin-projects-empty"><span aria-hidden="true">⌕</span><strong>No projects found</strong><p>Try another search or adjust the selected filters.</p><button type="button" onClick={clearFilters}>Clear all filters</button></div>}
        </div>
        <div className="admin-projects-pagination"><span>Showing <strong>{filteredProjects.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredProjects.length)}</strong> of <strong>{filteredProjects.length}</strong> projects</span><div><button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>← Previous</button><span className="admin-page-number">{page} / {pageCount}</span><button type="button" disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next →</button></div></div>
      </section>

      <p className="admin-demo-note">Sample project data for interface preview. Review actions are stored in this page only.</p>

      {dialog && <div className="admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}><section className="admin-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" aria-describedby="admin-dialog-description"><button className="admin-dialog-close" type="button" onClick={() => setDialog(null)} aria-label="Close dialog">×</button><span className={`admin-dialog-icon dialog-${dialog.action === "Approved" ? "approve" : dialog.action === "Rejected" ? "reject" : "changes"}`} aria-hidden="true">{dialog.action === "Approved" ? "✓" : dialog.action === "Rejected" ? "×" : "↻"}</span><p className="dashboard-overline">PROJECT REVIEW</p><h2 id="admin-dialog-title">{actionCopy[dialog.action].title}</h2><p id="admin-dialog-description">{actionCopy[dialog.action].description}</p>{dialog.action === "Changes requested" && <label className="admin-dialog-reason">Note for the project owner<textarea value={reason} onChange={(event) => { setReason(event.target.value); setDialogError(""); }} rows={3} placeholder="Explain what the owner should update..." aria-invalid={Boolean(dialogError)} />{dialogError && <small>{dialogError}</small>}</label>}{dialog.action === "Rejected" && <label className="admin-dialog-reason">Reason (optional)<textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} placeholder="Add context for the project record..." /></label>}<div className="admin-dialog-actions"><button className="button button-outline" type="button" onClick={() => setDialog(null)}>Cancel</button><button className={`button ${dialog.action === "Rejected" ? "button-danger" : "button-primary"}`} type="button" onClick={confirmAction}>{actionCopy[dialog.action].button}</button></div></section></div>}
    </div>
  );
}
