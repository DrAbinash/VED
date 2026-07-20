"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera, ChefHat, Images } from "lucide-react";
import type { WorkCollection, WorkIconKey } from "@/lib/work";
import { WorkGallery } from "@/components/work-gallery";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

// Icon names, not components, cross the server→client boundary.
const ICONS: Record<WorkIconKey, typeof Camera> = { camera: Camera, chefHat: ChefHat, images: Images };

/** Shared frame for the Photography / Foods pages. */
export function WorkPageShell({
  collection,
  icon,
  siblingHref,
  siblingLabel,
  emptyLink,
  emptyLinkLabel,
}: {
  collection: WorkCollection;
  icon: WorkIconKey;
  siblingHref: string;
  siblingLabel: string;
  emptyLink: string;
  emptyLinkLabel: string;
}) {
  const Icon = ICONS[icon];
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/#work"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back home
            </a>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary">
                  <Icon className="size-4" />
                  My Work
                </span>
                <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                  <span className="gradient-text">{collection.title}</span>
                </h1>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {collection.subtitle}
                </p>
              </div>
              <a
                href={siblingHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
              >
                {siblingLabel}
                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>

          <div className="mt-10">
            <WorkGallery
              collection={collection}
              emptyLink={emptyLink}
              emptyLinkLabel={emptyLinkLabel}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
