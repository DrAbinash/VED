# ============================================================================
<<<<<<< HEAD
#  Dockerfile — Ved Singh Portfolio (Next.js static export)
#  Optimised for Synology Container Manager.
#  Lightweight nginx-based setup for static content.
# ============================================================================

# ---------- Stage 1: static files base ----------
FROM node:20-slim AS static_base
WORKDIR /app
COPY . .

# ---------- Stage 2: runner (nginx) ----------
FROM nginx:alpine AS runner
WORKDIR /app

# Create nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'user nginx;\nworker_processes auto;\nerror_log /var/log/nginx/error.log warn;\npid /var/run/nginx.pid;\n\nevents {\n    worker_connections 1024;\n}\n\nhttp {\n    include /etc/nginx/mime.types;\n    default_type application/octet-stream;\n    sendfile on;\n    tcp_nopush on;\n    keepalive_timeout 65;\n    gzip on;\n    gzip_vary on;\n    gzip_comp_level 6;\n    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;\n    include /etc/nginx/conf.d/*.conf;\n}' > /etc/nginx/nginx.conf

RUN echo 'server {\n    listen 3000 default_server;\n    root /usr/share/nginx/html;\n    index index.html;\n    add_header X-Frame-Options "SAMEORIGIN" always;\n    add_header X-Content-Type-Options "nosniff" always;\n    location /_next/static { expires 365d; add_header Cache-Control "public, immutable"; }\n    location /gallery { expires 30d; add_header Cache-Control "public, must-revalidate"; }\n    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ { expires 365d; }\n    location / { try_files $uri $uri/ /index.html; }\n    location ~ /\. { deny all; }\n}' > /etc/nginx/conf.d/default.conf

# Copy static files from base
COPY --from=static_base /app /usr/share/nginx/html

# Create nginx user if needed
RUN mkdir -p /var/run/nginx && chmod -R 755 /var/run/nginx

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
=======
#  Dockerfile — Ved Singh Personal Portfolio
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

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- Stage 3: runner ----------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
>>>>>>> 1d7a31f175001591b8b20f58c3f61d3ae4aca124
