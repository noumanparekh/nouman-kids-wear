"use client";

import { motion } from "motion/react";

import { staggerContainer, viewportOnce } from "@/lib/animations";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import { Section, SectionHeading } from "@/components/common/Section";
import { ProductCard } from "@/components/common/ProductCard";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import type { Product } from "@/types/product";

interface NewArrivalsProps {
  products?: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  // If no products provided or empty array, don't render the section
  if (!products || products.length === 0) {
    return null
  }

  // Limit to maximum 8 for display (though homepage already limits to 4)
  const displayProducts = products.slice(0, 8);

  return (
    <Section id="new-arrivals">
      <SectionHeading
        eyebrow="Just in"
        title="New arrivals"
        description="The latest pieces on our racks. See something you like? Tap enquire and we'll confirm availability."
        action={
          <WhatsAppButton
            href={generalEnquiryUrl()}
            variant="outline"
            size="sm"
          >
            Ask what&apos;s new
          </WhatsAppButton>
        }
      />

      {/* Mobile: horizontal snap scroll. Desktop: grid. */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        {displayProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={i < 2}
            className="w-[60%] shrink-0 snap-start sm:w-auto"
          />
        ))}
      </motion.div>
    </Section>
  );
}
