export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export type AddOnSelection = {
  id: string
  name: string
  price: string
}

export type BookingRecord = {
  id: string
  createdAt: string
  updatedAt: string
  status: BookingStatus
  eventType: string
  eventDate: string
  eventTime: string | null
  location: string
  guestCount: string | null
  firstName: string
  lastName: string
  email: string
  phone: string
  packageId: string
  packageName: string
  packagePrice: string
  addOns: AddOnSelection[]
  specialRequests: string | null
  howDidYouHear: string | null
  budget: string | null
}

export type ContactMessageRecord = {
  id: string
  createdAt: string
  isRead: boolean
  name: string
  email: string
  phone: string | null
  eventDate: string | null
  eventType: string | null
  location: string | null
  message: string
}

export function parseAddOns(addOns: string): AddOnSelection[] {
  try {
    const parsed = JSON.parse(addOns)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function bookingToRecord(booking: {
  id: string
  createdAt: Date
  updatedAt: Date
  status: string
  eventType: string
  eventDate: Date
  eventTime: string | null
  location: string
  guestCount: string | null
  firstName: string
  lastName: string
  email: string
  phone: string
  packageId: string
  packageName: string
  packagePrice: string
  addOns: string
  specialRequests: string | null
  howDidYouHear: string | null
  budget: string | null
}): BookingRecord {
  return {
    ...booking,
    status: booking.status as BookingStatus,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
    eventDate: booking.eventDate.toISOString(),
    addOns: parseAddOns(booking.addOns),
  }
}

export function contactMessageToRecord(message: {
  id: string
  createdAt: Date
  isRead: boolean
  name: string
  email: string
  phone: string | null
  eventDate: Date | null
  eventType: string | null
  location: string | null
  message: string
}): ContactMessageRecord {
  return {
    ...message,
    createdAt: message.createdAt.toISOString(),
    eventDate: message.eventDate?.toISOString() ?? null,
  }
}

export function estimateValue(packagePrice: string, addOns: AddOnSelection[] = []) {
  const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, '')) || 0

  return parsePrice(packagePrice) + addOns.reduce((total, addOn) => total + parsePrice(addOn.price), 0)
}
