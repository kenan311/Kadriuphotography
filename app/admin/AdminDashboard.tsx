'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  ArrowRightOnRectangleIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import type { BookingRecord, BookingStatus, ContactMessageRecord } from '@/lib/booking'
import { estimateValue } from '@/lib/booking'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

const statusLabels: Record<BookingStatus, string> = {
  PENDING: 'Në pritje',
  CONFIRMED: 'I konfirmuar',
  COMPLETED: 'I përfunduar',
  CANCELLED: 'I anuluar',
}

const statusClasses: Record<BookingStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-sage-100 text-sage-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-blush-100 text-blush-700',
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Nuk është caktuar'
  }

  return new Intl.DateTimeFormat('sq-XK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function clientName(booking: BookingRecord) {
  return `${booking.firstName} ${booking.lastName}`.trim()
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'messages'>('overview')
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [messages, setMessages] = useState<ContactMessageRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAdminData = async () => {
    setIsLoading(true)
    setError('')

    try {
      const [bookingsResponse, messagesResponse] = await Promise.all([
        fetch('/api/bookings', { cache: 'no-store' }),
        fetch('/api/contact', { cache: 'no-store' }),
      ])

      if (!bookingsResponse.ok || !messagesResponse.ok) {
        throw new Error('Të dhënat nuk u ngarkuan')
      }

      const bookingsData = await bookingsResponse.json()
      const messagesData = await messagesResponse.json()

      setBookings(bookingsData.bookings)
      setMessages(messagesData.messages)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Të dhënat nuk u ngarkuan')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const stats = useMemo(() => {
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + estimateValue(booking.packagePrice, booking.addOns),
      0,
    )

    return {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(booking => booking.status === 'PENDING').length,
      completedEvents: bookings.filter(booking => booking.status === 'COMPLETED').length,
      unreadMessages: messages.filter(message => !message.isRead).length,
      totalRevenue,
    }
  }, [bookings, messages])

  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      setError('Statusi nuk u përditësua')
      return
    }

    const result = await response.json()
    setBookings(prev => prev.map(booking => (booking.id === bookingId ? result.booking : booking)))
  }

  const deleteBooking = async (bookingId: string) => {
    const confirmed = window.confirm('A jeni të sigurt që doni ta fshini këtë rezervim?')

    if (!confirmed) {
      return
    }

    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      setError('Rezervimi nuk u fshi')
      return
    }

    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
  }

  const updateMessageRead = async (messageId: string, isRead: boolean) => {
    const response = await fetch(`/api/contact/${messageId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isRead }),
    })

    if (!response.ok) {
      setError('Mesazhi nuk u përditësua')
      return
    }

    const result = await response.json()
    setMessages(prev => prev.map(message => (message.id === messageId ? result.message : message)))
  }

  const deleteMessage = async (messageId: string) => {
    const confirmed = window.confirm('A jeni të sigurt që doni ta fshini këtë mesazh?')

    if (!confirmed) {
      return
    }

    const response = await fetch(`/api/contact/${messageId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      setError('Mesazhi nuk u fshi')
      return
    }

    setMessages(prev => prev.filter(message => message.id !== messageId))
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const tabs = [
    { id: 'overview' as const, name: 'Përmbledhje', icon: UserIcon },
    { id: 'bookings' as const, name: 'Rezervimet', icon: CalendarIcon },
    { id: 'messages' as const, name: 'Mesazhet', icon: EnvelopeIcon },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal-600 font-montserrat">Duke ngarkuar panelin e administratorit...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />

      <div className="pt-20">
        <div className="bg-white py-12 border-b border-cream-200">
          <div className="container-custom">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 text-gold-600 hover:text-gold-700 mb-6 transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Kthehu te Ballina</span>
            </button>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal-800 mb-2">
                  Paneli i adminit
                </h1>
                <p className="text-charcoal-600 font-montserrat">
                  Rezervimet, mesazhet dhe statuset e klientëve nga baza lokale.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={loadAdminData} className="btn-secondary">
                  Rifresko të dhënat
                </button>
                <button onClick={logout} className="btn-secondary gap-2">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Dil
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-8">
          {error && (
            <div className="mb-6 rounded-lg border border-blush-200 bg-blush-50 px-4 py-3 text-sm font-medium text-blush-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gold-100 text-gold-700 border border-gold-200'
                          : 'text-charcoal-600 hover:bg-cream-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="card p-6">
                      <CalendarIcon className="mb-4 h-8 w-8 text-gold-600" />
                      <p className="text-3xl font-bold text-charcoal-800">{stats.totalBookings}</p>
                      <p className="text-charcoal-600">Rezervime gjithsej</p>
                    </div>
                    <div className="card p-6">
                      <ClockIcon className="mb-4 h-8 w-8 text-yellow-600" />
                      <p className="text-3xl font-bold text-charcoal-800">{stats.pendingBookings}</p>
                      <p className="text-charcoal-600">Në pritje</p>
                    </div>
                    <div className="card p-6">
                      <CheckCircleIcon className="mb-4 h-8 w-8 text-sage-600" />
                      <p className="text-3xl font-bold text-charcoal-800">{stats.completedEvents}</p>
                      <p className="text-charcoal-600">Të përfunduara</p>
                    </div>
                    <div className="card p-6">
                      <EnvelopeIcon className="mb-4 h-8 w-8 text-blue-600" />
                      <p className="text-3xl font-bold text-charcoal-800">{stats.unreadMessages}</p>
                      <p className="text-charcoal-600">Mesazhe të reja</p>
                    </div>
                  </div>

                  <div className="card p-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="font-serif text-2xl font-bold text-charcoal-800">
                        Rezervimet e fundit
                      </h2>
                      <p className="font-semibold text-gold-700">
                        Vlerë e përafërt: €{stats.totalRevenue.toLocaleString('de-DE')}
                      </p>
                    </div>

                    {bookings.length === 0 ? (
                      <p className="rounded-lg bg-cream-50 p-4 text-charcoal-600">
                        Ende nuk ka rezervime. Kur një klient e plotëson formularin, do të shfaqet këtu.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {bookings.slice(0, 5).map(booking => (
                          <div key={booking.id} className="rounded-lg bg-cream-50 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <h3 className="font-semibold text-charcoal-800">{clientName(booking)}</h3>
                                <p className="text-sm text-charcoal-600">
                                  {booking.eventType} • {formatDate(booking.eventDate)} • {booking.location}
                                </p>
                                <p className="text-sm text-charcoal-500">
                                  {booking.packageName} ({booking.packagePrice})
                                </p>
                              </div>
                              <span className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${statusClasses[booking.status]}`}>
                                {statusLabels[booking.status]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card p-8"
                >
                  <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                    Rezervimet
                  </h2>

                  {bookings.length === 0 ? (
                    <p className="rounded-lg bg-cream-50 p-4 text-charcoal-600">
                      Nuk ka ende rezervime në bazë.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[900px]">
                        <thead>
                          <tr className="border-b border-cream-200">
                            <th className="px-4 py-3 text-left font-medium text-charcoal-700">Klienti</th>
                            <th className="px-4 py-3 text-left font-medium text-charcoal-700">Rasti</th>
                            <th className="px-4 py-3 text-left font-medium text-charcoal-700">Paketa</th>
                            <th className="px-4 py-3 text-left font-medium text-charcoal-700">Kontakt</th>
                            <th className="px-4 py-3 text-left font-medium text-charcoal-700">Statusi</th>
                            <th className="px-4 py-3 text-left font-medium text-charcoal-700">Veprime</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map(booking => (
                            <tr key={booking.id} className="border-b border-cream-100 align-top">
                              <td className="px-4 py-4">
                                <p className="font-semibold text-charcoal-800">{clientName(booking)}</p>
                                <p className="text-xs text-charcoal-500">Ref: {booking.id}</p>
                              </td>
                              <td className="px-4 py-4 text-charcoal-700">
                                <p>{booking.eventType}</p>
                                <p className="text-sm text-charcoal-500">{formatDate(booking.eventDate)}</p>
                                <p className="text-sm text-charcoal-500">{booking.location}</p>
                              </td>
                              <td className="px-4 py-4 text-charcoal-700">
                                <p>{booking.packageName}</p>
                                <p className="text-sm text-gold-700">{booking.packagePrice}</p>
                                {booking.addOns.length > 0 && (
                                  <p className="text-xs text-charcoal-500">
                                    + {booking.addOns.map(addOn => addOn.name).join(', ')}
                                  </p>
                                )}
                              </td>
                              <td className="px-4 py-4 text-charcoal-700">
                                <p>{booking.email}</p>
                                <p className="text-sm text-charcoal-500">{booking.phone}</p>
                              </td>
                              <td className="px-4 py-4">
                                <select
                                  value={booking.status}
                                  onChange={event => updateBookingStatus(booking.id, event.target.value as BookingStatus)}
                                  className={`rounded-full border-0 px-3 py-2 text-sm font-medium ${statusClasses[booking.status]}`}
                                >
                                  {Object.entries(statusLabels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                      {label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-4">
                                <button
                                  onClick={() => deleteBooking(booking.id)}
                                  className="rounded-full p-2 text-charcoal-500 transition-colors hover:bg-blush-50 hover:text-blush-700"
                                  aria-label="Fshi rezervimin"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card p-8"
                >
                  <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                    Mesazhet e kontaktit
                  </h2>

                  {messages.length === 0 ? (
                    <p className="rounded-lg bg-cream-50 p-4 text-charcoal-600">
                      Nuk ka ende mesazhe nga formulari i kontaktit.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map(message => (
                        <article key={message.id} className="rounded-lg border border-cream-200 bg-white p-5">
                          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold text-charcoal-800">{message.name}</h3>
                                {!message.isRead && (
                                  <span className="rounded-full bg-gold-100 px-2 py-1 text-xs font-semibold text-gold-700">
                                    I ri
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-charcoal-500">
                                {message.email}{message.phone ? ` • ${message.phone}` : ''}
                              </p>
                            </div>
                            <p className="text-sm text-charcoal-500">{formatDate(message.createdAt)}</p>
                          </div>
                          <p className="mb-3 text-charcoal-700">{message.message}</p>
                          <p className="text-sm text-charcoal-500">
                            {message.eventType || 'Rasti nuk është caktuar'} • {formatDate(message.eventDate)} • {message.location || 'Vendi nuk është caktuar'}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => updateMessageRead(message.id, !message.isRead)}
                              className="btn-secondary px-4 py-2 text-sm"
                            >
                              {message.isRead ? 'Shëno si i ri' : 'Shëno si lexuar'}
                            </button>
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="rounded-full border border-blush-200 px-4 py-2 text-sm font-semibold text-blush-700 transition-colors hover:bg-blush-50"
                            >
                              Fshi
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
