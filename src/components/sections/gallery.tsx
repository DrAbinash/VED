"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % siteConfig.gallery.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + siteConfig.gallery.length) % siteConfig.gallery.length
    );
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Camera className="size-6 text-primary" />
            <h2 className="text-3xl font-bold sm:text-4xl">Through My Lens</h2>
          </div>
          <p className="mt-2 max-w-md text-muted-foreground">
            Moments captured across travels, kitchens, and everyday life.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4"
        >
          {siteConfig.gallery.map((item, i) => (
            <div
              key={i}
              className={`gallery-item group relative cursor-pointer ${item.span}`}
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full rounded-xl object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                <Camera className="size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>

          {/* Nav buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Image */}
          <img
            src={siteConfig.gallery[lightboxIndex].src}
            alt={siteConfig.gallery[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightboxIndex + 1} / {siteConfig.gallery.length}
          </div>
        </div>
      )}
    </section>
  );
}