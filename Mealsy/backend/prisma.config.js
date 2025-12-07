import { defineConfig } from '@prisma/config';

const connectionString =
  process.env.DATABASE_URL ||
  // "postgresql://postgres:password@localhost:5432/mydb?schema=public";
  "postgresql://mahmoudagag@localhost:5432/mealsy";

export default defineConfig({
  schema: './prisma/schema.prisma',

  datasource: {
    url: connectionString
  },

  // Optional but recommended
  migrations: {
    // Where migration files will be stored
    outDir: './prisma/migrations',
  },
});
