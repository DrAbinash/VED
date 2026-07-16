"use client";

import { motion } from "framer-motion";
import { GraduationCap, Stethoscope, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-2 ring-primary/20 lg:aspect-[4/5] lg:[&_img]:object-[70%_center]">
              <img
                src={siteConfig.person.aboutPhoto}
                alt="Ved Singh"
                className="h-full w-full object-cover"
              />
              {/* Subtle teal glow behind image */}
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/10 blur-3xl" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="flex flex-col gap-5"
          >
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              About Me
            </span>

            <h2 className="text-3xl font-bold sm:text-4xl">The Story So Far</h2>

            {/* College badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
              <GraduationCap className="size-4 text-primary" />
              {siteConfig.person.college}
            </div>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              {siteConfig.person.longBio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Info cards */}
            <div className="mt-2 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm">
                <Stethoscope className="size-4 text-primary" />
                <span className="text-sm font-medium">MBBS — Final Year</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm">
                <MapPin className="size-4 text-primary" />
                <span className="text-sm font-medium">Pune</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/25 px-4 py-3 backdrop-blur-sm">
                <GraduationCap className="size-4 text-primary" />
                <span className="text-sm font-medium text-primary">Dr. in the making</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}