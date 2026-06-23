"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { COLLECTIONS } from "@/data/categories";
import { collectionEnquiryUrl } from "@/lib/whatsapp";
import { ACCENT_SOFT } from "@/lib/accents";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Section, SectionHeading } from "@/components/common/Section";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/product";

interface FeaturedCollectionsProps {
  collections?: Collection[];
}

export function FeaturedCollections({ collections: collectionsProp }: FeaturedCollectionsProps) {
  // Fallback to local COLLECTIONS data only if collections explicitly not provided (undefined)
  // Empty array means CMS is configured but empty - respect that
  const collectionsData = collectionsProp !== undefined ? collectionsProp : COLLECTIONS;
  return (
    <Section id="collections">
      <SectionHeading
        eyebrow="Curated edits"
        title="Featured collections"
        description="Seasonal edits to make picking easier — from festival days to everyday play."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {collectionsData.map((collection, i) => (
          <motion.a
            key={collection.slug}
            variants={fadeInUp}
            href={collectionEnquiryUrl(collection.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(120,70,90,0.35)]"
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden bg-muted">
              <Image
                src={collection.image}
                alt={`${collection.title} — kids collection at Nouman Kids Wear, Adilabad`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-0.5 text-[0.62rem] font-medium",
                    ACCENT_SOFT[collection.accent],
                  )}
                >
                  Collection
                </span>
                <h3 className="mt-2 flex items-center gap-1 font-heading text-lg font-semibold text-white">
                  {collection.title}
                  <ArrowUpRight className="size-4 opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-1 text-xs leading-snug text-white/85">
                  {collection.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
