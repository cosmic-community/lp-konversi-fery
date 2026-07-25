import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import TestimonialCard from '@/components/TestimonialCard'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { Testimonial } from '@/types'
import { ArrowUpRight } from 'lucide-react'

interface SocialProofProps {
  testimonials: Testimonial[]
  whatsappNumber: string
  defaultMessage: string
}

export default function SocialProof({
  testimonials,
  whatsappNumber,
  defaultMessage,
}: SocialProofProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const featured = testimonials.find((t) => t.metadata?.highlight === true)
  const rest = featured
    ? testimonials.filter((t) => t.id !== featured.id)
    : testimonials

  const gridItems = featured ? rest.slice(0, 4) : rest.slice(0, 6)

  return (
    <section id="cerita" className="bg-beige section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Cerita pelanggan"
            headline="Bukan janji. Ini yang mereka rasakan sendiri."
            intro="Kami tidak minta orang menulis review bagus. Ini kalimat mereka apa adanya — sebelum dan sesudah datang."
            align="center"
            maxWidth="max-w-3xl"
          />
        </Reveal>

        <div className="mt-12 md:mt-14">
          {featured ? (
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <Reveal>
                <TestimonialCard testimonial={featured} featured />
              </Reveal>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {gridItems.slice(0, 2).map((testimonial, index) => (
                  <Reveal key={testimonial.id} delay={(index + 1) * 80}>
                    <TestimonialCard testimonial={testimonial} />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}

          {(featured ? gridItems.slice(2) : gridItems).length > 0 ? (
            <div
              className={[
                'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
                featured ? 'mt-5' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {(featured ? gridItems.slice(2) : gridItems).map((testimonial, index) => (
                <Reveal key={testimonial.id} delay={index * 80}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <WhatsAppButton
              number={whatsappNumber}
              message="Hai, saya baca cerita pelanggan lain. Saya juga mau coba — mulai dari mana?"
              label="Mulai dari sini"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            />
            {testimonials.length > (featured ? 5 : 6) ? (
              <Link
                href="/testimonials"
                className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-forest-200 bg-white px-5 py-3.5 text-[0.95rem] font-semibold text-forest-800 transition-colors duration-250 hover:border-forest-400 hover:bg-forest-50"
              >
                Baca semua cerita
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}