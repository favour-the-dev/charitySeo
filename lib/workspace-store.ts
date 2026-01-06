import { create } from "zustand";
import WorkspaceService, {
  Workspace,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
} from "@/services/Workspace";
import TeamMemberService, {
  CreateTeamMemberRequest,
  UpdateTeamMemberRequest,
} from "@/services/TeamMember";
import { UserWorkspace, TeamMemberType } from "@/types/types";
import { AddTeamMemberResponse } from "@/types/types";

export type Role = "Client" | "Administrator" | "Manager" | string;

interface WorkspaceState {
  workspaces: Workspace[];
  teamMembers: TeamMemberType[];
  activeWorkspaceId: number | null;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;

  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (data: CreateWorkspaceRequest) => Promise<void>;
  updateWorkspace: (data: UpdateWorkspaceRequest) => Promise<void>;
  deleteWorkspace: (id: number) => Promise<void>;
  setActiveWorkspace: (id: number) => Promise<void>;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspaceId: (id: number) => void;
  setIsInitializing: (isInitializing: boolean) => void;

  fetchTeamMembers: () => Promise<void>;
  createTeamMember: (
    data: CreateTeamMemberRequest
  ) => Promise<AddTeamMemberResponse>;
  updateTeamMember: (data: UpdateTeamMemberRequest) => Promise<void>;
  deleteTeamMember: (id: number) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  teamMembers: [],
  activeWorkspaceId: null,
  isLoading: false,
  isInitializing: true,
  error: null,

  setIsInitializing: (isInitializing) => set({ isInitializing }),

  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await WorkspaceService.getAll();
      console.log("workspaces", response);

      // Map the userWorkspaces response to extract the actual workspace objects
      const workspaces = response.userWorkspaces
        ? response.userWorkspaces.map((item: UserWorkspace) => item.workspace)
        : [];

      set({ workspaces });

      const currentActive = get().activeWorkspaceId;
      if (!currentActive && workspaces.length > 0) {
        // If the API returns a currentWorkspace, use that as default
        if (response.currentWorkspace) {
          set({ activeWorkspaceId: response.currentWorkspace.id });
        } else {
          set({ activeWorkspaceId: workspaces[0].id });
        }
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createWorkspace: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newWorkspace = await WorkspaceService.create(data);
      set((state) => ({ workspaces: [...state.workspaces, newWorkspace] }));
      await get().fetchWorkspaces();
    } catch (error) {
      console.error("Error creating workspace:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateWorkspace: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedWorkspace = await WorkspaceService.update(data);
      set((state) => ({
        workspaces: state.workspaces.map((w) =>
          w.id === data.id ? updatedWorkspace : w
        ),
      }));
      await get().fetchWorkspaces();
    } catch (error) {
      console.error("Error updating workspace:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteWorkspace: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await WorkspaceService.delete(id);
      set((state) => ({
        workspaces: state.workspaces.filter((w) => w.id !== id),
      }));
      await get().fetchWorkspaces();
    } catch (error) {
      console.error("Error deleting workspace:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setActiveWorkspace: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await WorkspaceService.setActive(id);
      set({ activeWorkspaceId: id });
    } catch (error) {
      console.error("Error setting active workspace:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  setWorkspaces: (workspaces) => set({ workspaces }),
  setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),

  fetchTeamMembers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await TeamMemberService.getAll();
      console.log("team member response", response);

      const rawMembers: TeamMemberType[] =
        response.users && Array.isArray(response.users) ? response.users : [];

      // if (Array.isArray(response)) {
      //   rawMembers = response;
      // } else if (response.users && Array.isArray(response.users)) {
      //   rawMembers = response.users;
      // } else if (response.data && Array.isArray(response.data)) {
      //   rawMembers = response.data;
      // }

      const teamMembers: TeamMemberType[] = rawMembers as TeamMemberType[];

      set({ teamMembers });
    } catch (error) {
      console.error("Error fetching team members:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createTeamMember: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newMember = await TeamMemberService.create(data);
      set((state) => ({
        teamMembers: [...state.teamMembers, newMember.user as TeamMemberType],
      }));
      await get().fetchTeamMembers();
      return newMember;
    } catch (error) {
      console.error("Error creating team member:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateTeamMember: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedMember = await TeamMemberService.update(data);
      set((state) => ({
        teamMembers: state.teamMembers.map((m) =>
          m.id === data.id ? (updatedMember.user as TeamMemberType) : m
        ),
      }));
      await get().fetchTeamMembers();
    } catch (error) {
      console.error("Error updating team member:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTeamMember: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await TeamMemberService.delete(id);
      set((state) => ({
        teamMembers: state.teamMembers.filter((m) => m.id !== id),
      }));
      await get().fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
