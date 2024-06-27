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

interface IToolkitProps { }

const tools: Tool[] = [
  {
    title: 'Scale',
    inputType: 'range'
  },
  {
    title: "All Colors",
    inputType: 'color'
  }
]
const Toolkit: FC<IToolkitProps> = () => {
  const { animation, selectedLayer, updateLayerData } = useStore()

  const { colors } = useGetLayerProperties(selectedLayer!)

  console.log('colors', colors)
  const onChangeValue = (value: string | number, inputType: ToolkitInputType) => {
    // console.log('gituu')
    // if (inputType === 'color') {
    //   const rgbValue = hexToRGB(value as string);
    // } else {
    //   // do something
    // }
  }

  // TODO : fix type's type
  const onChangeColor = (hex: string, path: string) => {
    const rgbValue = hexToRGB(hex);

    console.log('path', path)
    console.log('ty')
    const patched = applyPatch(selectedLayer, [{
      op: 'replace',
      path, //`/shapes/${shapeIndex!}/it/${typeIndex}/c/k`,
      value: rgbValue
    }], { mutate: true })
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
          onChange={onChangeValue}
        />
      ))}
    </div>
  )
}

export default Toolkit