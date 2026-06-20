import { fetchSanity } from '@/sanity/lib/fetch'
import { GALLERY_IMAGES_QUERY } from '@/sanity/lib/queries'

export interface GalleryImage {
  id: string
  title?: string
  src: string | null
  alt: string
  category?: string
  span?: string
}

// Fallback gallery images when Sanity is not configured
const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: '1',
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80",
    alt: "Kidswear store interior with neatly arranged racks",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: '2',
    src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=700&q=80",
    alt: "Display of folded children's clothing",
  },
  {
    id: '3',
    src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=700&q=80",
    alt: "Colourful kids outfits on hangers",
  },
  { 
    id: '4',
    src: null, 
    alt: "More store photos coming soon" 
  },
  {
    id: '5',
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80",
    alt: "Boutique shelves styled with kidswear",
  },
]

/**
 * Fetches gallery images from Sanity CMS with fallback to local data.
 * 
 * Revalidation: 60 seconds - gallery images are relatively static.
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const sanityImages = await fetchSanity<any[]>(GALLERY_IMAGES_QUERY, {}, FALLBACK_GALLERY)
  
  if (!sanityImages || sanityImages.length === 0) {
    return FALLBACK_GALLERY
  }

  // If we got the fallback, return it as-is
  if (sanityImages === FALLBACK_GALLERY) {
    return FALLBACK_GALLERY
  }

  // Transform Sanity data to match GalleryImage interface
  return sanityImages.map((img) => ({
    id: img._id,
    title: img.title || undefined,
    src: img.image?.asset?.url || null,
    alt: img.image?.alt || img.title || 'Gallery image',
    category: img.category || undefined,
    span: undefined, // Let the component handle grid layout
  }))
}
