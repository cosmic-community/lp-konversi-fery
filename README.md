# LP Konversi Fery

A mobile-first, WhatsApp-first landing page for a wellness brand offering professional hijama (bekam) therapy and premium local coffee. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

**Positioning:** Healthy Body. Calm Mind. Better Productivity.

## Features

- **Single conversion goal** — every CTA opens WhatsApp with a contextual prefilled message. No cart, no checkout.
- **Sticky header** with logo and always-visible WhatsApp button, plus a mobile bottom bar CTA
- **PAS-structured copy flow** — Hero → Pain Points → Solution → Bekam Service → Coffee Product → Social Proof → Why Choose Us → Final CTA
- **Content-driven** — all copy, imagery, benefits, process steps and testimonials managed in Cosmic
- **Premium visual system** — dark green / coffee brown / gold on warm white, Fraunces + Inter pairing, rounded-3xl cards, soft shadows
- **Restrained motion** — fade and slide-up only, 200–400ms, once-only on scroll, honours `prefers-reduced-motion`
- **Offering detail pages** at `/offerings/[slug]` with full benefits, process, safety notes and gallery
- **Testimonials archive** at `/testimonials` with before/after feeling contrast
- **Imgix image optimisation** at 2x density with native lazy loading
- **Full SEO + OpenGraph** metadata driven from the landing page object
- **Accessible** — semantic HTML, focus-visible states, ARIA labels, keyboard navigable

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a6412449c05ffa1ada009df&clone_repository=6a64151d9c05ffa1ada00a1f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: The landing page must NOT look AI-generated.
The writing style must feel natural, persuasive, trustworthy, conversational, and written by an experienced human marketer.
>
> PROJECT
>
> Create a mobile-first landing page.
Main Goal:
Increase WhatsApp conversations.
Primary CTA:
"Chat via WhatsApp"
There is NO checkout.
There is NO shopping cart.
Every conversion must end with users clicking WhatsApp.
>
> BUSINESS
>
> Business offers two services:
Professional Hijama (Bekam) Therapy
Premium Local Coffee
Both products belong to one brand and should complement each other.
Brand positioning:
"Healthy Body. Calm Mind. Better Productivity."
The coffee is intended for daily wellness and productivity.
The bekam therapy focuses on:
- detoxification
- body recovery
- muscle tension
- better sleep
- blood circulation
- relaxation
>
> Coffee focuses on:
- premium local beans
- fresh roast
- smooth taste
- natural energy
- productivity
- mood improvement
>
> TARGET MARKET
>
> 25-50 years old
Busy workers
Entrepreneurs
Office workers
Parents
People feeling:
- tired
- stressed
- lacking energy
- muscle pain
- poor sleep
- wanting healthier lifestyle
>
> DESIGN STYLE
>
> Style:
Minimal
Premium
Elegant
Modern
Clean
Warm
Natural
Large whitespace
Rounded corners
Soft shadows
Premium typography
Smooth scrolling
No flashy animation.
Animation only:
Fade
Slide Up
Small Scale
Duration:
200-400ms
Everything should feel premium.
>
> COLOR
>
> Primary
Dark Green
Secondary
Coffee Brown
Accent
Gold
Background
Warm White
Section alternate
Very Light Beige
>
> TYPOGRAPHY
>
> Use modern font pairing.
Headline:
Bold
Large
Clean
Body:
Easy to read
Comfortable spacing
>
> COPYWRITING STYLE
>
> Avoid marketing clichés.
Avoid:
>
> "Best"
"Number One"
"Guaranteed"
"Miracle"
Instead use:
empathetic
educational
trustworthy
clear
simple
human
Use PAS framework.
Problem
Agitate
Solution
Also use AIDA naturally.
>
> PAGE STRUCTURE
>
> Create sections in this exact order.
>
> Sticky Header
Logo
WhatsApp Button
>
> Hero
Headline
Subheadline
Trust Badge
CTA
Lifestyle image
>
> Pain Points
Explain common daily problems.
>
> Solution
Introduce holistic wellness.
Explain how Bekam and Coffee complement each other.
>
> Service Section
Bekam
Benefits
Process
Duration
Safety
CTA
>
> Product Section
>
> Coffee
Benefits
Flavor
Origin
Roasting
>
> Social Proof
Testimonials
Before After feeling
Customer stories
>
> Why Choose Us
Icons
Experience
Professional
Clean equipment
Premium coffee
Friendly service
>
> Final CTA
Headline
Short emotional paragraph
Large WhatsApp button
>
> CTA
>
> Every major section should include one CTA.
CTA examples:
Book Bekam Today
Consult First
Ask About Coffee
Order via WhatsApp
Start Healthy Today
>
> VISUAL DIRECTION
Use large lifestyle imagery.
Avoid stock-photo feeling.
Bekam images:
clean clinic
professional therapist
warm lighting
Coffee images:
premium beans
pour over
espresso
morning lifestyle
wood textures
>
> ICONS
>
> Lucide Icons
Minimal outline style
>
> CARD DESIGN
>
> Rounded
Large padding
Soft shadow
White background
>
> BUTTON
>
> Primary:
Dark Green
Hover:
Slightly darker
Rounded XL
Large touch area
>
> MICROINTERACTION
>
> Button hover
Card hover
Fade in on scroll
No excessive animation.
>
> SEO
>
> Generate:
SEO Title
SEO Description
OG Title
OG Description
Keywords
>
> PERFORMANCE
>
> Optimize for:
Fast loading
Lazy image
Responsive
Accessible
Good Lighthouse score
>
> OUTPUT
>
> Produce:
Complete landing page layout.
Section hierarchy.
Copywriting.
Headlines.
Subheadlines.
>
> CTA texts.
Image direction.
Icon suggestions.
Spacing recommendations.
Responsive behavior.
Animation recommendations.
Do not output explanations.
Output production-ready content.
Everything must feel like it was created by a premium human designer and conversion copywriter, not AI."

