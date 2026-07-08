"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ChefHat } from "lucide-react";

import { siteConfig } from "@/config/site.config";

export function FloatingCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 lg:hidden"
          aria-label="Quick social links"
        >
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow on Instagram"
            className="flex size-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href={siteConfig.social.foodInstagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Food by Ved on Instagram"
            className="flex size-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/20 transition-transform hover:scale-105"
          >
            <ChefHat className="size-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}