import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ScrollReveal'
import { products, riceMillProducts, poultryFeedProducts, attaChakkiProducts, type Product } from '../data/products'

type Category = 'all' | 'rice-mill' | 'poultry-feed' | 'atta-chakki'

export default function ProductsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState<Category>((searchParams.get('cat') as Category) || 'all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const cat = searchParams.get('cat') as Category
    if (cat) setActive(cat)
  }, [searchParams])

  const setCategory = (cat: Category) => {
    setActive(cat)
    if (cat === 'all') setSearchParams({})
    else setSearchParams({ cat })
  }

  const baseList: Product[] =
    active === 'rice-mill' ? riceMillProducts :
    active === 'poultry-feed' ? poultryFeedProducts :
    active === 'atta-chakki' ? attaChakkiProducts : products

  const filtered = search
    ? baseList.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    : baseList

  return (
    <main>
      <section className="bg-primary py-32 px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto">
          <span className="section-label text-secondary-gold mb-4 block">{t('products.badge')}</span>
          <h1 className="font-grotesk font-bold text-4xl md:text-6xl text-white mb-4">{t('products.title')}</h1>
          <p className="font-manrope text-body-lg text-white/60 max-w-xl">
            {products.length}+ {t('home.hero.titleHighlight')}
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-outline-variant sticky top-[72px] z-40">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-5 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'rice-mill', 'poultry-feed', 'atta-chakki'] as Category[]).map(cat => {
              const labelKey = cat === 'all' ? 'filterAll' : cat === 'rice-mill' ? 'filterRice' : cat === 'poultry-feed' ? 'filterPoultry' : 'filterAtta'
              return (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`font-grotesk text-label uppercase tracking-widest px-5 py-2 transition-all duration-200 ${
                    active === cat ? 'bg-primary text-white' : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}>
                  {t(`products.${labelKey}`)}
                </button>
              )
            })}
          </div>
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: '18px' }}>search</span>
            <input type="text" placeholder={t('products.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-outline-variant font-manrope text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>
      </section>

      <section className="py-section bg-surface-low">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="mb-10">
            <span className="font-grotesk text-label uppercase tracking-widest text-outline">
              {t('products.showing', { count: filtered.length })} — {
                active === 'all' ? t('products.filterAll') : 
                active === 'rice-mill' ? t('products.filterRice') : 
                active === 'poultry-feed' ? t('products.filterPoultry') : t('products.filterAtta')
              }
            </span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-outline-variant block mb-4">search_off</span>
              <p className="font-manrope text-body text-on-surface-variant">{t('products.noResults', { query: search })}</p>
              <button onClick={() => setSearch('')} className="btn-outline mt-6 inline-block">{t('products.clearSearch')}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filtered.map((p) => (
                <ScrollReveal key={p.id} delay={80}>
                  <div className="group bg-white flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-all duration-500 border border-outline-variant/30">
                    {/* Left: Image */}
                    <div className="md:w-2/5 bg-surface-container flex items-center justify-center p-10 overflow-hidden relative">
                      <img
                        src={p.images?.[0] || `https://images.unsplash.com/photo-${p.category === 'rice-mill' ? '1625246333195-78d9c38ad449' : '1500382017468-9049fed747ef'}?auto=format&fm=webp&w=800&q=80`}
                        alt={p.name}
                        className="max-h-64 md:max-h-80 object-contain group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 left-4">
                         {p.badge && <span className="bg-primary text-white font-grotesk text-[10px] font-bold tracking-widest uppercase px-3 py-1">{p.badge}</span>}
                      </div>
                    </div>

                    {/* Right: Info */}
                    <div className="p-8 md:p-12 flex flex-col flex-1 justify-center">
                      <div className="mb-6">
                        <span className="font-grotesk text-label text-secondary-gold uppercase tracking-[0.2em] mb-2 block">
                          {t(`products.filter${p.category === 'rice-mill' ? 'Rice' : p.category === 'poultry-feed' ? 'Poultry' : 'Atta'}`)}
                        </span>
                        <h2 className="font-grotesk font-semibold text-3xl text-primary mb-4">{p.name}</h2>
                        <p className="font-manrope text-body text-on-surface-variant leading-relaxed max-w-2xl">{p.description}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 mb-10">
                        {p.specs.map(s => (
                          <div key={s.label} className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                            <span className="font-grotesk text-[11px] uppercase tracking-wider text-outline">{s.label}</span>
                            <span className="font-manrope text-sm text-primary font-medium">{s.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 mt-auto">
                        <Link to="/contact" className="btn-primary px-10 py-4 text-sm">
                          {t('products.sendInquiry')}
                        </Link>
                        <a href="tel:+919415139838" className="btn-outline flex items-center gap-3 px-6 py-4">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
                          <span className="font-grotesk text-label uppercase tracking-widest text-xs font-bold">Call Sales</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary py-16 px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-grotesk font-semibold text-3xl text-white mb-2">{t('products.customTitle')}</h3>
            <p className="font-manrope text-body text-white/60">{t('products.customDesc')}</p>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="btn-primary whitespace-nowrap">{t('products.getQuote')}</Link>
            <a href="tel:+919415139838" className="btn-ghost whitespace-nowrap">
              {t('products.callNow')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
