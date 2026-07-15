"use client";

import { motion } from "framer-motion";
import { Plane, Camera, ChefHat } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Camera,
  ChefHat,
};

const colorMap: Record<string, { bg: string; icon: string; border: string; hoverBorder: string }> = {
  amber: {
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
    border: "border-white/10",
    hoverBorder: "hover:border-amber-500/30",
  },
  rose: {
    bg: "bg-rose-500/10",
    icon: "text-rose-400",
    border: "border-white/10",
    hoverBorder: "hover:border-rose-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    border: "border-white/10",
    hoverBorder: "hover:border-emerald-500/30",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function Interests() {
  return (
    <section id="interests" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">What I&apos;m Into</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Life beyond the classroom — the things that make me, me.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {siteConfig.interests.map((interest, i) => {
            const Icon = iconMap[interest.icon] || Plane;
            const colors = colorMap[interest.color] || colorMap.amber;

            return (
              <motion.div
                key={interest.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "rounded-2xl bg-white/5 border p-6 backdrop-blur-sm transition-colors duration-300",
                  colors.border,
                  colors.hoverBorder
                )}
              >
                <div
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-xl",
                    colors.bg
                  )}
                >
                  <Icon className={cn("size-6", colors.icon)} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{interest.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}