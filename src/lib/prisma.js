import { PrismaClient } from '@prisma/client';
import { PrismaPostgres } from '@prisma/adapter-postgresql';

const adapter = new PrismaPostgres(process.env.DATABASE_URL);

const prisma = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
