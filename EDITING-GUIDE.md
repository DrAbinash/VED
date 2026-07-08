# How to Edit Ved's Website

Everything is controlled by **one file**: `src/config/site.config.ts`. Change a value, rebuild, done.

---

## Edit on Synology

```bash
cd /volume1/docker/VED
vi src/config/site.config.ts
# Press i to edit, Esc + :wq to save
docker compose up -d --build
```

---

## What You Can Change

| What | Where in site.config.ts |
|------|------------------------|
| Name | `person.name` |
| Title | `person.title` |
| Tagline | `person.tagline` |
| Short bio | `person.shortBio` |
| Long bio (3 paragraphs) | `person.longBio` array |
| College | `person.college` |
| Location | `person.location` |
| Hero photo | `person.heroPhoto` |
| About photo | `person.aboutPhoto` |
| Interests | `interests` array |
| Gallery images | `gallery` array (src, alt, span) |
| Stats numbers | `stats` array |
| Instagram @vedawsm | `social.instagram` |
| Instagram @food_ved_ | `social.foodInstagram` |
| Nav items | `nav` array |
| Colors | Edit `src/app/globals.css` |

---

## Change Photos

1. Put new photos in `public/gallery/`
2. Update the filename in `site.config.ts`:
   - `person.heroPhoto` — hero background
   - `person.aboutPhoto` — about section
   - `gallery` array — gallery images

Gallery span options:
- `"col-span-2 row-span-2"` — large featured image
- `"col-span-1 row-span-1"` — regular size
- `"col-span-2 row-span-1"` or `"col-span-1 row-span-2"` — wide/tall

---

## First-Time Deploy on Synology

```bash
cd /volume1/docker
git clone https://github.com/DrAbinash/VED.git VED
cd VED
docker compose up -d --build
```

Open: `http://<nas-ip>:3010`

---

## Update After Editing

```bash
cd /volume1/docker/VED
git pull
docker compose up -d --build
```