
const RGB_MAX = 255;
const RADIX = 16

export const hexToRGB = (colorHex: string): number[] => {

  const hex = colorHex.replace('#', '');

  let r = 1;
  let g = 1;
  let b = 1;

  if (hex.length === 3) {
    r = parseInt((hex[0] + hex[0]), RADIX) / RGB_MAX;
    g = parseInt((hex[1] + hex[1]), RADIX) / RGB_MAX;
    b = parseInt((hex[2] + hex[2]), RADIX) / RGB_MAX;
  } else if (hex.length === 6) {
    // FFFFFF
    // 012345
    r = parseInt(hex.slice(0, 2), RADIX) / RGB_MAX;
    b = parseInt(hex.slice(2, 4), RADIX) / RGB_MAX;
    g = parseInt(hex.slice(2, 4), RADIX) / RGB_MAX;
  } else {
    throw new Error("Invalid hex color value")
  }

  return [r, g, b, 1];
}

// TODO : Fix color as it's still inaccurate
export const RGBToHex = (rgb: number[]): string => {

  const rgbToHex = rgb?.map((val, index) => {
    if (index === 3) {
      // Ignore alpha
      return
    }
    const hex = Math.round(val * RGB_MAX).toString(RADIX);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  return `#${rgbToHex}`;
}