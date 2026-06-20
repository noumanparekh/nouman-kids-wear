import { groq } from 'next-sanity'

// Product queries
export const PRODUCTS_QUERY = groq`
  *[_type == "product" && active == true] | order(displayOrder asc, _createdAt desc) {
    _id,
    name,
    slug,
    category->{
      _id,
      title,
      slug
    },
    gender,
    ageGroup,
    ageRangeDisplay,
    sizes,
    colors,
    priceText,
    images[]{
      asset->{
        _id,
        url
      },
      alt
    },
    badge,
    isNewArrival,
    isFeatured,
    stockStatus,
    description,
    whatsappMessage,
    displayOrder
  }
`

export const NEW_ARRIVALS_QUERY = groq`
  *[_type == "product" && active == true && isNewArrival == true] | order(displayOrder asc, _createdAt desc) [0...10] {
    _id,
    name,
    slug,
    category->{
      _id,
      title,
      slug
    },
    gender,
    ageGroup,
    ageRangeDisplay,
    sizes,
    colors,
    priceText,
    images[]{
      asset->{
        _id,
        url
      },
      alt
    },
    badge,
    stockStatus,
    displayOrder
  }
`

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && active == true && isFeatured == true] | order(displayOrder asc) [0...8] {
    _id,
    name,
    slug,
    category->{
      _id,
      title,
      slug
    },
    gender,
    ageGroup,
    ageRangeDisplay,
    sizes,
    colors,
    priceText,
    images[]{
      asset->{
        _id,
        url
      },
      alt
    },
    badge,
    stockStatus,
    displayOrder
  }
`

// Category queries
export const CATEGORIES_QUERY = groq`
  *[_type == "category" && active == true] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    displayOrder
  }
`

// Hero banner query
export const HERO_BANNER_QUERY = groq`
  *[_type == "heroBanner" && active == true] | order(_updatedAt desc) [0] {
    _id,
    headline,
    subheadline,
    backgroundImage{
      asset->{
        _id,
        url
      },
      alt
    },
    mobileBackgroundImage{
      asset->{
        _id,
        url
      },
      alt
    },
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink
  }
`

// Gallery images query
export const GALLERY_IMAGES_QUERY = groq`
  *[_type == "galleryImage" && active == true] | order(displayOrder asc) {
    _id,
    title,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    category,
    displayOrder
  }
`

// Featured collections query
export const FEATURED_COLLECTIONS_QUERY = groq`
  *[_type == "featuredCollection" && active == true] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    displayOrder
  }
`

// Store info query
export const STORE_INFO_QUERY = groq`
  *[_type == "storeInfo"] [0] {
    _id,
    brandName,
    tagline,
    description,
    address,
    phone,
    phoneHref,
    whatsappNumber,
    email,
    hours,
    mapEmbedUrl,
    social
  }
`
