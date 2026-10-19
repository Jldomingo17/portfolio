# --- Build: genera el sitio estático en /app/dist ---
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# URL pública del sitio (canonical y Open Graph). En Coolify: build variable SITE_URL
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
ENV ASTRO_TELEMETRY_DISABLED=1
RUN npm run build

# --- Runtime: solo nginx y los ficheros estáticos ---
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
