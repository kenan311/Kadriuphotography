'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon as ChevronLeftOutline, ChevronRightIcon as ChevronRightOutline } from '@heroicons/react/24/outline'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'xxx & xxx',
      location: 'Prishtinë, Kosovë',
      date: 'Shtator 2023',
      rating: 5,
      text: 'Puna me këtë ekip ka qenë shumë e lehtë dhe e mirë. I kanë kapur emocionet, detajet dhe momentet kryesore të dasmës sonë. Fotot kanë dalë shumë bukur dhe gjatë gjithë ditës jemi ndier shumë rahat.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'xxx & xxx',
      location: 'Prishtinë, Kosovë',
      date: 'Gusht 2025',
      rating: 5,
      text: 'Seanca e fejesës doli shumë bukur. Ekipi na udhëzoi mirë, pa presion, dhe fotot finale dolën edhe më mirë se që i prisnim. Me shumë dëshirë do t’i zgjedhim prapë për dasmë.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'xxx & xxx',
      location: 'Prizren, Kosovë',
      date: 'Korrik 2024',
      rating: 5,
      text: 'Fotot e ceremonisë sonë të vogël janë shumë të veçanta për ne. Ekipi e kapi atmosferën, emocionin dhe detajet pa na lodhur aspak. Jemi shumë falënderues për këto kujtime.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 4,
      name: 'xxx & xxx',
      location: 'Pejë, Kosovë',
      date: 'Qershor 2025',
      rating: 5,
      text: 'Kanë qenë shumë korrektë prej fillimit deri në fund. Na ndihmuan me planin e ditës dhe materiali final doli shumë i bukur. I rekomandojmë pa dyshim.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 5,
      name: 'xxx & xxx',
      location: 'Prizren, Kosovë',
      date: 'Maj 2025',
      rating: 5,
      text: 'Seanca e fejesës ishte e qetë, spontane dhe shumë e bukur. Na ndihmuan me poza, lokacione dhe dritë. Fotot i kemi marrë me shumë qejf.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="section-padding bg-cream-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mb-6">
            Çfarë thonë <span className="text-gradient">çiftet tona</span>
          </h2>
          <p className="text-lg sm:text-xl text-charcoal-600 max-w-3xl mx-auto">
            Ja disa fjalë nga çiftet që na kanë besuar ditët e tyre më të rëndësishme.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-gold-200">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-gold-500" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-charcoal-700 leading-relaxed mb-8 italic">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-charcoal-800 text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-charcoal-600">
                    {currentTestimonial.location} • {currentTestimonial.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold-50"
            >
              <ChevronLeftOutline className="w-6 h-6 text-charcoal-700" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-gold-500' 
                      : 'bg-charcoal-300 hover:bg-charcoal-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold-50"
            >
              <ChevronRightOutline className="w-6 h-6 text-charcoal-700" />
            </button>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-gold-500" />
                ))}
              </div>
              <p className="text-charcoal-600 text-sm leading-relaxed mb-4 italic">
                "{testimonial.text.substring(0, 120)}..."
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-charcoal-800 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-charcoal-500 text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
