"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Section, SectionHeading } from "@/components/common/Section";
import { OnesieDoodle, TeddyDoodle } from "@/components/common/Doodles";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/fetchGalleryImages";

// Fallback gallery images when CMS data not provided
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
];

interface StoreGalleryProps {
  galleryImages?: GalleryImage[];
}

export function StoreGallery({ galleryImages }: StoreGalleryProps) {
  // Fallback to local GALLERY data if galleryImages not provided
  const gallery = galleryImages || FALLBACK_GALLERY;
  return (
    <Section>
      <SectionHeading
        eyebrow="Inside the shop"
        title="Store gallery"
        description="A peek inside our Adilabad store. Real photographs will be added here soon."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-7 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:grid-cols-4"
      >
        {gallery.map((item, i) => (
          <motion.div
            key={item.id || i}
            variants={fadeInUp}
            className={cn(
              "relative overflow-hidden rounded-xl border border-border/70 bg-muted",
              item.span,
            )}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
              />
            ) : (
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-1.5 overflow-hidden bg-cream text-center text-muted-foreground">
                <OnesieDoodle className="doodle-float size-7 text-blush-foreground/60" />
                <span className="px-2 text-[0.7rem] leading-snug">
                  Photos coming soon
                </span>
                <TeddyDoodle className="pointer-events-none absolute -bottom-2 -right-2 size-12 text-mint-foreground/15" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
