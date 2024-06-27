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

      console.log('si', shapeItem)

      if (shapeItem) {
        const fill = traverseTree(shape, 'fl', `/shapes/${index}`)
        // console.log('fl tree', fltree)
        // const fill = shapeItem?.find(item => findType(item, 'fl'))
        const stroke = traverseTree(shape, 'st', `/shapes/${index}`)
        const gradient = traverseTree(shape, 'gf', `/shapes/${index}`)
        // const stroke = shapeItem?.find(item => findType(item, 'st'))
        // const gradient = shapeItem.find(item => item.ty === 'gr');

        if (fill) {
          shapeColors.push({
            colors: fill?.item?.c?.k as number[],
            path: `${fill.path}/c/k`
            // typeIndex: shapeItem?.findIndex(item => findType(item, 'fl')),
            // shapeIndex: index
          })
        } else if (stroke) {
          shapeColors.push({
            colors: stroke?.item?.c?.k as number[],
            path: `${stroke.path}/c/k`
            // typeIndex: shapeItem?.findIndex(item => findType(item, 'st')),
            // shapeIndex: index
          })
        } else if (gradient) {
          shapeColors.push({
            colors: gradient?.item?.s?.k as number[],
            path: `${gradient.path}/c/k`
            // typeIndex: shapeItem.findIndex(item => findType(item, 'gf')),
            // shapeIndex: index
          })
        }

        setColors(shapeColors)
      }
    })
  }, [layer])

  useEffect(() => {
    if (layer) {
      // setColors([])
      getColors()
    }
  }, [layer, getColors]);

  return { colors };
}

export default useGetLayerProperties;