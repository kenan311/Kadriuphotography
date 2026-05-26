'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Ballina', href: '/#home' },
    { name: 'Shërbimet', href: '/#services' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Rreth nesh', href: '/#about' },
    { name: 'Vlerësime', href: '/#testimonials' },
    { name: 'Kontakti', href: '/#contact' },
  ]

  const solidNav = scrolled || pathname !== '/' || isOpen

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.substring(2)
      const element = document.getElementById(targetId)
      if (element) {
        event.preventDefault()
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed left-0 right-0 top-3 z-50 px-3 transition-all duration-300"
    >
      <div className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-6 ${
        solidNav
          ? 'border border-white/70 bg-white/95 shadow-lg shadow-charcoal-900/10 backdrop-blur-md'
          : 'border border-white/15 bg-charcoal-900/10 backdrop-blur-sm'
      }`}>
          <Link href="/" className="absolute left-1/2 flex min-w-0 -translate-x-1/2 items-center gap-2.5 sm:static sm:translate-x-0" aria-label="Kadriu Photography">
            <img
              src="/kadriu-logo-nav.png"
              alt="Kadriu Photography Logo"
              className="h-[62px] w-auto max-w-[150px] shrink-0 object-contain drop-shadow-sm sm:h-[62px] sm:max-w-[154px]"
            />
            <span className={`hidden truncate font-luxury text-xl font-bold tracking-wide sm:block ${
              solidNav ? 'text-charcoal-900' : 'text-white'
            }`}>
              Kadriu Photography
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`relative text-sm font-semibold transition-colors duration-300 ${
                  solidNav ? 'text-charcoal-700 hover:text-gold-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="btn-primary px-5 py-2.5 text-sm"
            >
              Rezervo tani
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-full p-2 transition-colors duration-300 lg:hidden ${
              solidNav ? 'text-charcoal-800 hover:bg-cream-100' : 'text-white hover:bg-white/15'
            }`}
            aria-label="Hape menynë"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-lg border border-white/70 bg-white/95 shadow-xl shadow-charcoal-900/10 backdrop-blur-md lg:hidden"
          >
            <div className="px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className="rounded-lg px-3 py-2 font-semibold text-charcoal-700 transition-colors duration-300 hover:bg-cream-100 hover:text-gold-700"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary mt-2 w-full text-center"
                >
                  Rezervo tani
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
