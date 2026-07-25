// app/offerings/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getLandingPage,
  getMetafieldValue,
  getOffering,
  getOfferings,
  getTestimonials,
} from '@/lib/cosmic'
import { resolveIcon } from '@/lib/icons'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import TestimonialCard from '@/components/TestimonialCard'
import Reveal from '@/components/Reveal'
import MobileCtaBar from '@/components/MobileCtaBar'
import type { BenefitItem, ProcessStep, Testimonial } from '@/types'
import { ArrowLeft, Clock, Flame, MountainSnow, ShieldCheck, Sparkles } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const offering = await getOffering(slug)

  if (!offering) {
    return { title: 'Halaman tidak ditemukan' }
  }

  const title = getMetafieldValue(offering.metadata?.headline) || offering.title
  const description =
    getMetafieldValue(offering.metadata?.summary) ||
    `Informasi lengkap tentang ${offering.title}.`
  const image = offering.metadata?.image?.imgix_url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [{ url: `${image}?w=1200&h=630&fit=crop&auto=format,compress`, width: 1200, height: 630 }]
        : undefined,
    },
  }
}

function normalizeBenefits(raw: unknown): BenefitItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item): BenefitItem | null => {
      if (typeof item === 'string') return { title: item }
      if (item && typeof item === 'object') return item as BenefitItem
      return null
    })
    .filter((item): item is BenefitItem => item !== null)
}

function normalizeSteps(raw: unknown): ProcessStep[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item): ProcessStep | null => {
      if (typeof item === 'string') return { title: item }
      if (item && typeof item === 'object') return item as ProcessStep
      return null
    })
    .filter((item): item is ProcessStep => item !== null)
}

function relatedTestimonials(
  testimonials: Testimonial[],
  offeringId: string
): Testimonial[] {
  return testimonials.filter((t) => {
    const related = t.metadata?.related_offering
    if (!related) return false
    if (typeof related === 'string') return related === offeringId
    if (typeof related === 'object' && 'id' in related) {
      return (related as { id?: string }).id === offeringId
    }
    return false
  })
}

