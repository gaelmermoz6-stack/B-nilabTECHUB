"use client";

import { FormEvent, useState } from "react";

export function ProjectEditPreview({ projectId }: { projectId: string }) {
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <div>
      <div className="dashboard-welcome-row"><div><p className="dashboard-overline">PROJECT {projectId.toUpperCase()}</p><h1>Edit project</h1><p>Review the project information before continuing.</p></div></div>
      <form className="dashboard-panel register-form" onSubmit={handleSubmit}>
        <div className="register-field"><label htmlFor="edit-project-name">Project name</label><input id="edit-project-name" defaultValue="Kijani Harvest Network" required /></div>
        <div className="register-field"><label htmlFor="edit-project-summary">Short description</label><textarea id="edit-project-summary" defaultValue="Connecting smallholder farmers to fair, reliable markets through a locally rooted digital supply network." rows={4} required /></div>
        <div className="register-field"><label htmlFor="edit-project-location">Location</label><input id="edit-project-location" defaultValue="Accra, Ghana" required /></div>
        <div className="project-action-list"><button className="button button-primary" type="submit">Preview changes</button><a className="button button-outline" href={`/dashboard/projects/${projectId}`}>Cancel</a></div>
        {saved && <p className="register-status register-status-info" role="status">Changes previewed only. Nothing was saved or sent to a server.</p>}
      </form>
    </div>
  );
}
