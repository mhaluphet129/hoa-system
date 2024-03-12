import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { ProtectedUser } from "@/types";

type UserStore = {
  currentUser: ProtectedUser | null;
  setUser: (user: any) => void;
  removeUser: () => void;
};

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

const useUserStore = create<UserStore, []>(
  (persist as MyPersist)(
    (set, get): UserStore => ({
      currentUser: null,
      setUser: (user: ProtectedUser) => set(() => ({ currentUser: user })),
      removeUser: () => set({ currentUser: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useUserStore };
