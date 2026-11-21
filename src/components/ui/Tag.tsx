import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant?: "default" | "inverted";
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: TagProps) {
  const styles =
    variant === "inverted"
      ? "bg-[var(--paper)] text-[var(--ink)]"
      : "bg-[var(--tag-bg)] text-[var(--tag-fg)]";

  return (
    <span
      className={`inline-block rounded-[2px] px-[10px] py-[4px] text-[0.75rem] font-medium tracking-[0.02em] leading-none ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
