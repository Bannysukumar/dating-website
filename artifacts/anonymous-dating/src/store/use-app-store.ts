import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Gender = "Male" | "Female";

export interface User {
  name: string;
  gender: Gender;
}

export interface Match {
  roomId: string;
  partner: User;
  isInitiator: boolean;
  startTime: number;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  
  currentMatch: Match | null;
  setMatch: (match: Match | null) => void;
  
  isQueueing: boolean;
  setIsQueueing: (val: boolean) => void;
  
  clearState: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      
      currentMatch: null,
      setMatch: (match) => set({ currentMatch: match }),
      
      isQueueing: false,
      setIsQueueing: (val) => set({ isQueueing: val }),
      
      clearState: () => set({ user: null, currentMatch: null, isQueueing: false }),
    }),
    {
      name: "anonymous-dating-storage",
      partialize: (state) => ({ user: state.user }), // Only persist user info
    }
  )
);
