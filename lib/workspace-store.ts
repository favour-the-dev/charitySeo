import { create } from "zustand";
import WorkspaceService from "@/services/Workspace";
import {
  Workspace,
  CreateWorkspacePayload,
  createWorkspaceResponse,
  UpdateWorkspacePayload,
} from "@/types/types";
import TeamMemberService, {
  CreateTeamMemberRequest,
  UpdateTeamMemberRequest,
} from "@/services/TeamMember";
import { UserWorkspace, TeamMemberType } from "@/types/types";
export type Role = "Client" | "Administrator" | "Manager" | string;

type teamMemberResponse = {
  status: string;
  message: string;
  errors?: Record<string, string[]>;
};

interface WorkspaceState {
  workspaces: Workspace[];
  teamMembers: TeamMemberType[];
  activeWorkspaceId: number | null;
  isLoading: boolean;
  isFetching: boolean;
  isInitializing: boolean;
  error: string | null;

  fetchWorkspaces: (silent?: boolean) => Promise<void>;
  createWorkspace: (
    data: CreateWorkspacePayload
  ) => Promise<createWorkspaceResponse>;
  updateWorkspace: (data: UpdateWorkspacePayload) => Promise<void>;
  deleteWorkspace: (id: number) => Promise<void>;
  setActiveWorkspace: (id: number) => Promise<void>;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspaceId: (id: number) => void;
  setIsInitializing: (isInitializing: boolean) => void;
  fetchTeamMembers: (silent?: boolean) => Promise<void>;
  createTeamMember: (
    data: CreateTeamMemberRequest
  ) => Promise<teamMemberResponse>;
  updateTeamMember: (data: UpdateTeamMemberRequest) => Promise<void>;
  deleteTeamMember: (id: number) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaces: [],
  teamMembers: [],
  activeWorkspaceId: null,
  isLoading: false,
  isFetching: false,
  isInitializing: true,
  error: null,

  setIsInitializing: (isInitializing) => set({ isInitializing }),

  fetchWorkspaces: async (silent = false) => {
    set({ isLoading: true, isFetching: !silent, error: null });
    try {
      const response = await WorkspaceService.getAll();
      // console.log("workspaces", response);

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
      set({ isLoading: false, isFetching: false });
    }
  },

  createWorkspace: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newWorkspace = await WorkspaceService.create(data);
      set((state) => ({
        workspaces: [...state.workspaces, newWorkspace.workspace as Workspace],
      }));
      return newWorkspace;
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
      await get().fetchWorkspaces(true);
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
      await get().fetchWorkspaces(true);
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

  fetchTeamMembers: async (silent = false) => {
    set({ isLoading: true, isFetching: !silent, error: null });
    try {
      const response = await TeamMemberService.getAll();
      console.log("team member response", response);

      const rawMembers: TeamMemberType[] =
        response.users && Array.isArray(response.users) ? response.users : [];

      const teamMembers: TeamMemberType[] = rawMembers as TeamMemberType[];

      set({ teamMembers });
    } catch (error) {
      console.error("Error fetching team members:", error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false, isFetching: false });
    }
  },

  createTeamMember: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const newMember = await TeamMemberService.create(data);
      set((state) => ({
        teamMembers: [...state.teamMembers, newMember.user as TeamMemberType],
      }));
      return {
        status: "success",
        message: "Team member created successfully",
      };
    } catch (error: any) {
      console.error("Error creating team member:", error);
      set({ error: error.message });
      return {
        status: "error",
        message: error.message,
        errors: error.errors, // 👈 IMPORTANT
      };
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
      await get().fetchTeamMembers(true);
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
      await get().fetchTeamMembers(true);
    } catch (error) {
      console.error("Error deleting team member:", error);
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
