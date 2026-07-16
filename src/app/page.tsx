import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Interests } from "@/components/sections/interests";
import { Gallery } from "@/components/sections/gallery";
import { Connect } from "@/components/sections/connect";
import { Footer } from "@/components/sections/footer";
import { FloatingCta } from "@/components/sections/floating-cta";
import { ScrollProgress } from "@/components/scroll-progress";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Journey />
        <Interests />
        <Gallery />
        <Connect />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}