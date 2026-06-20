import { fetchSanity } from '@/sanity/lib/fetch'
import { FEATURED_COLLECTIONS_QUERY } from '@/sanity/lib/queries'
import { COLLECTIONS } from './categories'
import type { Collection } from '@/types/product'

/**
 * Fetches featured collections from Sanity CMS with fallback to local data.
 * 
 * Revalidation: 60 seconds - collections are curated and change infrequently.
 */
export async function getFeaturedCollections(): Promise<Collection[]> {
  const sanityCollections = await fetchSanity<any[]>(FEATURED_COLLECTIONS_QUERY, {}, COLLECTIONS)
  
  if (!sanityCollections || sanityCollections.length === 0) {
    return COLLECTIONS
  }

  // If we got the fallback, return it as-is
  if (sanityCollections === COLLECTIONS) {
    return COLLECTIONS
  }

  // Transform Sanity data to match Collection interface
  return sanityCollections.map((col) => ({
    slug: col.slug?.current || col.title.toLowerCase().replace(/\s+/g, '-'),
    title: col.title,
    description: col.description || '',
    accent: col.accent || 'blush',
    image: col.image?.asset?.url || '/images/placeholder-collection.jpg',
  }))
}
