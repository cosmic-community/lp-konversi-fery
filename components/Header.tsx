'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import type { LandingPage } from '@/types'

interface HeaderProps {
  page: LandingPage | null
  whatsappNumber: string
  defaultMessage: string
}

export default function Header({ page, whatsappNumber, defaultMessage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const brand = getMetafieldValue(page?.metadata?.brand_name) || 'Bekam & Kopi'
  const logo = page?.metadata?.logo
  const ctaLabel =
    getMetafieldValue(page?.metadata?.header_cta_label) || 'Chat via WhatsApp'
  const href = buildWhatsAppLink(whatsappNumber, defaultMessage)

  return (
    <header
      className={[
        'sticky top-0 z-40 transition-all duration-300 ease-out',
        scrolled
          ? 'border-b border-forest-100/80 bg-cream/90 backdrop-blur-md'
          : 'border-b border-transparent bg-cream',
      ].join(' ')}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Lewati ke konten
      </a>

      <div className="container-page">
        <div
          className={[
            'flex items-center justify-between transition-all duration-300',
            scrolled ? 'py-3' : 'py-4 md:py-5',
          ].join(' ')}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
          >
            {logo?.imgix_url ? (
              <img
                src={`${logo.imgix_url}?w=112&h=112&fit=crop&auto=format,compress`}
                alt={brand}
                width={40}
                height={40}
                className="h-9 w-9 rounded-xl object-cover md:h-10 md:w-10"
              />
            ) : (
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-800 font-display text-base font-semibold text-gold-300 md:h-10 md:w-10"
                aria-hidden="true"
              >
                {brand.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-forest-900 md:text-lg">
              {brand}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
            <a
              href="#bekam"
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-forest-800"
            >
              Terapi Bekam
            </a>
            <a
              href="#kopi"
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-forest-800"
            >
              Kopi
            </a>
            <a
              href="#cerita"
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-forest-800"
            >
              Cerita Pelanggan
            </a>
          </nav>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-250 hover:bg-forest-800 hover:shadow-lift active:scale-[0.985] md:px-5 md:py-3"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            >
              <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411l.015.011zm-8.475 18.29h-.005a9.87 9.87 0 0 1-5.032-1.378l-.36-.214-3.741.98.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.457-9.884 9.934-9.884 2.652 0 5.145 1.035 7.021 2.913a9.83 9.83 0 0 1 2.909 7.001c-.003 5.45-4.458 9.864-9.98 9.864z" />
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.13-.13.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span className="hidden sm:inline">{ctaLabel}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  )
}