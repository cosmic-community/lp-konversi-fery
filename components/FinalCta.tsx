import { getMetafieldValue } from '@/lib/cosmic'
import WhatsAppButton from '@/components/WhatsAppButton'
import Reveal from '@/components/Reveal'
import type { LandingPage } from '@/types'
import { MessageCircle } from 'lucide-react'

interface FinalCtaProps {
  page: LandingPage | null
  whatsappNumber: string
  defaultMessage: string
}

export default function FinalCta({
  page,
  whatsappNumber,
  defaultMessage,
}: FinalCtaProps) {
  const section = page?.metadata?.final_cta

  const headline =
    getMetafieldValue(section?.headline) ||
    'Badan kamu sudah lama minta jeda. Mungkin hari ini waktunya didengar.'
  const paragraph =
    getMetafieldValue(section?.paragraph) ||
    'Tidak perlu langsung booking. Kirim pesan saja, ceritakan apa yang kamu rasakan, dan kita cari tahu bareng apa yang paling masuk untuk kamu. Kalau ternyata belum perlu bekam, kami akan bilang.'
  const ctaLabel = getMetafieldValue(section?.cta_label) || 'Chat via WhatsApp'
  const ctaMessage = getMetafieldValue(section?.whatsapp_message) || defaultMessage
  const reassurance =
    getMetafieldValue(section?.reassurance) ||
    'Dibalas jam 08.00–21.00 · Tanpa biaya konsultasi · Tidak ada paksaan'

  const image = section?.image

  return (
    <section className="relative overflow-hidden bg-forest-900 section-pad">
      {image?.imgix_url ? (
        <>
          <img
            src={`${image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt=""
            width={1000}
            height={600}
            loading="lazy"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-900/90 to-forest-950/95"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-forest-700/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-coffee-800/40 blur-3xl"
            aria-hidden="true"
          />
        </>
      )}

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              Satu pesan, itu saja
            </span>

            <h2 className="mt-7 font-display text-[2rem] font-semibold leading-[1.14] tracking-[-0.025em] text-white text-balance sm:text-[2.4rem] md:text-[2.9rem]">
              {headline}
            </h2>

            <p className="mx-auto mt-6 max-w-prose text-[1.02rem] leading-[1.8] text-forest-100/85 text-pretty md:text-[1.08rem]">
              {paragraph}
            </p>

            <div className="mt-10 flex justify-center">
              <WhatsAppButton
                number={whatsappNumber}
                message={ctaMessage}
                label={ctaLabel}
                variant="gold"
                size="xl"
                className="w-full max-w-sm sm:w-auto sm:min-w-[18rem]"
              />
            </div>

            {reassurance ? (
              <p className="mt-6 text-[0.85rem] leading-relaxed text-forest-200/70">
                {reassurance}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}