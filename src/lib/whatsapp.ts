import { CATEGORY_LABELS } from "@/data/categories";
import { SITE } from "@/data/site";
import type { Product } from "@/types/product";

/**
 * Build a wa.me deep link with a pre-filled, URL-encoded message.
 * 
 * SECURITY: Uses encodeURIComponent to prevent injection attacks.
 * Phone number is from trusted configuration, not user input.
 */
export function whatsappUrl(message: string, phoneNumber?: string): string {
  const phone = (phoneNumber || SITE.whatsappNumber).replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Generic "say hello" enquiry used by the header / hero / contact CTAs. */
export function generalEnquiryUrl(phoneNumber?: string, brandName?: string): string {
  const name = brandName || SITE.name;
  return whatsappUrl(
    `Hello ${name}! I'd like to know more about your latest kids wear collection.`,
    phoneNumber
  );
}

/**
 * Per-product enquiry, pre-filled with name, category and available sizes.
 * 
 * SECURITY: All product data comes from our database/CMS, not user input.
 * Even if CMS is compromised, encodeURIComponent prevents injection.
 */
export function productEnquiryUrl(product: Product, phoneNumber?: string, brandName?: string): string {
  const name = brandName || SITE.name;
  const category = CATEGORY_LABELS[product.category] ?? product.category;
  const message = [
    `Hello ${name}, I'm interested in this item:`,
    "",
    `• Item: ${product.name}`,
    `• Category: ${category}`,
    `• Sizes: ${product.sizes.join(", ")}`,
    "",
    "Is it currently available? Please share the price and details.",
  ].join("\n");
  return whatsappUrl(message, phoneNumber);
}

/** Enquiry scoped to a whole collection / category. */
export function collectionEnquiryUrl(collectionTitle: string, phoneNumber?: string, brandName?: string): string {
  const name = brandName || SITE.name;
  return whatsappUrl(
    `Hello ${name}, I'd like to see what's available in your ${collectionTitle} collection.`,
    phoneNumber
  );
}
