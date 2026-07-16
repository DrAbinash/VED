import type { Metadata } from "next";
import { getWorkConfig } from "@/lib/work";
import { siteConfig } from "@/config/site.config";
import { WorkPageShell } from "@/components/work-page-shell";

export async function generateMetadata(): Promise<Metadata> {
  const work = await getWorkConfig();
  return {
    title: `${work.foods.title} — ${siteConfig.person.name}`,
    description: work.foods.subtitle,
  };
}

export default async function FoodsPage() {
  const work = await getWorkConfig();
  return (
    <WorkPageShell
      collection={work.foods}
      icon="chefHat"
      siblingHref="/photography"
      siblingLabel="See my Photography"
      emptyLink={siteConfig.social.foodInstagram}
      emptyLinkLabel="Follow @food_ved_"
    />
  );
}
