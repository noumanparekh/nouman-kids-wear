import { createClient } from 'next-sanity'

/**
 * Public Sanity client for reading published content.
 * 
 * SECURITY: Uses only NEXT_PUBLIC_ environment variables, which are safe
 * to expose to the browser. No authentication token is required for reading
 * published content from Sanity.
 * 
 * Project ID and dataset are public information and not sensitive.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: true, // Use CDN for faster reads of published content
  perspective: 'published', // Only fetch published documents (not drafts)
})

/**
 * Sanity client with revalidation support for Next.js cache.
 * Use this in Server Components and API routes that need ISR.
 * 
 * Revalidation: 60 seconds default for catalogue data.
 */
export const clientWithRevalidate = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: false, // Disable CDN for ISR to get fresh data on revalidation
  perspective: 'published',
})

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
  )
}
