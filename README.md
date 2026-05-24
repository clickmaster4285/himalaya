# Himalaya Villas — Next.js

Single Next.js 16 app with API routes, MongoDB, auth, bookings, villas, and inquiries.

## Quick start

1. **MongoDB** — running locally (or set `DATABASE_URL` in `frontend/.env.local`).

2. **Env** — copy and edit:

   ```bash
   cp frontend/.env.example frontend/.env.local
   ```

3. **Install and run** (from repo root):

   ```bash
   npm install
   npm run dev
   ```

   App: http://localhost:3000  
   API health: http://localhost:3000/api/health

## Folder structure

```
frontend/
  app/               # Pages & API routes (app/api/*)
  lib/
    server/          # API logic (controllers, services, models)
    ...              # Shared utilities, SEO, UI helpers
  components/        # React UI
  public/            # Static assets
  scripts/           # SMTP / Gmail setup helpers
```

API handlers live under `frontend/lib/server/` and are exposed via `frontend/app/api/[[...slug]]/route.ts`.
