"use client";

import { siteConfig } from "@/config/site.config";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-0.5">
          <span className="text-lg font-bold text-foreground">Ved Singh</span>
          <span className="text-lg font-bold text-primary">.</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {siteConfig.person.tagline}
        </p>

        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-colors hover:text-primary/80"
          >
            @vedawsm
          </a>
          <a
            href={siteConfig.social.foodInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 transition-colors hover:text-red-400"
          >
            @food_ved_
          </a>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Made with ♥ by family
        </p>
      </div>
    </footer>
  );
}