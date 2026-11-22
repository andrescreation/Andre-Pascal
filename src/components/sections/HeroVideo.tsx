"use client";

import { useEffect, useState } from "react";

export function HeroVideo({ videoSrc, posterSrc }: { videoSrc: string; posterSrc: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const verticalPhoneQuery = window.matchMedia("(max-width: 599px) and (orientation: portrait)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const saveData = Boolean(conn?.saveData);
      const isVerticalPhone = verticalPhoneQuery.matches;
      setShowVideo(!isVerticalPhone && !motionQuery.matches && !saveData);
    };

    evaluate();

    verticalPhoneQuery.addEventListener("change", evaluate);
    motionQuery.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate, { passive: true });
    window.addEventListener("orientationchange", evaluate, { passive: true });

    return () => {
      verticalPhoneQuery.removeEventListener("change", evaluate);
      motionQuery.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
      window.removeEventListener("orientationchange", evaluate);
    };
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