export default async function OfferingPage({ params }: PageProps) {
  const { slug } = await params

  const [offering, page, allOfferings, testimonials] = await Promise.all([
    getOffering(slug),
    getLandingPage(),
    getOfferings(),
    getTestimonials(),
  ])

  if (!offering) {
    notFound()
  }

  const whatsappNumber = getMetafieldValue(page?.metadata?.whatsapp_number)
  const defaultMessage =
    getMetafieldValue(page?.metadata?.whatsapp_default_message) ||
    'Hai, saya mau tanya-tanya dulu.'

  const meta = offering.metadata ?? {}
  const kind = getMetafieldValue(meta.kind)
  const isCoffee = /coffee|kopi|product/i.test(`${kind} ${offering.title}`)

  const eyebrow = getMetafieldValue(meta.eyebrow) || kind || 'Detail'
  const headline = getMetafieldValue(meta.headline) || offering.title
  const summary = getMetafieldValue(meta.summary)
  const description = getMetafieldValue(meta.description) || offering.content || ''

  const benefits = normalizeBenefits(meta.benefits)
  const steps = normalizeSteps(meta.process_steps)
  const duration = getMetafieldValue(meta.duration)
  const safety = getMetafieldValue(meta.safety_notes)
  const flavor = getMetafieldValue(meta.flavor_notes)
  const origin = getMetafieldValue(meta.origin)
  const roast = getMetafieldValue(meta.roast_profile)
  const priceNote = getMetafieldValue(meta.price_note)

  const ctaLabel =
    getMetafieldValue(meta.cta_label) ||
    (isCoffee ? 'Tanya soal kopinya' : 'Booking sekarang')
  const ctaMessage =
    getMetafieldValue(meta.whatsapp_message) ||
    `Hai, saya mau tanya soal ${offering.title}.`

  const image = meta.image
  const gallery = Array.isArray(meta.gallery) ? meta.gallery : []

  const facts = [
    { label: 'Durasi', value: duration, Icon: Clock },
    { label: 'Keamanan', value: safety, Icon: ShieldCheck },
    { label: 'Flavor', value: flavor, Icon: Sparkles },
    { label: 'Origin', value: origin, Icon: MountainSnow },
    { label: 'Roast', value: roast, Icon: Flame },
  ].filter((f) => Boolean(f.value))

  const stories = relatedTestimonials(testimonials, offering.id)
  const others = allOfferings.filter((o) => o.id !== offering.id)

  return (
    <>
      <Header page={page} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />

      <main id="main">
        {/* Hero */}
        <section className={isCoffee ? 'bg-beige pt-10 pb-14 md:pt-14 md:pb-20' : 'bg-cream pt-10 pb-14 md:pt-14 md:pb-20'}>
          <div className="container-page">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-muted transition-colors duration-200 hover:text-forest-800"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              Kembali ke beranda
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-coffee-200/70 bg-white/70 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-coffee-700">
                  {eyebrow}
                </p>
                <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.028em] text-forest-900 text-balance sm:text-[2.5rem] md:text-[2.9rem]">
                  {headline}
                </h1>
                {summary ? (
                  <p className="mt-5 max-w-prose text-[1.02rem] leading-[1.8] text-muted text-pretty">
                    {summary}
                  </p>
                ) : null}

                <div className="mt-8">
                  <WhatsAppButton
                    number={whatsappNumber}
                    message={ctaMessage}
                    label={ctaLabel}
                    variant={isCoffee ? 'secondary' : 'primary'}
                    size="xl"
                    className="w-full sm:w-auto"
                  />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div
                  className={[
                    'overflow-hidden rounded-[1.75rem] shadow-lift md:rounded-[2rem]',
                    isCoffee ? 'bg-coffee-900' : 'bg-forest-900',
                  ].join(' ')}
                >
                  {image?.imgix_url ? (
                    <img
                      src={`${image.imgix_url}?w=1400&h=1200&fit=crop&auto=format,compress`}
                      alt={headline}
                      width={700}
                      height={600}
                      fetchPriority="high"
                      className="h-64 w-full object-cover sm:h-80 lg:h-[28rem]"
                    />
                  ) : (
                    <div className="flex h-64 items-center justify-center sm:h-80 lg:h-[28rem]">
                      <span className="font-display text-lg text-gold-300">
                        {offering.title}
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Facts */}
        {facts.length > 0 ? (
          <section className={isCoffee ? 'bg-cream py-12 md:py-16' : 'bg-beige py-12 md:py-16'}>
            <div className="container-page">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {facts.map(({ label, value, Icon }, index) => (
                  <Reveal key={label} delay={index * 60}>
                    <div className="card-surface h-full p-6">
                      <span className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-coffee-600">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                        {label}
                      </span>
                      <p className="mt-3 text-[0.95rem] leading-[1.7] text-forest-900">
                        {value}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Body + benefits + process */}
        <section className={isCoffee ? 'bg-beige section-pad' : 'bg-cream section-pad'}>
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <Reveal>
                {description ? (
                  <div
                    className="rich-text max-w-prose text-[1rem] text-muted"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                ) : (
                  <p className="text-[1rem] leading-[1.8] text-muted">
                    Hubungi kami lewat WhatsApp untuk penjelasan lengkap dan jadwal yang
                    tersedia.
                  </p>
                )}

                {steps.length > 0 ? (
                  <div className="mt-12">
                    <h2 className="font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-forest-900 md:text-[1.6rem]">
                      Prosesnya
                    </h2>
                    <ol className="mt-6 space-y-5">
                      {steps.map((step, index) => {
                        const title = getMetafieldValue(step.title)
                        const desc = getMetafieldValue(step.description)
                        const stepDuration = getMetafieldValue(step.duration)
                        if (!title && !desc) return null

                        return (
                          <li key={`${title}-${index}`} className="flex gap-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-800 text-[0.78rem] font-semibold text-gold-200">
                              {index + 1}
                            </span>
                            <div className="pt-0.5">
                              {title ? (
                                <p className="text-[1rem] font-semibold leading-snug text-forest-900">
                                  {title}
                                  {stepDuration ? (
                                    <span className="ml-2 text-[0.78rem] font-normal text-muted">
                                      · {stepDuration}
                                    </span>
                                  ) : null}
                                </p>
                              ) : null}
                              {desc ? (
                                <p className="mt-1.5 text-[0.93rem] leading-[1.75] text-muted">
                                  {desc}
                                </p>
                              ) : null}
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                ) : null}
              </Reveal>

              <Reveal delay={100}>
                {benefits.length > 0 ? (
                  <div>
                    <h2 className="font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-forest-900 md:text-[1.6rem]">
                      Yang biasanya dirasakan
                    </h2>
                    <ul className="mt-6 space-y-3">
                      {benefits.map((benefit, index) => {
                        const title = getMetafieldValue(benefit.title)
                        const desc = getMetafieldValue(benefit.description)
                        if (!title && !desc) return null
                        const Icon = resolveIcon(benefit.icon, index)

                        return (
                          <li
                            key={`${title}-${index}`}
                            className="card-surface flex gap-3.5 p-5"
                          >
                            <Icon
                              className="mt-0.5 h-[1.2rem] w-[1.2rem] shrink-0 text-forest-600"
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />
                            <div>
                              {title ? (
                                <p className="text-[0.95rem] font-semibold leading-snug text-forest-900">
                                  {title}
                                </p>
                              ) : null}
                              {desc ? (
                                <p className="mt-1.5 text-[0.88rem] leading-[1.65] text-muted">
                                  {desc}
                                </p>
                              ) : null}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null}

                {priceNote ? (
                  <p className="mt-6 rounded-2xl bg-white px-5 py-4 text-[0.9rem] leading-[1.7] text-forest-800 shadow-soft">
                    {priceNote}
                  </p>
                ) : null}

                <div className="mt-8 rounded-[1.75rem] bg-forest-900 p-7 text-white">
                  <h3 className="font-display text-[1.15rem] font-semibold text-gold-200">
                    Masih ragu?
                  </h3>
                  <p className="mt-3 text-[0.93rem] leading-[1.75] text-forest-100/85">
                    Kirim pesan dulu. Ceritakan keluhannya, dan kami bantu cari tahu apakah
                    ini memang yang kamu butuhkan.
                  </p>
                  <div className="mt-6">
                    <WhatsAppButton
                      number={whatsappNumber}
                      message="Hai, saya mau konsultasi dulu sebelum booking."
                      label="Konsultasi dulu"
                      variant="gold"
                      size="lg"
                      fullWidth
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Gallery */}
            {gallery.length > 0 ? (
              <Reveal delay={80}>
                <div className="mt-16">
                  <h2 className="font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-forest-900 md:text-[1.6rem]">
                    Suasananya
                  </h2>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
                    {gallery.map((item, index) => {
                      const url = item?.imgix_url
                      if (!url) return null
                      return (
                        <div
                          key={`${url}-${index}`}
                          className="overflow-hidden rounded-2xl bg-white shadow-soft"
                        >
                          <img
                            src={`${url}?w=700&h=700&fit=crop&auto=format,compress`}
                            alt=""
                            width={350}
                            height={350}
                            loading="lazy"
                            className="aspect-square w-full object-cover transition-transform duration-350 hover:scale-[1.04]"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* Related stories */}
        {stories.length > 0 ? (
          <section className={isCoffee ? 'bg-cream section-pad' : 'bg-beige section-pad'}>
            <div className="container-page">
              <Reveal>
                <h2 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-forest-900 md:text-[2rem]">
                  Cerita dari yang sudah mencoba
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stories.slice(0, 6).map((testimonial, index) => (
                  <Reveal key={testimonial.id} delay={index * 70}>
                    <TestimonialCard testimonial={testimonial} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Other offerings */}
        {others.length > 0 ? (
          <section className={isCoffee ? 'bg-beige section-pad' : 'bg-cream section-pad'}>
            <div className="container-page">
              <Reveal>
                <h2 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-forest-900 md:text-[2rem]">
                  Yang lain di tempat kami
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {others.map((other, index) => {
                  const otherImage = other.metadata?.image
                  const otherSummary = getMetafieldValue(other.metadata?.summary)
                  return (
                    <Reveal key={other.id} delay={index * 80}>
                      <Link
                        href={`/offerings/${other.slug}`}
                        className="card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                      >
                        {otherImage?.imgix_url ? (
                          <img
                            src={`${otherImage.imgix_url}?w=900&h=560&fit=crop&auto=format,compress`}
                            alt={other.title}
                            width={450}
                            height={280}
                            loading="lazy"
                            className="h-44 w-full object-cover sm:h-48"
                          />
                        ) : null}
                        <div className="p-6">
                          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-coffee-600">
                            {getMetafieldValue(other.metadata?.kind) || 'Lainnya'}
                          </p>
                          <h3 className="mt-2.5 font-display text-[1.15rem] font-semibold leading-snug text-forest-900">
                            {other.title}
                          </h3>
                          {otherSummary ? (
                            <p className="mt-2.5 text-[0.92rem] leading-[1.7] text-muted">
                              {otherSummary}
                            </p>
                          ) : null}
                          <span className="mt-4 inline-block text-[0.88rem] font-semibold text-forest-700 transition-colors duration-200 group-hover:text-forest-900">
                            Lihat detail →
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer
        page={page}
        offerings={allOfferings}
        whatsappNumber={whatsappNumber}
        defaultMessage={defaultMessage}
      />
      <MobileCtaBar
        whatsappNumber={whatsappNumber}
        defaultMessage={ctaMessage || defaultMessage}
        label={ctaLabel}
      />
    </>
  )
}