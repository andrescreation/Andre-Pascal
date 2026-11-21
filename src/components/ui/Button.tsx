import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", children, className = "" } = props;

  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-[2px] px-[22px] py-[14px] text-[0.9375rem] font-medium leading-none transition-colors duration-200 cursor-pointer";
  const variantClass =
    variant === "primary"
      ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] hover:text-white"
      : "border border-[var(--ink)] bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]";

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${variantClass} ${className}`}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={`${base} ${variantClass} ${className}`}>
        {children}
      </Link>
    );
  }

  const { variant: _v, children: _c, className: _cl, ...rest } = props;
  void _v;
  void _c;
  void _cl;
  return (
    <button type="button" className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
