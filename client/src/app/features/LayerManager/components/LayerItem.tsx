import React, { FC, useCallback, useEffect, useState } from 'react'
import { Layer, LottieAnimationBase } from '../types'
import { Player } from '@lottiefiles/react-lottie-player'
import { applyPatch } from 'json-joy/lib/json-patch'
import { useStore } from '@/app/stores'

interface ILayerItemProps {
  layerData: Layer
  animationData: LottieAnimationBase,
  idx: number
  isSelected: boolean;
  onSelectLayer: (selectedLayer: Layer) => void
  sessionState: any;
  isExternallySelected: boolean;
}

export const LayerItem: FC<ILayerItemProps> = ({
  layerData,
  animationData,
  onSelectLayer,
  sessionState,
  isExternallySelected,
  isSelected
}) => {
  // TODO : This and its function should be in the parent to improve performance
  const [isHidden, setIsHidden] = useState(false);
  const { updateLayerData, colorScheme } = useStore()
  const { layers, ...rest } = animationData
  const source = {
    ...rest,
    layers: [{ ...layerData }],
  }

  // TODO : Should be in a hook
  const hideLayer = useCallback((layer: Layer) => {
    const patched = applyPatch(layer, [{ op: 'replace', path: `/ks/o/k`, value: 0 }], { mutate: false })
    updateLayerData(patched.doc as Layer)
  }, [updateLayerData])

  const showLayer = useCallback((layer: Layer) => {
    const patched = applyPatch(layer, [{ op: 'replace', path: `/ks/o/k`, value: 100 }], { mutate: false })
    updateLayerData(patched.doc as Layer)
  }, [updateLayerData])

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

  console.log('is externally selected', isExternallySelected)

  return (
    <>
      <div className={`flex flex-row items-center mb-4 hover:border-2 rounded-md border-gray-500 ${isSelected && colorScheme} ${isExternallySelected && sessionState?.colorScheme}`} onClick={selectLayer}>
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
          <button className='p-2 bg-red-800 rounded-md text-white'>Del</button>
        </div>
      </div>
      {/* <p>{!isSelf && isSelected && sessionState?.clientId}</p> */}
    </>
  )
}