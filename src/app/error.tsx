"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-editorial flex min-h-[75vh] flex-col items-start justify-center pt-28 pb-20">
      <h1 className="display-xl">ERROR</h1>
      <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-[var(--ink-muted)] md:text-lg">
        Something went wrong while loading this page. Try again or head back home.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={() => reset()} variant="primary">
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </div>
  );
}
