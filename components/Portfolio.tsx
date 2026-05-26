'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const closeModal = () => setSelectedImage(null)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('hashchange', closeModal)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('hashchange', closeModal)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const categories = [
    { id: 'all', name: 'Të gjitha' },
    { id: 'weddings', name: 'Dasma' },
    { id: 'engagements', name: 'Fejesa' },
    { id: 'elopements', name: 'Dasma të vogla' },
    { id: 'portraits', name: 'Portrete' }
  ]

  const portfolioItems = [
    {
      id: 1,
      category: 'weddings',
      title: 'xxx & xxx',
      location: 'Prishtinë, Kosovë',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dasmë elegante me portrete gjatë perëndimit'
    },
    {
      id: 2,
      category: 'engagements',
      title: 'xxx & xxx',
      location: 'Prizren, Kosovë',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  description: 'Seancë fejese në qytet, me atmosferë të ngrohtë'
    },
    {
      id: 3,
      category: 'elopements',
      title: 'xxx & xxx',
      location: 'Podujevë',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dasmë e vogël në natyrë me pamje të bukura'
    },
    {
      id: 4,
      category: 'weddings',
      title: 'xxx & xxx',
      location: 'Prizren, Kosovë',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dasmë në qytet me detaje tradicionale dhe moderne'
    },
    {
      id: 5,
      category: 'portraits',
      title: 'Familja xxx',
      location: 'Pejë, Kosovë',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  description: 'Portrete familjare me ngjyra të ngrohta vjeshte'
    },
    {
      id: 6,
      category: 'engagements',
      title: 'xxx & xxx',
      location: 'Prishtinë, Kosovë',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  description: 'Seancë fejese me dritë të bukur të perëndimit'
    },
    {
      id: 7,
      category: 'weddings',
      title: 'xxx & xxx',
      location: 'Gjakovë, Kosovë',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dasmë me stil të ngrohtë dhe elegant'
    },
    {
      id: 8,
      category: 'elopements',
      title: 'xxx & xxx',
      location: 'Lipjan, Kosovë',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dasmë e vogël në natyrë, në atmosferë intime'
    },
    {
      id: 9,
      category: 'portraits',
  title: 'Seancë shtatzënie',
      location: 'Mitrovicë, Kosovë',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  description: 'Seancë shtatzënie me dritë të butë dhe pamje natyrale'
    }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <section id="portfolio" className="section-padding bg-cream-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 mb-6">
            <span className="text-gradient">Portfolio</span> jonë
          </h2>
          <p className="text-lg sm:text-xl text-charcoal-600 max-w-3xl mx-auto font-montserrat">
            Çdo çift e ka historinë e vet. Këtu mund t’i shihni disa momente që i kemi fotografuar dhe filmuar me kujdes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gold-500 text-white shadow-lg'
                  : 'bg-white text-charcoal-700 hover:bg-gold-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-playfair text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90 mb-1 font-montserrat">{item.location}</p>
                      <p className="text-sm opacity-80 mb-3 font-montserrat">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-charcoal-900 transition-colors duration-300 hover:bg-gold-100"
                          onClick={() => setSelectedImage(item.image)}
                        >
                          Zmadho
                        </button>
                        <Link
                          href={`/gallery/${item.id}`}
                          className="rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-charcoal-900"
                        >
                          Shiko galerinë
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button 
            className="btn-secondary"
            onClick={() => window.location.href = '/gallery/1'}
          >
            Shiko më shumë punë
          </button>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Portfolio"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="Mbyll pamjen"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
