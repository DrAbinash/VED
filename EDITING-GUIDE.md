# How to Edit Ved's Website

> **New: My Work photo manager — no rebuild needed**
>
> Ved's Photography and Foods pages have their own easy photo manager at
> **`/admin`** (there's a small "Manage photos" link in the website footer).
> Log in with the admin password (temporary: `ved2026` — set your own with
> `ADMIN_PASSWORD` in docker-compose.yml), then:
>
> - **Add photos** — pick one or MANY at once; they upload automatically.
> - Add optional captions, reorder with the arrows, or remove photos.
> - Choose the layout per page: **Auto (flowing mosaic)** or **Square grid**
>   — both fill the page completely with no blank gaps.
> - Edit each page's title and intro line.
> - Press **Save changes**, then refresh the page — done.
>
> Photos and settings are stored in the `ved-portfolio-data` Docker volume,
> so they survive updates and rebuilds.

Everything else is controlled by **one file**: `src/config/site.config.ts`. Change a value, rebuild, done.

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