export type LottieAnimationBase = {
  v: string,
  ip: number,
  op: number,
  nm: string,
  mn: string,
  fr: number,
  w: number,
  h: number,
  assets: any,
  layers: Layer[]
}

export type Layer = Omit<LottieAnimationBase, 'layers' | 'w' | 'h' | 'fr' | 'v' | 'assets'> & {
  ddd: number,
  ty: number,
  ind: number,
  st: number,
  ks: Transform, // Represent transformation properties for the animation. We can use this to hide the layer by changing the opacity value
  shapes: IShapeItem[]
}

type BaseTransform = {
  p?: Animatable, // position || translation
  s?: Animatable, // scale
  sk?: Animatable // skew,
  sa?: Animatable // skew,
  c?: Animatable // color
}

export type Transform = BaseTransform & {
  a?: Animatable, // anchor point
  r?: Animatable, // rotation
  o?: Animatable // opacity
}

export type ShapeLayer = {
  ty: string,
  nm: string,
  mn: string,
  it?: IShapeItem[]
}

export type FillShape = BaseTransform & {
  a?: Animatable, // anchor point
  r?: number // r determines the fill rule and is not animated
  o?: Animatable // opacity
}

export interface IShapeItem extends ShapeLayer, FillShape, Partial<BaseTransform> { }

export type Animatable = {
  a: 0 | 1, // 1 for animated 0 for not animated
  k: number[] | number | Keyframes // the number[] type represents x, y position respectively
}

export type Keyframes = EasingHandle & {
  t: number // keyframe time (in frames)
  s: any,
  h: 0 | 1
}

type CartesianProduct = {
  x: number[],
  y: number[]
}

type EasingHandle = {
  o: CartesianProduct,
  i: CartesianProduct,
}