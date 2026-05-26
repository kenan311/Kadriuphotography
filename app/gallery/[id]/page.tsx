'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon, 
  HeartIcon, 
  ShareIcon, 
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface GalleryItem {
  id: string
  type: 'photo' | 'video'
  url: string
  thumbnail?: string
  title?: string
  description?: string
  isFavorite?: boolean
}

type GalleryFilter = 'all' | 'photos' | 'videos'

export default function GalleryPage({ params }: { params: { id: string } }) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const [isLoading, setIsLoading] = useState(true)
  const favoritesStorageKey = `kadriu-gallery-${params.id}-favorites`

  // Mock gallery data - in a real app, this would come from an API
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Takimi i parë',
      description: 'Momenti kur e shihni njëri-tjetrin për herë të parë ditën e dasmës'
    },
    {
      id: '2',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Ceremonia',
      description: 'Ceremonia juaj e bukur'
    },
    {
      id: '3',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Video përmbledhëse e dasmës',
      description: 'Një përmbledhje e bukur e ditës suaj'
    },
    {
      id: '4',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Festa',
      description: 'Festë me familjen dhe miqtë'
    },
    {
      id: '5',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Portrete',
      description: 'Portrete elegante të çiftit'
    },
    {
      id: '6',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Perëndimi',
      description: 'Foto romantike në dritën e perëndimit'
    },
    {
      id: '7',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Video e Ceremonisë',
      description: 'Video e plotë e ceremonisë'
    },
    {
      id: '8',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      title: 'Detajet',
      description: 'Detaje dhe dekorime të bukura të dasmës'
    }
  ]

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === filter.slice(0, -1) as 'photo' | 'video')

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  useEffect(() => {
    try {
      const savedFavorites = window.localStorage.getItem(favoritesStorageKey)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch {
      setFavorites([])
    }
  }, [favoritesStorageKey])

  useEffect(() => {
    window.localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites))
  }, [favorites, favoritesStorageKey])

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const navigateItem = (direction: 'prev' | 'next') => {
    if (!selectedItem) return
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedItem(filteredItems[newIndex])
  }

  const downloadItem = (item: GalleryItem) => {
    const extension = item.type === 'video' ? 'mp4' : 'jpg'
    const fileName = `${item.title || 'kadriu-gallery-item'}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const link = document.createElement('a')
    link.href = item.url
    link.download = `${fileName}.${extension}`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.click()
  }

  const shareItem = (item: GalleryItem) => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Linku u kopjua!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal-600 font-montserrat">Duke ngarkuar galerinë...</p>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-2 text-gold-600 hover:text-gold-700 mb-6 mx-auto transition-colors duration-300"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Kthehu te Ballina</span>
              </button>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-charcoal-800 mb-4">
                Galeria e dasmës
              </h1>
              <p className="text-xl text-charcoal-600 mb-6 font-montserrat">
                Shikoni fotot dhe videot e ditës suaj
              </p>
              <div className="flex items-center justify-center space-x-8 text-charcoal-600 font-montserrat">
                <span>{galleryItems.filter(item => item.type === 'photo').length} Foto</span>
                <span>{galleryItems.filter(item => item.type === 'video').length} Video</span>
                <span>{favorites.length} Të preferuara</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-cream-200">
          <div className="container-custom py-6">
            <div className="flex items-center justify-center space-x-4">
              {([
                { id: 'all', name: 'Të gjitha', count: galleryItems.length },
                { id: 'photos', name: 'Foto', count: galleryItems.filter(item => item.type === 'photo').length },
                { id: 'videos', name: 'Video', count: galleryItems.filter(item => item.type === 'video').length }
              ] satisfies { id: GalleryFilter; name: string; count: number }[]).map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 font-montserrat ${
                    filter === filterOption.id
                      ? 'bg-gold-500 text-white'
                      : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                  }`}
                >
                  {filterOption.name} ({filterOption.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="container-custom py-12">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(item.id)
                          }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                          aria-label="Shto te të preferuarat"
                        >
                          {favorites.includes(item.id) ? (
                            <HeartSolid className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-white" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            shareItem(item)
                          }}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                          aria-label="Shpërndaj"
                        >
                          <ShareIcon className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm opacity-90">{item.description}</p>
                      </div>
                      
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <PlayIcon className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="Mbyll galerinë"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateItem('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="Fotoja paraprake"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigateItem('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="Foto tjetër"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="bg-white rounded-lg overflow-hidden">
                {selectedItem.type === 'photo' ? (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedItem.url}
                    controls
                    className="max-w-full max-h-[80vh]"
                  />
                )}
                
                {/* Item Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-charcoal-800 mb-2">
                        {selectedItem.title}
                      </h3>
                      <p className="text-charcoal-600">
                        {selectedItem.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleFavorite(selectedItem.id)}
                        className="p-3 bg-cream-100 rounded-lg hover:bg-cream-200 transition-colors duration-300"
                        aria-label="Shto te të preferuarat"
                      >
                        {favorites.includes(selectedItem.id) ? (
                          <HeartSolid className="w-6 h-6 text-red-500" />
                        ) : (
                          <HeartIcon className="w-6 h-6 text-charcoal-600" />
                        )}
                      </button>
                      <button
                        onClick={() => shareItem(selectedItem)}
                        className="p-3 bg-cream-100 rounded-lg hover:bg-cream-200 transition-colors duration-300"
                        aria-label="Shpërndaj"
                      >
                        <ShareIcon className="w-6 h-6 text-charcoal-600" />
                      </button>
                      <button
                        onClick={() => downloadItem(selectedItem)}
                        className="p-3 bg-cream-100 rounded-lg hover:bg-cream-200 transition-colors duration-300"
                        aria-label="Shkarko"
                      >
                        <ArrowDownTrayIcon className="w-6 h-6 text-charcoal-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  )
}
