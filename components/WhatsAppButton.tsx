import { buildWhatsAppLink } from '@/lib/whatsapp'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface WhatsAppButtonProps {
  number: unknown
  message?: unknown
  label: string
  variant?: Variant
  size?: Size
  className?: string
  fullWidth?: boolean
  showIcon?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-forest-700 text-white hover:bg-forest-800 shadow-soft hover:shadow-lift',
  secondary:
    'bg-coffee-700 text-white hover:bg-coffee-800 shadow-soft hover:shadow-lift',
  outline:
    'bg-white text-forest-800 border border-forest-200 hover:border-forest-400 hover:bg-forest-50',
  ghost:
    'bg-transparent text-forest-800 hover:bg-forest-50 border border-transparent',
  gold: 'bg-gold-500 text-forest-950 hover:bg-gold-400 shadow-soft hover:shadow-lift',
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-sm gap-2',
  md: 'px-5 py-3 text-[0.95rem] gap-2',
  lg: 'px-6 py-3.5 text-base gap-2.5',
  xl: 'px-8 py-4.5 text-base md:text-lg gap-3',
}

function WhatsAppGlyph({ className = 'h-[1.15em] w-[1.15em]' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.13-.13.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.9 11.9 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411l.015.011zm-8.475 18.29h-.005a9.87 9.87 0 0 1-5.032-1.378l-.36-.214-3.741.98.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.457-9.884 9.934-9.884 2.652 0 5.145 1.035 7.021 2.913a9.83 9.83 0 0 1 2.909 7.001c-.003 5.45-4.458 9.864-9.98 9.864z" />
    </svg>
  )
}

export default function WhatsAppButton({
  number,
  message,
  label,
  variant = 'primary',
  size = 'lg',
  className = '',
  fullWidth = false,
  showIcon = true,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(number, message)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'group inline-flex items-center justify-center rounded-2xl font-semibold tracking-[-0.01em]',
        'transition-all duration-250 ease-out active:scale-[0.985]',
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showIcon && (
        <WhatsAppGlyph className="h-[1.15em] w-[1.15em] shrink-0 transition-transform duration-250 group-hover:scale-105" />
      )}
      <span>{label}</span>
    </a>
  )
}