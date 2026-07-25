import { getMetafieldValue } from '@/lib/cosmic'
import { resolveIcon } from '@/lib/icons'
import SectionHeading from '@/components/SectionHeading'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { LandingPage, PainPointItem } from '@/types'

interface PainPointsProps {
  page: LandingPage | null
  whatsappNumber: string
  defaultMessage: string
}

const FALLBACK_ITEMS: PainPointItem[] = [
  {
    title: 'Bangun pagi, tapi rasanya belum tidur',
    description:
      'Alarm bunyi, badan masih berat. Kopi instan cuma nunda rasa lelahnya sampai jam sebelas.',
    icon: 'moon',
  },
  {
    title: 'Leher dan punggung kaku sepanjang hari',
    description:
      'Duduk delapan jam depan layar, ditambah macet. Pijat sebentar enak, besok kembali lagi.',
    icon: 'activity',
  },
  {
    title: 'Kepala penuh, fokus gampang bocor',
    description:
      'Kerjaan numpuk tapi otak susah diajak kerja sama. Baca satu paragraf, tiga kali balik lagi.',
    icon: 'brain',
  },
  {
    title: 'Energi habis sebelum sampai rumah',
    description:
      'Anak minta main, tapi tenaganya sudah tidak ada. Yang tersisa cuma niat.',
    icon: 'battery-low',
  },
]

export default function PainPoints({
  page,
  whatsappNumber,
  defaultMessage,
}: PainPointsProps) {
  const section = page?.metadata?.pain_points

  const eyebrow = getMetafieldValue(section?.eyebrow) || 'Kalau ini terasa familiar'
  const headline =
    getMetafieldValue(section?.headline) ||
    'Kamu tidak sakit. Tapi juga tidak benar-benar sehat.'
  const intro =
    getMetafieldValue(section?.intro) ||
    'Ini yang paling sering diceritakan orang saat pertama kali datang. Bukan keluhan besar — cuma rasa lelah yang tidak pernah benar-benar hilang.'

  const rawItems = Array.isArray(section?.items) ? section?.items : undefined
  const items: PainPointItem[] =
    rawItems && rawItems.length > 0 ? rawItems : FALLBACK_ITEMS

  const closing =
    getMetafieldValue(section?.closing) ||
    'Dibiarkan setahun dua tahun, badan mulai kompromi. Tidur makin pendek, sabar makin tipis, dan produktivitas turun perlahan tanpa disadari.'

  const ctaLabel = getMetafieldValue(section?.cta_label) || 'Cerita dulu, gratis'
  const ctaMessage =
    getMetafieldValue(section?.whatsapp_message) ||
    'Hai, saya sering merasa lelah dan pegal. Boleh cerita dulu sebelum booking?'

  return (
    <section className="bg-beige section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            headline={headline}
            intro={intro}
            align="center"
            maxWidth="max-w-3xl"
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-4">
          {items.map((item, index) => {
            if (!item) return null
            const Icon = resolveIcon(item.icon, index)
            const title = getMetafieldValue(item.title)
            const description = getMetafieldValue(item.description)
            if (!title && !description) return null

            return (
              <Reveal as="li" key={`${title}-${index}`} delay={index * 70}>
                <div className="card-surface group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:p-7">
                  <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-coffee-50 text-coffee-700 transition-colors duration-300 group-hover:bg-coffee-100">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  {title ? (
                    <h3 className="font-display text-[1.08rem] font-semibold leading-snug tracking-[-0.01em] text-forest-900">
                      {title}
                    </h3>
                  ) : null}
                  {description ? (
                    <p className="mt-2.5 text-[0.92rem] leading-[1.7] text-muted">
                      {description}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            )
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] border border-coffee-200/60 bg-white/70 p-7 text-center md:mt-14 md:p-9">
            <p className="mx-auto max-w-prose text-[1rem] leading-[1.8] text-forest-800 text-pretty md:text-[1.06rem]">
              {closing}
            </p>
            <div className="mt-7 flex justify-center">
              <WhatsAppButton
                number={whatsappNumber}
                message={ctaMessage || defaultMessage}
                label={ctaLabel}
                variant="primary"
                size="lg"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}