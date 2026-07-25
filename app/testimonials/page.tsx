import type { Metadata } from 'next'
import Link from 'next/link'
import { getLandingPage, getMetafieldValue, getOfferings, getTestimonials } from '@/lib/cosmic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TestimonialCard from '@/components/TestimonialCard'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import MobileCtaBar from '@/components/MobileCtaBar'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cerita Pelanggan',
  description:
    'Kalimat apa adanya dari orang-orang yang sudah mencoba terapi bekam dan kopi kami — sebelum dan sesudah.',
}

export default async function TestimonialsPage() {
  const [page, testimonials, offerings] = await Promise.all([
    getLandingPage(),
    getTestimonials(),
    getOfferings(),
  ])

  const whatsappNumber = getMetafieldValue(page?.metadata?.whatsapp_number)
  const defaultMessage =
    getMetafieldValue(page?.metadata?.whatsapp_default_message) ||
    'Hai, saya baca cerita pelanggan lain dan mau coba juga.'

  const featured = testimonials.filter((t) => t.metadata?.highlight === true)
  const rest = testimonials.filter((t) => t.metadata?.highlight !== true)

  return (
    <>
      <Header page={page} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />

      <main id="main">
        <section className="bg-cream pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="container-page">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-muted transition-colors duration-200 hover:text-forest-800"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              Kembali ke beranda
            </Link>

            <Reveal>
              <div className="mt-8 max-w-3xl">
                <p className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-coffee-600">
                  <span className="inline-block h-px w-6 bg-coffee-300" aria-hidden="true" />
                  Cerita pelanggan
                </p>
                <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.12] tracking-[-0.028em] text-forest-900 text-balance sm:text-[2.5rem] md:text-[2.9rem]">
                  Kami tidak menulis ini. Mereka yang cerita.
                </h1>
                <p className="mt-5 max-w-prose text-[1.02rem] leading-[1.8] text-muted text-pretty">
                  Tidak semua orang merasakan hal yang sama, dan itu wajar. Tapi pola yang
                  muncul biasanya mirip: badan lebih ringan, tidur lebih dalam, dan pagi
                  yang tidak lagi terasa berat.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-beige pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="container-page">
            {testimonials.length === 0 ? (
              <div className="card-surface mx-auto max-w-xl p-9 text-center">
                <h2 className="font-display text-[1.3rem] font-semibold text-forest-900">
                  Belum ada cerita di sini
                </h2>
                <p className="mt-3 text-[0.95rem] leading-[1.75] text-muted">
                  Cerita pelanggan akan muncul di halaman ini. Sementara itu, kamu bisa
                  bertanya langsung lewat WhatsApp.
                </p>
                <div className="mt-7 flex justify-center">
                  <WhatsAppButton
                    number={whatsappNumber}
                    message={defaultMessage}
                    label="Chat via WhatsApp"
                    variant="primary"
                    size="lg"
                  />
                </div>
              </div>
            ) : (
              <>
                {featured.length > 0 ? (
                  <div className="grid gap-5 lg:grid-cols-2">
                    {featured.map((testimonial, index) => (
                      <Reveal key={testimonial.id} delay={index * 80}>
                        <TestimonialCard testimonial={testimonial} featured />
                      </Reveal>
                    ))}
                  </div>
                ) : null}

                {rest.length > 0 ? (
                  <div
                    className={[
                      'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
                      featured.length > 0 ? 'mt-5' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {rest.map((testimonial, index) => (
                      <Reveal key={testimonial.id} delay={index * 60}>
                        <TestimonialCard testimonial={testimonial} />
                      </Reveal>
                    ))}
                  </div>
                ) : null}

                <Reveal delay={120}>
                  <div className="mt-14 rounded-[1.75rem] bg-forest-900 p-8 text-center md:p-12">
                    <h2 className="mx-auto max-w-2xl font-display text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.02em] text-white text-balance md:text-[2rem]">
                      Cerita kamu bisa jadi yang berikutnya.
                    </h2>
                    <p className="mx-auto mt-4 max-w-prose text-[0.98rem] leading-[1.8] text-forest-100/85">
                      Tidak perlu langsung booking. Kirim pesan, ceritakan apa yang kamu
                      rasakan, dan kita lihat apa yang paling masuk.
                    </p>
                    <div className="mt-8 flex justify-center">
                      <WhatsAppButton
                        number={whatsappNumber}
                        message={defaultMessage}
                        label="Chat via WhatsApp"
                        variant="gold"
                        size="xl"
                        className="w-full max-w-sm sm:w-auto"
                      />
                    </div>
                  </div>
                </Reveal>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer
        page={page}
        offerings={offerings}
        whatsappNumber={whatsappNumber}
        defaultMessage={defaultMessage}
      />
      <MobileCtaBar
        whatsappNumber={whatsappNumber}
        defaultMessage={defaultMessage}
        label="Chat via WhatsApp"
      />
    </>
  )
}