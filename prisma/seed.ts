import { Role } from "@prisma/client";
import { hashPassword } from "@/lib/auth-password";
import { UserModel } from "@/Backend/models/user.model";
import {
  getSuperadminEmail,
  getSuperadminName,
  getSuperadminPassword,
  getBookingManagerSeed,
} from "@/Backend/config/env";
import { db } from "@/lib/db";
import { STATIC_VILLAS } from "@/lib/villas-static-data";

async function main() {
  const saEmail = getSuperadminEmail();
  const saPass = getSuperadminPassword();
  const saName = getSuperadminName();
  const saHash = await hashPassword(saPass);

  await UserModel.upsertStaff({
    fullName: saName,
    email: saEmail,
    passwordHash: saHash,
    role: Role.SUPERADMIN,
  });
  console.log(`Superadmin seeded: ${saEmail} (password from SUPERADMIN_PASSWORD in .env)`);

  const mgr = getBookingManagerSeed();
  const mgrHash = await hashPassword(mgr.password);
  await UserModel.upsertStaff({
    fullName: mgr.name,
    email: mgr.email,
    passwordHash: mgrHash,
    role: Role.BOOKING_MANAGER,
  });
  console.log(`Booking manager seeded: ${mgr.email} (password from BOOKING_MANAGER_PASSWORD in .env)`);

  for (const v of STATIC_VILLAS) {
    await db.villa.upsert({
      where: { slug: v.slug },
      create: {
        slug: v.slug,
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
      update: {
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
      },
    });
  }
  console.log(`Villas seeded: ${STATIC_VILLAS.length} (catalog in MongoDB)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
