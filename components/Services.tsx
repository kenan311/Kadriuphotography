'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CameraIcon, 
  VideoCameraIcon, 
  PhotoIcon, 
  HeartIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function Services() {
  const services = [
    {
      packageId: 'wedding-photo',
      icon: CameraIcon,
      title: 'Fotografi për dasma',
      description: 'Mbulim i plotë i ditës me foto natyrale, elegante dhe të punuara me kujdes për çdo moment të rëndësishëm.',
      features: ['Mbulim 8-12 orë', '300+ foto të edituara', 'Galeri online', 'Foto gati për printim'],
      price: 'Varësisht kërkesave tuaja'
    },
    {
      packageId: 'wedding-video',
      icon: VideoCameraIcon,
      title: 'Video për dasma',
      description: 'Video e punuar bukur, me montazh profesional, muzikë dhe pamje që e tregojnë atmosferën e ditës suaj.',
      features: ['Video përmbledhëse', 'Ceremonia e plotë', 'Mbulim i ahengut', 'Pamje me dron'],
      price: 'Varësisht kërkesave tuaja'
    },
    {
      packageId: 'engagement',
      icon: PhotoIcon,
      title: 'Foto fejese',
      description: 'Seancë e qetë dhe e bukur para dasmës, për kujtime personale ose për ftesa.',
  features: ['Seancë 2 orë', '50+ foto të edituara', 'Disa lokacione', 'Galeri online'],
      price: 'Varësisht kërkesave tuaja'
    },
    {
      packageId: 'elopement',
      icon: HeartIcon,
      title: 'Dasmë e vogël',
      description: 'Mbulim për ceremoni private ose dasma më të vogla, me fokus te momentet reale.',
      features: ['Mbulim 4-6 orë', '200+ foto të edituara', 'Disa lokacione', 'Foto të para brenda ditës'],
      price: 'Varësisht kërkesave tuaja'
    },
    {
      packageId: 'hourly',
      icon: ClockIcon,
      title: 'Mbulim me orë',
      description: 'Zgjidhje fleksibile për ceremoni, festa ose momente të veçanta ku ju duhet ekip vetëm për disa orë.',
      features: ['Minimum 2 orë', 'Editim profesional', 'Dorëzim i shpejtë', 'Dorëzim online'],
      price: 'Varësisht kërkesave tuaja'
    },
    {
      packageId: 'family',
      icon: UserGroupIcon,
      title: 'Portrete Familjare',
      description: 'Foto familjare për kujtime, shtatzëni, ditëlindje ose raste të tjera të rëndësishme.',
  features: ['Seancë 1-2 orë', '30+ foto të edituara', 'Disa poza', 'Galeri online'],
      price: 'Varësisht kërkesave tuaja'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-3">Oferta të gatshme</p>
          <h2 className="section-title mb-6">
            <span className="text-gradient">Shërbimet</span> tona
          </h2>
          <p className="section-lede">
            Prej dasmave të mëdha deri te fejesat dhe festat familjare, i përshtatim ofertat sipas ditës, vendit dhe stilit që ju pëlqen.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card flex h-full flex-col p-7 hover:-translate-y-1 hover:border-gold-200 hover:shadow-xl hover:shadow-charcoal-900/10"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-gold-100">
                <service.icon className="h-7 w-7 text-gold-700" />
              </div>
              
              <h3 className="font-luxury text-2xl font-bold text-charcoal-900 mb-3">
                {service.title}
              </h3>
              
              <p className="mb-6 text-sm leading-7 text-charcoal-600 sm:text-base">
                {service.description}
              </p>
              
              <ul className="mb-7 space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm text-charcoal-700">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gold-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto border-t border-cream-200 pt-5">
                <p className="price-text mb-4 text-xl">
                  {service.price}
                </p>
                <Link
                  href={`/book?package=${service.packageId}`}
                  className="btn-primary w-full"
                >
                  Rezervo këtë ofertë
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-base leading-8 text-charcoal-600 mb-6 sm:text-lg">
            Nuk po e gjeni saktë atë që ju duhet? Mund ta bëjmë një ofertë të veçantë vetëm për ju.
          </p>
          <Link
            href="/book?package=custom"
            className="btn-primary bg-gold-500 text-white shadow-gold-700/20 hover:bg-gold-600"
          >
            Kërko ofertë të veçantë
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
