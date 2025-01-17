import React, { FC, useEffect, useState } from 'react'
import { Layer, LottieAnimationBase } from '../types'
import { Player } from '@lottiefiles/react-lottie-player'
import { useStore } from '@/app/stores'

interface ILayerItemProps {
  layerData: Layer
  animationData: LottieAnimationBase,
  idx: number
  isSelected: boolean;
  onSelectLayer: (selectedLayer: Layer) => void
  sessionState: any;
  isExternallySelected: boolean;
  hideLayer: (layer: Layer) => void;
  showLayer: (layer: Layer) => void;
  deleteLayer: (animationData: LottieAnimationBase, layerName: string) => void;
}

export const LayerItem: FC<ILayerItemProps> = ({
  layerData,
  animationData,
  onSelectLayer,
  sessionState,
  isExternallySelected,
  isSelected,
  hideLayer,
  showLayer,
  deleteLayer,
  idx
}) => {
  // TODO : This and its function should be in the parent to improve performance
  const [isHidden, setIsHidden] = useState(false);
  const { updateLayerData, colorScheme } = useStore()
  const { layers, ...rest } = animationData
  const source = {
    ...rest,
    layers: [{ ...layerData }],
  }

  const toggleLayer = () => {
    setIsHidden(prevState => !prevState)
  }

  const selectLayer = () => {
    onSelectLayer(layerData)
  }

  useEffect(() => {
    if (isHidden) {
      hideLayer(layerData)
    } else {
      showLayer(layerData)
    }
  }, [layerData, isHidden, hideLayer, showLayer])

  return (
    <>
      <div className={`flex flex-row items-center mb-4 hover:border-2 rounded-md border-gray-500 ${isSelected ? colorScheme : isExternallySelected ? sessionState?.colorScheme : ''}`} onClick={selectLayer}>
        <div className='flex flex-row items-center'>
          <div id={`box-${layerData.mn || layerData.nm}`} className='w-16 h-16 bg-slate-300 justify-center items-center flex rounded-md'>
            <Player
              className='w-8 h-8'
              src={JSON.stringify(source)}
            />
          </div>
          <p className='ml-6'>{layerData.nm}</p>
        </div>
        <div className='flex flex-1 justify-end mr-4'>
          <button className='p-2 bg-gray-300 rounded-md mr-5' onClick={toggleLayer}>{isHidden ? 'Show' : 'Hide'}</button>
          <button className='p-2 bg-red-800 rounded-md text-white' onClick={() => deleteLayer(animationData, layerData.nm)}>Del</button>
        </div>
      </div>
    </>
  )
}