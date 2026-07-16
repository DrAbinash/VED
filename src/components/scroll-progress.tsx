"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin glowing progress bar along the top of the page while scrolling. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-primary via-teal-300 to-primary"
      style={{ scaleX }}
    />
  );
}
