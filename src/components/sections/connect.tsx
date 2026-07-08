"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Instagram, Camera, ChefHat, ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/config/site.config";
import { Card, CardContent } from "@/components/ui/card";

export function Connect() {
  return (
    <section
      id="connect"
      className="bg-muted/40 py-16 sm:py-20 lg:py-24"
      aria-labelledby="connect-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-14"
        >
          <h2
            id="connect-heading"
            className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Let&apos;s Connect
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
            Follow me on Instagram for travel diaries, photography, and my
            culinary experiments.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* @vedawsm card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <Card className="group h-full border-emerald-100 bg-background transition-all duration-300 hover:border-emerald-300 hover:shadow-lg">
              <CardContent className="flex h-full flex-col items-center p-6 text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110">
                  <Camera className="size-7" />
                </div>
                <div className="mb-1 flex items-center gap-1.5">
                  <Instagram className="size-4 text-emerald-700" />
                  <span className="text-base font-bold text-foreground">
                    @vedawsm
                  </span>
                </div>
                <p className="mb-4 text-sm font-medium text-emerald-700">
                  Travel &amp; Photography
                </p>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  Solo travel stories and the world through my lens — golden
                  hours, mountain passes, and the beauty of everyday life.
                </p>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                >
                  View Profile
                  <ArrowUpRight className="size-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>

          {/* @food_ved_ card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="group h-full border-red-100 bg-background transition-all duration-300 hover:border-red-300 hover:shadow-lg">
              <CardContent className="flex h-full flex-col items-center p-6 text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 transition-transform duration-300 group-hover:scale-110">
                  <ChefHat className="size-7" />
                </div>
                <div className="mb-1 flex items-center gap-1.5">
                  <Instagram className="size-4 text-red-600" />
                  <span className="text-base font-bold text-foreground">
                    @food_ved_
                  </span>
                </div>
                <p className="mb-4 text-sm font-medium text-red-600">
                  Food &amp; Cooking
                </p>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  Culinary experiments from a med student&apos;s kitchen — where
                  nutrition knowledge meets creative cooking.
                </p>
                <a
                  href={siteConfig.social.foodInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-red-700"
                >
                  View Profile
                  <ArrowUpRight className="size-4" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}