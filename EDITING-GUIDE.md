# How to Edit Ved's Website

Everything on this website is controlled by **one file**. You don't need to know coding — just open the file, find the text you want to change, and edit it.

---

## The One File: `src/config/site.config.ts`

This file contains ALL the content — name, bio, interests, gallery photos, social links, everything. Change a value here, rebuild, and the website updates.

### Where is it?
```
src/config/site.config.ts
```

### How to edit it on your Synology

```bash
cd /volume1/docker/VED
vi src/config/site.config.ts
```

Press `i` to edit, `Esc` + `:wq` to save. Then rebuild:
```bash
docker compose up -d --build
```

---

## What You Can Change (and where)

| What you want to change | Look for in the file |
|------------------------|---------------------|
| Name | `name: "Ved Singh"` |
| Title | `title: "Final Year MBBS Student"` |
| Tagline | `tagline: "Aspiring Doctor..."` |
| Short bio | `shortBio:` |
| Long bio (About section) | `longBio:` array |
| College name | `college:` |
| Location | `location:` |
| Interests | `interests:` array |
| Gallery images | `gallery:` array |
| Stats (numbers) | `stats:` array |
| Instagram links | `social.instagram` and `social.foodInstagram` |
| Navigation items | `nav:` array |
| Theme colors | `theme:` object |

---

## How to Change Photos

### Hero photo (the big image at the top)
1. Put your photo in the `public/gallery/` folder
2. In `site.config.ts`, change:
   ```
   heroPhoto: "/gallery/WhatsApp Image 2026-07-08 at 15.08.45.jpeg"
   ```
   to your new filename.

### About photo
1. Put your photo in `public/gallery/`
2. Change `aboutPhoto:` in `site.config.ts`

### Gallery images
The gallery images are listed in the `gallery:` array in `site.config.ts`. Each entry has:
- `src` — file path (e.g., `/gallery/my-photo.jpeg`)
- `alt` — description text
- `span` — layout size (`col-span-2 row-span-2` for large, `col-span-1 row-span-1` for small)

Add or remove entries to change the gallery.

---

## How to Change Colors

The theme is emerald green (#0d9488) with red accents (#dc2626). To change, edit `src/app/globals.css` and look for the `--primary` line:
```
--primary: oklch(0.55 0.13 180);
```
Change the numbers to get a different color. Then rebuild.

The red accent color is used via Tailwind classes like `text-red-600` and `bg-red-600` in the component files.

---

## Deploy on Synology (first time)

```bash
cd /volume1/docker
git clone https://github.com/DrAbinash/VED.git VED
cd VED

# Build and start
docker compose up -d --build
```

Open: `http://<nas-ip>:3010`

---

## Update after editing

```bash
cd /volume1/docker/VED
git pull                          # if you edited on GitHub
docker compose up -d --build      # rebuild with changes
```

---

## Quick reference: common edits

### Change Instagram handle
In `site.config.ts`:
```
social: {
    instagram: "https://www.instagram.com/vedawsm/",
    foodInstagram: "https://www.instagram.com/food_ved_/",
}
```

### Add a new gallery photo
In the `gallery:` array, add:
```
{ src: "/gallery/new-photo.jpeg", alt: "Description", span: "col-span-1 row-span-1" },
```
Put the photo file in `public/gallery/`, then rebuild.

### Change stats numbers
```
stats: [
    { label: "Places Explored", value: 20, suffix: "+" },
    { label: "Photos Captured", value: 10000, suffix: "+" },
],
```