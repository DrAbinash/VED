"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Menu, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/#home" className="flex items-center gap-0.5">
          <span className="text-2xl font-black uppercase tracking-tighter text-foreground">
            VED
          </span>
          <span className="text-2xl font-black uppercase tracking-tighter text-primary">
            .
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="rounded-full border-white/10"
          >
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
          </Button>
          <Button size="sm" asChild className="rounded-full">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 bg-background/80 backdrop-blur-xl border-white/10"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-2 pt-8">
              <a
                href="/#home"
                className="flex items-center gap-0.5 mb-4"
              >
                <span className="text-2xl font-black uppercase tracking-tighter text-foreground">
                  VED
                </span>
                <span className="text-2xl font-black uppercase tracking-tighter text-primary">
                  .
                </span>
              </a>

              <div className="flex flex-col gap-1">
                {siteConfig.nav.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="flex items-center rounded-lg px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 px-4">
                <motion.a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Instagram className="size-4 text-primary" />
                  <span>@vedawsm</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Travel &amp; Photography
                  </span>
                </motion.a>
                <motion.a
                  href={siteConfig.social.foodInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-foreground transition-colors hover:bg-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ChefHat className="size-4 text-red-500" />
                  <span>@food_ved_</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Food &amp; Cooking
                  </span>
                </motion.a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}