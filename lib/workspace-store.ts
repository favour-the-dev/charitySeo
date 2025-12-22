import { create } from "zustand";
import { nanoid } from "nanoid";

export type Role = "Client" | "Administrator" | "Manager";

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  workspaceIds: string[];
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  image?: string;
  isDefault: boolean;
  members: TeamMember[];
}

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  setActiveWorkspace: (id: string) => void;
  addWorkspace: (workspace: Omit<Workspace, "id" | "members">) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
}

const initialWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "CharitySEO HQ",
    slug: "charityseo-hq",
    isDefault: true,
    members: [
      {
        id: "m1",
        firstName: "John",
        lastName: "Doe",
        email: "john@charityseo.com",
        role: "Administrator",
        workspaceIds: ["1"],
      },
    ],
  },
  {
    id: "2",
    name: "Marketing Team",
    slug: "marketing-team",
    isDefault: false,
    members: [],
  },
  {
    id: "3",
    name: "Support Ops",
    slug: "support-ops",
    isDefault: false,
    members: [],
  },
];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: initialWorkspaces,
  activeWorkspaceId: "1",

  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),

  addWorkspace: (workspaceData) =>
    set((state) => {
      const newWorkspace: Workspace = {
        ...workspaceData,
        id: nanoid(),
        members: [],
      };
      return { workspaces: [...state.workspaces, newWorkspace] };
    }),

  addTeamMember: (memberData) =>
    set((state) => {
      const newMember: TeamMember = {
        ...memberData,
        id: nanoid(),
      };

      // Add member to the assigned workspaces
      const updatedWorkspaces = state.workspaces.map((ws) => {
        if (memberData.workspaceIds.includes(ws.id)) {
          return { ...ws, members: [...ws.members, newMember] };
        }
        return ws;
      });

      return { workspaces: updatedWorkspaces };
    }),
}));
