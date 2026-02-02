# Fastned Station Explorer (UK) — Next.js POC

Portfolio Next.js 14 App Router app that explores Fastned UK charging stations via map + list.

## Demo

- Live: <add-your-vercel-url-here>

## Highlights

- App Router + BFF route handlers for data normalization.
- Server/client separation with caching (`revalidate` + React Query).
- SSR-safe Leaflet map, polished UI, and tests (unit + e2e).

## Why this exists
Showcase production-style Next.js architecture in a real product context: performance, caching, routing, and modern frontend DX.

## Getting started

### 1) Install dependencies

```bash
pnpm install
# or
npm install
```

### 2) Configure environment

Copy `.env.example` to `.env.local` and adjust values:

```bash
cp .env.example .env.local
```

### 3) Run the app

```bash
pnpm dev
# or
npm run dev
```

Open `http://localhost:3000`.

## Mock vs live mode

- `NEXT_PUBLIC_APP_MODE=mock` uses fixtures in `src/fixtures/*.json`.
- `NEXT_PUBLIC_APP_MODE=live` calls the real Fastned UK Open Data endpoints.

**Note:** To keep upstream calls to two endpoints (reference + availability), the app expects a combined availability/tariffs endpoint in live mode. If tariffs are on a separate endpoint, consider proxying them server-side or configure `FASTNED_UK_TARIFFS_PATH` to the combined endpoint.

## Fastned UK Open Data policy (summary)

- Attribution is required when displaying Fastned UK Open Data.
- Do not abuse upstream APIs; respect rate limits.
- Use caching and throttling to avoid excessive traffic.

## Architecture overview

- **BFF Route Handlers:** `app/api/stations` and `app/api/stations/[id]` normalize and merge reference + availability data.
- **Domain mapping:** `src/domain` + `src/data/fastned/mappers.ts` normalize upstream or fixture data into stable domain types.
- **Caching strategy:** Next.js fetch caching with `revalidate` + tags in server code; React Query caching on the client.
- **Mock fixtures:** deterministic data for local dev and tests.

## Key Next.js features used

- App Router with nested routes and server components.
- Route Handlers as a BFF layer.
- `generateMetadata` for SEO.
- `loading.tsx`, `error.tsx`, and `not-found.tsx` per route.
- Dynamic import for Leaflet (SSR-safe map rendering).

## Testing

### Unit tests

```bash
pnpm test:unit
```

### E2E tests

```bash
pnpm test:e2e
```

## Screenshots

Run the app locally and capture screenshots from:

- `/` (map + list)
- `/stations` (list-first)
- `/stations/[id]` (detail view)
- `/favorites`
- `/compare?ids=...`
