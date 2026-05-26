import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { bookingToRecord } from '@/lib/booking'
import { ensureDatabase, prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const addOnSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
})

const bookingSchema = z.object({
  eventType: z.string().min(1, 'Zgjidhni llojin e rastit'),
  eventDate: z.string().min(1, 'Zgjidhni datën'),
  eventTime: z.string().optional(),
  location: z.string().min(1, 'Shkruani vendin'),
  guestCount: z.string().optional(),
  firstName: z.string().min(1, 'Shkruani emrin'),
  lastName: z.string().min(1, 'Shkruani mbiemrin'),
  email: z.string().email('Email-i nuk duket i saktë'),
  phone: z.string().min(1, 'Shkruani numrin e telefonit'),
  packageId: z.string().min(1, 'Zgjidhni ofertën'),
  packageName: z.string().min(1),
  packagePrice: z.string().min(1),
  addOns: z.array(addOnSchema).default([]),
  specialRequests: z.string().optional(),
  howDidYouHear: z.string().optional(),
  budget: z.string().optional(),
})

function parseEventDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`)

  if (Number.isNaN(date.getTime())) {
    throw new Error('Data nuk është e vlefshme')
  }

  return date
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: 'Nuk keni qasje në admin.' }, { status: 401 })
  }

  await ensureDatabase()

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json({
    bookings: bookings.map(bookingToRecord),
  })
}

export async function POST(request: Request) {
  try {
    await ensureDatabase()

    const body = await request.json()
    const payload = bookingSchema.parse(body)

    const booking = await prisma.booking.create({
      data: {
        eventType: payload.eventType,
        eventDate: parseEventDate(payload.eventDate),
        eventTime: payload.eventTime || null,
        location: payload.location,
        guestCount: payload.guestCount || null,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        packageId: payload.packageId,
        packageName: payload.packageName,
        packagePrice: payload.packagePrice,
        addOns: JSON.stringify(payload.addOns),
        specialRequests: payload.specialRequests || null,
        howDidYouHear: payload.howDidYouHear || null,
        budget: payload.budget || null,
      },
    })

    return NextResponse.json(
      {
        booking: bookingToRecord(booking),
        message: 'Rezervimi u pranua me sukses',
      },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Të dhënat nuk janë të plota',
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const message = error instanceof Error ? error.message : 'Rezervimi nuk u ruajt'

    return NextResponse.json({ message }, { status: 500 })
  }
}
