"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

import { SITE } from "@/data/site";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { HeroNewArrivals } from "@/components/sections/HeroNewArrivals";
import {
  CloudDoodle,
  HeartDoodle,
  StarDoodle,
  HangerDoodle,
} from "@/components/common/Doodles";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] items-center overflow-hidden"
    >
      {/* Background image layer — visible, behind all content. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/nouman-hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Readability wash: stronger on the left/bottom where the copy sits,
            lighter on the right so the artwork stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/72 to-background/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Decorative kidswear doodles — purely ornamental, low opacity. */}
      <CloudDoodle className="doodle-float pointer-events-none absolute -top-2 left-[6%] hidden size-16 text-sky-foreground/25 sm:block" />
      <StarDoodle
        className="doodle-float pointer-events-none absolute right-[8%] top-[14%] size-10 text-peach-foreground/30"
        style={{ animationDelay: "1.2s" }}
      />
      <HeartDoodle
        className="doodle-float pointer-events-none absolute bottom-[12%] left-[3%] hidden size-9 text-blush-foreground/30 sm:block"
        style={{ animationDelay: "2.1s" }}
      />
      <HangerDoodle className="pointer-events-none absolute right-[4%] bottom-[16%] hidden size-12 text-lilac-foreground/25 lg:block" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 bg-white px-3 pb-10 pt-16 sm:gap-10 sm:px-5 sm:pb-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16 lg:pt-24">
        {/* Copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={fadeInUp}
            className="neo-sm inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-[0.68rem] font-medium text-muted-foreground backdrop-blur-sm sm:px-3.5 sm:text-[0.72rem]"
          >
            <Sparkles className="size-3 text-peach-foreground sm:size-3.5" />
            Boutique kidswear in {SITE.address.city}
          </motion.span>

          {/* Brand lockup — large logo + wordmark. This is the semantic h1. */}
          <motion.h1
            variants={fadeInUp}
            className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-3.5"
          >
            <span className="relative block size-14 shrink-0 sm:size-16 lg:size-20">
              <Image
                src="/brand/nouman-logo.png"
                alt={`${SITE.name} logo`}
                fill
                priority
                sizes="80px"
                className="object-contain drop-shadow-[0_6px_14px_rgba(120,70,90,0.18)]"
              />
            </span>
            <span className="brand-wordmark font-heading text-[2.8rem] font-semibold leading-[1.02] tracking-tight sm:text-[3.4rem] lg:text-[4rem]">
              Nouman
              <span className="block">Kids Wear</span>
            </span>
          </motion.h1>

          {/* Tagline / sub-headline */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 font-heading text-lg font-medium text-foreground sm:mt-5 sm:text-xl lg:text-2xl"
          >
            Dressed for every{" "}
            <span className="italic text-primary">little</span> occasion.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mt-2.5 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[0.98rem]"
          >
            Boys, girls & newborn readymade garments — casual, party and ethnic
            wear, handpicked for {SITE.address.city}. Browse our latest stock and
            enquire instantly on WhatsApp.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3"
          >
            <WhatsAppButton href={generalEnquiryUrl()} size="lg">
              Enquire on WhatsApp
            </WhatsAppButton>
            <a
              href="#catalogue"
              className="inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-card/70 px-4 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-card hover:shadow-[0_10px_24px_-12px_rgba(60,40,40,0.3)] sm:h-12 sm:px-5 sm:text-[0.95rem]"
            >
              Browse catalogue
              <ArrowRight className="size-4" />
            </a>
          </motion.div>

          <motion.dl
            variants={fadeInUp}
            className="mt-7 flex gap-5 border-t border-border/60 pt-4 sm:mt-9 sm:gap-6 sm:pt-5"
          >
            <div>
              <dt className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                7+
              </dt>
              <dd className="text-[0.7rem] text-muted-foreground sm:text-xs">Categories</dd>
            </div>
            <div>
              <dt className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                0–14y
              </dt>
              <dd className="text-[0.7rem] text-muted-foreground sm:text-xs">Newborn to junior</dd>
            </div>
            <div>
              <dt className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                WhatsApp
              </dt>
              <dd className="text-[0.7rem] text-muted-foreground sm:text-xs">Quick enquiry</dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Mini new-arrivals slider */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mx-auto w-full max-w-sm lg:max-w-none"
        >
          <HeroNewArrivals />
        </motion.div>
      </div>
    </section>
  );
}
