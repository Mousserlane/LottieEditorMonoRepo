import { useCallback, useEffect, useState } from 'react';
import { IShapeItem, Layer } from "../features/LayerManager/types";
import { Color } from '../features/Toolkit/types';
import traverseTree from '../utils/traverseTree';


const useGetLayerProperties = (layer: Layer) => {
  const [colors, setColors] = useState<Color[]>([]);

  const findType = (item: IShapeItem, type: 'fl' | 'st' | 'gf') => { return item.ty === type }

  const getColors = useCallback(() => {
    const shapeColors: Color[] = [];

    // TODO : Handle Recursive
    layer?.shapes?.forEach((shape, index) => {
      const shapeItem = shape?.it


      if (shapeItem) {
        const fill = traverseTree(shape, 'fl', `/shapes/${index}`)
        const stroke = traverseTree(shape, 'st', `/shapes/${index}`)
        const gradient = traverseTree(shape, 'gf', `/shapes/${index}`)

        if (fill) {
          shapeColors.push({
            colors: fill?.item?.c?.k as number[],
            path: `${fill.path}/c/k`
          })
        } else if (stroke) {
          shapeColors.push({
            colors: stroke?.item?.c?.k as number[],
            path: `${stroke.path}/c/k`
          })
        } else if (gradient) {
          shapeColors.push({
            colors: gradient?.item?.s?.k as number[],
            path: `${gradient.path}/c/k`
          })
        }

        setColors(shapeColors)
      }
    })
  }, [layer])

  useEffect(() => {
    if (layer) {
      getColors()
    }
  }, [layer, getColors]);

  return { colors };
}

export default useGetLayerProperties;