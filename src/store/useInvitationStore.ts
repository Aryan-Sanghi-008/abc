import { create } from "zustand";

type InvitationState = {
  soundOn: boolean;
  revealed: boolean;
  audioUnlocked: boolean;
  toggleSound: () => void;
  reveal: () => void;
  initAudio: () => void;
};

export const useInvitationStore = create<InvitationState>((set, get) => ({
  soundOn: false,
  revealed: false,
  audioUnlocked: false,
  toggleSound: () => set({ soundOn: !get().soundOn }),
  reveal: () => set({ revealed: true }),
  // Called on the first user tap (gate screen) to unlock browser audio policy
  initAudio: () => set({ soundOn: true, audioUnlocked: true }),
}));
