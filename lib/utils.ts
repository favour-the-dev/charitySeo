import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoleLabel(role: string): string {
  const roleMap: Record<string, string> = {
    client: "Client",
    administrator: "Administrator",
    manager: "Manager",
    member: "Member",
    owner: "Owner",
    team_member: "Team Member",
    super_admin: "Super Admin",
  };
  return roleMap[role.toLowerCase()] || role;
}
