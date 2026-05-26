import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { contactMessageToRecord } from '@/lib/booking'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const contactSchema = z.object({
  name: z.string().min(1, 'Shkruani emrin'),
  email: z.string().email('Email-i nuk duket i saktë'),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(1, 'Shkruani mesazhin'),
})

function parseOptionalDate(value?: string) {
  if (!value) {
    return null
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) ? null : date
}

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: 'Nuk keni qasje në admin.' }, { status: 401 })
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return NextResponse.json({
    messages: messages.map(contactMessageToRecord),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = contactSchema.parse(body)

    const message = await prisma.contactMessage.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        eventDate: parseOptionalDate(payload.eventDate),
        eventType: payload.eventType || null,
        location: payload.location || null,
        message: payload.message,
      },
    })

    return NextResponse.json(
      {
        message: contactMessageToRecord(message),
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

    return NextResponse.json({ message: 'Mesazhi nuk u ruajt' }, { status: 500 })
  }
}
