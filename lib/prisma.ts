import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
  databaseSetup?: Promise<void>
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "eventType" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "eventTime" TEXT,
    "location" TEXT NOT NULL,
    "guestCount" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "packagePrice" TEXT NOT NULL,
    "addOns" TEXT NOT NULL DEFAULT '[]',
    "specialRequests" TEXT,
    "howDidYouHear" TEXT,
    "budget" TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS "Booking_createdAt_idx" ON "Booking" ("createdAt")`,
  `CREATE INDEX IF NOT EXISTS "Booking_status_idx" ON "Booking" ("status")`,
  `CREATE INDEX IF NOT EXISTS "Booking_eventDate_idx" ON "Booking" ("eventDate")`,
  `CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "eventDate" DATETIME,
    "eventType" TEXT,
    "location" TEXT,
    "message" TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage" ("createdAt")`,
  `CREATE INDEX IF NOT EXISTS "ContactMessage_isRead_idx" ON "ContactMessage" ("isRead")`,
]

export function ensureDatabase() {
  if (!globalForPrisma.databaseSetup) {
    globalForPrisma.databaseSetup = (async () => {
      for (const statement of schemaStatements) {
        await prisma.$executeRawUnsafe(statement)
      }
    })().catch((error) => {
      globalForPrisma.databaseSetup = undefined
      throw error
    })
  }

  return globalForPrisma.databaseSetup
}
