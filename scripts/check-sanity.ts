/**
 * Sanity CMS Check Script
 * 
 * Verifies Sanity connection and prints content counts.
 * Does NOT print secret tokens.
 * 
 * Usage:
 *   npm run sanity:check
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}

// Create read-only client (no token needed for published content)
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

async function checkSanity() {
  console.log('🔍 Checking Sanity CMS connection...\n')
  console.log('Configuration:')
  console.log(`  • Project ID: ${projectId}`)
  console.log(`  • Dataset: ${dataset}`)
  console.log(`  • API Version: ${apiVersion}`)
  console.log()

  try {
    // Check categories
    const categories = await client.fetch(`count(*[_type == "category"])`)
    console.log(`📁 Categories: ${categories}`)

    // Check products (all)
    const productsTotal = await client.fetch(`count(*[_type == "product"])`)
    console.log(`🛍️  Products (total): ${productsTotal}`)

    // Check active products
    const productsActive = await client.fetch(`count(*[_type == "product" && active == true])`)
    console.log(`  └─ Active: ${productsActive}`)

    // Check new arrivals
    const newArrivals = await client.fetch(`count(*[_type == "product" && active == true && isNewArrival == true])`)
    console.log(`  └─ New Arrivals: ${newArrivals}`)

    // Check featured
    const featured = await client.fetch(`count(*[_type == "product" && active == true && isFeatured == true])`)
    console.log(`  └─ Featured: ${featured}`)

    // Check gallery images
    const gallery = await client.fetch(`count(*[_type == "galleryImage"])`)
    console.log(`🖼️  Gallery Images: ${gallery}`)

    // Check store info
    const storeInfo = await client.fetch(`count(*[_type == "storeInfo"])`)
    console.log(`🏪 Store Information: ${storeInfo}`)

    // Check hero banner
    const heroBanner = await client.fetch(`count(*[_type == "heroBanner"])`)
    console.log(`🎯 Hero Banners: ${heroBanner}`)

    // Check featured collections
    const collections = await client.fetch(`count(*[_type == "featuredCollection"])`)
    console.log(`⭐ Featured Collections: ${collections}`)

    console.log('\n✅ Connection successful!')

    // Warnings
    if (productsActive === 0) {
      console.log('\n⚠️  No active products found.')
      if (productsTotal > 0) {
        console.log('   Products exist but may be inactive or drafts.')
        console.log('   Make sure to Publish products in Sanity Studio.')
      } else {
        console.log('   Run: npm run sanity:seed')
      }
    }

    if (categories === 0) {
      console.log('\n⚠️  No categories found. Run: npm run sanity:seed')
    }

    if (storeInfo === 0) {
      console.log('\n⚠️  No store information found.')
      console.log('   Create one in Sanity Studio → Store Information')
    }

  } catch (error: any) {
    console.error('\n❌ Failed to connect to Sanity:', error.message)
    console.error('\nTroubleshooting:')
    console.error('  • Verify NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
    console.error('  • Check project exists at https://sanity.io/manage')
    console.error('  • Ensure dataset name is correct (usually "production")')
    process.exit(1)
  }
}

// Run check
checkSanity()
