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
 * 
 * BEHAVIOR:
 * - CMS not configured → return null (Hero uses default content)
 * - CMS configured with banner → use CMS data (source of truth)
 * - CMS configured but empty → return null (Hero uses default content)
 * - CMS error → return null (Hero uses default content as safety)
 * 
 * Revalidation: 60 seconds - hero banners are relatively stable.
 */
export async function getHeroBanner(): Promise<HeroBanner | null> {
  const result = await fetchSanity<any>(HERO_BANNER_QUERY, {})
  
  if (result.type === 'not-configured') {
    console.log('[Hero Banner] CMS not configured - using default hero content')
    return null
  }

  if (result.type === 'success') {
    console.log('[Hero Banner] Using CMS data')
    // Transform Sanity data to match HeroBanner interface
    return {
      id: result.data._id,
      headline: result.data.headline,
      subheadline: result.data.subheadline || undefined,
      backgroundImage: result.data.backgroundImage?.asset?.url || undefined,
      mobileBackgroundImage: result.data.mobileBackgroundImage?.asset?.url || undefined,
      primaryCtaText: result.data.primaryCtaText || undefined,
      primaryCtaLink: result.data.primaryCtaLink || undefined,
      secondaryCtaText: result.data.secondaryCtaText || undefined,
      secondaryCtaLink: result.data.secondaryCtaLink || undefined,
    }
  }

  // For empty/error cases, use default hero content as safety
  console.log('[Hero Banner] CMS empty or error - using default hero content')
  return null
}
