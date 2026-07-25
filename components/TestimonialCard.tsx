import { getMetafieldValue } from '@/lib/cosmic'
import type { Testimonial } from '@/types'
import { ArrowRight, Quote } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: Testimonial
  featured?: boolean
}

export default function TestimonialCard({
  testimonial,
  featured = false,
}: TestimonialCardProps) {
  if (!testimonial) return null

  const meta = testimonial.metadata ?? {}

  const name = getMetafieldValue(meta.name) || testimonial.title
  const role = getMetafieldValue(meta.role)
  const quote = getMetafieldValue(meta.quote)
  const before = getMetafieldValue(meta.before_feeling)
  const after = getMetafieldValue(meta.after_feeling)
  const portrait = meta.portrait

  const relatedOffering =
    meta.related_offering && typeof meta.related_offering === 'object'
      ? getMetafieldValue((meta.related_offering as { title?: string }).title)
      : ''

  if (!quote && !before && !after) return null

  return (
    <article
      className={[
        'card-surface flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        featured ? 'p-7 md:p-9' : 'p-6 md:p-7',
      ].join(' ')}
    >
      <Quote
        className={[
          'shrink-0 text-gold-400',
          featured ? 'h-7 w-7' : 'h-5 w-5',
        ].join(' ')}
        strokeWidth={1.5}
        aria-hidden="true"
      />

      {quote ? (
        <blockquote
          className={[
            'mt-4 flex-1 text-forest-900 text-pretty',
            featured
              ? 'font-display text-[1.15rem] font-medium leading-[1.6] md:text-[1.3rem]'
              : 'text-[0.96rem] leading-[1.75]',
          ].join(' ')}
        >
          {quote}
        </blockquote>
      ) : null}

      {before || after ? (
        <div className="mt-6 flex flex-wrap items-center gap-2.5 rounded-2xl bg-beige px-4 py-3">
          {before ? (
            <span className="text-[0.8rem] leading-snug text-coffee-700 line-through decoration-coffee-300">
              {before}
            </span>
          ) : null}
          {before && after ? (
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 text-muted"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          ) : null}
          {after ? (
            <span className="text-[0.83rem] font-semibold leading-snug text-forest-800">
              {after}
            </span>
          ) : null}
        </div>
      ) : null}

      <footer className="mt-6 flex items-center gap-3 border-t border-forest-100 pt-5">
        {portrait?.imgix_url ? (
          <img
            src={`${portrait.imgix_url}?w=112&h=112&fit=crop&crop=faces&auto=format,compress`}
            alt={name}
            width={44}
            height={44}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-100 font-display text-sm font-semibold text-forest-700"
            aria-hidden="true"
          >
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-[0.92rem] font-semibold leading-tight text-forest-900">
            {name}
          </p>
          {role || relatedOffering ? (
            <p className="mt-0.5 truncate text-[0.8rem] leading-tight text-muted">
              {[role, relatedOffering].filter(Boolean).join(' · ')}
            </p>
          ) : null}
        </div>
      </footer>
    </article>
  )
}