### Code Generation Prompt

> "Build a Next.js application for a website called "LP Konversi Fery". The content is managed in Cosmic CMS with the following object types: landing-page, offerings, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> The landing page must NOT look AI-generated. The writing style must feel natural, persuasive, trustworthy, conversational, and written by an experienced human marketer. Create a mobile-first landing page. Main Goal: Increase WhatsApp conversations. Primary CTA: "Chat via WhatsApp". There is NO checkout. There is NO shopping cart. Every conversion must end with users clicking WhatsApp. Business offers two services: Professional Hijama (Bekam) Therapy and Premium Local Coffee. Brand positioning: "Healthy Body. Calm Mind. Better Productivity." Design style: Minimal, Premium, Elegant, Modern, Clean, Warm, Natural, Large whitespace, Rounded corners, Soft shadows, Premium typography, Smooth scrolling. Animation only: Fade, Slide Up, Small Scale, 200-400ms. Colors: Primary Dark Green, Secondary Coffee Brown, Accent Gold, Background Warm White, Section alternate Very Light Beige. Page structure in this exact order: Sticky Header, Hero, Pain Points, Solution, Service Section (Bekam), Product Section (Coffee), Social Proof, Why Choose Us, Final CTA. Every major section should include one CTA. Use Lucide Icons, minimal outline style. Cards: rounded, large padding, soft shadow, white background. Buttons: Dark Green primary, rounded XL, large touch area. Optimize for fast loading, lazy images, responsive, accessible, good Lighthouse score."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **[Next.js 16](https://nextjs.org)** — App Router, Server Components
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)** — strict mode
- **[Tailwind CSS](https://tailwindcss.com)** — custom design tokens
- **[Lucide React](https://lucide.dev)** — minimal outline icons
- **[Cosmic](https://www.cosmicjs.com)** — headless content management ([docs](https://www.cosmicjs.com/docs))
- **Imgix** — image optimisation via Cosmic CDN

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `landing-page`, `offerings`, and `testimonials` object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd lp-konversi-fery

# Install dependencies
bun install

# Add your environment variables (see below)

# Run the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Set the following in your local environment and hosting platform:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetch the landing page singleton

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .findOne({ type: 'landing-page' })
  .depth(1)

const landingPage = response.object
```

### Fetch offerings sorted by display order

```typescript
const response = await cosmic.objects
  .find({ type: 'offerings' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Manual sorting — the SDK no longer exposes .sort()
const offerings = response.objects.sort((a, b) => {
  const orderA = Number(a.metadata?.display_order ?? 999)
  const orderB = Number(b.metadata?.display_order ?? 999)
  return orderA - orderB
})
```

### Handle empty results (Cosmic returns 404, not an empty array)

```typescript
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

try {
  const response = await cosmic.objects.find({ type: 'testimonials' }).depth(1)
  return response.objects
} catch (error) {
  if (hasStatus(error) && error.status === 404) {
    return []
  }
  throw new Error('Failed to fetch testimonials')
}
```

## Cosmic CMS Integration

### `landing-page`

The singleton that drives the entire page. Metafields:

| Field | Purpose |
|---|---|
| `brand_name` | Displayed in header, footer, and metadata |
| `logo` | Header logo image |
| `whatsapp_number` | Base number for all `wa.me` deep links |
| `whatsapp_default_message` | Fallback prefilled message |
| `header_cta_label` | Text on the sticky header button |
| `hero` | Headline, subheadline, trust badge, CTA label, image |
| `pain_points` | Section heading, intro, and list of problems |
| `solution` | Holistic wellness explanation + how bekam & coffee pair |
| `why_choose_us` | Icon-led list of reasons to trust the brand |
| `final_cta` | Closing headline, emotional paragraph, button label |
| `design_tokens` | Optional colour overrides applied as CSS variables |
| `seo` | Title, description, OG title, OG description, keywords, OG image |

### `offerings`

Split by the `kind` field into the Bekam service block and the Coffee product block. Bekam uses `benefits`, `process_steps`, `duration`, `safety_notes`. Coffee uses `benefits`, `flavor_notes`, `origin`, `roast_profile`. Both support `image`, `gallery`, `cta_label`, `whatsapp_message`, and `display_order`.

### `testimonials`

Rendered in the social proof section with `name`, `role`, `quote`, `before_feeling`, `after_feeling`, `portrait`, `related_offering`, and a `highlight` flag for the featured story.

## Deployment Options

### Vercel (recommended)

1. Push your repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` under **Settings → Environment Variables**
4. Deploy

### Netlify

1. Connect your repository at [app.netlify.com](https://app.netlify.com)
2. Build command: `bun run build` — Publish directory: `.next`
3. Add the three Cosmic environment variables under **Site settings → Environment variables**
4. Deploy

Set environment variables in your hosting platform's dashboard for production. Never commit `.env` files.
<!-- README_END -->