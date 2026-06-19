import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper to get optimized image URL
export function getImageUrl(source: any, width = 800) {
  if (!source) return ''
  
  return urlFor(source)
    .width(width)
    .quality(85)
    .auto('format')
    .url()
}
