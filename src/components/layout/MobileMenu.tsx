"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[1100] flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)] px-6 py-5 overflow-y-auto"
    >
      <div className="flex h-[52px] items-center justify-between">
        <span className="font-mono-meta text-xs uppercase tracking-widest text-[var(--ink-muted)]">
          Menu
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => {
              onClose();
              triggerRef.current?.focus();
            }}
            aria-label="Close menu"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] text-[var(--ink)] hover:text-[var(--accent)] cursor-pointer"
          >
            <Icon name="close" size={24} />
          </button>
        </div>
      </div>

      <nav aria-label="Mobile navigation" className="my-8 flex flex-col gap-3">
        {site.navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{ animationDelay: `${index * 60}ms` }}
            className="display-l py-1 transition-colors duration-200 hover:text-[var(--accent)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-[var(--rule)] pt-5 pb-4 flex flex-col gap-3">
        <p className="font-mono-meta text-xs uppercase tracking-wider text-[var(--ink-muted)]">
          Download CV
        </p>
        <div className="flex flex-col gap-2">
          {site.cvOptions.map((cv) => (
            <a
              key={cv.href}
              href={cv.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex min-h-[44px] items-center justify-between border border-[var(--rule)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>{cv.label}</span>
              <Icon name="arrow-up-right" size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
