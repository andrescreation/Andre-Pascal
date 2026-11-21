"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      className={`inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] transition-colors duration-200 hover:text-[var(--accent)] cursor-pointer ${className}`}
    >
      {isDark ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
    </button>
  );
}
