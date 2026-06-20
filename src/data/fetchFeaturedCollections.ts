import { fetchSanity } from '@/sanity/lib/fetch'
import { FEATURED_COLLECTIONS_QUERY } from '@/sanity/lib/queries'
import { COLLECTIONS } from './categories'
import type { Collection } from '@/types/product'

/**
 * Fetches featured collections from Sanity CMS.
 * 
 * BEHAVIOR:
 * - CMS not configured → use local fallback
 * - CMS configured with collections → use CMS data (source of truth)
 * - CMS configured but empty → return empty array
 * - CMS error → return empty array
 * 
 * Revalidation: 60 seconds - collections are curated and change infrequently.
 */
export async function getFeaturedCollections(): Promise<Collection[]> {
  const result = await fetchSanity<any[]>(FEATURED_COLLECTIONS_QUERY, {})
  
  if (result.type === 'not-configured') {
    console.log('[Collections] Using local fallback data (CMS not configured)')
    return COLLECTIONS
  }

  if (result.type === 'success') {
    console.log(`[Collections] Using CMS data (${result.data.length} collections)`)
    // Transform Sanity data to match Collection interface
    return result.data.map((col) => ({
      slug: col.slug?.current || col.title.toLowerCase().replace(/\s+/g, '-'),
      title: col.title,
      description: col.description || '',
      accent: col.accent || 'blush',
      image: col.image?.asset?.url || '/images/placeholder-collection.jpg',
    }))
  }

  if (result.type === 'empty') {
    console.log('[Collections] CMS configured but empty')
    return []
  }

  console.error('[Collections] CMS fetch error')
  return []
}
