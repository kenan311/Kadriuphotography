import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { bookingToRecord } from '@/lib/booking'
import { ensureDatabase, prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const updateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: 'Nuk keni qasje në admin.' }, { status: 401 })
  }

  try {
    await ensureDatabase()

    const body = await request.json()
    const payload = updateSchema.parse(body)

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status: payload.status },
    })

    return NextResponse.json({ booking: bookingToRecord(booking) })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Status i pavlefshëm' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Rezervimi nuk u përditësua' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!isAdminRequest(_request)) {
    return NextResponse.json({ message: 'Nuk keni qasje në admin.' }, { status: 401 })
  }

  try {
    await ensureDatabase()

    await prisma.booking.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Rezervimi u fshi' })
  } catch {
    return NextResponse.json({ message: 'Rezervimi nuk u fshi' }, { status: 500 })
  }
}
