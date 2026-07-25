import type { Metadata } from 'next'
import './globals.css'
import { getLandingPage } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import CosmicBadge from '@/components/CosmicBadge'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLandingPage()
  const seo = page?.metadata?.seo
  const brand = getMetafieldValue(page?.metadata?.brand_name) || 'Bekam & Kopi'

  const title =
    getMetafieldValue(seo?.seo_title) ||
    `${brand} — Healthy Body. Calm Mind. Better Productivity.`
  const description =
    getMetafieldValue(seo?.seo_description) ||
    'Professional hijama (bekam) therapy and premium local coffee under one roof. Book a session or ask about our beans on WhatsApp.'
  const ogTitle = getMetafieldValue(seo?.og_title) || title
  const ogDescription = getMetafieldValue(seo?.og_description) || description
  const keywordsRaw = getMetafieldValue(seo?.keywords)
  const keywords = keywordsRaw
    ? keywordsRaw
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined

  const ogImage = seo?.og_image?.imgix_url
    ? `${seo.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : page?.metadata?.hero?.image?.imgix_url
      ? `${page.metadata.hero.image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      : undefined

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      siteName: brand,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="id">
      <head>
        {/* Emoji favicon */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#234e39" />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a6412449c05ffa1ada009dd"></script>
      </head>
      <body className="bg-cream font-sans antialiased">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}