import { HTMLInputTypeAttribute } from "react"

export type ToolkitInputType = Extract<HTMLInputTypeAttribute, 'color' | 'range'>;

export type Tool = {
  title: string;
  inputType: ToolkitInputType;
}

export type Color = {
  colors: number[];
  path?: string;
  // typeIndex?: number,
  // shapeIndex?: number;
}
