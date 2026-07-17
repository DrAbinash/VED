# ============================================================================
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

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

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
