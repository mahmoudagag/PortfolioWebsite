import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://mahmoudagag@localhost:5432/mealsy";

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma