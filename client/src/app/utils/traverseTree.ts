import { IShapeItem } from "../features/LayerManager/types";

interface Result<T> {
  item: T | null;
  path?: string
}
// Type Guards
const isShapeContainsType = (shape: any): shape is { ty: string } => {
  return shape && typeof shape.ty === 'string';
}
const isShapeContainsItem = (shape: any): shape is { it: IShapeItem[] } => {
  return shape && Array.isArray(shape.it)
}

const traverseTree = <T>(shape: T | T[], targetType: string, path: string = ''): Result<T> => {
  // Immediately return if its neither to prevent recursive function from
  // running unnecessarily
  if (typeof shape !== 'object' || shape === null) {
    return { item: null, path: undefined };
  }

  if (Array.isArray(shape)) {
    for (let i = 0; i < shape.length; i++) {
      const result = traverseTree(shape[i], targetType, `${path}/${i}`);
      if (result.item !== null) {
        return result;
      }
    }
  }

  if (typeof shape === 'object') {
    if (isShapeContainsType(shape) && shape.ty === targetType) {
      return { item: shape, path };
    }

    if (isShapeContainsItem(shape)) {
      return traverseTree<any>(shape.it, targetType, `${path}/it`);
    }

    for (const key in shape) {
      if (shape.hasOwnProperty(key)) {
        const result = traverseTree((shape as any)[key], targetType, `${path}/${key}`);
        if (result.item !== null) {
          return result;
        }
      }
    }
  }

  return { item: null, path: undefined };
};

export default traverseTree;