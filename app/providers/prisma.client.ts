import { PrismaClient } from "@prisma/client";

const globalPrisma = global as unknown as { prisma: PrismaClient | undefined };

// const dbClient = globalPrisma.prisma ?? new PrismaClient({ log: ["query"] });
export const dbClient = globalPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = dbClient;
