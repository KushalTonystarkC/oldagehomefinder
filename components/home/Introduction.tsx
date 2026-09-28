"use client";
import React from "react";
import Link from "next/link";
import { FaUserFriends, FaWheelchair, FaBrain } from "react-icons/fa";

const careTypes = [
  {
    title: "Independent Living",
    icon: FaUserFriends,
    span: "md:col-span-2 lg:col-span-2 lg:row-span-2",
    description:
      "Experience a lifestyle of freedom and comfort in our Independent Living communities. Embrace a worry-free environment where you can savor the essence of your golden years without the burdens of home ownership. Our diverse apartment options cater to your unique style — seize the opportunity to socialize and relish the true comforts of home.",
  },
  {
    title: "Assisted Living",
    icon: FaWheelchair,
    span: "md:col-span-2 lg:col-span-2",
    description:
      "Discover redefined independence with thoughtful assistance — from medication management to housekeeping. Collaborative care partnerships ensure you receive the attention you deserve, with our team available 24/7.",
  },
  {
    title: "Memory Care",
    icon: FaBrain,
    span: "md:col-span-2 lg:col-span-2",
    description:
      "A person-centered approach that preserves identity and fosters a strong sense of self. Secure communities with daily engagement designed to help residents flourish, even with advanced expressions of dementia.",
  },
];

const BestfitHealthcareNetwork = () => {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-16">
          <p className="label-muted text-xs uppercase tracking-[0.2em]">
            Care Pathways
          </p>
          <h2 className="title-display text-3xl sm:text-4xl lg:text-[2.75rem]">
            Bestfit Healthcare Network
          </h2>
          <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
            Your premier healthcare search engine — dedicated to connecting you
            with the best, most comprehensive senior care solutions tailored to
            your unique needs.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-stretch justify-center gap-3 sm:mb-16 sm:flex-row sm:items-center sm:gap-4">
          <Link href="/contact" className="btn-ghost-premium w-full sm:w-auto">
            Schedule a Tour
          </Link>
          <Link href="/contact" className="btn-primary-premium w-full sm:w-auto">
            Request Information
          </Link>
        </div>

        {/* Asymmetric bento */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          {careTypes.map((item) => {
            const Icon = item.icon;
            const isFeatured = item.span.includes("row-span");
            return (
              <article
                key={item.title}
                className={`glass-interactive group flex flex-col rounded-2xl p-6 sm:p-8 ${item.span} ${
                  isFeatured ? "justify-between" : ""
                }`}
              >
                <div>
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-all duration-200 ease-in-out group-hover:border-accent/50 group-hover:bg-accent/15 ${
                      isFeatured ? "h-16 w-16" : ""
                    }`}
                  >
                    <Icon size={isFeatured ? 28 : 24} />
                  </div>
                  <h3
                    className={`title-display mb-3 ${
                      isFeatured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`leading-relaxed text-slate-400 ${
                      isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
                {isFeatured && (
                  <Link
                    href="/"
                    className="mt-8 inline-flex min-h-touch items-center text-sm font-semibold text-accent transition-colors duration-200 ease-in-out hover:text-accent-muted"
                  >
                    Start exploring →
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestfitHealthcareNetwork;
