import { getMetafieldValue } from '@/lib/cosmic'
import { resolveIcon } from '@/lib/icons'
import SectionHeading from '@/components/SectionHeading'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { LandingPage, Offering, SolutionPillar } from '@/types'
import { ArrowRight } from 'lucide-react'

interface SolutionProps {
  page: LandingPage | null
  bekam: Offering | null
  coffee: Offering | null
  whatsappNumber: string
  defaultMessage: string
}

const FALLBACK_PILLARS: SolutionPillar[] = [
  {
    title: 'Bereskan dulu yang menumpuk',
    description:
      'Bekam bekerja di titik-titik yang tegang: melancarkan peredaran darah, mengurangi kaku otot, dan membantu badan pulih lebih cepat.',
    icon: 'droplets',
  },
  {
    title: 'Lalu jaga ritmenya tiap hari',
    description:
      'Kopi lokal yang kami roasting sendiri jadi rutinitas kecil pagi — energi yang naik pelan, bukan meledak lalu drop.',
    icon: 'coffee',
  },
  {
    title: 'Hasilnya menumpuk, bukan sesaat',
    description:
      'Tidur lebih dalam, kepala lebih jernih, dan tenaga yang cukup sampai malam. Bukan instan, tapi terasa.',
    icon: 'trending-up',
  },
]

export default function Solution({
  page,
  bekam,
  coffee,
  whatsappNumber,
  defaultMessage,
}: SolutionProps) {
  const section = page?.metadata?.solution

  const eyebrow = getMetafieldValue(section?.eyebrow) || 'Pendekatan kami'
  const headline =
    getMetafieldValue(section?.headline) ||
    'Satu kali terapi meringankan. Kebiasaan harian yang menjaganya.'
  const body =
    getMetafieldValue(section?.body) ||
    'Kami tidak percaya solusi tunggal. Badan yang lelah butuh dua hal: sesuatu untuk melepas yang sudah menumpuk, dan sesuatu untuk menjaga ritmenya sehari-hari. Itu sebabnya bekam dan kopi ada di tempat yang sama.'

  const rawPillars = Array.isArray(section?.pillars) ? section?.pillars : undefined
  const pillars: SolutionPillar[] =
    rawPillars && rawPillars.length > 0 ? rawPillars : FALLBACK_PILLARS

  const synergyTitle =
    getMetafieldValue(section?.synergy_title) || 'Kenapa bekam dan kopi saling melengkapi'
  const synergyBody =
    getMetafieldValue(section?.synergy_body) ||
    'Bekam mengurus pemulihan — hal yang butuh waktu tenang dan penanganan profesional. Kopi mengurus konsistensi — ritual kecil yang kamu ulang setiap hari tanpa perlu diingatkan. Yang satu membersihkan, yang satu menjaga.'

  const image = section?.image
  const ctaLabel = getMetafieldValue(section?.cta_label) || 'Tanya mana yang cocok'
  const ctaMessage =
    getMetafieldValue(section?.whatsapp_message) ||
    'Hai, saya bingung mulai dari mana — bekam dulu atau kopi dulu?'

  return (
    <section id="solusi" className="bg-cream section-pad">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} headline={headline} intro={body} />

            <div className="mt-9 overflow-hidden rounded-[1.75rem] bg-beige shadow-soft">
              {image?.imgix_url ? (
                <img
                  src={`${image.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                  alt={synergyTitle}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-56 w-full object-cover sm:h-72"
                />
              ) : (
                <div className="grid h-56 grid-cols-2 sm:h-72">
                  {[bekam?.metadata?.image, coffee?.metadata?.image].map((img, i) =>
                    img?.imgix_url ? (
                      <img
                        key={i}
                        src={`${img.imgix_url}?w=700&h=900&fit=crop&auto=format,compress`}
                        alt=""
                        width={350}
                        height={450}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        key={i}
                        className={i === 0 ? 'bg-forest-800' : 'bg-coffee-800'}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ul className="space-y-4">
              {pillars.map((pillar, index) => {
                if (!pillar) return null
                const Icon = resolveIcon(pillar.icon, index)
                const title = getMetafieldValue(pillar.title)
                const description = getMetafieldValue(pillar.description)
                if (!title && !description) return null

                return (
                  <li
                    key={`${title}-${index}`}
                    className="card-surface flex gap-4 p-6 transition-all duration-300 hover:shadow-lift md:gap-5 md:p-7"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      {title ? (
                        <h3 className="font-display text-[1.08rem] font-semibold leading-snug text-forest-900">
                          {title}
                        </h3>
                      ) : null}
                      {description ? (
                        <p className="mt-2 text-[0.94rem] leading-[1.72] text-muted">
                          {description}
                        </p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 rounded-[1.75rem] bg-forest-900 p-7 text-white md:p-9">
              <h3 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.01em] text-gold-200 md:text-[1.35rem]">
                {synergyTitle}
              </h3>
              <p className="mt-4 text-[0.97rem] leading-[1.8] text-forest-100/85 text-pretty">
                {synergyBody}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <WhatsAppButton
                  number={whatsappNumber}
                  message={ctaMessage || defaultMessage}
                  label={ctaLabel}
                  variant="gold"
                  size="lg"
                />
                <a
                  href="#bekam"
                  className="inline-flex items-center gap-1.5 rounded-2xl px-3 py-2 text-sm font-semibold text-forest-100 transition-colors duration-200 hover:text-white"
                >
                  Lihat detail terapi
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}