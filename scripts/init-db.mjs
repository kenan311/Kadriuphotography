import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = dirname(__dirname)
const prismaDir = join(projectRoot, 'prisma')
const databasePath = join(prismaDir, 'dev.db')

await mkdir(prismaDir, { recursive: true })

const db = new DatabaseSync(databasePath)

db.exec(`
  CREATE TABLE IF NOT EXISTS "Booking" (
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
  );

  CREATE INDEX IF NOT EXISTS "Booking_createdAt_idx" ON "Booking" ("createdAt");
  CREATE INDEX IF NOT EXISTS "Booking_status_idx" ON "Booking" ("status");
  CREATE INDEX IF NOT EXISTS "Booking_eventDate_idx" ON "Booking" ("eventDate");

  CREATE TABLE IF NOT EXISTS "ContactMessage" (
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
  );

  CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage" ("createdAt");
  CREATE INDEX IF NOT EXISTS "ContactMessage_isRead_idx" ON "ContactMessage" ("isRead");
`)

db.close()

console.log(`SQLite database ready at ${databasePath}`)
