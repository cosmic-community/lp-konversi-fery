import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import { resolveIcon } from '@/lib/icons'
import SectionHeading from '@/components/SectionHeading'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { BenefitItem, Offering, ProcessStep } from '@/types'
import { ArrowUpRight, Clock, ShieldCheck } from 'lucide-react'

interface ServiceSectionProps {
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

export default function ServiceSection({
  offering,
  whatsappNumber,
  defaultMessage,
}: ServiceSectionProps) {
  const meta = offering.metadata ?? {}

  const eyebrow = getMetafieldValue(meta.eyebrow) || 'Terapi Bekam / Hijama'
  const headline = getMetafieldValue(meta.headline) || offering.title
  const summary =
    getMetafieldValue(meta.summary) ||
    'Ditangani dengan tenang, alat sekali pakai, dan penjelasan sebelum apa pun dimulai.'
  const description = getMetafieldValue(meta.description)

  const benefits = normalizeBenefits(meta.benefits)
  const steps = normalizeSteps(meta.process_steps)
  const duration = getMetafieldValue(meta.duration)
  const safety = getMetafieldValue(meta.safety_notes)
  const priceNote = getMetafieldValue(meta.price_note)

  const ctaLabel = getMetafieldValue(meta.cta_label) || 'Booking bekam sekarang'
  const ctaMessage =
    getMetafieldValue(meta.whatsapp_message) ||
    `Hai, saya mau booking ${offering.title}. Jadwal yang kosong kapan ya?`

  const image = meta.image

  return (
    <section id="bekam" className="bg-beige section-pad">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          {/* Left: image + facts */}
          <Reveal>
            <div className="overflow-hidden rounded-[1.75rem] bg-forest-900 shadow-lift md:rounded-[2rem]">
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

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {duration ? (
                <div className="card-surface p-5">
                  <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-coffee-600">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                    Durasi
                  </span>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.65] text-forest-900">
                    {duration}
                  </p>
                </div>
              ) : null}

              {safety ? (
                <div className="card-surface p-5">
                  <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-coffee-600">
                    <ShieldCheck
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    Keamanan
                  </span>
                  <p className="mt-2.5 text-[0.95rem] leading-[1.65] text-forest-900">
                    {safety}
                  </p>
                </div>
              ) : null}
            </div>
          </Reveal>

          {/* Right: content */}
          <Reveal delay={100}>
            <SectionHeading eyebrow={eyebrow} headline={headline} intro={summary} />

            {description ? (
              <div
                className="rich-text mt-6 max-w-prose text-[0.98rem] text-muted"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}

            {benefits.length > 0 ? (
              <div className="mt-9">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-coffee-600">
                  Yang biasanya dirasakan
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit, index) => {
                    const title = getMetafieldValue(benefit.title)
                    const desc = getMetafieldValue(benefit.description)
                    if (!title && !desc) return null
                    const Icon = resolveIcon(benefit.icon, index)

                    return (
                      <li
                        key={`${title}-${index}`}
                        className="flex gap-3 rounded-2xl border border-forest-100 bg-white p-4 transition-shadow duration-250 hover:shadow-soft"
                      >
                        <Icon
                          className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-forest-600"
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
              </div>
            ) : null}

            {steps.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-coffee-600">
                  Prosesnya seperti ini
                </h3>
                <ol className="mt-5 space-y-4">
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
                            <p className="text-[0.96rem] font-semibold leading-snug text-forest-900">
                              {title}
                              {stepDuration ? (
                                <span className="ml-2 text-[0.78rem] font-normal text-muted">
                                  · {stepDuration}
                                </span>
                              ) : null}
                            </p>
                          ) : null}
                          {desc ? (
                            <p className="mt-1.5 text-[0.9rem] leading-[1.7] text-muted">
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

            {priceNote ? (
              <p className="mt-9 rounded-2xl bg-white px-5 py-4 text-[0.9rem] leading-[1.65] text-forest-800 shadow-soft">
                {priceNote}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppButton
                number={whatsappNumber}
                message={ctaMessage || defaultMessage}
                label={ctaLabel}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              />
              <Link
                href={`/offerings/${offering.slug}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-forest-200 bg-white px-5 py-3.5 text-[0.95rem] font-semibold text-forest-800 transition-colors duration-250 hover:border-forest-400 hover:bg-forest-50"
              >
                Baca detail lengkap
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}