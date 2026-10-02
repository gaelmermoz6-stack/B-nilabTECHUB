import type { ComponentProps, ReactNode } from "react";

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" }) {
  return <a className={`button button-${variant} ${className}`} {...props}>{children}</a>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "info" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`surface ${className}`}>{children}</section>;
}

export function Avatar({ name, size = "medium" }: { name: string; size?: "small" | "medium" | "large" }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <span aria-label={name} className={`avatar avatar-${size}`}>{initials}</span>;
}

export function TextField({
  label,
  error,
  helperText,
  id,
  ...props
}: ComponentProps<"input"> & { label: string; error?: string; helperText?: string }) {
  const message = error ?? helperText;
  const messageId = message ? `${id}-message` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}{props.required && <span className="required-mark"> *</span>}</label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={messageId} {...props} />
      {message && <span id={messageId} className={error ? "field-message field-error" : "field-message"}>{message}</span>}
    </div>
  );
}

export function SelectField({
  label,
  id,
  options,
  helperText,
  ...props
}: ComponentProps<"select"> & { label: string; options: Array<{ label: string; value: string }>; helperText?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{props.required && <span className="required-mark"> *</span>}</label>
      <select id={id} {...props}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
      {helperText && <span className="field-message">{helperText}</span>}
    </div>
  );
}

export function TextAreaField({ label, id, helperText, ...props }: ComponentProps<"textarea"> & { label: string; helperText?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{props.required && <span className="required-mark"> *</span>}</label>
      <textarea id={id} {...props} />
      {helperText && <span className="field-message">{helperText}</span>}
    </div>
  );
}

export function Alert({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "success" | "warning" | "danger" }) {
  return <div className={`alert alert-${tone}`} role="status">{children}</div>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><span className="empty-state-mark" aria-hidden="true">＋</span><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-scroll"><table className="data-table"><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>
  );
}
