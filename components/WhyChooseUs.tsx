import { getMetafieldValue } from '@/lib/cosmic'
import { resolveIcon } from '@/lib/icons'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import type { LandingPage, WhyChooseItem } from '@/types'

interface WhyChooseUsProps {
  page: LandingPage | null
}

const FALLBACK_ITEMS: WhyChooseItem[] = [
  {
    title: 'Pengalaman yang sudah lama jalan',
    description:
      'Ratusan sesi setiap tahun, dari yang baru pertama sampai yang rutin bulanan.',
    icon: 'award',
  },
  {
    title: 'Terapis bersertifikat',
    description:
      'Pelatihan resmi, tahu titik mana yang aman dan mana yang perlu dihindari.',
    icon: 'badge-check',
  },
  {
    title: 'Alat sekali pakai, selalu',
    description:
      'Cup dan jarum baru untuk setiap orang. Dibuka di depan kamu, bukan di belakang.',
    icon: 'shield-check',
  },
  {
    title: 'Kopi yang kami minum sendiri',
    description:
      'Biji lokal pilihan, disangrai dalam batch kecil. Kalau kami tidak suka, tidak kami jual.',
    icon: 'coffee',
  },
  {
    title: 'Dijelaskan dulu, tidak didesak',
    description:
      'Boleh tanya sebanyak apa pun sebelum memutuskan. Tidak ada paket wajib.',
    icon: 'hand-heart',
  },
]

export default function WhyChooseUs({ page }: WhyChooseUsProps) {
  const section = page?.metadata?.why_choose_us

  const eyebrow = getMetafieldValue(section?.eyebrow) || 'Kenapa di sini'
  const headline =
    getMetafieldValue(section?.headline) ||
    'Lima hal yang kami pegang, setiap hari.'
  const intro =
    getMetafieldValue(section?.intro) ||
    'Tidak ada yang istimewa dari daftar ini. Tapi justru hal-hal dasar inilah yang paling sering dilewatkan.'

  const rawItems = Array.isArray(section?.items) ? section?.items : undefined
  const items: WhyChooseItem[] =
    rawItems && rawItems.length > 0 ? rawItems : FALLBACK_ITEMS

  return (
    <section className="bg-cream section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            headline={headline}
            intro={intro}
            align="center"
            maxWidth="max-w-2xl"
          />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-3">
          {items.map((item, index) => {
            if (!item) return null
            const title = getMetafieldValue(item.title)
            const description = getMetafieldValue(item.description)
            if (!title && !description) return null
            const Icon = resolveIcon(item.icon, index)

            return (
              <Reveal as="li" key={`${title}-${index}`} delay={index * 60}>
                <div className="card-surface group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:p-7">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-100">
                    <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.6} aria-hidden="true" />
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
      </div>
    </section>
  )
}