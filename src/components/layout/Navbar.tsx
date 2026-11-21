"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { CvMenu } from "./CvMenu";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const SECTION_IDS = ["work", "about", "skills", "experience", "contact"] as const;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      if (pathname.startsWith("/projects")) setActiveSection("work");
      else if (pathname === "/about") setActiveSection("about");
      else if (pathname === "/skills") setActiveSection("skills");
      else if (pathname === "/experience") setActiveSection("experience");
      else if (pathname === "/contact") setActiveSection("contact");
      else setActiveSection("");
      return;
    }

    const observers: IntersectionObserver[] = [];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    }
    observers.push(sectionObserver);

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, [isHome, pathname]);

  const overHero = isHome && !scrolled;
  const isDarkTheme = mounted && resolvedTheme === "dark";
  const useDarkBgLogo = overHero || isDarkTheme;

  let headerSurface = "border-b border-[var(--rule)] bg-[var(--paper)] text-[var(--ink)]";
  if (overHero) {
    headerSurface = "border-b border-transparent bg-transparent text-[#F2F1EE]";
  }

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] ${headerSurface}`}
      >
        <div className="container-editorial flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.siteName} home`}
            className="inline-flex min-h-[44px] items-center shrink-0"
          >
            <img
              src={useDarkBgLogo ? "/brand/logo-dark.svg" : "/brand/logo-light.svg"}
              alt={site.siteName}
              width={132}
              height={32}
              className="h-7 w-auto"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {site.navLinks.map((link) => {
              const id =
                link.href === "/"
                  ? "home"
                  : link.href === "/projects"
                    ? "work"
                    : link.href.replace(/^\//, "").replace("#", "");
              const isActive = link.href === "/" ? isHome && !activeSection : activeSection === id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative inline-flex min-h-[44px] items-center whitespace-nowrap text-[0.9375rem] font-medium transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2 left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <CvMenu variant="navbar" inverted={overHero} />
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[2px] hover:text-[var(--accent)] cursor-pointer"
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} triggerRef={menuBtnRef} />
    </>
  );
}
