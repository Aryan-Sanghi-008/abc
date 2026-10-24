import { create } from "zustand";

type InvitationState = {
  sealed: boolean;
  opening: boolean;
  soundOn: boolean;
  revealed: boolean;
  beginOpen: () => void;
  finishOpen: () => void;
  toggleSound: () => void;
  reveal: () => void;
};

export const useInvitationStore = create<InvitationState>((set, get) => ({
  sealed: true,
  opening: false,
  soundOn: false,
  revealed: false,
  beginOpen: () => {
    if (get().opening || !get().sealed) return;
    set({ opening: true });
  },
  finishOpen: () => set({ sealed: false, opening: false }),
  toggleSound: () => set({ soundOn: !get().soundOn }),
  reveal: () => set({ revealed: true }),
}));
