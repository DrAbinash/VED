import type { Metadata } from "next";
import { getWorkConfig } from "@/lib/work";
import { siteConfig } from "@/config/site.config";
import { WorkPageShell } from "@/components/work-page-shell";

export async function generateMetadata(): Promise<Metadata> {
  const work = await getWorkConfig();
  return {
    title: `${work.photography.title} — ${siteConfig.person.name}`,
    description: work.photography.subtitle,
  };
}

export default async function PhotographyPage() {
  const work = await getWorkConfig();
  return (
    <WorkPageShell
      collection={work.photography}
      icon="camera"
      siblingHref="/foods"
      siblingLabel="See my Foods"
      emptyLink={siteConfig.social.instagram}
      emptyLinkLabel="Follow @vedawsm"
    />
  );
}
