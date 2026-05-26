'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Fotografi për dasma', href: '#services' },
      { name: 'Video për dasma', href: '#services' },
      { name: 'Foto fejese', href: '#services' },
      { name: 'Dasmë e vogël', href: '#services' },
      { name: 'Portrete Familjare', href: '#services' }
    ],
    company: [
      { name: 'Rreth nesh', href: '#about' },
      { name: 'Ekipi ynë', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Vlerësime', href: '#testimonials' },
      { name: 'Kontakti', href: '#contact' }
    ],
    resources: [
      { name: 'Planifikimi i ditës', href: '#' },
      { name: 'Këshilla për foto', href: '#' },
      { name: 'Çmimet', href: '#' },
      { name: 'Pyetje të shpeshta', href: '#' },
      { name: 'Blog', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: 'IG' },
    { name: 'Facebook', href: '#', icon: 'FB' },
    { name: 'Pinterest', href: '#', icon: 'PT' },
    { name: 'YouTube', href: '#', icon: 'YT' }
  ]

  return (
    <footer className="bg-charcoal-800 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <img
                  src="/kadriu-logo.png"
                  alt="Kadriu Photography Logo"
                  className="h-11 w-11 object-contain"
                />
                <span className="font-luxury text-2xl font-bold">
                  Kadriu Photography
                </span>
              </Link>
              
              <p className="text-charcoal-300 mb-6 leading-relaxed">
                I ruajmë momentet tuaja me foto dhe video të punuara me kujdes.
                Shërbime profesionale për dasma, fejesa dhe festa familjare.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-charcoal-300">
                  <EnvelopeIcon className="w-5 h-5 text-gold-500" />
                  <span>kadriuphotography@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-charcoal-300">
                  <PhoneIcon className="w-5 h-5 text-gold-500" />
                  <span>+338 xxx xxx</span>
                </div>
                <div className="flex items-center space-x-3 text-charcoal-300">
                  <MapPinIcon className="w-5 h-5 text-gold-500" />
                  <span>Podujevë</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-luxury text-xl font-bold mb-6">Shërbimet</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-charcoal-300 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-luxury text-xl font-bold mb-6">Kompania</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-charcoal-300 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-luxury text-xl font-bold mb-6">Informata</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-charcoal-300 hover:text-gold-400 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-charcoal-700 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-charcoal-300 font-medium">Na ndiqni:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal-700 text-xs font-bold tracking-wide hover:bg-gold-500 transition-colors duration-300"
                    title={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-4">
              <span className="text-charcoal-300 font-medium">Merrni lajme:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email-i juaj"
                  className="px-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-white placeholder-charcoal-400"
                />
                <button className="px-6 py-2 bg-gold-500 hover:bg-gold-600 rounded-r-lg transition-colors duration-300 font-medium">
                  Abonohu
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-charcoal-700 py-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-charcoal-400">
              <span>© {currentYear} Kadriu Photography. Të gjitha të drejtat janë të rezervuara.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="#"
                className="text-charcoal-400 hover:text-gold-400 transition-colors duration-300"
              >
                Privatësia
              </Link>
              <Link
                href="#"
                className="text-charcoal-400 hover:text-gold-400 transition-colors duration-300"
              >
                Kushtet
              </Link>
              <Link
                href="#"
                className="text-charcoal-400 hover:text-gold-400 transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
          
          {/* Made with Love */}
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-charcoal-700">
            <p className="text-charcoal-400 text-sm flex items-center space-x-2">
              <span>Krijuar me</span>
              <HeartIcon className="w-4 h-4 text-gold-500" />
              <span>për çiftet tona</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
