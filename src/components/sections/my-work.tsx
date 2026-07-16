"use client";

import { motion } from "framer-motion";
import { Camera, ChefHat, ArrowRight, Images } from "lucide-react";
import type { WorkConfig } from "@/lib/work";

/**
 * Homepage teaser for the two My Work pages. Covers come from the first
 * photo of each collection, so the cards update as Ved uploads new work.
 */
export function MyWork({ work }: { work: WorkConfig }) {
  const cards = [
    {
      href: "/photography",
      icon: Camera,
      collection: work.photography,
      accent: "text-primary",
      chip: "bg-primary/10",
      hover: "hover:border-primary/40",
    },
    {
      href: "/foods",
      icon: ChefHat,
      collection: work.foods,
      accent: "text-red-400",
      chip: "bg-red-500/10",
      hover: "hover:border-red-500/40",
    },
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Images className="size-6 text-primary" />
            <h2 className="text-3xl font-bold sm:text-4xl">My Work</h2>
          </div>
          <p className="mt-2 max-w-md text-muted-foreground">
            Two collections, always growing — pick a door.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map(({ href, icon: Icon, collection, accent, chip, hover }, i) => {
            const cover = collection.photos[0]?.src;
            return (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors ${hover}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {cover ? (
                    <img
                      src={cover}
                      alt={collection.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <Icon className={`size-10 ${accent}`} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                <div className="relative -mt-10 p-6 pt-0">
                  <div className={`inline-flex size-11 items-center justify-center rounded-xl ${chip} backdrop-blur-sm`}>
                    <Icon className={`size-5 ${accent}`} />
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{collection.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {collection.subtitle}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {collection.photos.length} photo{collection.photos.length === 1 ? "" : "s"}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${accent} transition-all group-hover:gap-3`}>
                      View collection
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
