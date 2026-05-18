# Himalaya Villas — monorepo

This project is split into two workspaces:

| Folder | Stack | Purpose |
|--------|--------|---------|
| `frontend/` | Next.js 16 | Public site, dashboards, API proxy to backend |
| `backend/` | Express + MongoDB | REST API, auth, bookings, villas, inquiries |

## Quick start

1. **MongoDB** — running locally (or set `DATABASE_URL` in `backend/.env`).

2. **Backend env** — copy and edit:

   ```bash
   cp backend/.env.example backend/.env
   ```

3. **Frontend env** — copy and edit:

   ```bash
   cp frontend/.env.example frontend/.env.local
   ```

4. **Install and run both** (from repo root):

   ```bash
   npm install
   npm run dev
   ```

   - Frontend: http://localhost:3000  
   - Backend API: http://127.0.0.1:5000  

Run individually:

```bash
npm run dev:backend
npm run dev:frontend
```

## Folder structure

### `backend/src/`

```
server.ts          # App entry
config/            # env, bootstrap
controllers/       # Route handlers
routes/            # Express routers
models/            # Mongoose schemas
services/          # Business logic
middleware/        # Auth session parsing
utils/             # Password, JWT, DTOs
data/              # Static villa catalog
```

### `frontend/`

```
app/               # Next.js pages & API routes
components/        # React UI
lib/               # Shared utilities, SEO, API helpers
public/            # Static assets
```

Frontend `/api/*` requests are rewritten to the backend (see `frontend/next.config.ts`).
