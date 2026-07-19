import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkConfig } from "@/lib/work";
import { siteConfig } from "@/config/site.config";
import { WorkPageShell, iconForSlug } from "@/components/work-page-shell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkConfig();
  const collection = work.collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return {
    title: `${collection.title} — ${siteConfig.person.name}`,
    description: collection.subtitle,
  };
}

export default async function WorkCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWorkConfig();
  const index = work.collections.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();

  const collection = work.collections[index];
  const next = work.collections[(index + 1) % work.collections.length];

  return (
    <WorkPageShell
      collection={collection}
      icon={iconForSlug(collection.slug)}
      siblingHref={`/work/${next.slug}`}
      siblingLabel={`See my ${next.title}`}
      emptyLink={collection.emptyLink ?? siteConfig.social.instagram}
      emptyLinkLabel={collection.emptyLinkLabel ?? "Follow on Instagram"}
    />
  );
}
