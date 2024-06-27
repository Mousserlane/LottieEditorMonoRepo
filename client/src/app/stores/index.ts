import { create } from 'zustand'
import { LottieAnimationStore, createLottieAnimationStore } from './layerStore';


export type Stores = LottieAnimationStore;

export const useStore = create<Stores>((...a) => ({
  ...createLottieAnimationStore(...a)
}));