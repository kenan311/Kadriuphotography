import { NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminRequest } from '@/lib/admin-auth'
import { contactMessageToRecord } from '@/lib/booking'
import { ensureDatabase, prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const updateSchema = z.object({
  isRead: z.boolean(),
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: 'Nuk keni qasje në admin.' }, { status: 401 })
  }

  try {
    await ensureDatabase()

    const body = await request.json()
    const payload = updateSchema.parse(body)

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { isRead: payload.isRead },
    })

    return NextResponse.json({ message: contactMessageToRecord(message) })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Vlera është e pavlefshme' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Mesazhi nuk u përditësua' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!isAdminRequest(_request)) {
    return NextResponse.json({ message: 'Nuk keni qasje në admin.' }, { status: 401 })
  }

  try {
    await ensureDatabase()

    await prisma.contactMessage.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Mesazhi u fshi' })
  } catch {
    return NextResponse.json({ message: 'Mesazhi nuk u fshi' }, { status: 500 })
  }
}
