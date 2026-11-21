"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

interface CvMenuProps {
  variant?: "navbar" | "hero" | "section";
  inverted?: boolean;
}

export function CvMenu({ variant = "navbar", inverted = false }: CvMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerBtnRef.current?.focus();
        return;
      }

      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && menuRef.current) {
        const items = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]'),
        );
        if (items.length === 0) return;
        e.preventDefault();
        const currentIdx = items.indexOf(document.activeElement as HTMLElement);
        if (e.key === "ArrowDown") {
          const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % items.length;
          items[nextIdx]?.focus();
        } else {
          const prevIdx =
            currentIdx === -1 ? items.length - 1 : (currentIdx - 1 + items.length) % items.length;
          items[prevIdx]?.focus();
        }
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const btnBase =
    "inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap shrink-0 rounded-[2px] text-[0.875rem] font-medium leading-none transition-colors duration-200 cursor-pointer";

  let btnVariant = "";
  if (variant === "hero") {
    btnVariant =
      "border border-[#F2F1EE] px-[22px] py-[14px] text-[#F2F1EE] hover:bg-[#F2F1EE] hover:text-[#111111]";
  } else if (variant === "section") {
    btnVariant =
      "bg-[var(--ink)] text-[var(--paper)] px-[22px] py-[14px] hover:bg-[var(--accent)] hover:text-white";
  } else {
    btnVariant = inverted
      ? "border border-[#F2F1EE]/40 px-4 py-2 text-[#F2F1EE] hover:border-[#F2F1EE] hover:bg-[#F2F1EE] hover:text-[#111111]"
      : "bg-[var(--ink)] text-[var(--paper)] px-4 py-2 hover:bg-[var(--accent)] hover:text-white";
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={triggerBtnRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`${btnBase} ${btnVariant}`}
      >
        <Icon name="download" size={16} />
        <span>Download CV</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Choose CV version"
          className="absolute right-0 z-50 mt-2 w-72 rounded-[2px] border border-[var(--rule)] bg-[var(--paper)] p-1 text-[var(--ink)] shadow-lg"
        >
          {site.cvOptions.map((cv) => (
            <a
              key={cv.href}
              href={cv.href}
              role="menuitem"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center justify-between gap-3 rounded-[2px] px-3 py-2.5 text-[0.875rem] font-medium transition-colors duration-150 hover:bg-[var(--rule)]/50 hover:text-[var(--accent)]"
            >
              <span>{cv.label}</span>
              <Icon name="arrow-up-right" size={16} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
