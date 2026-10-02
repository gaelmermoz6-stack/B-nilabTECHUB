export type UserRole = "USER" | "ADMIN";

export type Permission =
  | "read:self"
  | "write:self"
  | "read:projects"
  | "write:projects"
  | "read:applications"
  | "write:applications"
  | "read:admin"
  | "write:admin";

const rolePermissions: Record<UserRole, Permission[]> = {
  USER: ["read:self", "write:self", "read:projects", "read:applications", "write:applications"],
  ADMIN: [
    "read:self",
    "write:self",
    "read:projects",
    "write:projects",
    "read:applications",
    "write:applications",
    "read:admin",
    "write:admin",
  ],
};

export function hasPermission(role: UserRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function isAdmin(role: UserRole) {
  return role === "ADMIN";
}
