import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, CheckCircle, Loader2, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const IMAGE_SLOTS = [
  {
    key: 'home-hero',
    label: 'Home — Hero Background',
    page: 'Home Page',
    size: '1920 × 1080 px',
    ratio: '16:9 Landscape',
    tip: 'Full-screen background. Use a wide factory/machinery photo.',
    type: 'single',
  },
  {
    key: 'home-story',
    label: 'Home — Our Story Photos',
    page: 'Home Page',
    size: '800 × 800 px',
    ratio: '1:1 Square',
    tip: 'Appears beside the company story text. Upload multiple photos for a slideshow.',
    type: 'gallery',
  },
  {
    key: 'home-cta',
    label: 'Home — CTA Background',
    page: 'Home Page',
    size: '1920 × 600 px',
    ratio: '16:5 Wide Banner',
    tip: 'Background for the "Contact Us" banner. Dark or industrial photo recommended.',
    type: 'single',
  },
  {
    key: 'home-cat-rice',
    label: 'Home — Rice Mill Category',
    page: 'Home Page',
    size: '800 × 450 px',
    ratio: '16:9 Landscape',
    tip: 'Category card image. Rice field or rice mill machinery photo.',
    type: 'single',
  },
  {
    key: 'home-cat-poultry',
    label: 'Home — Poultry Feed Category',
    page: 'Home Page',
    size: '800 × 450 px',
    ratio: '16:9 Landscape',
    tip: 'Category card image. Poultry farm or feed plant photo.',
    type: 'single',
  },
  {
    key: 'home-cat-chakki',
    label: 'Home — Atta Chakki Category',
    page: 'Home Page',
    size: '800 × 450 px',
    ratio: '16:9 Landscape',
    tip: 'Category card image. Chakki or oil expeller machinery photo.',
    type: 'single',
  },
  {
    key: 'about-hero',
    label: 'About — Hero Background',
    page: 'About Page',
    size: '1920 × 600 px',
    ratio: '16:5 Wide Banner',
    tip: 'Top banner of About page. Rice field or manufacturing plant photo.',
    type: 'single',
  },
  {
    key: 'about-story',
    label: 'About — Company Story Photos',
    page: 'About Page',
    size: '800 × 600 px',
    ratio: '4:3 Landscape',
    tip: 'Appears beside company story text. Upload multiple photos for a slideshow.',
    type: 'gallery',
  },
]

const DEFAULTS: Record<string, string> = {
  'home-hero':        '/backgrounds/factory-hero.webp',
  'home-cta':         'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fm=webp&w=1920&q=80',
  'home-cat-rice':    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fm=webp&w=800&q=80',
  'home-cat-poultry': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fm=webp&w=800&q=80',
  'home-cat-chakki':  '/products/mobile-chakki-oil.webp',
  'about-hero':       '/backgrounds/rice-field-hero.webp',
}

interface StoryPhoto {
  id: number
  url: string
  display_order: number
}

