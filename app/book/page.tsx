'use client'

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { estimateValue } from '@/lib/booking'

type BookingFormData = {
  eventType: string
  eventDate: string
  eventTime: string
  location: string
  guestCount: string
  firstName: string
  lastName: string
  email: string
  phone: string
  package: string
  addOns: string[]
  specialRequests: string
  howDidYouHear: string
  budget: string
}

type BookingPackage = {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  note?: string
}

type AddOnOption = {
  id: string
  name: string
  price: string
  description: string
}

const packages: BookingPackage[] = [
  {
    id: 'wedding-photo',
    name: 'Fotografi për dasma',
    price: 'Varësisht kërkesave tuaja',
    description: 'Mbulim i plotë i ditës me foto natyrale, elegante dhe të edituara me kujdes.',
    features: ['Mbulim 8-12 orë', '300+ foto të edituara', 'Galeri online', 'Foto gati për printim'],
    popular: true,
  },
  {
    id: 'wedding-video',
    name: 'Video për dasma',
    price: 'Varësisht kërkesave tuaja',
    description: 'Video moderne e ditës së dasmës, me montazh profesional dhe muzikë.',
    features: ['Video përmbledhëse', 'Ceremonia e plotë', 'Mbulim i ahengut', 'Pamje me dron'],
  },
  {
    id: 'combo',
    name: 'Paketa Foto + Video',
    price: 'Varësisht kërkesave tuaja',
    description: 'Foto dhe video për gjithë ditën, të koordinuara nga një ekip.',
    features: ['Foto dhe video bashkë', 'Dy kënde mbulimi', 'Editim i koordinuar', '20% më lirë se veç e veç'],
    popular: true,
  },
  {
    id: 'engagement',
    name: 'Foto fejese',
    price: 'Varësisht kërkesave tuaja',
    description: 'Seancë e qetë para dasmës, për kujtime personale ose për ftesa.',
    features: ['Seancë 2 orë', '50+ foto të edituara', 'Disa lokacione', 'Galeri online'],
  },
  {
    id: 'elopement',
    name: 'Dasmë e vogël',
    price: 'Varësisht kërkesave tuaja',
    description: 'Mbulim për ceremoni private ose dasma më të vogla.',
    features: ['Mbulim 4-6 orë', '200+ foto të edituara', 'Disa lokacione', 'Foto të para brenda ditës'],
  },
  {
    id: 'hourly',
    name: 'Mbulim me orë',
    price: 'Varësisht kërkesave tuaja',
    description: 'Zgjidhje fleksibile për ceremoni, festa ose momente të veçanta.',
    features: ['Minimum 2 orë', 'Editim profesional', 'Dorëzim i shpejtë', 'Galeri online'],
  },
  {
    id: 'family',
    name: 'Portrete Familjare',
    price: 'Varësisht kërkesave tuaja',
    description: 'Foto familjare për kujtime, shtatzëni, ditëlindje ose raste të tjera.',
    features: ['Seancë 1-2 orë', '30+ foto të edituara', 'Disa poza', 'Galeri online'],
  },
  {
    id: 'custom',
    name: 'Ofertë e veçantë',
    price: 'Varësisht kërkesave tuaja',
    description: 'E bëjmë një ofertë sipas datës, vendit, stilit dhe buxhetit tuaj.',
    features: ['Plan i veçantë për ju', 'Opsione foto dhe video', 'Bisedë para ofertës', 'Hapa të qartë deri te rezervimi'],
    note: 'Na tregoni çka ju duhet në hapin final dhe ekipi ju kthen një propozim të plotë.',
  },
]

const addOns: AddOnOption[] = [
  {
    id: 'second-shooter',
    name: 'Fotograf i Dytë',
    price: 'Sipas kërkesës',
    description: 'Më shumë kënde dhe momente gjatë ceremonisë dhe ahengut.',
  },
  {
    id: 'drone',
    name: 'Mbulim me Dron',
    price: 'Sipas kërkesës',
    description: 'Pamje ajrore për lokacionin, hyrjen dhe momentet kryesore.',
  },
  {
    id: 'same-day',
    name: 'Foto të para brenda ditës',
    price: 'Sipas kërkesës',
    description: 'Një përzgjedhje fotografish që mund t’i ndani menjëherë pas festës.',
  },
  {
    id: 'album',
    name: 'Album premium me foto',
    price: 'Sipas kërkesës',
    description: 'Album fizik me fotot më të mira nga dita juaj.',
  },
  {
    id: 'raw-photos',
    name: 'Foto origjinale',
    price: 'Sipas kërkesës',
    description: 'Materialet origjinale, si shtesë për arkivën tuaj.',
  },
]

