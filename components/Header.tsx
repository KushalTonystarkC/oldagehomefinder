"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import BrandLogo from "@/components/BrandLogo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const Header = () => {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/70 backdrop-blur-md shadow-glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <BrandLogo size="md" />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex min-h-touch items-center px-4 text-sm font-medium tracking-tight transition-all duration-200 ease-in-out ${
                  active
                    ? "text-accent"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-ghost-premium text-sm">
            Request Information
          </Link>
        </div>

        <button
          type="button"
          className="flex min-h-touch min-w-touch items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all duration-200 ease-in-out hover:bg-white/[0.08] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-surface/95 backdrop-blur-md md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4"
            aria-label="Mobile"
          >
            {navItems.map((item) => {
              const active = path === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-touch items-center rounded-xl px-4 text-base font-medium transition-all duration-200 ease-in-out ${
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary-premium mt-2 w-full text-sm"
            >
              Request Information
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
