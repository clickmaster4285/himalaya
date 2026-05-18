# Himalaya Backend

## Run (local)

```bash
cd backend
npm install
npm run dev
```

API: http://127.0.0.1:5000  
Health check: http://127.0.0.1:5000/api/health

Copy `.env.example` → `.env` and set MongoDB + Gmail SMTP.

## Structure

```
backend/
  server.ts          ← entry (npm run dev)
  src/
    app.ts           ← Express app
    routes/          ← API paths → controllers
    controllers/     ← request handlers
    services/        ← business logic & email
    models/          ← MongoDB schemas
    config/          ← env, bootstrap
    middleware/      ← session
    utils/           ← helpers
    data/            ← static villa catalog
    templates/       ← email HTML
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API with hot reload |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled `dist/server.js` |
| `npm run test:smtp` | Test Gmail SMTP |
