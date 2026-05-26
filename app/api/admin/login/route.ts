import { NextResponse } from 'next/server'
import {
  isAdminPasswordConfigured,
  isValidAdminPassword,
  setAdminSessionCookie,
} from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const password = typeof body.password === 'string' ? body.password : ''

  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { message: 'ADMIN_PASSWORD nuk është vendosur në konfigurim.' },
      { status: 500 },
    )
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ message: 'Fjalëkalimi nuk është i saktë.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  setAdminSessionCookie(response)

  return response
}
