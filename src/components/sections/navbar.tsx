"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Instagram, ChefHat, ChevronRight, ExternalLink } from "lucide-react";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("size-9", className)} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="oklch(0.51 0.13 162)" />
      <text x="24" y="31" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="serif">V</text>
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", scrolled ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border/60" : "bg-background/70 backdrop-blur-sm")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-2.5 group" aria-label="Ved Singh — home">
          <span className="transition-transform group-hover:scale-105"><BrandLogo /></span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">{siteConfig.person.name}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-700 sm:text-xs">{siteConfig.person.title}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-emerald-800">{item.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm">
            <a href={siteConfig.social.foodInstagram} target="_blank" rel="noopener noreferrer">
              <ChefHat className="size-4 text-red-600" /><span>Food by Ved</span>
            </a>
          </Button>
          <Button asChild size="sm" className="bg-emerald-700 hover:bg-emerald-800">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="size-4" /><span>Follow on Instagram</span>
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="icon" variant="outline" aria-label="Instagram">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="size-4" /></a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Open menu"><Menu className="size-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex items-center gap-2.5 border-b px-5 pb-4 pt-1">
                <BrandLogo />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-foreground">{siteConfig.person.name}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-700">{siteConfig.person.title}</span>
                </div>
              </div>
              <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Mobile navigation">
                {siteConfig.nav.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <SheetClose asChild>
                      <Link href={item.href} className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-emerald-800">
                        {item.label}<ChevronRight className="size-4 text-muted-foreground" />
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                <SheetClose asChild>
                  <Button asChild variant="outline">
                    <a href={siteConfig.social.foodInstagram} target="_blank" rel="noopener noreferrer">
                      <ChefHat className="size-4 text-red-600" />@food_ved_ <ExternalLink className="size-3" />
                    </a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="bg-emerald-700 hover:bg-emerald-800">
                    <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="size-4" />Follow @vedawsm <ExternalLink className="size-3" />
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}