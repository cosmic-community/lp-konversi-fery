import { getMetafieldValue } from '@/lib/cosmic'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { LandingPage } from '@/types'
import { ShieldCheck, Star } from 'lucide-react'

interface HeroProps {
  page: LandingPage | null
  whatsappNumber: string
  defaultMessage: string
}

export default function Hero({ page, whatsappNumber, defaultMessage }: HeroProps) {
  const hero = page?.metadata?.hero
  const brand = getMetafieldValue(page?.metadata?.brand_name) || 'Bekam & Kopi'

  const eyebrow =
    getMetafieldValue(hero?.eyebrow) || 'Healthy Body. Calm Mind. Better Productivity.'
  const headline =
    getMetafieldValue(hero?.headline) ||
    'Badan enteng lagi, kepala jernih lagi — tanpa harus libur seminggu.'
  const subheadline =
    getMetafieldValue(hero?.subheadline) ||
    'Terapi bekam yang ditangani dengan hati-hati, plus kopi lokal yang bikin pagi kamu jalan tanpa dipaksa. Dua hal sederhana, satu tempat.'
  const trustBadge =
    getMetafieldValue(hero?.trust_badge) ||
    'Alat sekali pakai · Terapis bersertifikat · Konsultasi dulu, gratis'
  const ctaLabel = getMetafieldValue(hero?.cta_label) || 'Chat via WhatsApp'
  const ctaMessage = getMetafieldValue(hero?.whatsapp_message) || defaultMessage
  const secondaryLabel =
    getMetafieldValue(hero?.secondary_cta_label) || 'Konsultasi dulu, belum booking'

  const image = hero?.image

  return (
    <section className="relative overflow-hidden bg-cream pt-8 md:pt-14">
      {/* soft ambient wash */}
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-forest-100/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-64 h-[22rem] w-[22rem] rounded-full bg-gold-100/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-10 pb-16 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <Reveal className="order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-forest-200/70 bg-white/70 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-forest-700">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
              {eyebrow}
            </p>

            <h1 className="mt-6 font-display text-[2.15rem] font-semibold leading-[1.1] tracking-[-0.03em] text-forest-900 text-balance sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem]">
              {headline}
            </h1>

            <p className="mt-6 max-w-prose text-[1.05rem] leading-[1.8] text-muted text-pretty md:text-[1.12rem]">
              {subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                number={whatsappNumber}
                message={ctaMessage}
                label={ctaLabel}
                variant="primary"
                size="xl"
                className="w-full sm:w-auto"
              />
              <WhatsAppButton
                number={whatsappNumber}
                message="Hai, saya belum mau booking dulu. Boleh tanya-tanya soal bekam?"
                label={secondaryLabel}
                variant="outline"
                size="xl"
                showIcon={false}
                className="w-full sm:w-auto"
              />
            </div>

            <div className="mt-9 flex items-start gap-3 rounded-2xl border border-forest-100 bg-white/80 px-4 py-3.5 shadow-soft">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-forest-600"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <p className="text-[0.88rem] leading-[1.6] text-forest-800">{trustBadge}</p>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal className="order-1 lg:order-2" delay={120}>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] bg-beige shadow-lift md:rounded-[2.5rem]">
                {image?.imgix_url ? (
                  <img
                    src={`${image.imgix_url}?w=1400&h=1500&fit=crop&crop=faces,entropy&auto=format,compress`}
                    alt={`Suasana di ${brand}`}
                    width={700}
                    height={750}
                    fetchPriority="high"
                    className="h-[22rem] w-full object-cover sm:h-[26rem] lg:h-[34rem]"
                  />
                ) : (
                  <div className="flex h-[22rem] w-full items-center justify-center bg-forest-800 sm:h-[26rem] lg:h-[34rem]">
                    <span className="font-display text-xl text-gold-300">{brand}</span>
                  </div>
                )}
              </div>

              {/* floating credibility chip */}
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-3 shadow-lift sm:left-6 md:-bottom-6">
                <div className="flex -space-x-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-[0.8rem] font-semibold leading-tight text-forest-900">
                    Dipercaya pekerja & orang tua
                  </p>
                  <p className="text-[0.72rem] leading-tight text-muted">
                    yang tidak punya waktu untuk sakit
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}