import {
  Activity,
  Award,
  BadgeCheck,
  BatteryLow,
  Bean,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Coffee,
  Droplets,
  Flame,
  Frown,
  HandHeart,
  Heart,
  HeartPulse,
  Leaf,
  Moon,
  MessageCircle,
  MountainSnow,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
  Timer,
  TrendingUp,
  Users,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  activity: Activity,
  award: Award,
  'badge-check': BadgeCheck,
  battery: BatteryLow,
  'battery-low': BatteryLow,
  bean: Bean,
  beans: Bean,
  brain: Brain,
  calendar: CalendarCheck,
  'calendar-check': CalendarCheck,
  circulation: HeartPulse,
  clean: ShieldCheck,
  clipboard: ClipboardCheck,
  'clipboard-check': ClipboardCheck,
  clock: Clock,
  coffee: Coffee,
  detox: Droplets,
  droplets: Droplets,
  energy: Zap,
  experience: Award,
  flame: Flame,
  friendly: HandHeart,
  frown: Frown,
  hand: HandHeart,
  'hand-heart': HandHeart,
  heart: Heart,
  'heart-pulse': HeartPulse,
  leaf: Leaf,
  message: MessageCircle,
  'message-circle': MessageCircle,
  moon: Moon,
  mountain: MountainSnow,
  origin: MountainSnow,
  professional: BadgeCheck,
  relax: Wind,
  roast: Flame,
  shield: ShieldCheck,
  'shield-check': ShieldCheck,
  sleep: Moon,
  smile: Smile,
  sparkles: Sparkles,
  stress: Brain,
  sun: Sun,
  timer: Timer,
  tired: BatteryLow,
  'trending-up': TrendingUp,
  users: Users,
  wind: Wind,
  zap: Zap,
}

const FALLBACKS: LucideIcon[] = [Leaf, HeartPulse, Coffee, Moon, Wind, Sparkles]

/**
 * Resolve an icon name coming from Cosmic into a Lucide component.
 * Falls back to a rotating set of on-brand icons so cards never look broken.
 */
export function resolveIcon(name: unknown, index = 0): LucideIcon {
  if (typeof name === 'string' && name.trim()) {
    const key = name.trim().toLowerCase().replace(/\s+/g, '-')
    const direct = ICON_MAP[key]
    if (direct) return direct

    // Try a loose contains match (e.g. "moon-star" -> moon)
    const found = Object.keys(ICON_MAP).find((k) => key.includes(k))
    if (found) {
      const match = ICON_MAP[found]
      if (match) return match
    }
  }

  const fallback = FALLBACKS[index % FALLBACKS.length]
  return fallback ?? Leaf
}