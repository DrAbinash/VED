import { db } from "@/lib/db";

/**
 * "My Work" — Ved's two photo collections (Photography & Foods),
 * editable from the /admin panel and stored as one JSON row in SQLite.
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
  title: string;
  subtitle: string;
  layout: "masonry" | "grid";
  photos: WorkPhoto[];
};

export type WorkConfig = {
  photography: WorkCollection;
  foods: WorkCollection;
};

/** Defaults seeded from the existing gallery so the pages are never blank. */
export const defaultWork: WorkConfig = {
  photography: {
    title: "Photography",
    subtitle:
      "Chasing light across cities, coastlines, and mountain passes — moments that made me stop and look twice.",
    layout: "masonry",
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
  foods: {
    title: "Foods",
    subtitle:
      "From hostel-room experiments to plated pride — everything I cook, taste, and photograph along the way.",
    layout: "masonry",
    photos: [
      { src: "/gallery/ved-06.jpeg", caption: "Made from scratch" },
      { src: "/gallery/ved-07.jpeg", caption: "Culinary art" },
      { src: "/gallery/ved-08.jpeg", caption: "Food worth framing" },
    ],
  },
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function sanitizeCollection(base: WorkCollection, raw: unknown): WorkCollection {
  if (!isPlainObject(raw)) return base;
  const photos = Array.isArray(raw.photos)
    ? raw.photos
        .filter(isPlainObject)
        .map((p) => ({
          src: typeof p.src === "string" ? p.src : "",
          caption: typeof p.caption === "string" ? p.caption : "",
        }))
        .filter((p) => p.src)
    : base.photos;
  return {
    title: typeof raw.title === "string" && raw.title.trim() ? raw.title : base.title,
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : base.subtitle,
    layout: raw.layout === "grid" ? "grid" : "masonry",
    photos,
  };
}

/** Live config: defaults merged with whatever was saved in /admin. */
export async function getWorkConfig(): Promise<WorkConfig> {
  try {
    const row = await db.siteSetting.findUnique({ where: { id: "work" } });
    if (!row) return defaultWork;
    const parsed: unknown = JSON.parse(row.json);
    if (!isPlainObject(parsed)) return defaultWork;
    return {
      photography: sanitizeCollection(defaultWork.photography, parsed.photography),
      foods: sanitizeCollection(defaultWork.foods, parsed.foods),
    };
  } catch (error) {
    console.error("[work] failed to load saved collections", error);
    return defaultWork;
  }
}

export async function saveWorkConfig(config: Record<string, unknown>): Promise<void> {
  const json = JSON.stringify({
    photography: sanitizeCollection(defaultWork.photography, config.photography),
    foods: sanitizeCollection(defaultWork.foods, config.foods),
  });
  await db.siteSetting.upsert({
    where: { id: "work" },
    create: { id: "work", json },
    update: { json },
  });
}

export async function resetWorkConfig(): Promise<void> {
  await db.siteSetting.deleteMany({ where: { id: "work" } });
}
