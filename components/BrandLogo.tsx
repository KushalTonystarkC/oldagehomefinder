import React from "react";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { mark: 28, text: "text-base", gap: "gap-2" },
  md: { mark: 36, text: "text-lg", gap: "gap-2.5" },
  lg: { mark: 44, text: "text-xl sm:text-2xl", gap: "gap-3" },
};

const BrandLogo = ({
  href = "/",
  size = "md",
  showWordmark = true,
  className = "",
}: BrandLogoProps) => {
  const s = sizeMap[size];

  const content = (
    <span
      className={`inline-flex items-center ${s.gap} transition-opacity duration-200 ease-in-out hover:opacity-90 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/logo-mark.svg"
        width={s.mark}
        height={s.mark}
        alt=""
        aria-hidden
        className="shrink-0"
      />
      {showWordmark && (
        <span
          className={`${s.text} font-bold tracking-tightest leading-none`}
          aria-label="Bestfit Network"
        >
          <span className="text-slate-50">Bestfit</span>{" "}
          <span className="font-medium text-accent">Network</span>
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex min-h-touch items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-lg"
      aria-label="Bestfit Network home"
    >
      {content}
    </Link>
  );
};

export default BrandLogo;
