"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plane,
  Camera,
  ChefHat,
  Stethoscope,
  GraduationCap,
  MapPin,
  Instagram,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GALLERY_IMAGES = [
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45.jpeg", alt: "Travel moment", span: "col-span-2 row-span-2" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45 (1).jpeg", alt: "Adventures", span: "col-span-1 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45 (2).jpeg", alt: "Exploring new places", span: "col-span-1 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.46.jpeg", alt: "Photography capture", span: "col-span-1 row-span-2" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.46 (1).jpeg", alt: "Beautiful scenery", span: "col-span-2 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.47.jpeg", alt: "Cooking creation", span: "col-span-1 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.47 (2).jpeg", alt: "Culinary art", span: "col-span-1 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.47 (3).jpeg", alt: "Food photography", span: "col-span-2 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.48.jpeg", alt: "Life in frames", span: "col-span-1 row-span-1" },
  { src: "/gallery/WhatsApp Image 2026-07-08 at 15.08.48 (2).jpeg", alt: "Captured moments", span: "col-span-1 row-span-1" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Interests", href: "#interests" },
  { label: "Gallery", href: "#gallery" },
  { label: "Connect", href: "#connect" },
];

const INTERESTS = [
  {
    icon: Plane,
    title: "Solo Travelling",
    description:
      "From the misty hills of the Western Ghats to the golden deserts of Rajasthan, every journey is a story waiting to be lived. Travelling solo isn't just about destinations — it's about discovering who you become when no one's watching. Each trip brings new perspectives, unexpected friendships, and memories that shape the soul.",
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-600",
    border: "border-amber-200/60",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Through the lens, ordinary moments become extraordinary. Whether it's the golden hour light on a mountain pass, the chaos of a bustling street market, or the quiet stillness of a patient's smile — every frame tells a story. Photography is the art of seeing what others overlook and preserving it forever.",
    color: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-600",
    border: "border-rose-200/60",
  },
  {
    icon: ChefHat,
    title: "Cooking",
    description:
      "The kitchen is a sanctuary where science meets soul. As a future doctor, understanding nutrition is second nature, but cooking is where that knowledge becomes art. From perfecting the classic dal to experimenting with global cuisines, every dish is a celebration of flavours, health, and the joy of feeding others.",
    color: "from-emerald-500/10 to-teal-500/10",
    iconColor: "text-emerald-600",
    border: "border-emerald-200/60",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const observeSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [id]: true }));
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return observer;
  }, []);

  useEffect(() => {
    const observers = NAV_LINKS.map((l) =>
      observeSection(l.href.replace("#", ""))
    );
    return () => observers.forEach((obs) => obs?.disconnect());
  }, [observeSection]);

  const lightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === 0 ? GALLERY_IMAGES.length - 1 : lightboxIndex - 1
    );
  };
  const lightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      lightboxIndex === GALLERY_IMAGES.length - 1 ? 0 : lightboxIndex + 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#home"
              className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-foreground tracking-tight"
            >
              Ved<span className="text-primary">.</span>
            </a>
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 rounded-full"
              asChild
            >
              <a
                href="https://www.instagram.com/vedawsm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
                Follow
              </a>
            </Button>
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="https://www.instagram.com/vedawsm/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50 px-2 py-1.5 safe-area-bottom">
        <div className="flex items-center justify-around">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src="/gallery/WhatsApp Image 2026-07-08 at 15.08.45.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <div className="animate-fade-in-up" style={{ opacity: 0 }}>
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-sm border border-white/50"
              >
                <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
                Final Year MBBS Student
              </Badge>
            </div>

            <h1
              className="animate-fade-in-up delay-200 font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
              style={{ opacity: 0 }}
            >
              Ved Singh
            </h1>

            <p
              className="animate-fade-in-up delay-400 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-4 font-light leading-relaxed"
              style={{ opacity: 0 }}
            >
              Aspiring Doctor &middot; Traveller &middot; Photographer &middot; Chef
            </p>

            <p
              className="animate-fade-in-up delay-500 text-sm sm:text-base text-muted-foreground/80 flex items-center justify-center gap-1.5 mb-10"
              style={{ opacity: 0 }}
            >
              <GraduationCap className="w-4 h-4" />
              Dr. D. Y. Patil Medical College, Pune
            </p>

            <div
              className="animate-fade-in-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ opacity: 0 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 shadow-lg shadow-primary/20"
                asChild
              >
                <a href="#about">
                  Explore My World
                  <Sparkles className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
                asChild
              >
                <a
                  href="https://www.instagram.com/food_ved_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ChefHat className="w-4 h-4 mr-2" />
                  Food by Ved
                </a>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce md:bottom-10">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50 animate-pulse" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`transition-all duration-700 ${
                isVisible["about"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                  Get to Know Me
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                  About Ved
                </h2>
                <div className="section-divider mx-auto" />
              </div>
            </div>

            <div
              className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 delay-200 ${
                isVisible["about"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Image side */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/10">
                  <img
                    src="/gallery/WhatsApp Image 2026-07-08 at 15.08.46 (1).jpeg"
                    alt="Ved Singh"
                    className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/90 backdrop-blur-sm text-foreground border-0 shadow-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      Pune, India
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Namaste! I&apos;m <strong className="text-foreground">Ved Singh</strong>, a final year
                  MBBS student at <strong className="text-foreground">Dr. D. Y. Patil Medical College, Pune</strong>.
                  My journey in medicine has taught me the profound art of healing, empathy, and the
                  resilience of the human spirit. Every patient encounter reinforces my belief that
                  being a doctor is not just a profession — it&apos;s a calling.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Beyond the walls of the hospital, I wear many hats. I&apos;m a <strong className="text-foreground">solo traveller</strong> who finds
                  solace in the mountains and wisdom in the streets of unknown cities. Through my <strong className="text-foreground">camera lens</strong>,
                  I capture the poetry of everyday life — the golden hours, the candid smiles, the quiet
                  moments that most people walk past. And in the <strong className="text-foreground">kitchen</strong>, I express my
                  creativity through flavours, experimenting with recipes that nourish both body and soul.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  I believe that life is richest when lived at the intersection of passion and purpose.
                  Whether I&apos;m diagnosing a patient, framing a photograph, or perfecting a new recipe, I
                  bring the same dedication and curiosity to everything I do. This space is a window into
                  my world — welcome.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary mb-1">
                      MBBS
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Final Year Student
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary mb-1">
                      Pune
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Maharashtra, India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section
          id="interests"
          className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible["interests"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                What Drives Me
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                My Passions
              </h2>
              <div className="section-divider mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {INTERESTS.map((interest, idx) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={interest.title}
                    className={`transition-all duration-700 ${
                      isVisible["interests"]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: `${200 + idx * 150}ms`,
                    }}
                  >
                    <div
                      className={`group relative bg-card rounded-2xl p-6 lg:p-8 border ${interest.border} hover:shadow-xl hover:shadow-black/5 transition-all duration-500 h-full`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${interest.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      <div className="relative z-10">
                        <div
                          className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className={`w-7 h-7 ${interest.iconColor}`} />
                        </div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl font-semibold text-foreground mb-3">
                          {interest.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible["gallery"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Through My Lens
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Photo Gallery
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground max-w-lg mx-auto">
                A curated collection of moments captured across travels, kitchens, and the beautiful chaos of everyday life.
              </p>
            </div>

            <div
              className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4 transition-all duration-700 delay-200 ${
                isVisible["gallery"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {GALLERY_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className={`gallery-item cursor-pointer relative group ${img.span}`}
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Camera className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section
          id="connect"
          className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`transition-all duration-700 ${
                isVisible["connect"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Stay Connected
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Let&apos;s Connect
              </h2>
              <div className="section-divider mx-auto mb-8" />
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Follow my journey through medicine, travel, photography, and cooking on Instagram.
                From hospital stories to mountain trails and kitchen experiments — it&apos;s all there.
              </p>
            </div>

            <div
              className={`grid sm:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${
                isVisible["connect"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <a
                href="https://www.instagram.com/vedawsm/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:shadow-black/5 transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground mb-1">
                  @vedawsm
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Travel & Photography
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                  View Profile <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>

              <a
                href="https://www.instagram.com/food_ved_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:shadow-black/5 transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground mb-1">
                  @food_ved_
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Food & Cooking
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                  View Profile <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border/50 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-[family-name:var(--font-playfair)] font-semibold text-foreground">
              Ved Singh
            </span>
            <span>&middot;</span>
            <span>Aspiring Doctor</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" /> by family
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] lightbox-overlay bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrev();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_IMAGES[lightboxIndex].src}
              alt={GALLERY_IMAGES[lightboxIndex].alt}
              className="w-full h-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </div>
  );
}