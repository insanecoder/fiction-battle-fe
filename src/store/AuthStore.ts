import { create } from "zustand";
import { type User } from "../types";

type AuthState = {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
};

const getCurrentUser = () => {
  let currUser = null
  const storedUser = localStorage.getItem('userObj')
  if (storedUser) {
    currUser = JSON.parse(storedUser) as User
  }
  return currUser
}
export const useAuthStore = create<AuthState>((set) => ({
  user:  getCurrentUser(),
  setUser: (u) => set({ user: u }),
  logout: () => {
    localStorage.removeItem("userObj");
    set({ user: null });
  },
}));
