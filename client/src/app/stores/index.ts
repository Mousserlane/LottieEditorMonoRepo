import { create } from 'zustand'
import { LottieAnimationStore, createLottieAnimationStore } from './layerStore';
import { UserSessionStore, createUserSessionStore } from './userSessionStore'

export type Stores = LottieAnimationStore & UserSessionStore;

export const useStore = create<Stores>((...a) => ({
  ...createLottieAnimationStore(...a),
  ...createUserSessionStore(...a),
}));