import 'server-only'

import { createHmac, timingSafeEqual } from 'crypto'
import type { NextResponse } from 'next/server'

export const ADMIN_COOKIE_NAME = 'kadriu_admin_session'

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function getSigningSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'local-development-secret'
}

function sign(value: string) {
  return createHmac('sha256', getSigningSecret()).update(value).digest('hex')
}

function safeEqual(a: string, b: string) {
  const aHash = sign(`compare:${a}`)
  const bHash = sign(`compare:${b}`)

  return timingSafeEqual(Buffer.from(aHash), Buffer.from(bHash))
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export function isValidAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD

  if (!configuredPassword) {
    return false
  }

  return safeEqual(password, configuredPassword)
}

export function createAdminSession() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  const payload = `owner.${expiresAt}`
  const signature = sign(payload)

  return `${payload}.${signature}`
}

export function verifyAdminSession(value?: string) {
  if (!value) {
    return false
  }

  const parts = value.split('.')

  if (parts.length !== 3) {
    return false
  }

  const [role, expiresAtText, signature] = parts
  const payload = `${role}.${expiresAtText}`
  const expiresAt = Number(expiresAtText)

  if (role !== 'owner' || Number.isNaN(expiresAt) || expiresAt < Date.now()) {
    return false
  }

  return safeEqual(signature, sign(payload))
}

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return new Map<string, string>()
  }

  return new Map(
    cookieHeader.split(';').map((cookie) => {
      const [name, ...valueParts] = cookie.trim().split('=')
      return [name, decodeURIComponent(valueParts.join('='))]
    }),
  )
}

export function isAdminRequest(request: Request) {
  const cookies = parseCookieHeader(request.headers.get('cookie'))

  return verifyAdminSession(cookies.get(ADMIN_COOKIE_NAME))
}
