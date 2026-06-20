"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Section, SectionHeading } from "@/components/common/Section";
import { OnesieDoodle, TeddyDoodle } from "@/components/common/Doodles";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/fetchGalleryImages";

interface StoreGalleryProps {
  galleryImages?: GalleryImage[];
}

export function StoreGallery({ galleryImages }: StoreGalleryProps) {
  // If no images provided or empty array, show empty state
  if (!galleryImages || galleryImages.length === 0) {
    return (
      <Section>
        <SectionHeading
          eyebrow="Inside the shop"
          title="Store gallery"
          description="Photos of our Adilabad store will appear here soon."
        />
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
          <OnesieDoodle className="doodle-float size-10 text-blush-foreground/60" />
          <p className="text-sm font-medium text-foreground">
            Gallery photos coming soon
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">
            We're adding photos of our store. Visit us in Adilabad to see our collection!
          </p>
        </div>
      </Section>
    )
  }

  const gallery = galleryImages;
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
