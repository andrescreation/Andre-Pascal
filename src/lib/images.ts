import blurMap from "@/content/blur.json";

const blurs = blurMap as Record<string, string>;

export function getCardImageSrc(base: string): string {
  return `${base}-card.webp`;
}

export function getFullImageSrc(base: string): string {
  return `${base}-full.webp`;
}

export function getImageSrcSet(base: string): string {
  return `${getCardImageSrc(base)} 800w, ${getFullImageSrc(base)} 1600w`;
}

export function getBlurDataUrl(base: string): string | undefined {
  return blurs[base];
}
