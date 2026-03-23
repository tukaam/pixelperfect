export type Unit = 'px' | 'cm' | 'mm' | 'inch';

export interface ResizeOptions {
  width?: number;
  height?: number;
  unit: Unit;
  dpi?: number;
  maintainAspectRatio: boolean;
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  quality: number;
  rotation?: number; // 0, 90, 180, 270
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

export const UNIT_CONVERSION = {
  px: 1,
  inch: (dpi: number = 72) => dpi,
  cm: (dpi: number = 72) => dpi / 2.54,
  mm: (dpi: number = 72) => dpi / 25.4,
};

export function convertToPx(value: number, unit: Unit, dpi: number = 72): number {
  if (unit === 'px') return value;
  const factor = UNIT_CONVERSION[unit];
  return typeof factor === 'function' ? value * factor(dpi) : value * factor;
}

export function convertFromPx(px: number, unit: Unit, dpi: number = 72): number {
  if (unit === 'px') return px;
  const factor = UNIT_CONVERSION[unit];
  return typeof factor === 'function' ? px / factor(dpi) : px / factor;
}

export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export function getResizedDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number,
  maintainAspectRatio: boolean = true
) {
  let width = targetWidth || originalWidth;
  let height = targetHeight || originalHeight;

  if (maintainAspectRatio) {
    const ratio = originalWidth / originalHeight;
    if (targetWidth && !targetHeight) {
      height = targetWidth / ratio;
    } else if (targetHeight && !targetWidth) {
      width = targetHeight * ratio;
    } else if (targetWidth && targetHeight) {
      // If both are provided, we prioritize width but this shouldn't happen usually with aspect ratio locked
      const targetRatio = targetWidth / targetHeight;
      if (targetRatio > ratio) {
        width = targetHeight * ratio;
      } else {
        height = targetWidth / ratio;
      }
    }
  }

  return { width: Math.round(width), height: Math.round(height) };
}

export async function processImage(
  image: HTMLImageElement,
  options: ResizeOptions
): Promise<Blob> {
  const dpi = options.dpi || 72;
  const targetWidthPx = options.width ? convertToPx(options.width, options.unit, dpi) : image.width;
  const targetHeightPx = options.height ? convertToPx(options.height, options.unit, dpi) : image.height;

  const { width, height } = getResizedDimensions(
    image.width,
    image.height,
    targetWidthPx,
    targetHeightPx,
    options.maintainAspectRatio
  );

  const canvas = document.createElement('canvas');
  
  // Handle rotation-swapped dimensions
  const rotation = options.rotation || 0;
  const isRotated90 = rotation === 90 || rotation === 270;
  canvas.width = isRotated90 ? height : width;
  canvas.height = isRotated90 ? width : height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Apply transformations
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  
  if (rotation) {
    ctx.rotate((rotation * Math.PI) / 180);
  }

  const scaleX = options.flipHorizontal ? -1 : 1;
  const scaleY = options.flipVertical ? -1 : 1;
  ctx.scale(scaleX, scaleY);

  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      options.format,
      options.quality
    );
  });
}
