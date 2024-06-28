import { StateCreator } from 'zustand'

export type UserSessionStore = {
  clientId: string | null;
  colorScheme: string | null;
  userState?: string;
  setClientId: (clientId: string) => void;
  setColorScheme: (color: string) => void;
}

export const createUserSessionStore: StateCreator<UserSessionStore, [], [], UserSessionStore> = (set) => ({
  clientId: null,
  colorScheme: null,
  userState: undefined,
  setClientId: (clientId) => set({
    clientId
  }),
  setColorScheme: (color) => set({ colorScheme: color })
})