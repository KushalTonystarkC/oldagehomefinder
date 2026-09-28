"use client";
import React from "react";
import {
  FaRegClipboard,
  FaHandHoldingHeart,
  FaHome,
  FaRegCalendar,
  FaUserCheck,
  FaMapMarkerAlt,
  FaBed,
} from "react-icons/fa";

type AmenityKey = "schedule" | "care" | "home" | "support" | "staff";

const amenityMeta: Record<
  AmenityKey,
  { icon: typeof FaHome; label: string }
> = {
  schedule: { icon: FaRegCalendar, label: "Tour scheduling" },
  care: { icon: FaRegClipboard, label: "Care plans" },
  home: { icon: FaHome, label: "Private residences" },
  support: { icon: FaHandHoldingHeart, label: "Daily support" },
  staff: { icon: FaUserCheck, label: "24/7 staffed" },
};

interface Community {
  id: string;
  name: string;
  location: string;
  careType: string;
  image: string;
  femaleBeds: number;
  maleBeds: number;
  minPrice: string;
  maxPrice: string;
  amenities: AmenityKey[];
  highlight?: string;
}

const communities: Community[] = [
  {
    id: "nw-lv",
    name: "Nevada Memory Care",
    location: "Northwest LV · 89117",
    careType: "Memory Care",
    image: "/communities/community-northwest.jpg",
    femaleBeds: 3,
    maleBeds: 2,
    minPrice: "$4,200",
    maxPrice: "$6,800",
    amenities: ["schedule", "care", "home", "support", "staff"],
    highlight: "Openings this week",
  },
  {
    id: "summerlin",
    name: "Summerlin Assisted Living",
    location: "Summerlin · 89135",
    careType: "Assisted Living",
    image: "/communities/community-summerlin.jpg",
    femaleBeds: 5,
    maleBeds: 4,
    minPrice: "$3,600",
    maxPrice: "$5,900",
    amenities: ["schedule", "care", "support", "staff"],
  },
  {
    id: "reno",
    name: "Reno Foothills Memory Care",
    location: "Reno · 89509",
    careType: "Memory Care",
    image: "/communities/community-reno.jpg",
    femaleBeds: 2,
    maleBeds: 3,
    minPrice: "$4,500",
    maxPrice: "$7,200",
    amenities: ["schedule", "care", "home", "staff"],
    highlight: "Highly rated",
  },
  {
    id: "carson",
    name: "Carson Independent Living",
    location: "Carson City · 89701",
    careType: "Independent Living",
    image: "/communities/community-carson.jpg",
    femaleBeds: 6,
    maleBeds: 5,
    minPrice: "$2,800",
    maxPrice: "$4,400",
    amenities: ["schedule", "home", "support"],
  },
];

const CenterInfoCard = () => {
  return (
    <section className="section-pad pt-4 sm:pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="label-muted text-xs uppercase tracking-[0.2em]">
              Featured Communities
            </p>
            <h2 className="title-display text-2xl sm:text-3xl lg:text-4xl">
              Senior care near you
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            Live availability, transparent pricing, and care types matched to
            your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {communities.map((community) => (
            <article
              key={community.id}
              className="glass-interactive group relative flex flex-col overflow-hidden rounded-2xl"
            >
              {/* Media */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={community.image}
                  alt={`${community.name} exterior`}
                  className="h-full w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span className="rounded-lg border border-white/15 bg-surface/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent backdrop-blur-md">
                    {community.careType}
                  </span>
                  {community.highlight && (
                    <span className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md">
                      {community.highlight}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-sm text-slate-200">
                  <FaMapMarkerAlt className="shrink-0 text-accent" size={12} />
                  <span className="truncate font-medium">{community.location}</span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <div>
                  <h3 className="title-display text-lg leading-snug sm:text-xl">
                    {community.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <FaBed size={11} className="text-slate-500" />
                    {community.femaleBeds + community.maleBeds} beds available
                  </p>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {community.amenities.map((key) => {
                    const { icon: Icon, label } = amenityMeta[key];
                    return (
                      <span
                        key={key}
                        title={label}
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-xs text-slate-400 transition-all duration-200 ease-in-out hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                      >
                        <Icon size={13} aria-hidden />
                        <span className="sr-only">{label}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Pricing bento */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <p className="label-muted mb-2.5 text-center text-[10px] uppercase tracking-[0.18em]">
                    Availability & Pricing
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Female Beds", value: String(community.femaleBeds) },
                      { label: "Male Beds", value: String(community.maleBeds) },
                      { label: "From", value: community.minPrice },
                      { label: "Up to", value: community.maxPrice },
                    ].map((cell) => (
                      <div
                        key={cell.label}
                        className="rounded-xl border border-white/10 bg-surface-raised/60 px-2.5 py-3 text-center transition-all duration-200 ease-in-out hover:border-accent/25 hover:bg-accent/5"
                      >
                        <div className="label-muted mb-1 text-[10px] uppercase tracking-wide">
                          {cell.label}
                        </div>
                        <div className="title-display text-base text-accent sm:text-lg">
                          {cell.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    className="btn-primary-premium w-full text-sm"
                  >
                    View Community
                  </button>
                  <button
                    type="button"
                    className="btn-ghost-premium w-full text-sm"
                  >
                    Request Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CenterInfoCard;
