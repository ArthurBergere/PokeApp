import React, { useState } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { ImageProps, sizeMap } from "../propsModel/Image.type";





const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc = "/imagenotfound.gif", 
  size = "medium",
  className,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  const finalSrc = hasError ? fallbackSrc : src;

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl bg-gray-800",
        sizeMap[size],
        className
      )}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse">
          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
        </div>
      )}

      <img
        src={finalSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(
          "object-cover w-full h-full transition-opacity duration-300",
          {
            "opacity-0": !isLoaded,
            "opacity-100": isLoaded,
          }
        )}
        {...rest}
      />
    </div>
  );
};

export default Image;