const steps = [
  { number: 1, title: 'Detajet e rastit', icon: CalendarIcon },
  { number: 2, title: 'Kontakti', icon: UserIcon },
  { number: 3, title: 'Oferta', icon: CheckCircleIcon },
  { number: 4, title: 'Konfirmimi', icon: ShieldCheckIcon },
]

const eventTypeLabels: Record<string, string> = {
  wedding: 'Dasmë',
  engagement: 'Fejesim',
  elopement: 'Dasmë e vogël',
  portrait: 'Portrete',
  family: 'Portrete Familjare',
  other: 'Tjetër',
}

const budgetLabels: Record<string, string> = {
  modest: 'Buxhet më i vogël',
  standard: 'Buxhet mesatar',
  premium: 'Buxhet më fleksibil',
  flexible: 'Sipas marrëveshjes',
}

const sourceLabels: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  recommendation: 'Rekomandim',
  google: 'Google',
  other: 'Tjetër',
}

function formatMoney(value: number) {
  return `€${value.toLocaleString('en-US')}`
}

function formatDisplayDate(value: string) {
  if (!value) return 'Nuk është caktuar'

  try {
    return new Intl.DateTimeFormat('sq-XK', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${value}T00:00:00`))
  } catch {
    return value
  }
}

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>({
    eventType: '',
    eventDate: '',
    eventTime: '',
    location: '',
    guestCount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    package: '',
    addOns: [],
    specialRequests: '',
    howDidYouHear: '',
    budget: '',
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitError, setSubmitError] = useState('')
  const [submittedBookingId, setSubmittedBookingId] = useState('')

  useEffect(() => {
    const packageId = new URLSearchParams(window.location.search).get('package')

    if (packageId && packages.some((pkg) => pkg.id === packageId)) {
      setFormData((prev) => ({ ...prev, package: packageId }))
    }
  }, [])

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === formData.package),
    [formData.package],
  )

  const selectedAddOns = useMemo(
    () => addOns.filter((addOn) => formData.addOns.includes(addOn.id)),
    [formData.addOns],
  )

  const estimatedTotal = useMemo(
    () => (selectedPackage ? estimateValue(selectedPackage.price, selectedAddOns) : 0),
    [selectedPackage, selectedAddOns],
  )

  const estimatedTotalLabel = estimatedTotal > 0 ? `nga ${formatMoney(estimatedTotal)}` : 'Varësisht kërkesave tuaja'

  const clearError = (name: string) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    if (submitError) {
      setSubmitError('')
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    clearError(name)
  }

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {}

    if (step === 1) {
      if (!formData.eventType) newErrors.eventType = 'Zgjidhni llojin e rastit'
      if (!formData.eventDate) {
        newErrors.eventDate = 'Zgjidhni datën'
      } else {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const selectedDate = new Date(`${formData.eventDate}T00:00:00`)

        if (selectedDate < today) {
          newErrors.eventDate = 'Zgjidhni një datë që nuk ka kaluar'
        }
      }
      if (!formData.location) newErrors.location = 'Shkruani vendin'
    }

    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = 'Shkruani emrin'
      if (!formData.lastName) newErrors.lastName = 'Shkruani mbiemrin'
      if (!formData.email) newErrors.email = 'Shkruani email-in'
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email-i nuk duket i saktë'
      if (!formData.phone) newErrors.phone = 'Shkruani numrin e telefonit'
    }

    if (step === 3 && !formData.package) {
      newErrors.package = 'Zgjidhni një ofertë'
    }

    if (step === 4) {
      if (!selectedPackage) newErrors.package = 'Zgjidhni një ofertë'
      if (!acceptedTerms) {
        newErrors.termsAccepted = 'Konfirmoni që doni ta dërgoni kërkesën.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      addOns: checked ? [...prev.addOns, addOnId] : prev.addOns.filter((id) => id !== addOnId),
    }))
  }

  const handlePackageSelect = (packageId: string) => {
    setFormData((prev) => ({ ...prev, package: packageId }))
    clearError('package')
  }

  const handleTermsChange = (checked: boolean) => {
    setAcceptedTerms(checked)
    clearError('termsAccepted')
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((step) => step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!validateStep(4) || !selectedPackage) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          eventTime: formData.eventTime,
          location: formData.location,
          guestCount: formData.guestCount,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.price,
          addOns: selectedAddOns.map(({ id, name, price }) => ({ id, name, price })),
          specialRequests: formData.specialRequests,
          howDidYouHear: formData.howDidYouHear,
          budget: formData.budget,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Rezervimi nuk u ruajt')
      }

      setSubmittedBookingId(result.booking?.id || '')
      setCurrentStep(5)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Rezervimi nuk u ruajt')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />

      <div className="pt-20">
        <header className="bg-white py-14 sm:py-16">
          <div className="container-custom text-center">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/'
              }}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gold-700 transition-colors duration-300 hover:bg-gold-50 hover:text-gold-800"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Kthehu te Ballina
            </button>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="section-title mb-5"
            >
              Rezervo <span className="text-gradient">ofertën</span> tënde
            </motion.h1>
            <p className="section-lede">
              Zgjidh datën, ofertën dhe shkruaj çka dëshiron. Kërkesa ruhet në sistem dhe ekipi ju kontakton për konfirmim, kontratë dhe pagesë.
            </p>
          </div>
        </header>

        <section className="border-y border-cream-200 bg-white">
          <div className="container-custom py-6 sm:py-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'border-gold-200 bg-gold-50 text-charcoal-900'
                      : 'border-cream-200 bg-white text-charcoal-500'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'border-gold-500 bg-gold-500 text-white'
                        : 'border-charcoal-200 text-charcoal-400'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-charcoal-400">Hapi {index + 1}</p>
                    <p className="font-semibold leading-5">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main className="py-12 sm:py-16">
          <div className="container-custom max-w-5xl">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <motion.section
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card p-6 sm:p-8"
                >
                  <h2 className="form-title">Detajet e rastit</h2>
                  <p className="form-copy">Këto të dhëna na ndihmojnë ta kontrollojmë datën dhe ta planifikojmë ekipin.</p>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Lloji i rastit *</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        required
                        className={`input-field ${errors.eventType ? 'border-blush-500' : ''}`}
                      >
                        <option value="">Zgjidhni llojin e rastit</option>
                        <option value="wedding">Dasmë</option>
                        <option value="engagement">Fejesim</option>
                        <option value="elopement">Dasmë e vogël</option>
                        <option value="portrait">Portrete</option>
                        <option value="family">Portrete Familjare</option>
                        <option value="other">Tjetër</option>
                      </select>
                      {errors.eventType && <p className="mt-1 text-sm font-medium text-blush-700">{errors.eventType}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Data *</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                        className={`input-field ${errors.eventDate ? 'border-blush-500' : ''}`}
                      />
                      {errors.eventDate && <p className="mt-1 text-sm font-medium text-blush-700">{errors.eventDate}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Ora</label>
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Numri i mysafirëve</label>
                      <select
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Zgjidhni numrin e mysafirëve</option>
                        <option value="1-50">1-50 mysafirë</option>
                        <option value="51-100">51-100 mysafirë</option>
                        <option value="101-200">101-200 mysafirë</option>
                        <option value="200+">200+ mysafirë</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Vendi *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className={`input-field ${errors.location ? 'border-blush-500' : ''}`}
                      placeholder="Emri i sallës, qyteti ose lokacioni"
                    />
                    {errors.location && <p className="mt-1 text-sm font-medium text-blush-700">{errors.location}</p>}
                  </div>
                </motion.section>
              )}

              {currentStep === 2 && (
                <motion.section
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card p-6 sm:p-8"
                >
                  <h2 className="form-title">Të dhënat e kontaktit</h2>
                  <p className="form-copy">Në këto të dhëna ju kontaktojmë për ofertën, kontratën dhe pagesën e rezervimit.</p>

                  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Emri *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`input-field ${errors.firstName ? 'border-blush-500' : ''}`}
                        placeholder="Emri juaj"
                      />
                      {errors.firstName && <p className="mt-1 text-sm font-medium text-blush-700">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Mbiemri *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`input-field ${errors.lastName ? 'border-blush-500' : ''}`}
                        placeholder="Mbiemri juaj"
                      />
                      {errors.lastName && <p className="mt-1 text-sm font-medium text-blush-700">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`input-field ${errors.email ? 'border-blush-500' : ''}`}
                        placeholder="email@shembull.com"
                      />
                      {errors.email && <p className="mt-1 text-sm font-medium text-blush-700">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-charcoal-700">Numri i telefonit *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`input-field ${errors.phone ? 'border-blush-500' : ''}`}
                        placeholder="+383 44 123 456"
                      />
                      {errors.phone && <p className="mt-1 text-sm font-medium text-blush-700">{errors.phone}</p>}
                    </div>
                  </div>
                </motion.section>
              )}

              {currentStep === 3 && (
                <motion.section
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="card p-6 sm:p-8">
                  <h2 className="form-title">Zgjidhni ofertën</h2>
                    <p className="form-copy">Zgjidhni ofertën që ju përshtatet. Përmbledhjen e plotë, çmimin dhe kërkesën tuaj e shihni në hapin e fundit.</p>
                    {errors.package && <p className="mt-4 text-sm font-medium text-blush-700">{errors.package}</p>}

                    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                      {packages.map((pkg) => {
                        const isSelected = formData.package === pkg.id

                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handlePackageSelect(pkg.id)}
                            className={`relative rounded-lg border p-5 text-left transition-all duration-300 ${
                              isSelected
                                ? 'border-gold-500 bg-gold-50 shadow-lg shadow-gold-900/10'
                                : 'border-cream-300 bg-white hover:border-gold-300 hover:bg-cream-50'
                            }`}
                          >
                            {pkg.popular && (
                              <span className="mb-4 inline-flex rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-white">
                                Më e kërkuara
                              </span>
                            )}
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-luxury text-2xl font-bold text-charcoal-900">{pkg.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-charcoal-600">{pkg.description}</p>
                              </div>
                              <span
                                className={`mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border ${
                                  isSelected ? 'border-gold-500 bg-gold-500 text-white' : 'border-charcoal-300 text-transparent'
                                }`}
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </span>
                            </div>
                            <p className="price-text mt-4 text-xl">{pkg.price}</p>
                            <ul className="mt-4 grid gap-2">
                              {pkg.features.slice(0, 3).map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-charcoal-700">
                                  <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="card p-6 sm:p-8">
                    <h3 className="form-title text-2xl">Shtesa</h3>
                    <p className="form-copy">Shtesat ruhen bashkë me kërkesën dhe shfaqen në përmbledhjen e fundit.</p>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {addOns.map((addOn) => (
                        <label
                          key={addOn.id}
                          className="flex cursor-pointer items-start gap-4 rounded-lg border border-cream-300 bg-white p-4 transition-colors duration-300 hover:border-gold-300 hover:bg-cream-50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.addOns.includes(addOn.id)}
                            onChange={(event) => handleAddOnChange(addOn.id, event.target.checked)}
                            className="mt-1 h-5 w-5 rounded border-cream-300 text-gold-600 focus:ring-gold-500"
                          />
                          <span className="flex-1">
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-semibold text-charcoal-900">{addOn.name}</span>
                              <span className="font-semibold text-gold-700">{addOn.price}</span>
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-charcoal-600">{addOn.description}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {currentStep === 4 && (
                <motion.section
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card p-6 sm:p-8"
                >
                  <h2 className="form-title">Kontrollo dhe dërgo</h2>
                  <p className="form-copy">Kontrolloni ofertën, shkruani kërkesën tuaj të veçantë dhe dërgoni rezervimin.</p>

                  <div className="mt-8 space-y-6">
                    <div className="summary-box">
                      <div className="flex flex-col gap-4 border-b border-gold-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="eyebrow mb-2">Oferta që keni zgjedhur</p>
                          <h3 className="font-luxury text-3xl font-bold text-charcoal-900">
                            {selectedPackage?.name || 'Pa ofertë'}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-charcoal-700">
                            {selectedPackage?.description || 'Kthehuni një hap mbrapa për të zgjedhur ofertën.'}
                          </p>
                        </div>
                        <div className="rounded-lg bg-white px-4 py-3 text-left shadow-sm shadow-gold-900/10 sm:text-right">
                          <p className="text-xs font-semibold uppercase text-charcoal-500">Çmim i përafërt</p>
                          <p className="price-text">{estimatedTotalLabel}</p>
                        </div>
                      </div>

                      {selectedPackage && (
                        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                          <div>
                            <p className="mb-3 text-sm font-semibold text-charcoal-900">Çka përfshihet</p>
                            <ul className="grid gap-2 sm:grid-cols-2">
                              {selectedPackage.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-charcoal-700">
                                  <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            {selectedPackage.note && (
                              <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm leading-6 text-charcoal-700">
                                {selectedPackage.note}
                              </p>
                            )}
                          </div>

                          <div className="rounded-lg bg-white p-4 shadow-sm shadow-gold-900/10">
                            <p className="mb-3 text-sm font-semibold text-charcoal-900">Shtesat që keni zgjedhur</p>
                            {selectedAddOns.length > 0 ? (
                              <ul className="space-y-3">
                                {selectedAddOns.map((addOn) => (
                                  <li key={addOn.id} className="flex items-start justify-between gap-4 text-sm">
                                    <span className="text-charcoal-700">{addOn.name}</span>
                                    <span className="font-semibold text-gold-700">{addOn.price}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm leading-6 text-charcoal-600">Nuk keni zgjedhur shtesa.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                      <div className="detail-box">
                        <h3 className="mb-4 flex items-center gap-2 font-semibold text-charcoal-900">
                          <CalendarIcon className="h-5 w-5 text-gold-700" />
                          Detajet e rastit
                        </h3>
                        <dl className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <dt className="text-charcoal-500">Lloji</dt>
                            <dd className="font-semibold text-charcoal-900">{eventTypeLabels[formData.eventType] || formData.eventType}</dd>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <dt className="flex items-center gap-2 text-charcoal-500">
                              <ClockIcon className="h-4 w-4" />
                              Data dhe ora
                            </dt>
                            <dd className="text-right font-semibold text-charcoal-900">
                              {formatDisplayDate(formData.eventDate)}
                              <span className="block text-charcoal-600">{formData.eventTime || 'Ora nuk është caktuar'}</span>
                            </dd>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <dt className="flex items-center gap-2 text-charcoal-500">
                              <MapPinIcon className="h-4 w-4" />
                              Vendi
                            </dt>
                            <dd className="text-right font-semibold text-charcoal-900">{formData.location}</dd>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <dt className="text-charcoal-500">Mysafirët</dt>
                            <dd className="font-semibold text-charcoal-900">{formData.guestCount || 'Nuk është caktuar'}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="detail-box">
                        <h3 className="mb-4 flex items-center gap-2 font-semibold text-charcoal-900">
                          <UserIcon className="h-5 w-5 text-gold-700" />
                          Kontakti
                        </h3>
                        <dl className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <dt className="text-charcoal-500">Emri</dt>
                            <dd className="text-right font-semibold text-charcoal-900">
                              {formData.firstName} {formData.lastName}
                            </dd>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <dt className="flex items-center gap-2 text-charcoal-500">
                              <EnvelopeIcon className="h-4 w-4" />
                              Email
                            </dt>
                            <dd className="break-all text-right font-semibold text-charcoal-900">{formData.email}</dd>
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <dt className="flex items-center gap-2 text-charcoal-500">
                              <PhoneIcon className="h-4 w-4" />
                              Telefoni
                            </dt>
                            <dd className="text-right font-semibold text-charcoal-900">{formData.phone}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="rounded-lg border border-charcoal-900/10 bg-white p-5">
                      <label className="mb-2 flex items-center gap-2 text-base font-semibold text-charcoal-900">
                        <SparklesIcon className="h-5 w-5 text-gold-700" />
                        Kërkesë e veçantë
                      </label>
                      <p className="mb-4 text-sm leading-6 text-charcoal-600">
                        Shkruani stilin që ju pëlqen, momentet që duhet t’i kapim, njerëzit kryesorë, lokacionet, muzikën për video ose çdo dëshirë tjetër.
                      </p>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={6}
                        className="input-field resize-none"
                        placeholder="P.sh. dua foto natyrale, video të shkurtër për Instagram, fokus te familja, ose një ide të veçantë..."
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal-700">Buxheti i përafërt</label>
                        <select name="budget" value={formData.budget} onChange={handleInputChange} className="input-field">
                          <option value="">Zgjidhni buxhetin</option>
                          <option value="modest">Buxhet më i vogël</option>
                          <option value="standard">Buxhet mesatar</option>
                          <option value="premium">Buxhet më fleksibil</option>
                          <option value="flexible">Sipas marrëveshjes</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-charcoal-700">Ku na gjetët?</label>
                        <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleInputChange} className="input-field">
                          <option value="">Zgjidhni një opsion</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="recommendation">Rekomandim</option>
                          <option value="google">Google</option>
                          <option value="other">Tjetër</option>
                        </select>
                      </div>
                    </div>

                    {(formData.budget || formData.howDidYouHear) && (
                      <div className="detail-box">
                        <p>
                          <span className="font-semibold text-charcoal-900">Preferencat:</span>{' '}
                          Buxheti {budgetLabels[formData.budget] || 'nuk është caktuar'} dhe burimi{' '}
                          {sourceLabels[formData.howDidYouHear] || 'nuk është caktuar'}.
                        </p>
                      </div>
                    )}

                    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-cream-300 bg-cream-50 p-4">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(event) => handleTermsChange(event.target.checked)}
                        className="mt-1 h-5 w-5 rounded border-cream-300 text-gold-600 focus:ring-gold-500"
                      />
                      <span className="text-sm leading-6 text-charcoal-700">
                        E kuptoj që kjo është kërkesë për rezervim. Kadriu Photography do ta konfirmojë datën, çmimin final, kontratën dhe mënyrën e pagesës para se rezervimi të jetë përfundimtar.
                      </span>
                    </label>
                    {errors.termsAccepted && <p className="text-sm font-medium text-blush-700">{errors.termsAccepted}</p>}

                    {submitError && (
                      <p className="rounded-lg border border-blush-200 bg-blush-50 px-4 py-3 text-sm font-medium text-blush-700">
                        {submitError}
                      </p>
                    )}
                  </div>
                </motion.section>
              )}

              {currentStep === 5 && (
                <motion.section
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="card p-6 text-center sm:p-8"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-100">
                    <CheckCircleIcon className="h-12 w-12 text-gold-700" />
                  </div>
                  <h2 className="form-title">Faleminderit!</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-charcoal-600 sm:text-lg">
                    Kërkesa juaj u pranua me sukses. Do ta shikojmë ofertën, kërkesën tuaj të veçantë dhe detajet e rastit, pastaj ju kthejmë përgjigje me hapat e ardhshëm.
                  </p>
                  {submittedBookingId && (
                    <p className="mx-auto mt-6 inline-flex rounded-full bg-sage-50 px-4 py-2 text-sm font-semibold text-sage-700">
                      Referenca e rezervimit: {submittedBookingId}
                    </p>
                  )}
                  <div className="mx-auto mt-8 max-w-xl rounded-lg border border-cream-200 bg-cream-50 p-5 text-left">
                    <p className="mb-3 font-semibold text-charcoal-900">Çka ndodh tani?</p>
                    <ul className="space-y-3 text-sm leading-6 text-charcoal-700">
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gold-600" />
                        Ekipi e kontrollon datën dhe ofertën që keni zgjedhur.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gold-600" />
                        Ju dërgojmë ofertën finale, kontratën dhe mënyrën e pagesës.
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gold-600" />
                        Pas konfirmimit, rezervimi shënohet si i konfirmuar.
                      </li>
                    </ul>
                  </div>
                </motion.section>
              )}

              {currentStep < 5 && (
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`btn-secondary w-full sm:w-auto ${currentStep === 1 ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    Mbrapa
                  </button>

                  {currentStep < 4 ? (
                    <button type="button" onClick={nextStep} className="btn-primary w-full sm:w-auto">
                      Hapi tjetër
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full gap-2 sm:w-auto">
                      {isSubmitting ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Duke dërguar...
                        </>
                      ) : (
                        'Dërgo kërkesën'
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
