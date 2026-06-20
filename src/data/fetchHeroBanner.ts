import { fetchSanity } from '@/sanity/lib/fetch'
import { HERO_BANNER_QUERY } from '@/sanity/lib/queries'

export interface HeroBanner {
  id: string
  headline: string
  subheadline?: string
  backgroundImage?: string
  mobileBackgroundImage?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

/**
 * Fetches hero banner from Sanity CMS.
 * Returns null if no banner is configured - Hero component will use default content.
 * 
 * Revalidation: 60 seconds - hero banners are relatively stable.
 */
export async function getHeroBanner(): Promise<HeroBanner | null> {
  const sanityBanner = await fetchSanity<any>(HERO_BANNER_QUERY, {}, null)
  
  if (!sanityBanner) {
    return null
  }

  // Transform Sanity data to match HeroBanner interface
  return {
    id: sanityBanner._id,
    headline: sanityBanner.headline,
    subheadline: sanityBanner.subheadline || undefined,
    backgroundImage: sanityBanner.backgroundImage?.asset?.url || undefined,
    mobileBackgroundImage: sanityBanner.mobileBackgroundImage?.asset?.url || undefined,
    primaryCtaText: sanityBanner.primaryCtaText || undefined,
    primaryCtaLink: sanityBanner.primaryCtaLink || undefined,
    secondaryCtaText: sanityBanner.secondaryCtaText || undefined,
    secondaryCtaLink: sanityBanner.secondaryCtaLink || undefined,
  }
}
