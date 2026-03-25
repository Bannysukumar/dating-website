import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Gender = "Male" | "Female";
export type Theme = "dark" | "light";
export type Language = "en" | "te";

export interface User {
  name: string;
  gender: Gender;
  interests?: string[];
}

export interface Match {
  roomId: string;
  partner: User;
  isInitiator: boolean;
  startTime: number;
}

export interface RecentMatch {
  name: string;
  gender: Gender;
  interests?: string[];
  matchedAt: number;
  duration: number;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;

  currentMatch: Match | null;
  setMatch: (match: Match | null) => void;

  isQueueing: boolean;
  setIsQueueing: (val: boolean) => void;

  recentMatches: RecentMatch[];
  addRecentMatch: (match: RecentMatch) => void;
  clearRecentMatches: () => void;

  theme: Theme;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;

  clearState: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      currentMatch: null,
      setMatch: (match) => set({ currentMatch: match }),

      isQueueing: false,
      setIsQueueing: (val) => set({ isQueueing: val }),

      recentMatches: [],
      addRecentMatch: (match) =>
        set((state) => ({
          recentMatches: [match, ...state.recentMatches].slice(0, 10),
        })),
      clearRecentMatches: () => set({ recentMatches: [] }),

      theme: "dark",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle("dark", next === "dark");
        document.documentElement.classList.toggle("light", next === "light");
        set({ theme: next });
      },

      language: "en",
      setLanguage: (lang) => set({ language: lang }),

      clearState: () =>
        set({ user: null, currentMatch: null, isQueueing: false }),
    }),
    {
      name: "anonymous-dating-storage",
      partialize: (state) => ({
        user: state.user,
        recentMatches: state.recentMatches,
        theme: state.theme,
        language: state.language,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle(
            "dark",
            state.theme === "dark",
          );
          document.documentElement.classList.toggle(
            "light",
            state.theme === "light",
          );
        }
      },
    },
  ),
);
