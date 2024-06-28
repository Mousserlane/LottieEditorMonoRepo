import React, { FC, HTMLInputTypeAttribute } from 'react'
import { Color, Tool, ToolkitInputType } from '../types'
import { Layer } from '../../LayerManager/types'
import { RGBToHex } from '@/app/utils/colorTransformers'

interface IToolkitItemProps extends Tool {
  isExpanded?: boolean
  // onChange: (value: any, type: ToolkitInputType) => void
  selectedLayer: Layer
  colors: Color[],
  onChangeColor: (val: string, path: string) => void
}

export const ToolkitItem: FC<IToolkitItemProps> = ({ title, inputType, isExpanded = false, colors, onChangeColor }) => {

  const renderColors = () => {
    return (
      <div className='flex flex-wrap'>
        {colors.length > 0 && colors.map(({ colors, path }, idx) =>
          <input
            key={`${path}/${idx}`}
            type={'color'}
            value={RGBToHex(colors)}
            className='bg-transparent'
            onChange={(e) => onChangeColor(e.target.value, path!)}
          />
        )}
      </div>
    )
  }
  return (
    <div className='border-b-2 border-b-slate-300 py-6 flex-col flex'>
      <h3>{title}</h3>
      {
        inputType === 'color' ? renderColors() : <input type={inputType} />
      }

    </div>
  )
}