"use client";
import React from "react";

const ContactForm = () => {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
        {/* Visual — wider bento cell */}
        <div className="glass overflow-hidden rounded-2xl lg:col-span-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/contact-map-visual.jpg"
            alt="Map of senior care communities across the Las Vegas valley"
            className="h-full min-h-[240px] w-full object-cover object-center sm:min-h-[320px]"
          />
        </div>

        {/* Form panel */}
        <div className="glass-strong flex flex-col justify-center rounded-2xl p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="mb-8 space-y-2">
            <p className="label-muted text-xs uppercase tracking-[0.2em]">
              Get in touch
            </p>
            <h2 className="title-display text-2xl sm:text-3xl">
              Request information
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Tell us a little about yourself and we&apos;ll help match you with
              the right community.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="contact-name"
                className="label-muted mb-2 block text-xs uppercase tracking-wider"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Enter your name"
                className="input-premium"
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="label-muted mb-2 block text-xs uppercase tracking-wider"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="Enter email"
                className="input-premium"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="label-muted mb-2 block text-xs uppercase tracking-wider"
              >
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                placeholder="Enter phone number"
                className="input-premium"
                autoComplete="tel"
              />
            </div>

            <button type="submit" className="btn-primary-premium mt-2 w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
