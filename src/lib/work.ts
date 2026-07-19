import { db } from "@/lib/db";

/**
 * "My Work" — Ved's photo collections (Photography, Foods, and any extra
 * sections he adds from /admin — Nature, Japan, etc.), stored as one JSON
 * row in SQLite.
 *
 * Each collection has a stable `slug` used for its URL (/work/<slug>).
 * The slug is assigned once, when the collection is created, and never
 * changes afterwards — even if the title is later edited — so links
 * never break.
 *
 * Layouts are deliberately gap-free:
 *  - "masonry": CSS-columns flow that fills every column top-to-bottom,
 *    whatever the photo shapes are (auto layout).
 *  - "grid": uniform squares (customisable alternative).
 */

export type WorkPhoto = {
  src: string;
  caption: string;
};

export type WorkCollection = {
  slug: string;
  title: string;
  subtitle: string;
  layout: "masonry" | "grid";
  photos: WorkPhoto[];
  emptyLink?: string;
  emptyLinkLabel?: string;
};

export type WorkConfig = {
  collections: WorkCollection[];
};

/** Defaults seeded from the existing gallery so the pages are never blank. */
export const defaultWork: WorkConfig = {
  collections: [
    {
      slug: "photography",
      title: "Photography",
      subtitle:
        "Chasing light across cities, coastlines, and mountain passes — moments that made me stop and look twice.",
      layout: "masonry",
      emptyLink: "https://www.instagram.com/vedawsm/",
      emptyLinkLabel: "Follow @vedawsm",
      photos: [
        { src: "/gallery/ved-01.jpeg", caption: "Island hopping, arms wide open" },
        { src: "/gallery/ved-02.jpeg", caption: "Under water, over the moon" },
        { src: "/gallery/ved-03.jpeg", caption: "Hidden beach, found happiness" },
        { src: "/gallery/ved-04.jpeg", caption: "Golden hour wanderer" },
        { src: "/gallery/ved-05.jpeg", caption: "Street art & family" },
        { src: "/gallery/ved-09.jpeg", caption: "Life in frames" },
        { src: "/gallery/ved-10.jpeg", caption: "Sunset study" },
      ],
    },
    {
      slug: "foods",
      title: "Foods",
      subtitle:
        "From hostel-room experiments to plated pride — everything I cook, taste, and photograph along the way.",
      layout: "masonry",
      emptyLink: "https://www.instagram.com/food_ved_/",
      emptyLinkLabel: "Follow @food_ved_",
      photos: [
        { src: "/gallery/ved-06.jpeg", caption: "Made from scratch" },
        { src: "/gallery/ved-07.jpeg", caption: "Culinary art" },
        { src: "/gallery/ved-08.jpeg", caption: "Food worth framing" },
      ],
    },
  ],
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "section";
}

/** Appends -2, -3, ... until `slug` doesn't collide with `taken`. */
function uniqueSlug(slug: string, taken: Set<string>): string {
  if (!taken.has(slug)) return slug;
  let n = 2;
  while (taken.has(`${slug}-${n}`)) n++;
  return `${slug}-${n}`;
}

function sanitizePhotos(raw: unknown): WorkPhoto[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(isPlainObject)
    .map((p) => ({
      src: typeof p.src === "string" ? p.src : "",
      caption: typeof p.caption === "string" ? p.caption : "",
    }))
    .filter((p) => p.src);
}

/** Sanitizes one raw collection, assigning/deduping its slug against `taken`. */
function sanitizeCollection(raw: unknown, taken: Set<string>): WorkCollection | null {
  if (!isPlainObject(raw)) return null;
  const title = typeof raw.title === "string" && raw.title.trim() ? raw.title.trim() : "";
  if (!title) return null;

  const rawSlug = typeof raw.slug === "string" && raw.slug.trim() ? slugify(raw.slug) : slugify(title);
  const slug = uniqueSlug(rawSlug, taken);
  taken.add(slug);

  return {
    slug,
    title,
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : "",
    layout: raw.layout === "grid" ? "grid" : "masonry",
    photos: sanitizePhotos(raw.photos),
    emptyLink: typeof raw.emptyLink === "string" && raw.emptyLink ? raw.emptyLink : undefined,
    emptyLinkLabel:
      typeof raw.emptyLinkLabel === "string" && raw.emptyLinkLabel ? raw.emptyLinkLabel : undefined,
  };
}

/** Migrates the old fixed {photography, foods} shape into a collections list. */
function migrateLegacyShape(parsed: Record<string, unknown>): unknown[] | null {
  if (Array.isArray(parsed.collections)) return parsed.collections;
  if (isPlainObject(parsed.photography) || isPlainObject(parsed.foods)) {
    const legacy: unknown[] = [];
    if (isPlainObject(parsed.photography)) legacy.push({ slug: "photography", ...parsed.photography });
    if (isPlainObject(parsed.foods)) legacy.push({ slug: "foods", ...parsed.foods });
    return legacy;
  }
  return null;
}

/** Live config: defaults merged with whatever was saved in /admin. */
export async function getWorkConfig(): Promise<WorkConfig> {
  try {
    const row = await db.siteSetting.findUnique({ where: { id: "work" } });
    if (!row) return defaultWork;
    const parsed: unknown = JSON.parse(row.json);
    if (!isPlainObject(parsed)) return defaultWork;

    const rawList = migrateLegacyShape(parsed);
    if (!rawList) return defaultWork;

    const taken = new Set<string>();
    const collections = rawList
      .map((raw) => sanitizeCollection(raw, taken))
      .filter((c): c is WorkCollection => c !== null);

    return collections.length > 0 ? { collections } : defaultWork;
  } catch (error) {
    console.error("[work] failed to load saved collections", error);
    return defaultWork;
  }
}

export async function saveWorkConfig(config: Record<string, unknown>): Promise<void> {
  const rawList = Array.isArray(config.collections) ? config.collections : [];
  const taken = new Set<string>();
  const collections = rawList
    .map((raw) => sanitizeCollection(raw, taken))
    .filter((c): c is WorkCollection => c !== null);

  const json = JSON.stringify({ collections: collections.length > 0 ? collections : defaultWork.collections });
  await db.siteSetting.upsert({
    where: { id: "work" },
    create: { id: "work", json },
    update: { json },
  });
}

export async function resetWorkConfig(): Promise<void> {
  await db.siteSetting.deleteMany({ where: { id: "work" } });
}
