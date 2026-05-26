'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    location: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    if (formStatus !== 'idle') {
      setFormStatus('idle')
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Shkruani emrin'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Shkruani email-in'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email-i nuk duket i saktë'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Shkruani mesazhin'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setFormStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || 'Mesazhi nuk u dërgua')
      }
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        location: '',
        message: ''
      })
      
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Na shkruani',
      details: 'kadriuphotography@gmail.com',
      description: 'Mund të na shkruani kurdo'
    },
    {
      icon: PhoneIcon,
      title: 'Na telefononi',
      details: '+338 xxx xxx',
      description: 'E hënë - e premte, 9:00-18:00'
    },
    {
      icon: MapPinIcon,
      title: 'Na vizitoni',
      details: 'Podujevë',
      description: 'Vetëm me termin'
    },
    {
      icon: ClockIcon,
      title: 'Koha e përgjigjes',
      details: 'Brenda 24 orëve',
      description: 'Zakonisht kthejmë përgjigje shpejt'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mb-6">
            Na <span className="text-gradient">kontaktoni</span>
          </h2>
          <p className="text-lg sm:text-xl text-charcoal-600 max-w-3xl mx-auto font-montserrat">
            Na tregoni datën, vendin dhe çfarë po planifikoni. Ju kthejmë përgjigje me ofertë dhe hapat e ardhshëm.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card p-8"
          >
            <h3 className="font-playfair text-2xl font-bold text-charcoal-800 mb-6">
              Na dërgoni mesazh
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-2 font-montserrat">
                    Emri dhe mbiemri *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Emri dhe mbiemri"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-2 font-montserrat">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="email@shembull.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Numri i telefonit
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="+383 44 123 456"
                  />
                </div>
                
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Data e dasmës / festës
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Lloji i rastit
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Zgjidhni llojin e rastit</option>
                    <option value="wedding">Dasmë</option>
                    <option value="engagement">Fejesë</option>
                    <option value="elopement">Dasmë e vogël</option>
                    <option value="portrait">Portrete</option>
                    <option value="other">Tjetër</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-charcoal-700 mb-2">
                    Vendi
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Qyteti ose lokacioni"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal-700 mb-2">
                  Çka doni të rezervoni? *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Shkruani datën, vendin, llojin e shërbimit dhe çdo kërkesë të veçantë..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Duke dërguar...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-5 h-5" />
                  <span>Dërgo mesazhin</span>
                </>
              )}
              </button>
              {formStatus === 'success' && (
                <p className="rounded-lg border border-sage-200 bg-sage-50 px-4 py-3 text-sm font-medium text-sage-700">
                  Faleminderit! Mesazhi u pranua dhe do t'ju përgjigjemi brenda 24 orëve.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="rounded-lg border border-blush-200 bg-blush-50 px-4 py-3 text-sm font-medium text-blush-700">
                  Diçka nuk shkoi mirë. Provoni përsëri ose na telefononi direkt.
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-luxury text-2xl font-bold text-charcoal-800 mb-6">
                Flasim për datën tuaj
              </h3>
              <p className="text-charcoal-600 leading-relaxed mb-8">
                Jemi këtu për t'ju ndihmuar ta planifikoni fotografinë dhe videon pa stres. Na shkruani për datën,
                vendin, llojin e shërbimit dhe stilin që ju pëlqen.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-cream-50 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-800 mb-1">
                      {info.title}
                    </h4>
                    <p className="text-charcoal-700 font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-charcoal-500 text-sm">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Response Promise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gold-50 rounded-xl p-6 border border-gold-200"
            >
              <h4 className="font-semibold text-charcoal-800 mb-2">
                Përgjigje e shpejtë
              </h4>
              <p className="text-charcoal-600 text-sm">
                Zakonisht përgjigjemi brenda 24 orëve. Për data urgjente, na telefononi direkt në numrin më lart.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
