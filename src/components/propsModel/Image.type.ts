type ImageSize = "small" | "medium" | "large";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  size?: ImageSize;
}
export const sizeMap: Record<ImageSize, string> = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-48 h-48",
  };