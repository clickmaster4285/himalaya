import type { Role } from "../types";
import type { UserDoc } from "../user-dto";
import { UserM } from "../models/schemas";

function mapUser(u: {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}): UserDoc {
  return {
    id: u._id,
    fullName: u.fullName,
    email: u.email,
    passwordHash: u.passwordHash,
    role: u.role,
    isActive: u.isActive,
    createdAt: u.createdAt,
  };
}

export async function findUserByEmail(email: string): Promise<UserDoc | null> {
  const row = await UserM.findOne({ email: email.trim().toLowerCase() }).lean();
  return row ? mapUser(row as unknown as Parameters<typeof mapUser>[0]) : null;
}

export async function findUserById(id: string): Promise<UserDoc | null> {
  const row = await UserM.findById(id).lean();
  return row ? mapUser(row as unknown as Parameters<typeof mapUser>[0]) : null;
}

export async function createGuestUser(params: { fullName: string; email: string; passwordHash: string }) {
  const doc = await UserM.create({
    fullName: params.fullName.trim(),
    email: params.email.trim().toLowerCase(),
    passwordHash: params.passwordHash,
    role: "USER",
    isActive: true,
  });
  return mapUser(doc.toObject() as Parameters<typeof mapUser>[0]);
}

export async function upsertStaffUser(params: {
  fullName: string;
  email: string;
  passwordHash: string;
  role: Role;
}) {
  const email = params.email.trim().toLowerCase();
  await UserM.findOneAndUpdate(
    { email },
    {
      $set: {
        fullName: params.fullName.trim(),
        passwordHash: params.passwordHash,
        role: params.role,
        isActive: true,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
}

export async function listUsersOrdered() {
  const rows = await UserM.find().sort({ createdAt: -1 }).lean();
  return rows.map((r) => mapUser(r as unknown as Parameters<typeof mapUser>[0]));
}

export async function updateUserRole(id: string, role: Role) {
  const doc = await UserM.findByIdAndUpdate(id, { $set: { role } }, { new: true }).lean();
  if (!doc) throw new Error("NOT_FOUND");
  return mapUser(doc as unknown as Parameters<typeof mapUser>[0]);
}
