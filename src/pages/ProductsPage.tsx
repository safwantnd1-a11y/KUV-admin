import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, Phone } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { products as staticProducts } from '../data/products'

type Category = 'all' | 'rice-mill' | 'poultry-feed' | 'atta-chakki'

type AppProduct = {
  id: string | number;
  name: string;
  description: string;
  category: string;
  images: string[];
  specs?: { label: string; value: string }[];
  badge?: string;
}

// Category theme config
const categoryTheme: Record<string, {
  label: string; icon: string; gradient: string;
  badgeBg: string; specBg: string; specText: string; accent: string;
}> = {
  'rice-mill': {
    label: 'Rice Mill',
    icon: '🌾',
    gradient: 'from-amber-500 to-yellow-400',
    badgeBg: 'bg-amber-500',
    specBg: 'bg-amber-50 dark:bg-amber-900/20',
    specText: 'text-amber-700 dark:text-amber-300',
    accent: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
  },
  'poultry-feed': {
    label: 'Poultry Feed Plant',
    icon: '🐔',
    gradient: 'from-blue-500 to-sky-400',
    badgeBg: 'bg-blue-500',
    specBg: 'bg-blue-50 dark:bg-blue-900/20',
    specText: 'text-blue-700 dark:text-blue-300',
    accent: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  },
  'atta-chakki': {
    label: 'Atta Chakki & Oil Expeller',
    icon: '⚙️',
    gradient: 'from-orange-500 to-amber-400',
    badgeBg: 'bg-orange-500',
    specBg: 'bg-orange-50 dark:bg-orange-900/20',
    specText: 'text-orange-700 dark:text-orange-300',
    accent: 'group-hover:text-orange-600 dark:group-hover:text-orange-400',
  },
}

const categories = ['all', 'rice-mill', 'poultry-feed', 'atta-chakki']

const categoryLabel: Record<string, string> = {
  all: 'All Products',
  'rice-mill': '🌾 Rice Mill',
  'poultry-feed': '🐔 Poultry Feed Plant',
  'atta-chakki': '⚙️ Atta Chakki & Oil Expeller',
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState<Category>((searchParams.get('cat') as Category) || 'all')
  const [search, setSearch] = useState('')
  const [dbProducts, setDbProducts] = useState<AppProduct[]>([])

  useEffect(() => {
    const cat = searchParams.get('cat') as Category
    if (cat) setActive(cat)
  }, [searchParams])

  useEffect(() => {
    fetchSupabaseProducts()
  }, [])

  const fetchSupabaseProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*')
      if (data && !error) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          name: p.title,
          description: p.description,
          category: p.category,
          images: [p.image_url],
          specs: p.specs || [],
          badge: p.badge || undefined,
        }))
        setDbProducts(mapped)
      }
    } catch {
      console.log('Supabase not configured yet or error fetching')
    }
  }

  const setCategory = (cat: Category) => {
    setActive(cat)
    if (cat === 'all') setSearchParams({})
    else setSearchParams({ cat })
  }

  const allProducts: AppProduct[] = [...staticProducts, ...dbProducts]

  const filtered = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchesCat = active === 'all' || p.category === active
    return matchesSearch && matchesCat
  })

  return (
    <main className="bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="max-w-[1440px] mx-auto relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-300 backdrop-blur-md border border-green-500/30 text-sm font-semibold tracking-wider uppercase mb-6">
            Premium Collection
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-grotesk font-extrabold text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
            Our Products
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-manrope text-xl text-green-100 max-w-2xl mx-auto">
            Discover top-tier agricultural machinery and supplies designed for maximum efficiency and yield.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat, idx) => (
              <motion.button key={cat}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.05 }}
                onClick={() => setCategory(cat as Category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === cat
                    ? 'bg-green-600 text-white shadow-md shadow-green-600/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}>
                {categoryLabel[cat]}
              </motion.button>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
              <Search size={18} />
            </div>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-green-500 outline-none transition-all dark:text-white" />
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center py-32 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  {search ? `No results for "${search}".` : 'No products in this category yet. Add them via the admin panel.'}
                </p>
                <button onClick={() => { setSearch(''); setActive('all') }}
                  className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((p, index) => {
                  const theme = categoryTheme[p.category] || categoryTheme['rice-mill']
                  return (
                    <motion.div layout key={p.id}
                      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.07 }}
                      className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-green-500/40 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 flex flex-col">

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-6">
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fm=webp&w=800&q=80'}
                          alt={p.name}
                          className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                        />
                        {/* Category pill */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className={`${theme.badgeBg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                            {theme.icon} {theme.label}
                          </span>
                        </div>
                        {/* Badge */}
                        {p.badge && (
                          <div className="absolute top-4 right-4 z-20">
                            <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                              {p.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className={`font-grotesk font-bold text-xl text-gray-900 dark:text-white mb-2 ${theme.accent} transition-colors line-clamp-2`}>
                          {p.name}
                        </h2>
                        {p.description && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {p.description}
                          </p>
                        )}

                        {/* Specs Grid */}
                        {p.specs && p.specs.length > 0 && (
                          <div className={`rounded-xl p-3 mb-4 ${theme.specBg}`}>
                            <div className="grid grid-cols-2 gap-2">
                              {p.specs.slice(0, 4).map(s => (
                                <div key={s.label}>
                                  <span className={`block text-[10px] uppercase tracking-wider font-semibold mb-0.5 ${theme.specText} opacity-70`}>{s.label}</span>
                                  <span className={`block text-xs font-bold ${theme.specText} truncate`}>{s.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <Link to="/contact"
                            className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-green-600 dark:hover:bg-green-500 hover:text-white transition-all duration-300">
                            Get Quote <ChevronRight size={16} />
                          </Link>
                          <a href="tel:+919415139838"
                            className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300"
                            title="Call Sales">
                            <Phone size={18} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
