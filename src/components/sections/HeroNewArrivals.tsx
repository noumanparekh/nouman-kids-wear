"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { PRODUCTS } from "@/data/products";
import { CATEGORY_LABELS } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

// Auto-transitioning mini slider of new arrivals for the hero's right side.
// Spec: new arrivals should change every 1.5–2s.
const AUTOPLAY_MS = 1800;

interface HeroNewArrivalsProps {
  products?: Product[];
}

export function HeroNewArrivals({ products: productsProp }: HeroNewArrivalsProps) {
  // Fallback to local NEW_ARRIVALS data if products not provided
  const fallbackProducts = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const allProducts = productsProp || fallbackProducts;
  const slides = allProducts.slice(0, 4); // Only show 4 new arrivals as specified
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const pausedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Setup embla event listeners
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance carousel
  useEffect(() => {
    if (!emblaApi) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    
    if (prefersReducedMotion) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start auto-advance
    intervalRef.current = setInterval(() => {
      // Don't advance if tab is hidden or user is interacting
      if (document.hidden || pausedRef.current) {
        return;
      }
      
      // Scroll to next slide
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        // Loop back to start
        emblaApi.scrollTo(0);
      }
    }, AUTOPLAY_MS);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [emblaApi]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  const handleFocus = () => {
    pausedRef.current = true;
  };

  const handleBlur = () => {
    pausedRef.current = false;
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Soft neomorphic pastel frame */}
      <div className="neo rounded-3xl border border-border/60 bg-card/85 p-2.5 backdrop-blur-sm">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((product, i) => (
              <div key={product.id} className="relative min-w-0 flex-[0_0_100%]">
                {/* Fixed aspect-ratio wrapper prevents layout shift. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={product.image}
                    alt={`${product.name} — new arrival at Nouman Kids Wear`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 420px"
                    className="object-cover object-[center_top]"
                    priority={i === 0}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3.5 pt-10">
                    <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white/80">
                      {CATEGORY_LABELS[product.category]}
                    </p>
                    <p className="text-sm font-medium text-white">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating "New Arrivals" tag */}
      <div className="neo-sm absolute -left-2 -top-2 rounded-full bg-blush px-3 py-1 text-[0.65rem] font-medium text-blush-foreground sm:-left-3 sm:-top-3">
        New Arrivals
      </div>

      {/* Progress dots / indicators */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={selected === i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selected === i
                ? "w-6 bg-primary"
                : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
