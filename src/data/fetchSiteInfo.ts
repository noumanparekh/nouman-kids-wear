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
 * Fetches store information from Sanity CMS.
 * 
 * BEHAVIOR:
 * - CMS not configured → use local fallback
 * - CMS configured with store info → use CMS data (source of truth)
 * - CMS configured but empty → use local fallback (safety fallback only)
 * - CMS error → use local fallback (safety fallback only)
 * 
 * NOTE: Store info should always exist (singleton), so empty/error cases
 * use fallback as a safety measure, not as normal behavior.
 */
export async function getStoreInfo(): Promise<StoreInfo> {
  const result = await fetchSanity<any>(STORE_INFO_QUERY, {})
  
  // Transform local SITE data to StoreInfo format
  const localStoreInfo: StoreInfo = {
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
  
  if (result.type === 'not-configured') {
    console.log('[Store Info] Using local fallback data (CMS not configured)')
    return localStoreInfo
  }

  if (result.type === 'success') {
    console.log('[Store Info] Using CMS data')
    return result.data
  }

  // For store info, empty/error cases use fallback as safety
  // (singleton should always exist once CMS is set up)
  console.log('[Store Info] CMS empty or error - using fallback as safety')
  return localStoreInfo
}
