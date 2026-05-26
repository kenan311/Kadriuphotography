'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { LockClosedIcon } from '@heroicons/react/24/outline'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Nuk u bë login.')
      }

      router.replace('/admin')
      router.refresh()
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Nuk u bë login.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-7 shadow-xl shadow-charcoal-900/10 sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-gold-100">
            <LockClosedIcon className="h-7 w-7 text-gold-700" />
          </div>

          <p className="eyebrow mb-3">Owner access</p>
          <h1 className="form-title">Hyr në panelin admin</h1>
          <p className="form-copy">
            Ky panel është vetëm për pronarin. Këtu i sheh rezervimet, mesazhet dhe statuset e klientëve.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-charcoal-700">
                Fjalëkalimi
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-field"
                placeholder="Shkruani fjalëkalimin e adminit"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="rounded-lg border border-blush-200 bg-blush-50 px-4 py-3 text-sm font-medium text-blush-700">
                {error}
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Duke hyrë...' : 'Hyr në admin'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
