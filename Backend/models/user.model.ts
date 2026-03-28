import { Role, type User } from "@prisma/client";
import { db } from "@/lib/db";

export const UserModel = {
  findByEmail(email: string) {
    return db.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  },

  findById(id: string) {
    return db.user.findUnique({ where: { id } });
  },

  async createGuest(params: { fullName: string; email: string; passwordHash: string }) {
    return db.user.create({
      data: {
        fullName: params.fullName.trim(),
        email: params.email.trim().toLowerCase(),
        passwordHash: params.passwordHash,
        role: Role.USER,
        isActive: true,
      },
    });
  },

  async upsertStaff(params: {
    fullName: string;
    email: string;
    passwordHash: string;
    role: Role;
  }) {
    return db.user.upsert({
      where: { email: params.email.trim().toLowerCase() },
      update: {
        fullName: params.fullName.trim(),
        role: params.role,
        passwordHash: params.passwordHash,
        isActive: true,
      },
      create: {
        fullName: params.fullName.trim(),
        email: params.email.trim().toLowerCase(),
        passwordHash: params.passwordHash,
        role: params.role,
        isActive: true,
      },
    });
  },

  listAllOrderedByCreated() {
    return db.user.findMany({ orderBy: { createdAt: "desc" } });
  },

  updateRole(id: string, role: Role) {
    return db.user.update({ where: { id }, data: { role } });
  },
};

export type { User };
