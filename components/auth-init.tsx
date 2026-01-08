"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/user-store";
import { useWorkspaceStore } from "@/lib/workspace-store";
import AuthService from "@/services/Auth";
import { getCookie } from "cookies-next/client";
import { UserWorkspace } from "@/types/types";

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
              (uw: UserWorkspace) => uw.workspace
            );
            setWorkspaces(workspaces);
            // setActiveWorkspaceId(
            //   user.all_user_workspaces.find((uw: UserWorkspace) =>
            //     uw.is_active ? uw.workspace.id : null
            //   )
            // );
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
