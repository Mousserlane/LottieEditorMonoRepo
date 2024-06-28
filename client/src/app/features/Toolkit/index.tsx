'use client'
import React, { FC } from 'react'
import { applyPatch } from 'json-joy/lib/json-patch'
import type { Operation } from 'json-joy/lib/json-patch'
import { Tool, ToolkitInputType } from './types'
import { ToolkitItem } from './components/ToolkitItem'
import { useStore } from '@/app/stores'
import { RGBToHex, hexToRGB } from '@/app/utils/colorTransformers'
import useGetLayerProperties from '@/app/hooks/useGetLayerProperties'
import { Layer } from '../LayerManager/types'
import { useCollaboration } from '@/app/hooks/useCollaboration'
import { MESSAGE_TYPE, SessionMessage } from '../Websocket/types'

interface IToolkitProps { }

const tools: Tool[] = [
  {
    title: "All Colors",
    inputType: 'color'
  }
]
const Toolkit: FC<IToolkitProps> = () => {
  const { animation, selectedLayer, updateLayerData, clientId } = useStore()
  const { sendMessage, getMessage, } = useCollaboration()
  const { colors } = useGetLayerProperties(selectedLayer!)

  const onChangeColor = (hex: string, path: string) => {
    const rgbValue = hexToRGB(hex);

    const operation: Operation = {
      op: 'replace',
      path,
      value: rgbValue
    }
    const patched = applyPatch(selectedLayer, [operation], { mutate: true })

    sendMessage(JSON.stringify({
      type: MESSAGE_TYPE.ANIMATION_DATA_CHANGED, data: {
        layer: selectedLayer,
        operation,
        clientId
      }
    }));

    const message = getMessage() as SessionMessage<any>;

    if (message && message.type === MESSAGE_TYPE.ANIMATION_DATA_CHANGED && message?.data?.updatedBy !== clientId) {
      updateLayerData(message?.data?.layer)
    }

    updateLayerData(patched.doc as Layer)

  }

  return (
    <div className='py-8 px-4'>
      {animation && !selectedLayer && <div className='flex justify-center items-center h-svh'>
        <h3>Select a layer to show the toolkit</h3>
      </div>}
      <h1 className='text-xl font-semibold'>{selectedLayer?.nm}</h1>
      {selectedLayer && tools.map((tool, index) => (
        <ToolkitItem
          selectedLayer={selectedLayer}
          title={tool.title}
          colors={colors}
          onChangeColor={onChangeColor}
          inputType={tool.inputType}
          key={index}
        />
      ))}
    </div>
  )
}

export default Toolkit