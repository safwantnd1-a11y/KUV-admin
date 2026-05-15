
import ScrollReveal from './ScrollReveal'
import { Play } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Rice Mill Owner, UP',
    content: 'The fully automatic rice mill plant we installed from Krishi Vikas Udyog has increased our production by 40%. The quality of machinery and after-sales service is unmatched.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Suresh Patel',
    role: 'Poultry Farm Director, Gujarat',
    content: 'Their poultry feed plant is highly efficient and robust. We have been using it for 3 years without any major breakdown. Highly recommend their products.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Singh',
    role: 'Agro Industries, Punjab',
    content: 'Bought a commercial Atta Chakki last year. It is a heavy-duty machine with excellent output quality. The team guided us perfectly during installation.',
    rating: 4,
  },
]

const mediaItems = [
  // Video placeholder: Factory Machinery in Action
  { type: 'video', url: 'https://images.unsplash.com/photo-1565439390118-bbf3252fa975?auto=format&fm=webp&w=600&q=80' },
  
  // Image: Worker / Engineer on the floor
  { type: 'image', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fm=webp&w=600&q=80' },
  
  // Image: Industrial Workers / Team
  { type: 'image', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fm=webp&w=600&q=80' },
  
  // Video placeholder: Manufacturing Process
  { type: 'video', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fm=webp&w=600&q=80' },
]

export default function GalleryAndReviews() {
  return (
    <section className="py-section bg-surface-low overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label text-primary mb-3 block">Gallery & Feedback</span>
          <h2 className="font-grotesk font-semibold text-h1 text-primary">Media & Client Reviews</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Media Gallery */}
          <ScrollReveal delay={100}>
            <h3 className="font-grotesk font-bold text-2xl text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-gold">photo_library</span>
              Our Machinery in Action
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {mediaItems.map((item, i) => (
                <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-200">
                  <img
                    src={item.url}
                    alt="Gallery item"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-lg cursor-pointer">
                        <Play className="text-primary fill-primary w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-on-surface-variant mt-4 text-center">
              More photos and videos coming soon.
            </p>
          </ScrollReveal>

          {/* Right: Reviews */}
          <ScrollReveal delay={200}>
            <h3 className="font-grotesk font-bold text-2xl text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-gold">format_quote</span>
              What Our Clients Say
            </h3>
            <div className="flex flex-col gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="flex text-secondary-gold mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-lg ${i < t.rating ? '' : 'opacity-30'}`}>star</span>
                    ))}
                  </div>
                  <p className="font-manrope text-on-surface-variant italic mb-5">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white font-bold font-grotesk">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-grotesk font-bold text-primary">{t.name}</h4>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
