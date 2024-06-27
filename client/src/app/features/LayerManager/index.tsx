'use client'

import React, { FC } from 'react'
import { useStore } from '@/app/stores'
import { LayerItem } from './components/LayerItem';

interface ILayerManagerProps { }
const LayerManager: FC<ILayerManagerProps> = () => {
  const { layers, animation } = useStore();
  return (
    <div className='bg-gray-100 w-1/3 py-7 px-4 h-full overflow-y-scroll pb-24'>
      {animation && layers.length > 0 && layers.map((layer, index) => (
        <LayerItem
          key={layer.mn || layer.nm}
          layerData={layer}
          animationData={animation}
          idx={index}
        />
      ))}
    </div>
  )
}

export default LayerManager