import { getLandingPage, getOfferings, getTestimonials } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PainPoints from '@/components/PainPoints'
import Solution from '@/components/Solution'
import ServiceSection from '@/components/ServiceSection'
import ProductSection from '@/components/ProductSection'
import SocialProof from '@/components/SocialProof'
import WhyChooseUs from '@/components/WhyChooseUs'
import FinalCta from '@/components/FinalCta'
import Footer from '@/components/Footer'
import MobileCtaBar from '@/components/MobileCtaBar'
import type { Offering } from '@/types'

function pickByKind(offerings: Offering[], keywords: string[]): Offering | null {
  for (const offering of offerings) {
    const kind = getMetafieldValue(offering.metadata?.kind).toLowerCase()
    const title = offering.title.toLowerCase()
    const haystack = `${kind} ${title}`
    if (keywords.some((k) => haystack.includes(k))) {
      return offering
    }
  }
  return null
}

export default async function HomePage() {
  const [page, offerings, testimonials] = await Promise.all([
    getLandingPage(),
    getOfferings(),
    getTestimonials(),
  ])

  const whatsappNumber = getMetafieldValue(page?.metadata?.whatsapp_number)
  const defaultMessage =
    getMetafieldValue(page?.metadata?.whatsapp_default_message) ||
    'Hai, saya mau tanya-tanya dulu soal bekam dan kopinya.'

  const bekam =
    pickByKind(offerings, ['therapy', 'bekam', 'hijama', 'terapi']) ??
    offerings[0] ??
    null

  const coffee =
    pickByKind(offerings, ['coffee', 'kopi', 'product']) ??
    offerings.find((o) => o.id !== bekam?.id) ??
    null

  return (
    <>
      <Header page={page} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />

      <main id="main">
        <Hero page={page} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />
        <PainPoints page={page} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />
        <Solution
          page={page}
          bekam={bekam}
          coffee={coffee}
          whatsappNumber={whatsappNumber}
          defaultMessage={defaultMessage}
        />
        {bekam && (
          <ServiceSection
            offering={bekam}
            whatsappNumber={whatsappNumber}
            defaultMessage={defaultMessage}
          />
        )}
        {coffee && (
          <ProductSection
            offering={coffee}
            whatsappNumber={whatsappNumber}
            defaultMessage={defaultMessage}
          />
        )}
        <SocialProof
          testimonials={testimonials}
          whatsappNumber={whatsappNumber}
          defaultMessage={defaultMessage}
        />
        <WhyChooseUs page={page} />
        <FinalCta page={page} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />
      </main>

      <Footer page={page} offerings={offerings} whatsappNumber={whatsappNumber} defaultMessage={defaultMessage} />
      <MobileCtaBar
        whatsappNumber={whatsappNumber}
        defaultMessage={defaultMessage}
        label={getMetafieldValue(page?.metadata?.header_cta_label) || 'Chat via WhatsApp'}
      />
    </>
  )
}