export default function ManageSiteImages() {
  const [currentImages, setCurrentImages] = useState<Record<string, string>>(DEFAULTS)
  const [galleries, setGalleries] = useState<Record<string, StoryPhoto[]>>({
    'home-story': [],
    'about-story': []
  })
  const [uploading, setUploading] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    // Single images
    supabase.from('site_images').select('key, url').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = { ...DEFAULTS }
        data.forEach((r: { key: string; url: string }) => { map[r.key] = r.url })
        setCurrentImages(map)
      }
    })

    // Gallery images (story photos)
    const { data: homePhotos } = await supabase.from('story_photos').select('*').eq('page', 'home').order('display_order')
    const { data: aboutPhotos } = await supabase.from('story_photos').select('*').eq('page', 'about').order('display_order')
    
    setGalleries({
      'home-story': homePhotos || [],
      'about-story': aboutPhotos || []
    })
  }

  const handleUploadSingle = async (slotKey: string, file: File) => {
    setUploading(slotKey)
    setSuccess(null)
    try {
      const ext = file.name.split('.').pop()
      const path = `site/${slotKey}-${Date.now()}.${ext}`

      const { error: upErr } = await supabase.storage.from('images').upload(path, file, { upsert: true })
      if (upErr) throw upErr

      const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
      const publicUrl = urlData.publicUrl

      const { error: dbErr } = await supabase
        .from('site_images')
        .upsert({ key: slotKey, url: publicUrl, label: IMAGE_SLOTS.find(s => s.key === slotKey)?.label }, { onConflict: 'key' })
      if (dbErr) throw dbErr

      setCurrentImages(prev => ({ ...prev, [slotKey]: publicUrl }))
      setSuccess(slotKey)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(null)
    }
  }

  const handleUploadGallery = async (slotKey: string, files: FileList) => {
    setUploading(slotKey)
    setSuccess(null)
    const page = slotKey === 'home-story' ? 'home' : 'about'
    
    try {
      const currentCount = galleries[slotKey].length

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const ext = file.name.split('.').pop()
        const path = `story/${page}-${Date.now()}-${i}.${ext}`

        const { error: upErr } = await supabase.storage.from('images').upload(path, file)
        if (upErr) throw upErr

        const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
        
        await supabase.from('story_photos').insert({
          page,
          url: urlData.publicUrl,
          display_order: currentCount + i
        })
      }
      
      await fetchImages()
      setSuccess(slotKey)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploading(null)
    }
  }

  const handleDeleteGalleryImage = async (slotKey: string, id: number) => {
    if (!confirm('Delete this photo?')) return
    
    try {
      await supabase.from('story_photos').delete().eq('id', id)
      await fetchImages()
    } catch (err: any) {
      alert('Delete failed: ' + err.message)
    }
  }

  const pages = ['Home Page', 'About Page']

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Site Images</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload new images for the Home and About pages. Changes go live immediately.
        </p>
      </div>

      {pages.map(page => (
        <div key={page}>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full inline-block" />
            {page}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {IMAGE_SLOTS.filter(s => s.page === page).map((slot, idx) => (
              <motion.div
                key={slot.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm flex flex-col"
              >
                {slot.type === 'single' ? (
                  <>
                    <div className="relative h-40 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <img
                        src={currentImages[slot.key]}
                        alt={slot.label}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x200?text=No+Image' }}
                      />
                      {success === slot.key && (
                        <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                          <CheckCircle className="text-white" size={40} />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-40 bg-gray-50 dark:bg-gray-800 overflow-y-auto p-2 hide-scrollbar">
                      {galleries[slot.key]?.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {galleries[slot.key].map(photo => (
                            <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                              <img src={photo.url} alt="Gallery item" className="w-full h-full object-cover" />
                              <button
                                onClick={() => handleDeleteGalleryImage(slot.key, photo.id)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <span className="text-2xl mb-2">📸</span>
                          <span className="text-xs">No photos uploaded</span>
                          <span className="text-[10px]">Using default static image</span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 leading-tight">{slot.label}</p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                      📐 {slot.size}
                    </span>
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                      {slot.ratio}
                    </span>
                    {slot.type === 'gallery' && (
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                        🖼️ Multi
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3 leading-relaxed flex-grow">💡 {slot.tip}</p>

                  <label className="cursor-pointer w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all mt-auto">
                    {uploading === slot.key
                      ? <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                      : <><Upload size={16} /> {slot.type === 'gallery' ? 'Add Photos' : 'Change Image'}</>
                    }
                    <input
                      type="file"
                      accept="image/*"
                      multiple={slot.type === 'gallery'}
                      className="sr-only"
                      disabled={!!uploading}
                      onChange={(e) => {
                        const files = e.target.files
                        if (!files || files.length === 0) return
                        
                        if (slot.type === 'gallery') {
                          handleUploadGallery(slot.key, files)
                        } else {
                          handleUploadSingle(slot.key, files[0])
                        }
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
