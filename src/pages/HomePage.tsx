import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ScrollReveal'
import { products } from '../data/products'
import { useSiteImages } from '../hooks/useSiteImages'
import StorySlideshow from '../components/StorySlideshow'
import GalleryAndReviews from '../components/GalleryAndReviews'

const featured = products.slice(0, 3)

export default function HomePage() {
  const { t } = useTranslation()
  const { images, homeStoryPhotos } = useSiteImages()

  const stats = [
    { value: '40+', label: t('home.stats.years') },
    { value: '20+', label: t('home.stats.employees') },
    { value: '385k+', label: t('home.stats.clients') },
    { value: '99%', label: t('home.stats.quality') },
  ]

  const whyUs = [
    { icon: 'verified', title: t('home.whyUs.items.expertise.title'), desc: t('home.whyUs.items.expertise.desc') },
    { icon: 'engineering', title: t('home.whyUs.items.workforce.title'), desc: t('home.whyUs.items.workforce.desc') },
    { icon: 'handshake', title: t('home.whyUs.items.policies.title'), desc: t('home.whyUs.items.policies.desc') },
    { icon: 'local_shipping', title: t('home.whyUs.items.delivery.title'), desc: t('home.whyUs.items.delivery.desc') },
    { icon: 'workspace_premium', title: t('home.whyUs.items.quality.title'), desc: t('home.whyUs.items.quality.desc') },
    { icon: 'currency_rupee', title: t('home.whyUs.items.pricing.title'), desc: t('home.whyUs.items.pricing.desc') },
  ]

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Background overlay pattern */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full opacity-30"
            style={{
              backgroundImage: `url('${images['home-hero']}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="font-grotesk text-label text-secondary-gold tracking-[0.35em] uppercase mb-6 animate-fade-in">
            {t('home.hero.badge')}
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-6xl lg:text-display text-white leading-tight mb-8 animate-fade-in">
            {t('home.hero.title')}{' '}
            <span className="text-secondary-gold">{t('home.hero.titleHighlight')}</span>{' '}
            {t('home.hero.titleEnd')}
          </h1>
          <p className="font-manrope text-lg md:text-body-lg text-white/75 mb-12 max-w-2xl mx-auto animate-fade-in">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in">
            <Link to="/products" className="btn-primary">
              {t('home.hero.cta1')}
            </Link>
            <Link to="/contact" className="btn-ghost">
              {t('home.hero.cta2')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <span className="material-symbols-outlined text-white/50 text-4xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <section className="bg-primary-light py-12">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100} className="text-center">
              <div className="font-grotesk font-bold text-4xl md:text-5xl text-secondary-gold mb-2">{s.value}</div>
              <div className="font-grotesk text-label uppercase tracking-widest text-white/60">{s.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── About / Our Story ─────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="section-label text-primary mb-4 block">{t('home.story.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-primary mb-6">
              {t('home.story.title')}
            </h2>
            <div className="h-1 w-24 bg-secondary-gold mb-8" />
            <p className="font-manrope text-body-lg text-on-surface-variant leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('home.story.p1') }} />
            <p className="font-manrope text-body text-on-surface-variant/80 mb-8" dangerouslySetInnerHTML={{ __html: t('home.story.p2') }} />
            <Link to="/about" className="btn-outline inline-block">
              {t('home.story.cta')}
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={150} className="relative">
            <div className="aspect-square bg-surface-container overflow-hidden">
              <StorySlideshow
                images={homeStoryPhotos}
                className="w-full h-full aspect-square"
                alt="Krishi Vikas Udyog story"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-primary border-4 border-secondary-gold p-8 hidden lg:block shadow-2xl ring-8 ring-white">
              <div className="text-secondary-gold font-grotesk font-bold text-5xl mb-1">40+</div>
              <div className="text-white font-grotesk text-[10px] leading-tight tracking-[0.2em] uppercase font-bold">
                Years of<br />Manufacturing<br />Innovation
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      <section className="py-section bg-surface-low overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <ScrollReveal>
              <span className="section-label text-primary mb-3 block">{t('home.products.badge')}</span>
              <h2 className="font-grotesk font-semibold text-h1 text-primary">{t('home.products.title')}</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Link
                to="/products"
                className="font-grotesk text-label text-primary hover:text-secondary transition-colors uppercase tracking-widest flex items-center gap-2 mt-4 md:mt-0"
              >
                {t('home.products.viewAll')}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featured.map((p, i) => (
              <ScrollReveal
                key={p.id}
                delay={i * 100}
                className={i === 1 ? 'md:translate-y-12' : ''}
              >
                <div className="group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 overflow-hidden bg-surface-low flex items-center justify-center p-8">
                    <img
                      src={p.images?.[0] || `https://images.unsplash.com/photo-${i === 0 ? '1625246333195-78d9c38ad449' : i === 1 ? '1558618666-fcd25c85cd64' : '1574943320219-553eb213f72d'}?auto=format&fm=webp&w=600&q=80`}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="font-grotesk text-[10px] text-secondary font-bold tracking-widest uppercase mb-3">
                      {p.badge}
                    </div>
                    <h3 className="font-grotesk font-semibold text-xl text-primary mb-3">{p.name}</h3>
                    <p className="font-manrope text-sm text-on-surface-variant mb-6 line-clamp-2">{p.description}</p>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                      <Link
                        to={`/products`}
                        className="font-grotesk text-label text-primary hover:text-secondary uppercase tracking-wider transition-colors"
                      >
                        {t('products.viewDetails')}
                      </Link>
                      <Link to="/contact" className="material-symbols-outlined text-primary hover:text-secondary transition-colors">
                        add_circle
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section className="py-section bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <ScrollReveal className="text-center mb-20">
            <span className="section-label text-secondary mb-3 block">{t('home.whyUs.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-primary max-w-2xl mx-auto">
              {t('home.whyUs.title')}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div className="group p-8 border border-outline-variant hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-surface-low flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="font-grotesk font-semibold text-lg text-primary mb-3">{item.title}</h3>
                  <p className="font-manrope text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Categories ────────────────────────────────── */}
      <section className="py-section bg-surface-low">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <ScrollReveal className="text-center mb-16">
            <span className="section-label text-primary mb-3 block">{t('home.categories.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-primary">{t('home.categories.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('home.categories.riceMill.title'),
                desc: t('home.categories.riceMill.desc'),
                icon: 'grain',
                count: t('home.categories.riceMill.count'),
                to: '/products?cat=rice-mill',
                img: images['home-cat-rice'],
                cta: t('home.categories.riceMill.cta'),
              },
              {
                title: t('home.categories.poultry.title'),
                desc: t('home.categories.poultry.desc'),
                icon: 'agriculture',
                count: t('home.categories.poultry.count'),
                to: '/products?cat=poultry-feed',
                img: images['home-cat-poultry'],
                cta: t('home.categories.poultry.cta'),
              },
              {
                title: t('home.categories.attaChakki.title'),
                desc: t('home.categories.attaChakki.desc'),
                icon: 'settings_input_component',
                count: t('home.categories.attaChakki.count'),
                to: '/products?cat=atta-chakki',
                img: images['home-cat-chakki'],
                cta: t('home.categories.attaChakki.cta'),
              },
            ].map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 150}>
                <Link to={cat.to} className="group relative block overflow-hidden aspect-video">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-50"
                  />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="font-grotesk text-label text-secondary-gold uppercase tracking-widest mb-2">{cat.count}</div>
                    <h3 className="font-grotesk font-bold text-2xl md:text-3xl text-white mb-3">{cat.title}</h3>
                    <p className="font-manrope text-sm text-white/70 mb-6 max-w-sm">{cat.desc}</p>
                    <div className="flex items-center gap-2 text-secondary-gold font-grotesk text-label uppercase tracking-widest">
                      {cat.cta}
                      <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media Gallery & Reviews ───────────────────────────── */}
      <GalleryAndReviews />

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="relative py-section overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url('${images['home-cta']}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2)',
            }}
          />
        </div>
        <ScrollReveal className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <span className="section-label text-secondary-gold mb-4 block">{t('home.cta.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 mb-8">
              {t('home.cta.title')}
            </h2>
            <p className="font-manrope text-body-lg mb-12 text-white/70">
              {t('home.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/contact" className="btn-primary">
                {t('home.cta.btn1')}
              </Link>
              <a href="tel:+919415139838" className="btn-ghost">
                {t('home.cta.btn2')}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
