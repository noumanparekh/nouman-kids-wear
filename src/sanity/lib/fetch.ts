import { clientWithRevalidate, isSanityConfigured } from './client'
import type { QueryParams } from 'next-sanity'

/**
 * Result of a Sanity fetch operation.
 * Distinguishes between "not configured", "configured but empty", and "error".
 */
export type FetchResult<T> = 
  | { type: 'not-configured'; data: null }
  | { type: 'success'; data: T }
  | { type: 'empty'; data: null }
  | { type: 'error'; data: null; error: Error }

/**
 * Fetches data from Sanity CMS with proper fallback handling.
 * 
 * BEHAVIOR:
 * - If CMS NOT configured → return 'not-configured' (use fallback data)
 * - If CMS configured and returns data → return 'success' with data
 * - If CMS configured but returns empty → return 'empty' (show empty state, NOT fallback)
 * - If CMS configured but fetch errors → return 'error' (show error message, NOT fallback)
 * 
 * This ensures that once CMS is configured, it becomes the source of truth.
 * Empty results from CMS mean "no content exists", not "use fallback".
 * 
 * SECURITY: Only call from Server Components. Uses public client for published content.
 * REVALIDATION: 60-second ISR by default.
 */
export async function fetchSanity<T>(
  query: string,
  params?: QueryParams,
  revalidate: number = 60
): Promise<FetchResult<T>> {
  try {
    // If Sanity is not configured, signal to use fallback
    if (!isSanityConfigured || !clientWithRevalidate) {
      console.log('[Sanity] CMS not configured - caller should use fallback data')
      return { type: 'not-configured', data: null }
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
    
    // If CMS returned no data, it means the client intentionally has no content
    // Do NOT use fallback - show empty state instead
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log('[Sanity] CMS configured but returned empty - showing empty state')
      return { type: 'empty', data: null }
    }

    console.log('[Sanity] Fetched data from CMS successfully')
    return { type: 'success', data }
  } catch (error) {
    console.error('[Sanity] Error fetching from CMS:', error)
    return { type: 'error', data: null, error: error as Error }
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
    id: sanityCategory._id || sanityCategory.slug?.current,
    slug: sanityCategory.slug?.current || '',
    label: sanityCategory.title || '',
    description: sanityCategory.description || '',
    accent: sanityCategory.accent || 'blush',
  }
}
