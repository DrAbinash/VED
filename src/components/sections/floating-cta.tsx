"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ChefHat } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 lg:hidden"
        >
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @vedawsm"
            className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href={siteConfig.social.foodInstagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Food Instagram @food_ved_"
            className="flex size-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110"
          >
            <ChefHat className="size-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}