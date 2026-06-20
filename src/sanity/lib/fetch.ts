import { clientWithRevalidate, isSanityConfigured } from './client'
import type { QueryParams } from 'next-sanity'

/**
 * Fetches data from Sanity CMS with fallback to local data if CMS is not configured
 * or if the query returns no results.
 * 
 * SECURITY: This function should only be called from Server Components or API routes.
 * It uses the public Sanity client which doesn't require authentication for published content.
 * Never pass sensitive tokens or config objects through this function to Client Components.
 * 
 * REVALIDATION: Uses Next.js cache with 60-second revalidation by default.
 * This balances content freshness with CDN efficiency for catalogue data.
 */
export async function fetchSanity<T>(
  query: string,
  params?: QueryParams,
  fallbackData?: T,
  revalidate: number = 60
): Promise<T | null> {
  try {
    // If Sanity is not configured, return fallback immediately
    if (!isSanityConfigured || !clientWithRevalidate) {
      console.log('[Sanity] CMS not configured - using fallback data')
      return fallbackData || null
    }

    // Fetch with Next.js cache revalidation
    const data = await clientWithRevalidate.fetch<T>(
      query,
      params || {},
      {
        next: {
          revalidate, // ISR: revalidate every N seconds
          tags: ['sanity'], // Allow manual revalidation via tags
        },
      }
    )
    
    // If no data from CMS, use fallback
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log('[Sanity] No data from CMS - using fallback data')
      return fallbackData || null
    }

    console.log('[Sanity] Fetched data from CMS')
    return data
  } catch (error) {
    console.error('[Sanity] Error fetching from CMS:', error)
    return fallbackData || null
  }
}

/**
 * Transforms Sanity product data to match local Product type.
 * 
 * SECURITY: Validates and sanitizes CMS data before using it.
 * Always provide fallback values for missing fields.
 */
export function transformSanityProduct(sanityProduct: any): any {
  // Get the first image URL or use placeholder
  let imageUrl = '/images/placeholder-product.jpg'
  
  if (sanityProduct.images && Array.isArray(sanityProduct.images) && sanityProduct.images.length > 0) {
    const firstImage = sanityProduct.images[0]
    if (firstImage?.asset?.url) {
      imageUrl = firstImage.asset.url
    }
  }

  return {
    id: sanityProduct._id,
    name: sanityProduct.name || 'Unnamed Product',
    category: sanityProduct.category?.slug?.current || 'casual-wear',
    gender: sanityProduct.gender || 'unisex',
    ageGroup: sanityProduct.ageGroup || 'kids',
    ageRangeDisplay: sanityProduct.ageRangeDisplay || undefined,
    sizes: Array.isArray(sanityProduct.sizes) ? sanityProduct.sizes : [],
    colors: Array.isArray(sanityProduct.colors) ? sanityProduct.colors : undefined,
    image: imageUrl,
    price: 'Price on request' as const,
    badge: sanityProduct.badge || undefined,
    isNew: sanityProduct.isNewArrival || false,
    featured: sanityProduct.isFeatured || false,
    description: sanityProduct.description || undefined,
  }
}

/**
 * Transforms Sanity category data to match local Category type.
 * 
 * SECURITY: Validates CMS data and provides safe fallbacks.
 */
export function transformSanityCategory(sanityCategory: any): any {
  return {
    slug: sanityCategory.slug?.current || '',
    label: sanityCategory.title || '',
    description: sanityCategory.description || '',
    accent: sanityCategory.accent || 'blush',
  }
}
