'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarIcon, 
  PhotoIcon, 
  VideoCameraIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  // Mock data - in a real app, this would come from an API
  const user = {
    name: 'Sara & Mentor',
    email: 'sarah.michael@email.com',
    phone: '+383 44 123 456',
    eventDate: '2024-06-15',
    eventType: 'Dasmë',
    location: 'Prishtinë, Kosovë',
    package: 'Foto + Video',
    status: 'Konfirmuar'
  }

  const upcomingEvents = [
    {
      id: 1,
      type: 'Seancë fejese',
      date: '2024-03-15',
      time: '14:00',
      location: 'Prizren, Kosovë',
      status: 'E planifikuar'
    },
    {
      id: 2,
      type: 'Dita e dasmës',
      date: '2024-06-15',
      time: '10:00',
      location: 'Prishtinë, Kosovë',
      status: 'Konfirmuar'
    }
  ]

  const recentGalleries = [
    {
      id: 1,
      name: 'Seanca e fejesës - Mars 2024',
      date: '2024-03-15',
      photoCount: 85,
      videoCount: 0,
      status: 'Gati'
    },
    {
      id: 2,
      name: 'Seanca para dasmës',
      date: '2024-02-20',
      photoCount: 45,
      videoCount: 0,
      status: 'Gati'
    }
  ]

  const timeline = [
    {
      date: '2024-06-01',
      title: 'Takimi final për detaje',
      description: 'Bisedojmë për orarin, listën e fotove dhe kërkesat e veçanta',
      status: 'upcoming'
    },
    {
      date: '2024-06-10',
      title: 'Vizitë në lokacion',
      description: 'E shohim vendin për ta planifikuar dritën dhe këndet',
      status: 'upcoming'
    },
    {
      date: '2024-06-15',
      title: 'Dita e dasmës',
      description: 'Dita juaj e veçantë',
      status: 'current'
    },
    {
      date: '2024-06-22',
      title: 'Fotot e para',
      description: 'Merrni 20-30 foto të edituara brenda javës',
      status: 'upcoming'
    },
    {
      date: '2024-07-15',
      title: 'Galeria e plotë',
      description: 'Dorëzimi i plotë i fotove dhe videove',
      status: 'upcoming'
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Përmbledhje', icon: UserIcon },
    { id: 'events', name: 'Datat', icon: CalendarIcon },
    { id: 'galleries', name: 'Galeritë', icon: PhotoIcon },
    { id: 'timeline', name: 'Orari', icon: ClockIcon },
    { id: 'settings', name: 'Të dhënat', icon: CogIcon }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal-600 font-montserrat">Duke ngarkuar panelin tuaj...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
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
              className="flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal-800 mb-2">
                  Mirë se erdhët, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-charcoal-600 font-montserrat">
                  Këtu i gjeni datat, galeritë dhe detajet e rezervimit tuaj.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="btn-secondary flex items-center space-x-2">
                  <BellIcon className="w-5 h-5" />
                  <span>Njoftimet</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
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

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6 text-center">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarIcon className="w-6 h-6 text-gold-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-charcoal-800 mb-2">2</h3>
                      <p className="text-charcoal-600">Data të ardhshme</p>
                    </div>
                    <div className="card p-6 text-center">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PhotoIcon className="w-6 h-6 text-gold-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-charcoal-800 mb-2">130</h3>
                      <p className="text-charcoal-600">Foto të dorëzuara</p>
                    </div>
                    <div className="card p-6 text-center">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HeartIcon className="w-6 h-6 text-gold-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-charcoal-800 mb-2">92</h3>
                      <p className="text-charcoal-600">Ditë deri në dasmë</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="card p-8">
                    <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                      Detajet e dasmës
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <CalendarIcon className="w-5 h-5 text-gold-500" />
                          <div>
                            <p className="text-sm text-charcoal-500">Data</p>
                            <p className="font-medium text-charcoal-800">15 qershor 2024</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPinIcon className="w-5 h-5 text-gold-500" />
                          <div>
                            <p className="text-sm text-charcoal-500">Vendi</p>
                            <p className="font-medium text-charcoal-800">{user.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <PhotoIcon className="w-5 h-5 text-gold-500" />
                          <div>
                            <p className="text-sm text-charcoal-500">Oferta</p>
                            <p className="font-medium text-charcoal-800">{user.package}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-sm text-charcoal-500">Statusi</p>
                            <p className="font-medium text-charcoal-800">{user.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="card p-8">
                    <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                      Aktivitetet e fundit
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-cream-50 rounded-lg">
                        <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                          <PhotoIcon className="w-4 h-4 text-gold-600" />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal-800">Foto të reja janë ngarkuar</p>
                          <p className="text-sm text-charcoal-600">Galeria e fejesës është gati</p>
                          <p className="text-xs text-charcoal-500">Para 2 ditëve</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-cream-50 rounded-lg">
                        <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center">
                          <CalendarIcon className="w-4 h-4 text-gold-600" />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal-800">Data u planifikua</p>
                          <p className="text-sm text-charcoal-600">Seanca e fejesës u konfirmua për 15 mars</p>
                          <p className="text-xs text-charcoal-500">Para 1 jave</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Events Tab */}
              {activeTab === 'events' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card p-8">
                    <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                      Datat tuaja
                    </h2>
                    <div className="space-y-6">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="border border-cream-300 rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-serif text-xl font-bold text-charcoal-800 mb-2">
                                {event.type}
                              </h3>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-charcoal-600">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-charcoal-600">
                                  <ClockIcon className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-charcoal-600">
                                  <MapPinIcon className="w-4 h-4" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                event.status === 'Konfirmuar' 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Galleries Tab */}
              {activeTab === 'galleries' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card p-8">
                    <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                      Galeritë tuaja
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recentGalleries.map((gallery) => (
                        <div key={gallery.id} className="border border-cream-300 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                          <div className="aspect-video bg-cream-200 rounded-lg mb-4 flex items-center justify-center">
                            <PhotoIcon className="w-12 h-12 text-charcoal-400" />
                          </div>
                          <h3 className="font-serif text-lg font-bold text-charcoal-800 mb-2">
                            {gallery.name}
                          </h3>
                          <p className="text-charcoal-600 text-sm mb-4">
                            {new Date(gallery.date).toLocaleDateString()}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-charcoal-600">
                              <span>{gallery.photoCount} foto</span>
                              {gallery.videoCount > 0 && (
                                <span>{gallery.videoCount} video</span>
                              )}
                            </div>
                            <button 
                              className="btn-primary text-sm px-4 py-2"
                              onClick={() => window.location.href = `/gallery/${gallery.id}`}
                            >
                              Shiko galerinë
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card p-8">
                    <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                      Orari i dasmës
                    </h2>
                    <div className="space-y-6">
                      {timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className={`w-4 h-4 rounded-full mt-2 ${
                            item.status === 'current' 
                              ? 'bg-gold-500' 
                              : item.status === 'completed'
                              ? 'bg-green-500'
                              : 'bg-charcoal-300'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-charcoal-800">
                                {item.title}
                              </h3>
                              <span className="text-sm text-charcoal-500">
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-charcoal-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="card p-8">
                    <h2 className="font-serif text-2xl font-bold text-charcoal-800 mb-6">
                      Të dhënat e llogarisë
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Emri i plotë
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="input-field"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="input-field"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700 mb-2">
                          Numri i telefonit
                        </label>
                        <input
                          type="tel"
                          value={user.phone}
                          className="input-field"
                          readOnly
                        />
                      </div>
                      <div className="pt-4">
                        <button className="btn-secondary">
                          Përditëso të dhënat
                        </button>
                      </div>
                    </div>
                  </div>
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
