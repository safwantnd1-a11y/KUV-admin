import ScrollReveal from '../components/ScrollReveal'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const timeline = [
  { year: '1983', title: 'Founded', desc: 'Krishi Vikas Udyog established in Tanda, Uttar Pradesh with a vision to empower Indian farmers with quality machinery.' },
  { year: '1990s', title: 'Expansion', desc: 'Extended product range to include paddy shellers, polishers, and elevators. Client base grew across eastern UP.' },
  { year: '2000s', title: 'Modernization', desc: 'Introduced semi-automatic and computerized machinery lines to meet evolving industrial demands.' },
  { year: '2010s', title: 'ISO Certified', desc: 'Achieved ISO 9001:2015 certification, affirming our commitment to international quality management standards.' },
  { year: '2020+', title: 'Innovation', desc: 'Launched advanced nano models and poultry feed plant range. Now serving 500+ clients across India.' },
]

const profile = [
  { label: 'Nature of Business', value: 'Manufacturer & Supplier' },
  { label: 'Year of Establishment', value: '1983' },
  { label: 'GST Number', value: '09AADFK7950N1ZP' },
  { label: 'No. of Employees', value: '20+' },
  { label: 'Production Type', value: 'Semi-Automatic & Automatic' },
  { label: 'Production Units', value: '01' },
  { label: 'Warehousing Facility', value: 'Yes' },
  { label: 'Certification', value: 'ISO 9001:2015' },
]

const strengths = [
  { icon: 'verified', label: 'Domain Expertise' },
  { icon: 'groups', label: 'Experienced Workforce' },
  { icon: 'policy', label: 'Transparent Policies' },
  { icon: 'star', label: 'Best Featured Products' },
  { icon: 'workspace_premium', label: 'Unmatched Quality' },
  { icon: 'currency_rupee', label: 'Competitive Pricing' },
  { icon: 'local_shipping', label: 'Prompt Delivery' },
  { icon: 'thumb_up', label: 'Client Satisfaction' },
]

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary py-32 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url('/backgrounds/rice-field-hero.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-[1440px] mx-auto">
          <span className="section-label text-secondary-gold mb-4 block">{t('about.badge')}</span>
          <h1 className="font-grotesk font-bold text-4xl md:text-6xl text-white mb-6">{t('about.title')}</h1>
          <p className="font-manrope text-body-lg text-white/60 max-w-2xl">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-section bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="section-label text-primary mb-4 block">{t('about.story.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-primary mb-6">{t('about.story.title')}</h2>
            <div className="h-1 w-24 bg-secondary-gold mb-8" />
            <p className="font-manrope text-body-lg text-on-surface-variant leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('about.story.p1') }} />
            <p className="font-manrope text-body text-on-surface-variant/80 mb-6" dangerouslySetInnerHTML={{ __html: t('about.story.p2') }} />
            <p className="font-manrope text-body text-on-surface-variant/80" dangerouslySetInnerHTML={{ __html: t('about.story.p3') }} />
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="relative">
              <img
                src="/backgrounds/industrial-story.webp"
                alt="Krishi Vikas Udyog manufacturing"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary-gold p-8 shadow-xl hidden md:block">
                <div className="font-grotesk font-black text-5xl text-primary">40+</div>
                <div className="font-grotesk text-[10px] uppercase tracking-[0.2em] font-bold text-primary/70 mt-1">
                  Years of<br />Excellence
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Company Profile Table */}
      <section className="py-section bg-surface-low">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <ScrollReveal className="text-center mb-16">
            <span className="section-label text-primary mb-3 block">{t('about.profile.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-primary">{t('about.profile.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-outline-variant bg-white">
            {profile.map((item, i) => (
              <ScrollReveal key={item.label} delay={(i % 2) * 80}>
                <div className="flex items-center p-6 border-b border-r border-outline-variant/50 hover:bg-surface-low transition-colors">
                  <div className="w-1/2 font-grotesk text-label uppercase tracking-widest text-outline">{item.label}</div>
                  <div className="w-1/2 font-manrope text-body font-semibold text-primary">{item.value}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-section bg-white">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <ScrollReveal className="text-center mb-16">
            <span className="section-label text-primary mb-3 block">{t('about.timeline.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-primary">{t('about.timeline.title')}</h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 100}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="font-grotesk font-bold text-4xl text-secondary-gold mb-2">{item.year}</div>
                      <h3 className="font-grotesk font-semibold text-xl text-primary mb-2">{item.title}</h3>
                      <p className="font-manrope text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                    {/* Dot */}
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className="w-5 h-5 rounded-full bg-primary border-4 border-secondary-gold z-10" />
                    </div>
                    <div className="md:w-5/12" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-section bg-primary">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <ScrollReveal className="text-center mb-16">
            <span className="section-label text-secondary-gold mb-3 block">{t('about.strengths.badge')}</span>
            <h2 className="font-grotesk font-semibold text-h1 text-white">{t('about.strengths.title')}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {strengths.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 60}>
                <div className="group text-center p-6 border border-white/10 hover:border-secondary-gold hover:bg-white/5 transition-all duration-300">
                  <span className="material-symbols-outlined text-secondary-gold text-4xl mb-4 block">{s.icon}</span>
                  <div className="font-grotesk text-label uppercase tracking-widest text-white/80">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary-gold px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-grotesk font-bold text-2xl text-primary mb-1">{t('about.cta.title')}</h3>
            <p className="font-manrope text-sm text-primary/70">{t('about.cta.desc')}</p>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="bg-primary text-white px-8 py-3 font-grotesk text-label uppercase tracking-widest hover:bg-primary-light transition-all">
              {t('nav.contact')}
            </Link>
            <Link to="/products" className="border-2 border-primary text-primary px-8 py-3 font-grotesk text-label uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              {t('nav.products')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
