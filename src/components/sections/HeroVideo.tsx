"use client";

import { useEffect, useState } from "react";

export function HeroVideo({ videoSrc, posterSrc }: { videoSrc: string; posterSrc: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isWide = window.matchMedia("(min-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = Boolean(conn?.saveData);

    if (isWide && !reducedMotion && !saveData) {
      setShowVideo(true);
    }
  }, []);

  if (!showVideo) return null;

  return (
    <video
      aria-hidden="true"
      tabIndex={-1}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={posterSrc}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
