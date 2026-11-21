import { getBlurDataUrl, getCardImageSrc, getImageSrcSet } from "@/lib/images";

interface ProjectImageProps {
  base: string;
  alt: string;
  sizes: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export function ProjectImage({
  base,
  alt,
  sizes,
  width = 800,
  height = 600,
  priority = false,
  className = "",
}: ProjectImageProps) {
  const blur = getBlurDataUrl(base);

  return (
    <img
      src={getCardImageSrc(base)}
      srcSet={getImageSrcSet(base)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      style={
        blur
          ? {
              backgroundImage: `url("${blur}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
