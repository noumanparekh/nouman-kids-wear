import { fetchSanity } from '@/sanity/lib/fetch'
import { STORE_INFO_QUERY } from '@/sanity/lib/queries'
import { SITE } from './site'

export interface StoreInfo {
  brandName: string
  tagline?: string
  description?: string
  address: {
    line1: string
    city: string
    state: string
    pincode: string
    country: string
  }
  phone: string
  phoneHref: string
  whatsappNumber: string
  email?: string
  hours?: Array<{ days: string; time: string }>
  mapEmbedUrl?: string
  social?: {
    instagram?: string
    facebook?: string
    justdial?: string
  }
}

/**
 * Fetches store information from Sanity CMS with fallback to local data
 */
export async function getStoreInfo(): Promise<StoreInfo> {
  const sanityStoreInfo = await fetchSanity<any>(STORE_INFO_QUERY, {}, null)
  
  if (!sanityStoreInfo) {
    // Transform SITE data to match StoreInfo interface
    return {
      brandName: SITE.name,
      tagline: SITE.tagline,
      description: SITE.description,
      address: SITE.address,
      phone: SITE.phoneDisplay,
      phoneHref: SITE.phoneHref,
      whatsappNumber: SITE.whatsappNumber,
      email: SITE.email,
      hours: SITE.hours.map(h => ({ days: h.days, time: h.time })),
      social: SITE.social,
    }
  }

  return sanityStoreInfo
}
