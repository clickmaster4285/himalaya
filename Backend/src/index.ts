import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { getMongoUri } from "./env";
import { ensureMongoBootstrap } from "./bootstrap";
import { authRouter } from "./routes/auth";
import { bookingsRouter } from "./routes/bookings";
import { packagesRouter } from "./routes/packages";
import { expensesRouter } from "./routes/expenses";
import { adminUsersRouter } from "./routes/admin-users";
import { publicVillasRouter, adminVillasRouter } from "./routes/villas";

const app = express();
app.use(express.json({ limit: "2mb" }));

app.use("/api/auth", authRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/villas", publicVillasRouter);
app.use("/api/admin/villas", adminVillasRouter);

async function main() {
  const uri = getMongoUri();
  await mongoose.connect(uri);
  await ensureMongoBootstrap();

  const port = Number(process.env.PORT) || 5000;
  app.listen(port, "127.0.0.1", () => {
    console.log(`Himalaya API listening on http://127.0.0.1:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
