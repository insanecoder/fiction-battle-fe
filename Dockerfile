FROM node:20-alpine AS base
WORKDIR /app

# --- deps: full install (vite/tsc are devDependencies, needed to build AND
# to run `vite preview` at runtime — there's no separate "production deps"
# set for a frontend, everything ships bundled into the built JS) ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# --- build: Vite inlines VITE_* vars at build time (not runtime), so they
# must be passed as --build-arg, not just docker run -e ---
FROM base AS build
ARG VITE_API_BASE_URL
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_APP_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx tsc -b && npx vite build

# --- runtime: plain Node process only (no nginx) — `vite preview` serves the
# already-built dist/ output ---
FROM base AS runtime
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package.json vite.config.ts ./
COPY --from=build /app/dist ./dist

EXPOSE 4173
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
