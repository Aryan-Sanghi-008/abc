import { create } from "zustand";

type InvitationState = {
  soundOn: boolean;
  revealed: boolean;
  toggleSound: () => void;
  reveal: () => void;
};

export const useInvitationStore = create<InvitationState>((set, get) => ({
  soundOn: false,
  revealed: false,
  toggleSound: () => set({ soundOn: !get().soundOn }),
  reveal: () => set({ revealed: true }),
}));
