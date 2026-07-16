"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Stethoscope,
  Activity,
  ClipboardCheck,
  Award,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  BookOpen,
  Stethoscope,
  Activity,
  ClipboardCheck,
  Award,
};

export function Journey() {
  return (
    <section id="journey" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            The Road to the White Coat
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Journey to <span className="gradient-text">Dr. Ved Singh</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Five and a half years of medicine, one milestone at a time.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Glowing vertical line */}
          <div
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-primary/25 to-primary/60 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {siteConfig.journey.map((step, i) => {
              const Icon = iconMap[step.icon] ?? Stethoscope;
              const isLeft = i % 2 === 0;
              const isCurrent = step.status === "current";
              const isDream = step.status === "dream";

              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                  className="relative pl-16 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0"
                >
                  {/* Node */}
                  <div
                    className={cn(
                      "absolute left-6 top-1 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border backdrop-blur-sm sm:left-1/2",
                      isDream
                        ? "border-primary/60 bg-primary text-primary-foreground shadow-[0_0_25px] shadow-primary/40"
                        : isCurrent
                          ? "border-primary/60 bg-primary/15 text-primary shadow-[0_0_20px] shadow-primary/30"
                          : "border-white/15 bg-secondary text-primary"
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                    {isCurrent && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-primary/40" />
                    )}
                  </div>

                  <div
                    className={
                      isLeft
                        ? "sm:col-start-1 sm:pr-10 sm:text-right"
                        : "sm:col-start-2 sm:pl-10"
                    }
                  >
                    <div
                      className={cn(
                        "rounded-2xl border p-5 backdrop-blur-sm transition-colors duration-300",
                        isDream
                          ? "glow-teal border-primary/40 bg-primary/10"
                          : isCurrent
                            ? "border-primary/30 bg-white/5 hover:border-primary/50"
                            : "border-white/10 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest",
                          isLeft && "sm:justify-end",
                          isDream || isCurrent ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {isCurrent && <Sparkles className="size-3.5" />}
                        {step.stage}
                        {isCurrent && (
                          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                            YOU ARE HERE
                          </span>
                        )}
                      </div>
                      <h3
                        className={cn(
                          "mt-1.5 text-lg font-bold",
                          isDream && "gradient-text text-xl"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
