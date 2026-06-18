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
  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-border/40 bg-white transition-all duration-200 ease-out hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted/30">
        <Image
          src={product.image}
          alt={`${product.name} — ${CATEGORY_LABELS[product.category]} at Nouman Kids Wear, Adilabad`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
          className="object-cover object-[center_top] transition-transform duration-300 ease-out group-hover:scale-105"
          priority={priority}
        />
        {product.badge && (
          <span
            className={cn(
              "absolute left-2 top-2 rounded px-2 py-0.5 text-[0.65rem] font-medium shadow-sm",
              badgeStyles[product.badge] ?? "bg-secondary text-secondary-foreground",
            )}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col gap-1 p-2.5", compact && "p-2 sm:p-2.5")}>
        <h3
          className={cn(
            "line-clamp-2 font-medium leading-tight text-foreground",
            compact ? "text-[0.82rem] sm:text-sm" : "text-sm sm:text-[0.92rem]",
          )}
        >
          {product.name}
        </h3>

        <p className="text-[0.7rem] text-muted-foreground sm:text-[0.72rem]">
          {CATEGORY_LABELS[product.category]}
        </p>

        {/* Age range display */}
        {product.ageRangeDisplay && (
          <p className="text-[0.68rem] text-muted-foreground/80 sm:text-[0.7rem]">
            Age: {product.ageRangeDisplay}
          </p>
        )}

        {/* Size display - compact badges */}
        {product.sizes.length > 0 && (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {product.sizes.slice(0, compact ? 2 : 3).map((size) => (
              <span
                key={size}
                className="rounded border border-border/60 px-1.5 py-0.5 text-[0.6rem] text-muted-foreground sm:text-[0.62rem]"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5 sm:pt-2">
          <span className="text-[0.7rem] font-semibold text-foreground sm:text-[0.72rem]">
            {product.price}
          </span>
          <WhatsAppButton
            href={productEnquiryUrl(product)}
            variant="soft"
            size="sm"
            className="text-[0.68rem] sm:text-[0.7rem]"
            ariaLabel={`Enquire about ${product.name} on WhatsApp`}
          >
            Enquire
          </WhatsAppButton>
        </div>
      </div>
    </motion.article>
  );
}
