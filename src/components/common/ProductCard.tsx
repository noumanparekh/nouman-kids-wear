"use client";

import Image from "next/image";
import { motion } from "motion/react";

import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/data/categories";
import { productEnquiryUrl } from "@/lib/whatsapp";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

interface ProductCardProps {
  product: Product;
  /** Smaller variant for tight grids / sliders. */
  compact?: boolean;
  className?: string;
  priority?: boolean;
}

const badgeStyles: Record<string, string> = {
  New: "bg-mint text-mint-foreground",
  Bestseller: "bg-sky text-sky-foreground",
  Festive: "bg-peach text-peach-foreground",
  Limited: "bg-lilac text-lilac-foreground",
};

export function ProductCard({
  product,
  compact = false,
  className,
  priority = false,
}: ProductCardProps) {
  // Ensure image is always a valid string
  const imageUrl = product.image && typeof product.image === 'string' && product.image.length > 0
    ? product.image
    : '/images/placeholder-product.jpg'

  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "neo group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/40">
        <Image
          src={imageUrl}
          alt={`${product.name} — ${CATEGORY_LABELS[product.category]} at Nouman Kids Wear, Adilabad`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 280px"
          className="object-cover object-[center_top] transition-transform duration-500 ease-out group-hover:scale-105"
          priority={priority}
        />
        {product.badge && (
          <span
            className={cn(
              "absolute left-2 top-2 rounded-full px-2 py-0.5 text-[0.65rem] font-medium shadow-sm",
              badgeStyles[product.badge] ?? "bg-secondary text-secondary-foreground",
            )}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col gap-1.5 p-3", compact && "p-2.5")}>
        <h3
          className={cn(
            "line-clamp-2 min-h-[2.5rem] font-medium leading-tight text-foreground",
            compact ? "text-xs sm:text-sm" : "text-sm sm:text-base",
          )}
        >
          {product.name}
        </h3>

        <p className="text-[0.7rem] text-muted-foreground sm:text-xs">
          {CATEGORY_LABELS[product.category]}
        </p>

        {/* Age range display */}
        {product.ageRangeDisplay && (
          <p className="text-[0.68rem] text-muted-foreground/80 sm:text-[0.7rem]">
            Age: {product.ageRangeDisplay}
          </p>
        )}

        {/* Colors display - compact pills */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.colors.slice(0, 2).map((color) => (
              <span
                key={color}
                className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[0.6rem] text-foreground/80 sm:text-[0.62rem]"
              >
                {color}
              </span>
            ))}
            {product.colors.length > 2 && (
              <span className="text-[0.6rem] text-muted-foreground sm:text-[0.62rem]">
                +{product.colors.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Size display - compact badges */}
        {product.sizes.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {product.sizes.slice(0, 2).map((size) => (
              <span
                key={size}
                className="rounded border border-border/60 px-1.5 py-0.5 text-[0.6rem] text-muted-foreground sm:text-[0.62rem]"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <span className="whitespace-nowrap text-[0.7rem] font-semibold text-foreground sm:text-xs">
            {product.price}
          </span>
          <WhatsAppButton
            href={productEnquiryUrl(product)}
            variant="soft"
            size="sm"
            className="w-full justify-center text-xs"
            ariaLabel={`Enquire about ${product.name} on WhatsApp`}
          >
            Enquire on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </motion.article>
  );
}
