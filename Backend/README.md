# Backend note

The **live API** for Himalaya Villas (auth, bookings, admin) runs **inside the Next.js app** at the repository root:

- **Routes:** `app/api/**` (thin files)
- **Controllers:** `Backend/controllers/`
- **Models (Prisma access):** `Backend/models/`
- **Route map:** `Backend/routes/api.routes.ts`
- **Database:** Prisma + SQLite (`prisma/schema.prisma`)

Copy environment variables from the **root** `.env.example` into the root `.env` (not only this folder).

### MongoDB (`Backend/backend/`)

- Set `MONGODB_URI` (default `mongodb://127.0.0.1:27017/himalaya`). In **Compass**, connect to `localhost:27017` and open the database name from the URI path (e.g. **himalaya**).
- Collections (**users**, **bookings**) appear after the first document is saved (e.g. `POST /api/auth/register`, then `POST /api/bookings` with a Bearer token).
- Server runs on **PORT** (default `4000`), not 3000.

The Next.js UI still uses **Prisma + SQLite** unless you point the frontend at this API and stop using Prisma for those flows.
