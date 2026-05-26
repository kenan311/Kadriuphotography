'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById('services')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative flex min-h-[92svh] items-center overflow-hidden bg-charcoal-900 pb-16 pt-28">
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full scale-105 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/90 via-charcoal-900/55 to-charcoal-900/10"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream-50 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
            Foto dhe video për dasma
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-luxury text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            Kadriu Photography
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl"
          >
            Fotografi dhe video moderne për dasma, fejesa dhe festa familjare. I kapim momentet natyrshëm, me dritë të bukur dhe material final të punuar me kujdes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/book"
              className="btn-primary px-7 py-4 text-base"
            >
              Rezervo datën
            </Link>
            <Link
              href="#portfolio"
              className="btn-secondary border-white/50 bg-white/10 px-7 py-4 text-base text-white hover:bg-white hover:text-charcoal-900"
            >
              Shiko më shumë
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-6 text-white"
          >
            {[
              ['50+', 'çifte'],
              ['24h', 'përgjigje'],
              ['4K', 'video'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-luxury text-3xl font-bold">{value}</p>
                <p className="text-sm text-white/70">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/25 bg-white/15 p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/25"
        aria-label="Shko te shërbimet"
      >
        <ChevronDownIcon className="h-6 w-6 animate-bounce text-white" />
      </motion.button>
    </section>
  )
}
