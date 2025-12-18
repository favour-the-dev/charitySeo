import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Automation {
  id: string;
  triggerSource: string;
  event: string;
  condition?: string;
  action: string;
  target: string;
  isActive: boolean;
  createdAt: string;
}

interface AutomationsState {
  automations: Automation[];
  addAutomation: (
    automation: Omit<Automation, "id" | "createdAt" | "isActive">
  ) => void;
  toggleAutomation: (id: string) => void;
  deleteAutomation: (id: string) => void;
}

export const useAutomationsStore = create<AutomationsState>()(
  persist(
    (set) => ({
      automations: [
        {
          id: "1",
          triggerSource: "Review",
          event: "Received",
          action: "Assign a Status",
          target: "Needs Assistance",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          triggerSource: "Google Q&A",
          event: "Received",
          condition: "Contains Updated Answer",
          action: "Notify",
          target: "Netsach Ike",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ],
      addAutomation: (automation) =>
        set((state) => ({
          automations: [
            ...state.automations,
            {
              ...automation,
              id: Math.random().toString(36).substring(7),
              isActive: true,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleAutomation: (id) =>
        set((state) => ({
          automations: state.automations.map((a) =>
            a.id === id ? { ...a, isActive: !a.isActive } : a
          ),
        })),
      deleteAutomation: (id) =>
        set((state) => ({
          automations: state.automations.filter((a) => a.id !== id),
        })),
    }),
    {
      name: "automations-storage",
    }
  )
);
