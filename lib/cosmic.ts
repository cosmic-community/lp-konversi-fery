import { createBucketClient } from '@cosmicjs/sdk'
import type { LandingPage, Offering, Testimonial } from '@/types'
import { hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

/**
 * Some legacy Cosmic metadata values come back as `{ key, value }` objects
 * instead of plain strings. Rendering those directly crashes React.
 * ALWAYS run metadata through this before putting it in JSX.
 */
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// ---------------------------------------------------------------------------
// Landing page
// ---------------------------------------------------------------------------

export async function getLandingPage(): Promise<LandingPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'landing-page' })
      .depth(1)

    const page = response.object as LandingPage | undefined
    if (!page) return null
    return page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching landing page:', error)
    return null
  }
}

// ---------------------------------------------------------------------------
// Offerings
// ---------------------------------------------------------------------------

export async function getOfferings(): Promise<Offering[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'offerings' })
      .props(['id', 'slug', 'title', 'type', 'content', 'metadata'])
      .depth(1)

    const offerings = (response.objects ?? []) as Offering[]

    // Manual sort — the SDK no longer exposes .sort()
    return [...offerings].sort((a, b) => {
      const orderA = Number(a.metadata?.display_order ?? 999)
      const orderB = Number(b.metadata?.display_order ?? 999)
      if (Number.isNaN(orderA) && Number.isNaN(orderB)) return 0
      if (Number.isNaN(orderA)) return 1
      if (Number.isNaN(orderB)) return -1
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching offerings:', error)
    return []
  }
}

export async function getOffering(slug: string): Promise<Offering | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'offerings', slug })
      .depth(1)

    const offering = response.object as Offering | undefined
    if (!offering) return null
    return offering
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching offering:', error)
    return null
  }
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'slug', 'title', 'type', 'content', 'metadata'])
      .depth(1)

    return (response.objects ?? []) as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching testimonials:', error)
    return []
  }
}