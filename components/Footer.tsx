import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import { buildWhatsAppLink, normalizeWhatsAppNumber } from '@/lib/whatsapp'
import type { LandingPage, Offering } from '@/types'

interface FooterProps {
  page: LandingPage | null
  offerings: Offering[]
  whatsappNumber: string
  defaultMessage: string
}

export default function Footer({
  page,
  offerings,
  whatsappNumber,
  defaultMessage,
}: FooterProps) {
  const brand = getMetafieldValue(page?.metadata?.brand_name) || 'Bekam & Kopi'
  const logo = page?.metadata?.logo
  const year = new Date().getFullYear()
  const href = buildWhatsAppLink(whatsappNumber, defaultMessage)
  const displayNumber = normalizeWhatsAppNumber(whatsappNumber)

  return (
    <footer className="border-t border-forest-100 bg-cream pb-28 pt-14 md:pb-14">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              {logo?.imgix_url ? (
                <img
                  src={`${logo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={brand}
                  width={36}
                  height={36}
                  loading="lazy"
                  className="h-9 w-9 rounded-xl object-cover"
                />
              ) : (
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-800 font-display text-sm font-semibold text-gold-300"
                  aria-hidden="true"
                >
                  {brand.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-forest-900">
                {brand}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[0.92rem] leading-[1.75] text-muted">
              Healthy Body. Calm Mind. Better Productivity. Terapi bekam profesional dan
              kopi lokal segar, di satu tempat.
            </p>
            {displayNumber ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-[0.92rem] font-semibold text-forest-700 underline decoration-forest-200 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-forest-900"
              >
                +{displayNumber}
              </a>
            ) : null}
          </div>

          <nav aria-label="Halaman">
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-coffee-600">
              Jelajahi
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-[0.92rem] text-muted transition-colors duration-200 hover:text-forest-800"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-[0.92rem] text-muted transition-colors duration-200 hover:text-forest-800"
                >
                  Cerita pelanggan
                </Link>
              </li>
              <li>
                <a
                  href="#solusi"
                  className="text-[0.92rem] text-muted transition-colors duration-200 hover:text-forest-800"
                >
                  Pendekatan kami
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Layanan">
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-coffee-600">
              Layanan & Produk
            </h3>
            <ul className="mt-4 space-y-2.5">
              {offerings.length > 0 ? (
                offerings.map((offering) => (
                  <li key={offering.id}>
                    <Link
                      href={`/offerings/${offering.slug}`}
                      className="text-[0.92rem] text-muted transition-colors duration-200 hover:text-forest-800"
                    >
                      {offering.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-[0.92rem] text-muted">Segera hadir</li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-forest-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.82rem] text-muted">
            © {year} {brand}. Semua hak dilindungi.
          </p>
          <p className="text-[0.82rem] text-muted">
            Bekam bukan pengganti pemeriksaan medis. Konsultasikan kondisi khusus dengan
            dokter kamu.
          </p>
        </div>
      </div>
    </footer>
  )
}