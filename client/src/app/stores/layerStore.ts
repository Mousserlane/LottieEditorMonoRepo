import { StateCreator } from 'zustand'
import { Layer, LottieAnimationBase } from '../features/LayerManager/types'

export type LottieAnimationStore = {
  layers: Layer[];
  animation: LottieAnimationBase | null;
  setAnimationData: (animationData: LottieAnimationBase) => void;
  setLayers: () => void;
  setAnimationAndLayers: (animationData: LottieAnimationBase) => void;
  selectedLayer: Layer | null;
  setSelectedLayer: (layerData: Layer) => void;
  updateLayerData: (newLayerData: Layer) => void;
}

export const createLottieAnimationStore: StateCreator<LottieAnimationStore, [], [], LottieAnimationStore> = (set, get) => ({
  layers: [],
  selectedLayer: null,
  animation: null,
  setAnimationData: (animation) => {
    set(() => ({ animation }))
  },
  setLayers: () => {
    set((state) => {
      if (!state.animation) {
        return state
      }
      return {
        layers: state.animation.layers
      }
    })
  },
  setAnimationAndLayers: (animation) => {
    get().setAnimationData(animation)
    get().setLayers()
  },
  setSelectedLayer: (layerData) => {
    set(() => ({ selectedLayer: layerData }))
  },
  updateLayerData: (newLayerData) => {
    // set(() => ({ animation: newAnimationData }))
    set((state) => ({
      animation: {
        ...state.animation!,
        layers: state.animation!.layers.map((layer) => {
          return layer.nm === newLayerData.nm ? newLayerData : layer
        })
      }
    }))
  }
})