"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/user-store";
import { useWorkspaceStore } from "@/lib/workspace-store";
import AuthService from "@/services/Auth";
import { getCookie } from "cookies-next/client";

export function AuthInit() {
  const { setUser } = useUserStore();
  const { setWorkspaces, setActiveWorkspaceId, setIsInitializing } =
    useWorkspaceStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie("authToken");
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const response = await AuthService.getMe();
        console.log("AuthInit response:", response);
        const userData = response.user || response.data?.user || response.data;

        if (userData && userData.email) {
          const user = userData;
          setUser(user);

          if (
            user.all_user_workspaces &&
            Array.isArray(user.all_user_workspaces)
          ) {
            const workspaces = user.all_user_workspaces.map(
              (uw: any) => uw.workspace
            );
            setWorkspaces(workspaces);
          }

          if (user.active_workspace) {
            setActiveWorkspaceId(user.active_workspace.id);
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [setUser, setWorkspaces, setActiveWorkspaceId, setIsInitializing]);

  return null;
}
