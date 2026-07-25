// ---------------------------------------------------------------------------
// Base Cosmic shapes
// ---------------------------------------------------------------------------

export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at?: string
  modified_at?: string
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// ---------------------------------------------------------------------------
// Landing page
// ---------------------------------------------------------------------------

export interface HeroContent {
  headline?: string
  subheadline?: string
  trust_badge?: string
  cta_label?: string
  whatsapp_message?: string
  image?: CosmicImage
  eyebrow?: string
  secondary_cta_label?: string
}

export interface PainPointItem {
  title?: string
  description?: string
  icon?: string
}

export interface PainPointsContent {
  eyebrow?: string
  headline?: string
  intro?: string
  items?: PainPointItem[]
  closing?: string
  cta_label?: string
  whatsapp_message?: string
}

export interface SolutionPillar {
  title?: string
  description?: string
  icon?: string
}

export interface SolutionContent {
  eyebrow?: string
  headline?: string
  body?: string
  pillars?: SolutionPillar[]
  synergy_title?: string
  synergy_body?: string
  image?: CosmicImage
  cta_label?: string
  whatsapp_message?: string
}

export interface WhyChooseItem {
  title?: string
  description?: string
  icon?: string
}

export interface WhyChooseUsContent {
  eyebrow?: string
  headline?: string
  intro?: string
  items?: WhyChooseItem[]
}

export interface FinalCtaContent {
  headline?: string
  paragraph?: string
  cta_label?: string
  whatsapp_message?: string
  reassurance?: string
  image?: CosmicImage
}

export interface DesignTokens {
  primary?: string
  secondary?: string
  accent?: string
  background?: string
  alternate?: string
}

export interface SeoContent {
  seo_title?: string
  seo_description?: string
  og_title?: string
  og_description?: string
  keywords?: string
  og_image?: CosmicImage
}

export interface LandingPage extends CosmicObject {
  type: 'landing-page'
  metadata: {
    brand_name?: string
    logo?: CosmicImage
    whatsapp_number?: string
    whatsapp_default_message?: string
    header_cta_label?: string
    hero?: HeroContent
    pain_points?: PainPointsContent
    solution?: SolutionContent
    why_choose_us?: WhyChooseUsContent
    final_cta?: FinalCtaContent
    design_tokens?: DesignTokens
    seo?: SeoContent
  }
}

// ---------------------------------------------------------------------------
// Offerings
// ---------------------------------------------------------------------------

export type OfferingKind = 'Therapy' | 'Coffee' | string

export interface ProcessStep {
  title?: string
  description?: string
  step?: string
  duration?: string
}

export interface BenefitItem {
  title?: string
  description?: string
  icon?: string
}

export interface Offering extends CosmicObject {
  type: 'offerings'
  metadata: {
    kind?: OfferingKind
    eyebrow?: string
    headline?: string
    summary?: string
    description?: string
    benefits?: Array<BenefitItem | string>
    process_steps?: Array<ProcessStep | string>
    duration?: string
    safety_notes?: string
    flavor_notes?: string
    origin?: string
    roast_profile?: string
    price_note?: string
    image?: CosmicImage
    gallery?: Array<{ url?: string; imgix_url?: string } | CosmicImage>
    cta_label?: string
    whatsapp_message?: string
    display_order?: number | string
  }
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    name?: string
    role?: string
    quote?: string
    before_feeling?: string
    after_feeling?: string
    portrait?: CosmicImage
    related_offering?: Offering | string
    highlight?: boolean
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function isOffering(obj: CosmicObject): obj is Offering {
  return obj.type === 'offerings'
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials'
}