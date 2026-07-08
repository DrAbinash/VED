"use client";

import { motion } from "framer-motion";
import { Camera, ChefHat, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function Connect() {
  return (
    <section id="connect" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Let&apos;s Connect</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Follow along on my journey — through cities, through frames, through flavours.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Travel & Photography card */}
          <motion.a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="glow-teal group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-primary/30"
          >
            <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Camera className="size-6 text-primary" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">@vedawsm</h3>
            <p className="mt-1 text-sm text-muted-foreground">Travel &amp; Photography</p>
            <div className="mt-auto pt-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:gap-3">
                View Profile
                <ArrowRight className="size-4" />
              </span>
            </div>
          </motion.a>

          {/* Food & Cooking card */}
          <motion.a
            href={siteConfig.social.foodInstagram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glow-red group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-red-500/30"
          >
            <div className="inline-flex size-12 items-center justify-center rounded-xl bg-red-500/10">
              <ChefHat className="size-6 text-red-500" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">@food_ved_</h3>
            <p className="mt-1 text-sm text-muted-foreground">Food &amp; Cooking</p>
            <div className="mt-auto pt-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-400 transition-colors group-hover:gap-3">
                View Profile
                <ArrowRight className="size-4" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}