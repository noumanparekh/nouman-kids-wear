import { StructureBuilder } from 'sanity/structure'
import {
  Package,
  Sparkles,
  Star,
  Grid3x3,
  Image as ImageIcon,
  Home,
  Store,
  Layers,
} from 'lucide-react'

/**
 * Custom Studio structure for Nouman Kids Wear
 * Simplified for non-technical shop owner use
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Nouman Kids Wear Dashboard')
    .items([
      // Products Section
      S.listItem()
        .title('Products')
        .icon(Package)
        .child(
          S.documentTypeList('product')
            .title('All Products')
            .filter('_type == "product"')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),

      S.listItem()
        .title('New Arrivals')
        .icon(Sparkles)
        .child(
          S.documentTypeList('product')
            .title('New Arrivals')
            .filter('_type == "product" && isNewArrival == true')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),

      S.listItem()
        .title('Featured Products')
        .icon(Star)
        .child(
          S.documentTypeList('product')
            .title('Featured Products')
            .filter('_type == "product" && isFeatured == true')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),

      S.divider(),

      // Categories
      S.listItem()
        .title('Categories')
        .icon(Grid3x3)
        .child(
          S.documentTypeList('category')
            .title('Product Categories')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),

      S.divider(),

      // Store Information (Singleton)
      S.listItem()
        .title('Store Information')
        .icon(Store)
        .child(
          S.document()
            .schemaType('storeInfo')
            .documentId('storeInfo')
            .title('Store Information')
        ),

      // Homepage Banner (Singleton)
      S.listItem()
        .title('Homepage Banner')
        .icon(Home)
        .child(
          S.document()
            .schemaType('heroBanner')
            .documentId('heroBanner')
            .title('Homepage Banner')
        ),

      S.divider(),

      // Gallery
      S.listItem()
        .title('Gallery')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryImage')
            .title('Store Photos')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),

      // Collections
      S.listItem()
        .title('Collections')
        .icon(Layers)
        .child(
          S.documentTypeList('featuredCollection')
            .title('Featured Collections')
            .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
        ),
    ])
