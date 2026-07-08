"use client";

import Link from "next/link";
import { MapPin, GraduationCap, Instagram } from "lucide-react";

import { siteConfig } from "@/config/site.config";

export function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      href: siteConfig.social.instagram,
      label: "Instagram — Travel & Photography",
    },
    {
      icon: Instagram,
      href: siteConfig.social.foodInstagram,
      label: "Instagram — Food & Cooking",
    },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="mt-auto bg-emerald-800 text-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-full bg-emerald-700 text-emerald-100">
                <GraduationCap className="size-5" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">{siteConfig.person.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-emerald-200">
                  {siteConfig.person.title}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/80">
              {siteConfig.person.tagline}
            </p>
            <p className="mt-3 text-xs text-emerald-100/70">
              {siteConfig.person.college}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-emerald-100/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Interests */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Interests
            </p>
            <ul className="mt-4 space-y-2">
              {siteConfig.interests.map((interest) => (
                <li key={interest.title}>
                  <Link
                    href="#interests"
                    className="text-sm text-emerald-100/80 transition-colors hover:text-white"
                  >
                    {interest.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-200" />
                <span className="text-emerald-100/80">
                  {siteConfig.person.location}
                </span>
              </li>
              <li className="flex gap-2.5">
                <GraduationCap className="mt-0.5 size-4 shrink-0 text-emerald-200" />
                <span className="text-emerald-100/80">
                  {siteConfig.person.college}
                </span>
              </li>
            </ul>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-8 items-center justify-center rounded-full bg-emerald-700/60 text-emerald-100 transition-colors hover:bg-emerald-600 hover:text-white"
                  >
                    <s.icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-emerald-700/60 pt-6 text-xs text-emerald-100/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.person.name}. All rights
            reserved.
          </p>
          <p>
            Designed for {siteConfig.person.name},{" "}
            {siteConfig.person.title}
          </p>
        </div>
      </div>
    </footer>
  );
}