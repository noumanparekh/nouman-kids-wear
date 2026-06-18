"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { CATEGORIES } from "@/data/categories";
import { ACCENT_SOFT } from "@/lib/accents";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Section, SectionHeading } from "@/components/common/Section";
import { ButtonDoodle, SockDoodle } from "@/components/common/Doodles";
import { cn } from "@/lib/utils";

export function CategoryNav() {
  return (
    <Section id="categories" className="relative">
      {/* Decorative doodles */}
      <SockDoodle className="pointer-events-none absolute right-3 top-8 hidden size-12 text-lilac-foreground/20 sm:block" />
      <ButtonDoodle className="pointer-events-none absolute -bottom-1 left-2 hidden size-10 text-peach-foreground/20 lg:block" />

      <SectionHeading
        eyebrow="Shop by category"
        title="Find the right fit, fast"
        description="From newborn essentials to junior party wear — pick a category to jump into the catalogue."
      />

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-2 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-7"
      >
        {CATEGORIES.map((category) => (
          <motion.li key={category.slug} variants={fadeInUp} className="shrink-0 sm:shrink">
            <a
              href="#catalogue"
              className={cn(
                "flex h-full items-center gap-2 whitespace-nowrap rounded-full border border-border/50 bg-white px-3.5 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-muted/50 sm:flex-col sm:justify-center sm:gap-1.5 sm:rounded-lg sm:p-3",
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-semibold sm:size-9 sm:rounded-lg sm:text-sm",
                  ACCENT_SOFT[category.accent],
                )}
                aria-hidden="true"
              >
                {category.label.charAt(0)}
              </span>
              <span className="text-xs sm:text-sm">{category.label}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
