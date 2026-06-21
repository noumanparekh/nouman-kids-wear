/**
 * Sanity CMS Seed Script
 * 
 * Imports initial product catalogue into Sanity CMS.
 * Products become real Sanity documents, fully editable in Studio.
 * 
 * Usage:
 *   npm run sanity:seed
 * 
 * Prerequisites:
 *   1. Add SANITY_API_WRITE_TOKEN to .env.local
 *   2. Ensure product images exist in public/images/products/
 *   3. Run npm run sanity:check first to verify connection
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables from .env.local
config({ path: '.env.local' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}

if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN is not set in .env.local')
  console.error('\nTo create a write token:')
  console.error('1. Go to https://sanity.io/manage')
  console.error('2. Select your project')
  console.error('3. Go to API → Tokens')
  console.error('4. Click "Add API token"')
  console.error('5. Name: "Seed Script Write Token"')
  console.error('6. Permissions: "Editor"')
  console.error('7. Copy the token and add to .env.local:')
  console.error('   SANITY_API_WRITE_TOKEN=your_token_here')
  process.exit(1)
}

// Create Sanity client with write permissions
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Don't use CDN for mutations
})

// Helper to upload image from local file
async function uploadImage(filePath: string, altText: string): Promise<any> {
  const fullPath = path.join(__dirname, '..', filePath)
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  Image not found: ${filePath}`)
    return null
  }

  try {
    const buffer = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(filePath),
    })
    
    console.log(`  ✓ Uploaded: ${path.basename(filePath)}`)
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    }
  } catch (error) {
    console.error(`  ✗ Failed to upload ${filePath}:`, error)
    return null
  }
}

// Category seed data
const categories = [
  {
    _id: 'category-boys-ethnic-wear',
    _type: 'category',
    title: 'Boys Ethnic Wear',
    description: 'Traditional ethnic wear for boys - sherwanis, kurtas & festive sets',
    accent: 'sky',
    displayOrder: 1,
    active: true,
    slug: {
      _type: 'slug',
      current: 'boys-ethnic-wear',
    },
  },
  {
    _id: 'category-girls-ethnic-wear',
    _type: 'category',
    title: 'Girls Ethnic Wear',
    description: 'Ethnic gowns, lehengas, cholis & traditional sets',
    accent: 'peach',
    displayOrder: 2,
    active: true,
    slug: {
      _type: 'slug',
      current: 'girls-ethnic-wear',
    },
  },
  {
    _id: 'category-girls-party-wear',
    _type: 'category',
    title: 'Girls Party Wear',
    description: 'Elegant party wear collection for special occasions',
    accent: 'blush',
    displayOrder: 3,
    active: true,
    slug: {
      _type: 'slug',
      current: 'girls-party-wear',
    },
  },
  {
    _id: 'category-boys-party-wear',
    _type: 'category',
    title: 'Boys Party Wear',
    description: 'Party shirts, blazers & dress sets for special occasions',
    accent: 'lilac',
    displayOrder: 4,
    active: true,
    slug: {
      _type: 'slug',
      current: 'boys-party-wear',
    },
  },
  {
    _id: 'category-jackets-winter-wear',
    _type: 'category',
    title: 'Jackets & Winter Wear',
    description: 'Warm jackets & winter essentials for kids',
    accent: 'mint',
    displayOrder: 5,
    active: true,
    slug: {
      _type: 'slug',
      current: 'jackets-winter-wear',
    },
  },
]

// Product seed data (will have images attached during upload)
const products = [
  // Boys Ethnic Wear
  {
    _id: 'product-boys-black-sherwani-1-14',
    _type: 'product',
    name: 'Boys Black Ethnic Sherwani',
    category: { _type: 'reference', _ref: 'category-boys-ethnic-wear' },
    gender: 'boys',
    ageGroup: 'kids',
    ageRangeDisplay: '1–14 Years',
    sizes: ['1×14'],
    colors: ['Black'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/boys-black-ethnic-sherwani-1-14yr.jpeg',
    imageAlt: 'Boys black ethnic sherwani with embroidery',
    badge: '',
    isNewArrival: false,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 1,
    description: 'Premium black ethnic sherwani with traditional embroidery',
    slug: { _type: 'slug', current: 'boys-black-ethnic-sherwani' },
  },
  
  // Girls Party Wear
  {
    _id: 'product-girls-dusty-pink-gown',
    _type: 'product',
    name: 'Girls Dusty Pink Princess Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['4×10'],
    colors: ['Dusty Pink'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-dusty-pink-princess-gown-4-10yr.jpeg',
    imageAlt: 'Girls dusty pink princess style party gown',
    badge: '',
    isNewArrival: false,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 5,
    description: 'Beautiful dusty pink princess style gown perfect for parties',
    slug: { _type: 'slug', current: 'girls-dusty-pink-princess-gown' },
  },
  {
    _id: 'product-girls-rose-gold-gown',
    _type: 'product',
    name: 'Girls Rose Gold Party Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '1–14 Years',
    sizes: ['1×14'],
    colors: ['Rose Gold'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-rose-gold-party-gown-1-14yr.jpeg',
    imageAlt: 'Girls rose gold party gown with shimmer',
    badge: '',
    isNewArrival: false,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 7,
    description: 'Stunning rose gold party gown with elegant shimmer finish',
    slug: { _type: 'slug', current: 'girls-rose-gold-party-gown' },
  },
  {
    _id: 'product-girls-white-party-gown',
    _type: 'product',
    name: 'Girls White Party Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '1–14 Years',
    sizes: ['1×14'],
    colors: ['White'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-white-party-gown-1-14yr.jpeg',
    imageAlt: 'Girls white party gown',
    badge: '',
    isNewArrival: false,
    isFeatured: false,
    stockStatus: 'available',
    active: true,
    displayOrder: 10,
    description: 'Classic white party gown for special occasions',
    slug: { _type: 'slug', current: 'girls-white-party-gown' },
  },

  // Girls Ethnic Wear
  {
    _id: 'product-girls-black-ethnic-gown',
    _type: 'product',
    name: 'Girls Black Embroidered Ethnic Gown',
    category: { _type: 'reference', _ref: 'category-girls-ethnic-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['4×10'],
    colors: ['Black'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-black-embroidered-ethnic-gown-4-10yr.jpeg',
    imageAlt: 'Girls black embroidered ethnic gown',
    badge: '',
    isNewArrival: false,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 2,
    description: 'Elegant black ethnic gown with intricate embroidery',
    slug: { _type: 'slug', current: 'girls-black-embroidered-ethnic-gown' },
  },
  {
    _id: 'product-girls-mint-green-gown',
    _type: 'product',
    name: 'Girls Mint Green Embroidered Gown',
    category: { _type: 'reference', _ref: 'category-girls-ethnic-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['4×10'],
    colors: ['Mint Green'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-mint-green-embroidered-gown-4-10yr.jpeg',
    imageAlt: 'Girls mint green embroidered ethnic gown',
    badge: 'New',
    isNewArrival: true,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 6,
    description: 'Fresh mint green ethnic gown with beautiful embroidery',
    slug: { _type: 'slug', current: 'girls-mint-green-embroidered-gown' },
  },

  // Girls Lehenga Choli (now part of Girls Ethnic Wear)
  {
    _id: 'product-girls-beige-gold-lehenga',
    _type: 'product',
    name: 'Girls Beige Gold Lehenga Choli',
    category: { _type: 'reference', _ref: 'category-girls-ethnic-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–14 Years',
    sizes: ['4×14'],
    colors: ['Beige', 'Gold'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-biege-gold-lehenga-choli-4-14yr.jpeg',
    imageAlt: 'Girls beige and gold lehenga choli set',
    badge: '',
    isNewArrival: false,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 3,
    description: 'Elegant beige and gold lehenga choli with traditional work',
    slug: { _type: 'slug', current: 'girls-beige-gold-lehenga-choli' },
  },
  {
    _id: 'product-girls-olive-green-lehenga',
    _type: 'product',
    name: 'Girls Olive Green Lehenga Choli',
    category: { _type: 'reference', _ref: 'category-girls-ethnic-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–14 Years',
    sizes: ['4×14'],
    colors: ['Olive Green'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-olive-green-lehenga-choli-4-14yr.jpeg',
    imageAlt: 'Girls olive green lehenga choli',
    badge: 'New',
    isNewArrival: true,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 8,
    description: 'Trendy olive green lehenga choli set',
    slug: { _type: 'slug', current: 'girls-olive-green-lehenga-choli' },
  },
  {
    _id: 'product-girls-silver-grey-lehenga',
    _type: 'product',
    name: 'Girls Silver Grey Floral Cape Lehenga',
    category: { _type: 'reference', _ref: 'category-girls-ethnic-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–14 Years',
    sizes: ['4×14'],
    colors: ['Grey', 'Multi Color'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-silver-grey-floral-cape-lehenga-4-14yr.jpeg',
    imageAlt: 'Girls silver grey lehenga with floral cape',
    badge: '',
    isNewArrival: false,
    isFeatured: true,
    stockStatus: 'available',
    active: true,
    displayOrder: 4,
    description: 'Unique silver grey lehenga with beautiful floral cape',
    slug: { _type: 'slug', current: 'girls-silver-grey-floral-cape-lehenga' },
  },
  {
    _id: 'product-girls-teal-blue-lehenga',
    _type: 'product',
    name: 'Girls Teal Blue Lehenga Choli',
    category: { _type: 'reference', _ref: 'category-girls-ethnic-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–14 Years',
    sizes: ['4×14'],
    colors: ['Blue'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-teal-blue-lehenga-choli-4-14yr.jpeg',
    imageAlt: 'Girls teal blue lehenga choli',
    badge: '',
    isNewArrival: false,
    isFeatured: false,
    stockStatus: 'available',
    active: true,
    displayOrder: 9,
    description: 'Vibrant teal blue lehenga choli set',
    slug: { _type: 'slug', current: 'girls-teal-blue-lehenga-choli' },
  },

  // New Arrivals - Jacket Gowns
  {
    _id: 'product-girls-black-jacket',
    _type: 'product',
    name: 'Girls Black Jacket Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['24×40'],
    colors: ['Black'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-black-embroidered-ethnic-gown-4-10yr.jpeg', // Reusing similar image
    imageAlt: 'Girls black jacket style party gown',
    badge: 'New',
    isNewArrival: true,
    isFeatured: false,
    stockStatus: 'available',
    active: true,
    displayOrder: 11,
    description: 'Stylish black jacket style party gown',
    slug: { _type: 'slug', current: 'girls-black-jacket-gown' },
  },
  {
    _id: 'product-girls-mint-green-jacket',
    _type: 'product',
    name: 'Girls Mint Green Jacket Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['24×40'],
    colors: ['Mint Green'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-mint-green-embroidered-gown-4-10yr.jpeg',
    imageAlt: 'Girls mint green jacket style party gown',
    badge: 'New',
    isNewArrival: true,
    isFeatured: false,
    stockStatus: 'available',
    active: true,
    displayOrder: 12,
    description: 'Elegant mint green jacket style party gown',
    slug: { _type: 'slug', current: 'girls-mint-green-jacket-gown' },
  },
  {
    _id: 'product-girls-olive-green-jacket',
    _type: 'product',
    name: 'Girls Olive Green Jacket Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['24×40'],
    colors: ['Olive Green'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-olive-green-lehenga-choli-4-14yr.jpeg', // Reusing similar color
    imageAlt: 'Girls olive green jacket style party gown',
    badge: 'New',
    isNewArrival: true,
    isFeatured: false,
    stockStatus: 'available',
    active: true,
    displayOrder: 13,
    description: 'Trendy olive green jacket style party gown',
    slug: { _type: 'slug', current: 'girls-olive-green-jacket-gown' },
  },
  {
    _id: 'product-girls-maroon-jacket',
    _type: 'product',
    name: 'Girls Maroon Jacket Gown',
    category: { _type: 'reference', _ref: 'category-girls-party-wear' },
    gender: 'girls',
    ageGroup: 'kids',
    ageRangeDisplay: '4–10 Years',
    sizes: ['24×40'],
    colors: ['Maroon'],
    priceText: 'Price on request',
    imagePath: 'public/images/products/boys/girls/girls-maroon-jacket-gown-4-10yr.jpeg',
    imageAlt: 'Girls maroon jacket style party gown',
    badge: 'New',
    isNewArrival: true,
    isFeatured: false,
    stockStatus: 'available',
    active: true,
    displayOrder: 14,
    description: 'Beautiful maroon jacket style party gown',
    slug: { _type: 'slug', current: 'girls-maroon-jacket-gown' },
  },
]

// Main seed function
async function seedSanity() {
  console.log('🌱 Starting Sanity CMS seed...\n')
  console.log(`📦 Project: ${projectId}`)
  console.log(`📊 Dataset: ${dataset}\n`)

  try {
    // 1. Seed Categories
    console.log('📁 Seeding categories...')
    for (const category of categories) {
      try {
        await client.createOrReplace(category)
        console.log(`  ✓ ${category.title}`)
      } catch (error) {
        console.error(`  ✗ Failed to create ${category.title}:`, error)
      }
    }
    console.log(`✅ Created ${categories.length} categories\n`)
    // 2. Seed Products (with image uploads)
    console.log('🛍️  Seeding products...')
    let productCount = 0
    let imageCount = 0

    for (const productData of products) {
      try {
        // Upload product image
        const image = await uploadImage(productData.imagePath, productData.imageAlt)
        
        // Create product document - exclude temporary fields used for upload
        const { imagePath: _, imageAlt: __, ...cleanProduct } = productData
        
        const documentToCreate = {
          ...cleanProduct,
          images: image ? [image] : [],
        }
        
        await client.createOrReplace(documentToCreate)
        productCount++
        if (image) imageCount++
        console.log(`  ✓ ${productData.name}`)
      } catch (error) {
        console.error(`  ✗ Failed to create ${productData.name}:`, error)
      }
    }
    console.log(`✅ Created ${productCount} products with ${imageCount} images\n`)

    // 3. Summary
    console.log('✨ Seed completed successfully!\n')
    console.log('Summary:')
    console.log(`  • ${categories.length} categories`)
    console.log(`  • ${productCount} products`)
    console.log(`  • ${imageCount} images uploaded`)
    console.log('\n📝 Next steps:')
    console.log('  1. Run: npm run sanity:check')
    console.log('  2. Visit: http://localhost:3000/studio')
    console.log('  3. Verify all products are Published (not Draft)')
    console.log('  4. Run: npm run build')
    console.log('  5. Visit: http://localhost:3000')
    console.log('\n✅ All products are now editable in Sanity Studio!')

  } catch (error) {
    console.error('\n❌ Seed failed:', error)
    process.exit(1)
  }
}

// Run seed
seedSanity()
