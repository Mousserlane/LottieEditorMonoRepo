'use client'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useStore } from '@/app/stores'
import { LayerItem } from './components/LayerItem';
import { useCollaboration } from '@/app/hooks/useCollaboration';
import { Layer } from './types';
import { Operation, applyPatch } from 'json-joy/lib/json-patch';
import { MESSAGE_TYPE } from '../Websocket/types';

interface ILayerManagerProps { }
const LayerManager: FC<ILayerManagerProps> = () => {
  const { layers, animation, setSelectedLayer, clientId, selectedLayer, updateLayerData } = useStore();
  const { broadcastUserLayerPosition, getSelectedLayer, sendMessage, getMessage } = useCollaboration()

  const [layerSessionState, setLayerSessionState] = useState<any>();

  useEffect(() => {
    const sessionState = getSelectedLayer();
    if (sessionState) {
      setLayerSessionState(sessionState)
    }
  }, [getSelectedLayer])

  useEffect(() => {
    const message = getMessage();

    if (message && message?.type === MESSAGE_TYPE.ANIMATION_DATA_CHANGED) {
      updateLayerData(message?.data as any)
    }

  }, [getMessage])


  const onSelectLayer = (selectedLayer: Layer) => {
    setSelectedLayer(selectedLayer)
    broadcastUserLayerPosition(selectedLayer, { clientId })
  }

  const hideLayer = useCallback((layer: Layer) => {
    const operation: Operation = { op: 'replace', path: `/ks/o/k`, value: 0 };
    const patched = applyPatch(layer, [operation], { mutate: false })

    updateLayerData(patched.doc as Layer)
  }, [updateLayerData])

  const showLayer = useCallback((layer: Layer) => {
    const operation: Operation = { op: 'replace', path: `/ks/o/k`, value: 100 }
    const patched = applyPatch(layer, [operation], { mutate: false })

    updateLayerData(patched.doc as Layer)

  }, [updateLayerData])

  return (
    <div className='bg-gray-100 w-1/3 py-7 px-4 h-full overflow-y-scroll pb-24'>
      {animation && layers?.length > 0 && layers?.map((layer, index) => (
        <LayerItem
          key={`index-${layer.mn || layer.nm}`}
          layerData={layer}
          animationData={animation}
          showLayer={showLayer}
          hideLayer={hideLayer}
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