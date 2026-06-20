import { fetchSanity, transformSanityProduct } from '@/sanity/lib/fetch'
import { PRODUCTS_QUERY, NEW_ARRIVALS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { PRODUCTS } from './products'
import type { Product } from '@/types/product'

// Limit for homepage New Arrivals section (easy to adjust)
export const NEW_ARRIVALS_HOMEPAGE_LIMIT = 4

/**
 * Fetches all active products from Sanity CMS.
 * 
 * BEHAVIOR:
 * - CMS not configured → use local fallback data
 * - CMS configured with products → use CMS data (source of truth)
 * - CMS configured but empty → return empty array (show empty state)
 * - CMS error → return empty array (show error state)
 * 
 * Revalidation: 60 seconds - balances freshness with CDN efficiency.
 */
export async function getProducts(): Promise<Product[]> {
  const result = await fetchSanity<any[]>(PRODUCTS_QUERY, {})
  
  if (result.type === 'not-configured') {
    // CMS not set up - use local fallback
    console.log('[Products] Using local fallback data (CMS not configured)')
    return PRODUCTS
  }

  if (result.type === 'success') {
    // CMS returned data - transform and use it
    console.log(`[Products] Using CMS data (${result.data.length} products)`)
    return result.data.map(transformSanityProduct)
  }

  if (result.type === 'empty') {
    // CMS is configured but has no products - show empty state
    console.log('[Products] CMS configured but empty - showing empty state')
    return []
  }

  // Error case - show empty state (could add error message later)
  console.error('[Products] CMS fetch error - showing empty state')
  return []
}

/**
 * Fetches new arrival products from Sanity CMS.
 * 
 * BEHAVIOR:
 * - CMS not configured → use local fallback
 * - CMS configured with new arrivals → use CMS data (source of truth)
 * - CMS configured but empty → return empty array
 * - CMS error → return empty array
 * 
 * NOTE: For homepage, use getNewArrivalsForHomepage() which limits to 4 items.
 * 
 * Revalidation: 60 seconds - new arrivals are time-sensitive but not real-time.
 */
export async function getNewArrivals(): Promise<Product[]> {
  const result = await fetchSanity<any[]>(NEW_ARRIVALS_QUERY, {})
  
  if (result.type === 'not-configured') {
    const localNewArrivals = PRODUCTS.filter((p) => p.isNew)
    console.log('[New Arrivals] Using local fallback data (CMS not configured)')
    return localNewArrivals
  }

  if (result.type === 'success') {
    console.log(`[New Arrivals] Using CMS data (${result.data.length} items)`)
    return result.data.map(transformSanityProduct)
  }

  if (result.type === 'empty') {
    console.log('[New Arrivals] CMS configured but empty')
    return []
  }

  console.error('[New Arrivals] CMS fetch error')
  return []
}

/**
 * Fetches new arrivals limited to homepage display.
 * Returns maximum of NEW_ARRIVALS_HOMEPAGE_LIMIT items (default: 4).
 * 
 * BEHAVIOR: Same as getNewArrivals() but with limit applied.
 */
export async function getNewArrivalsForHomepage(): Promise<Product[]> {
  const allNewArrivals = await getNewArrivals()
  return allNewArrivals.slice(0, NEW_ARRIVALS_HOMEPAGE_LIMIT)
}

/**
 * Fetches featured products from Sanity CMS.
 * 
 * BEHAVIOR:
 * - CMS not configured → use local fallback
 * - CMS configured → use CMS data (source of truth)
 * - CMS empty → return empty array
 * 
 * Revalidation: 60 seconds - featured products are curated and stable.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const result = await fetchSanity<any[]>(FEATURED_PRODUCTS_QUERY, {})
  
  if (result.type === 'not-configured') {
    const localFeatured = PRODUCTS.filter((p) => p.featured)
    console.log('[Featured] Using local fallback data (CMS not configured)')
    return localFeatured
  }

  if (result.type === 'success') {
    console.log(`[Featured] Using CMS data (${result.data.length} items)`)
    return result.data.map(transformSanityProduct)
  }

  if (result.type === 'empty') {
    console.log('[Featured] CMS configured but empty')
    return []
  }

  console.error('[Featured] CMS fetch error')
  return []
}
