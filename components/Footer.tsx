import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-surface-raised/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-3">
          <BrandLogo size="sm" />
          <p className="label-muted max-w-sm text-sm leading-relaxed">
            Your interconnected portal to healthcare communities across Nevada.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-touch items-center text-sm font-medium text-slate-400 transition-colors duration-200 ease-in-out hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Bestfit Healthcare Network. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
