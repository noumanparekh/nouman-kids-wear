import { fetchSanity, transformSanityCategory } from '@/sanity/lib/fetch'
import { CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { CATEGORIES } from './categories'
import type { Category } from '@/types/product'

/**
 * Fetches all active categories from Sanity CMS with fallback to local data
 */
export async function getCategories(): Promise<Category[]> {
  const sanityCategories = await fetchSanity<any[]>(CATEGORIES_QUERY, {})
  
  if (!sanityCategories || sanityCategories.length === 0) {
    return CATEGORIES
  }

  return sanityCategories.map(transformSanityCategory)
}
