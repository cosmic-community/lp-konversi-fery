interface SectionHeadingProps {
  eyebrow?: string
  headline?: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  maxWidth?: string
}

export default function SectionHeading({
  eyebrow,
  headline,
  intro,
  align = 'left',
  tone = 'dark',
  maxWidth = 'max-w-2xl',
}: SectionHeadingProps) {
  const isLight = tone === 'light'

  return (
    <div
      className={[
        maxWidth,
        align === 'center' ? 'mx-auto text-center' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <p
          className={[
            'mb-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em]',
            isLight ? 'text-gold-300' : 'text-coffee-600',
          ].join(' ')}
        >
          <span
            className={[
              'inline-block h-px w-6',
              isLight ? 'bg-gold-400/70' : 'bg-coffee-300',
            ].join(' ')}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      ) : null}

      {headline ? (
        <h2
          className={[
            'font-display text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-balance sm:text-4xl md:text-[2.75rem]',
            isLight ? 'text-white' : 'text-forest-900',
          ].join(' ')}
        >
          {headline}
        </h2>
      ) : null}

      {intro ? (
        <p
          className={[
            'mt-5 text-[1.02rem] leading-[1.75] text-pretty md:text-[1.09rem]',
            isLight ? 'text-forest-100/85' : 'text-muted',
          ].join(' ')}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}