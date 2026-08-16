import { create } from "zustand";

type PostsState = {
  refreshToken: number;
  triggerRefresh: () => void;
};

export const usePostsStore = create<PostsState>((set) => ({
  refreshToken: 0,
  triggerRefresh: () => set((s) => ({ refreshToken: s.refreshToken + 1 })),
}));
