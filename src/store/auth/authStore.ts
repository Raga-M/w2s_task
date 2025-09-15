import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../../types/common";

interface Auth {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const userAuthStore = create<Auth>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => {
        localStorage.setItem("TOKEN", userData.accessToken);
        set({ user: userData });
      },
      logout: () => {
        localStorage.removeItem("TOKEN");
        set({ user: null });
      },
    }),
    {
      name: "User",
    }
  )
);
