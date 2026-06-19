import { fetchSanity, transformSanityProduct } from '@/sanity/lib/fetch'
import { PRODUCTS_QUERY, NEW_ARRIVALS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { PRODUCTS } from './products'
import type { Product } from '@/types/product'

/**
 * Fetches all active products from Sanity CMS with fallback to local data
 */
export async function getProducts(): Promise<Product[]> {
  const sanityProducts = await fetchSanity<any[]>(PRODUCTS_QUERY, {}, PRODUCTS)
  
  if (!sanityProducts || sanityProducts.length === 0) {
    return PRODUCTS
  }

  // If we got Sanity data, transform it to match our Product type
  if (sanityProducts === PRODUCTS) {
    return PRODUCTS
  }

  return sanityProducts.map(transformSanityProduct)
}

/**
 * Fetches new arrival products from Sanity CMS with fallback to local data
 */
export async function getNewArrivals(): Promise<Product[]> {
  const localNewArrivals = PRODUCTS.filter((p) => p.isNew)
  const sanityProducts = await fetchSanity<any[]>(NEW_ARRIVALS_QUERY, {}, localNewArrivals)
  
  if (!sanityProducts || sanityProducts.length === 0) {
    return localNewArrivals
  }

  if (sanityProducts === localNewArrivals) {
    return localNewArrivals
  }

  return sanityProducts.map(transformSanityProduct)
}

/**
 * Fetches featured products from Sanity CMS with fallback to local data
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const localFeatured = PRODUCTS.filter((p) => p.featured)
  const sanityProducts = await fetchSanity<any[]>(FEATURED_PRODUCTS_QUERY, {}, localFeatured)
  
  if (!sanityProducts || sanityProducts.length === 0) {
    return localFeatured
  }

  if (sanityProducts === localFeatured) {
    return localFeatured
  }

  return sanityProducts.map(transformSanityProduct)
}
