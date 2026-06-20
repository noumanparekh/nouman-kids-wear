import { fetchSanity, transformSanityCategory } from '@/sanity/lib/fetch'
import { CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { CATEGORIES } from './categories'
import type { Category } from '@/types/product'

/**
 * Fetches all active categories from Sanity CMS.
 * 
 * BEHAVIOR:
 * - CMS not configured → use local fallback
 * - CMS configured with categories → use CMS data (source of truth)
 * - CMS configured but empty → return empty array
 * - CMS error → return empty array
 */
export async function getCategories(): Promise<Category[]> {
  const result = await fetchSanity<any[]>(CATEGORIES_QUERY, {})
  
  if (result.type === 'not-configured') {
    console.log('[Categories] Using local fallback data (CMS not configured)')
    return CATEGORIES
  }

  if (result.type === 'success') {
    console.log(`[Categories] Using CMS data (${result.data.length} categories)`)
    return result.data.map(transformSanityCategory)
  }

  if (result.type === 'empty') {
    console.log('[Categories] CMS configured but empty')
    return []
  }

  console.error('[Categories] CMS fetch error')
  return []
}
