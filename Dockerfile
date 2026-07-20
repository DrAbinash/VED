# ============================================================================
#  Dockerfile — Ved Singh Personal Portfolio
#  Next.js standalone server (needed for the /admin photo uploads + SQLite).
#  Optimised for Synology Container Manager.
# ============================================================================

# ---------- Stage 1: deps ----------
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* bun.lock* ./
RUN npm install

# ---------- Stage 2: builder ----------
FROM node:20-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# openssl must be present before `prisma generate` runs, so its "native"
# target auto-detects correctly as debian-openssl-3.0.x (matching the
# runner stage) instead of guessing wrong and needing a second engine
# binary downloaded for an explicit non-native target.
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

# ---------- Stage 3: runner ----------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL=file:/app/data/ved.db
ENV UPLOADS_DIR=/app/data/uploads

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Prisma schema + its full node_modules tree (the Prisma CLI's dependency
# graph isn't limited to prisma/@prisma/.prisma — e.g. @prisma/config
# pulls in "effect" — so cherry-picking subfolders breaks `prisma db push`).
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh \
    && mkdir -p /app/data/uploads \
    && chown -R nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000
VOLUME ["/app/data"]

CMD ["./docker-entrypoint.sh"]
