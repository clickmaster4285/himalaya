import { hashPassword } from "./password";
import {
  getBookingManagerSeed,
  getSuperadminEmail,
  getSuperadminName,
  getSuperadminPassword,
} from "./env";
import { upsertStaffUser } from "./services/user.service";
import { VillaM } from "./models/schemas";
import { STATIC_VILLAS } from "./static-villas";

let bootstrapPromise: Promise<void> | null = null;

async function runBootstrap() {
  const saHash = await hashPassword(getSuperadminPassword());
  await upsertStaffUser({
    fullName: getSuperadminName(),
    email: getSuperadminEmail(),
    passwordHash: saHash,
    role: "SUPERADMIN",
  });

  const mgr = getBookingManagerSeed();
  const mgrHash = await hashPassword(mgr.password);
  await upsertStaffUser({
    fullName: mgr.name,
    email: mgr.email,
    passwordHash: mgrHash,
    role: "BOOKING_MANAGER",
  });

  try {
    for (const v of STATIC_VILLAS) {
      await VillaM.findOneAndUpdate(
        { slug: v.slug },
        {
          $set: {
            title: v.title,
            category: v.category,
            description: v.description,
            price: v.price,
            image: v.image,
            gallery: v.gallery ?? [],
            bedrooms: v.bedrooms,
            guests: v.guests,
            size: v.size,
            highlights: v.highlights,
            amenities: v.amenities,
            content: v.content,
            published: true,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }
  } catch (err) {
    console.warn("[bootstrap] Villa catalog sync skipped:", err);
  }
}

export function ensureMongoBootstrap(): Promise<void> {
  if (!bootstrapPromise) {
    bootstrapPromise = runBootstrap().catch((err) => {
      bootstrapPromise = null;
      throw err;
    });
  }
  return bootstrapPromise;
}
