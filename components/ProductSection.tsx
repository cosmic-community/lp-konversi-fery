import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import { resolveIcon } from '@/lib/icons'
import SectionHeading from '@/components/SectionHeading'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { BenefitItem, Offering } from '@/types'
import { ArrowUpRight, Flame, MountainSnow, Sparkles } from 'lucide-react'

interface ProductSectionProps {
  offering: Offering
  whatsappNumber: string
  defaultMessage: string
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

export default function ProductSection({
  offering,
  whatsappNumber,
  defaultMessage,
}: ProductSectionProps) {
  const meta = offering.metadata ?? {}

  const eyebrow = getMetafieldValue(meta.eyebrow) || 'Kopi Lokal'
  const headline = getMetafieldValue(meta.headline) || offering.title
  const summary =
    getMetafieldValue(meta.summary) ||
    'Biji lokal, disangrai dalam jumlah kecil, dikirim segar. Cukup untuk membuat pagi terasa lebih pelan.'
  const description = getMetafieldValue(meta.description)

  const benefits = normalizeBenefits(meta.benefits)
  const flavor = getMetafieldValue(meta.flavor_notes)
  const origin = getMetafieldValue(meta.origin)
  const roast = getMetafieldValue(meta.roast_profile)
  const priceNote = getMetafieldValue(meta.price_note)

  const ctaLabel = getMetafieldValue(meta.cta_label) || 'Tanya soal kopinya'
  const ctaMessage =
    getMetafieldValue(meta.whatsapp_message) ||
    `Hai, saya mau tanya soal ${offering.title}. Masih ada stok?`

  const image = meta.image
  const gallery = Array.isArray(meta.gallery) ? meta.gallery.slice(0, 3) : []

  const specs = [
    { label: 'Flavor', value: flavor, Icon: Sparkles },
    { label: 'Origin', value: origin, Icon: MountainSnow },
    { label: 'Roast', value: roast, Icon: Flame },
  ].filter((spec) => Boolean(spec.value))

  return (
    <section id="kopi" className="bg-cream section-pad">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          {/* Copy */}
          <Reveal>
            <SectionHeading eyebrow={eyebrow} headline={headline} intro={summary} />

            {description ? (
              <div
                className="rich-text mt-6 max-w-prose text-[0.98rem] text-muted"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}

            {specs.length > 0 ? (
              <dl className="mt-9 grid gap-3 sm:grid-cols-3">
                {specs.map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-coffee-200/60 bg-coffee-50/50 p-5"
                  >
                    <dt className="inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-coffee-700">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-2 text-[0.92rem] leading-[1.6] text-coffee-950">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {benefits.length > 0 ? (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => {
                  const title = getMetafieldValue(benefit.title)
                  const desc = getMetafieldValue(benefit.description)
                  if (!title && !desc) return null
                  const Icon = resolveIcon(benefit.icon, index + 2)

                  return (
                    <li
                      key={`${title}-${index}`}
                      className="flex gap-3 rounded-2xl border border-coffee-100 bg-white p-4 transition-shadow duration-250 hover:shadow-soft"
                    >
                      <Icon
                        className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-coffee-600"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <div>
                        {title ? (
                          <p className="text-[0.93rem] font-semibold leading-snug text-forest-900">
                            {title}
                          </p>
                        ) : null}
                        {desc ? (
                          <p className="mt-1 text-[0.86rem] leading-[1.6] text-muted">
                            {desc}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : null}

            {priceNote ? (
              <p className="mt-8 rounded-2xl bg-beige px-5 py-4 text-[0.9rem] leading-[1.65] text-coffee-900">
                {priceNote}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                number={whatsappNumber}
                message={ctaMessage || defaultMessage}
                label={ctaLabel}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              />
              <Link
                href={`/offerings/${offering.slug}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-coffee-200 bg-white px-5 py-3.5 text-[0.95rem] font-semibold text-coffee-800 transition-colors duration-250 hover:border-coffee-400 hover:bg-coffee-50"
              >
                Lihat detail kopi
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Imagery */}
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-[1.75rem] bg-coffee-900 shadow-lift md:rounded-[2rem]">
              {image?.imgix_url ? (
                <img
                  src={`${image.imgix_url}?w=1300&h=1200&fit=crop&auto=format,compress`}
                  alt={headline}
                  width={650}
                  height={600}
                  loading="lazy"
                  className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
                />
              ) : (
                <div className="flex h-64 items-center justify-center sm:h-80 lg:h-[26rem]">
                  <span className="font-display text-lg text-gold-300">
                    {offering.title}
                  </span>
                </div>
              )}
            </div>

            {gallery.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {gallery.map((item, index) => {
                  const url = item?.imgix_url
                  if (!url) return null
                  return (
                    <div
                      key={`${url}-${index}`}
                      className="overflow-hidden rounded-2xl bg-beige"
                    >
                      <img
                        src={`${url}?w=520&h=520&fit=crop&auto=format,compress`}
                        alt=""
                        width={260}
                        height={260}
                        loading="lazy"
                        className="aspect-square w-full object-cover transition-transform duration-350 hover:scale-[1.03]"
                      />
                    </div>
                  )
                })}
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  )
}