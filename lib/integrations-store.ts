import { create } from "zustand";
import { nanoid } from "nanoid";

export interface ConnectedAccount {
  id: string;
  name: string;
  email?: string;
  active: boolean;
  dateConnected: string;
  platformId: string; // e.g., page ID for Facebook
}

interface IntegrationsState {
  connectedAccounts: Record<string, ConnectedAccount[]>; // Key is integration ID

  addAccount: (
    integrationId: string,
    account: Omit<ConnectedAccount, "id" | "dateConnected" | "active">
  ) => void;
  toggleAccountActive: (integrationId: string, accountId: string) => void;
  removeAccount: (integrationId: string, accountId: string) => void;
  getAccountsForIntegration: (integrationId: string) => ConnectedAccount[];
}

export const useIntegrationsStore = create<IntegrationsState>((set, get) => ({
  connectedAccounts: {
    "google-business": [
      {
        id: "acc_1",
        name: "Localmator HQ",
        email: "support@localmator.com",
        active: true,
        dateConnected: new Date().toISOString(),
        platformId: "loc_12345",
      },
    ],
  },

  addAccount: (integrationId, accountData) =>
    set((state) => {
      const currentAccounts = state.connectedAccounts[integrationId] || [];
      const newAccount: ConnectedAccount = {
        id: nanoid(),
        dateConnected: new Date().toISOString(),
        active: true,
        ...accountData,
      };

      return {
        connectedAccounts: {
          ...state.connectedAccounts,
          [integrationId]: [...currentAccounts, newAccount],
        },
      };
    }),

  toggleAccountActive: (integrationId, accountId) =>
    set((state) => {
      const accounts = state.connectedAccounts[integrationId] || [];
      const updatedAccounts = accounts.map((acc) =>
        acc.id === accountId ? { ...acc, active: !acc.active } : acc
      );

      return {
        connectedAccounts: {
          ...state.connectedAccounts,
          [integrationId]: updatedAccounts,
        },
      };
    }),

  removeAccount: (integrationId, accountId) =>
    set((state) => {
      const accounts = state.connectedAccounts[integrationId] || [];
      return {
        connectedAccounts: {
          ...state.connectedAccounts,
          [integrationId]: accounts.filter((acc) => acc.id !== accountId),
        },
      };
    }),

  getAccountsForIntegration: (integrationId) => {
    return get().connectedAccounts[integrationId] || [];
  },
}));
