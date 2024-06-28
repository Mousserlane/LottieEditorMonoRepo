'use client'
import React, { FC, useEffect, useState } from 'react'
import { useStore } from '@/app/stores'
import { LayerItem } from './components/LayerItem';
import { useCollaboration } from '@/app/hooks/useCollaboration';
import { Layer } from './types';

interface ILayerManagerProps { }
const LayerManager: FC<ILayerManagerProps> = () => {
  const { layers, animation, setSelectedLayer, clientId, colorScheme, selectedLayer } = useStore();
  const { broadcastUserLayerPosition, getSelectedLayer } = useCollaboration()

  const [layerSessionState, setLayerSessionState] = useState<any>();

  useEffect(() => {
    const sessionState = getSelectedLayer();
    setLayerSessionState(sessionState)
  }, [getSelectedLayer])


  const onSelectLayer = (selectedLayer: Layer) => {
    setSelectedLayer(selectedLayer)
    broadcastUserLayerPosition(selectedLayer, { clientId })
  }

  return (
    <div className='bg-gray-100 w-1/3 py-7 px-4 h-full overflow-y-scroll pb-24'>
      {animation && layers.length > 0 && layers.map((layer, index) => (
        <LayerItem
          key={`index-${layer.mn || layer.nm}`}
          layerData={layer}
          animationData={animation}
          idx={index}
          isSelected={layer.nm === selectedLayer?.nm}
          isExternallySelected={layer.nm === layerSessionState?.layerName}
          sessionState={layerSessionState}
          onSelectLayer={onSelectLayer}
        />
      ))}
    </div>
  )
}

export default LayerManager