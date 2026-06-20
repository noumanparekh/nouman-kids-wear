// Domain types for the Nouman Kids Wear catalogue.
// Kept framework-agnostic so a Sanity CMS schema can map onto these later.

export type Gender = "boys" | "girls" | "unisex";

export type AgeGroup = "newborn" | "toddler" | "kids" | "juniors";

export type CategorySlug =
  | "boys-wear"
  | "boys-ethnic-wear"
  | "girls-wear"
  | "girls-party-wear"
  | "girls-ethnic-wear"
  | "girls-lehenga-choli"
  | "newborn"
  | "party-wear"
  | "ethnic-wear"
  | "casual-wear"
  | "shoes-accessories";

export type CollectionSlug =
  | "festival-wear"
  | "party-wear"
  | "casual-wear"
  | "newborn-essentials";

export type BrandAccent = "blush" | "mint" | "sky" | "peach" | "lilac";

export type ProductBadge = "New" | "Bestseller" | "Festive" | "Limited";

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  gender: Gender;
  ageGroup: AgeGroup;
  /** Display-friendly age range (e.g., "1–14 Years", "4–10 Years") */
  ageRangeDisplay?: string;
  sizes: string[];
  /** Product colors (e.g., ["Maroon", "Rose Gold"]) - separate from category accent color */
  colors?: string[];
  image: string;
  /** This is a catalogue, not a store, so we never show exact prices. */
  price: "Price on request";
  badge?: ProductBadge;
  isNew?: boolean;
  featured?: boolean;
  collection?: CollectionSlug;
  description?: string;
}

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  accent: BrandAccent;
}

export interface Collection {
  slug: CollectionSlug;
  title: string;
  description: string;
  accent: BrandAccent;
  image: string;
}

export interface AgeGroupOption {
  value: AgeGroup;
  label: string;
  hint: string;
}
