"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plane, Camera, ChefHat } from "lucide-react";

import { siteConfig } from "@/config/site.config";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, React.ElementType> = {
  Plane,
  Camera,
  ChefHat,
};

const colorMap: Record<string, { gradient: string; iconBg: string; iconText: string; hoverBorder: string }> = {
  amber: {
    gradient: "from-amber-50 to-amber-100/50",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
    hoverBorder: "hover:border-amber-300",
  },
  rose: {
    gradient: "from-rose-50 to-rose-100/50",
    iconBg: "bg-rose-100",
    iconText: "text-rose-700",
    hoverBorder: "hover:border-rose-300",
  },
  emerald: {
    gradient: "from-emerald-50 to-emerald-100/50",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-700",
    hoverBorder: "hover:border-emerald-300",
  },
};

export function Interests() {
  return (
    <section
      id="interests"
      className="bg-muted/40 py-16 sm:py-20 lg:py-24"
      aria-labelledby="interests-heading"
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
            id="interests-heading"
            className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            My Interests
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-muted-foreground">
            Life beyond the stethoscope — the passions that keep me going.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {siteConfig.interests.map((interest, i) => {
            const Icon = iconMap[interest.icon] || Camera;
            const colors = colorMap[interest.color] || colorMap.emerald;

            return (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card
                  className={`group h-full border-transparent bg-background transition-all duration-300 ${colors.hoverBorder} hover:shadow-lg`}
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div
                      className={`mb-4 inline-flex size-12 items-center justify-center rounded-xl ${colors.iconBg} ${colors.iconText} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {interest.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {interest.description}
                    </p>
                    <div
                      className={`mt-4 h-1 w-10 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-300 group-hover:w-16`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}