"use client";

import { motion } from "framer-motion";
import { Stethoscope, MapPin, Camera, Plane, ChevronDown, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={siteConfig.person.heroPhoto}
          alt="Ved Singh"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* College badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-foreground/80 backdrop-blur-sm border border-white/10"
        >
          <Stethoscope className="size-3.5 text-primary" />
          {siteConfig.person.college}
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="gradient-text text-6xl font-black uppercase tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {siteConfig.person.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          {siteConfig.person.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" asChild className="rounded-full px-6">
            <a href="#about">Explore My World</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full px-6 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50"
          >
            <a
              href={siteConfig.social.foodInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ChefHat className="size-4" />
              @food_ved_
            </a>
          </Button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground sm:text-sm"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" />
            Pune
          </span>
          <span className="hidden sm:block w-px h-3 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <Camera className="size-3.5 text-primary" />
            5,000+ Photos
          </span>
          <span className="hidden sm:block w-px h-3 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <Plane className="size-3.5 text-primary" />
            15+ Places
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-label="Scroll down"
        >
          <ChevronDown className="size-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}