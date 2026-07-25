import { getMetafieldValue } from '@/lib/cosmic'

/**
 * Normalise a phone number into the digits-only format wa.me expects.
 * Accepts "+62 812-3456-7890", "0812 3456 7890", "62812...", etc.
 */
export function normalizeWhatsAppNumber(raw: unknown): string {
  const value = getMetafieldValue(raw).trim()
  if (!value) return ''

  let digits = value.replace(/[^\d]/g, '')

  // Local Indonesian format starting with 0 -> country code 62
  if (digits.startsWith('0')) {
    digits = `62${digits.slice(1)}`
  }

  return digits
}

/**
 * Build a wa.me deep link with an optional prefilled message.
 * Falls back to the generic WhatsApp site if no number is configured yet,
 * so links never render as dead `#` hrefs.
 */
export function buildWhatsAppLink(
  rawNumber: unknown,
  message?: unknown
): string {
  const number = normalizeWhatsAppNumber(rawNumber)
  const text = getMetafieldValue(message).trim()

  if (!number) {
    return 'https://wa.me/'
  }

  if (!text) {
    return `https://wa.me/${number}`
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}