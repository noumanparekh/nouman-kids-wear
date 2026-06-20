"use client";

import { motion } from "motion/react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";

import { SITE } from "@/data/site";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { Section, SectionHeading } from "@/components/common/Section";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import type { StoreInfo } from "@/data/fetchSiteInfo";

interface LocationContactProps {
  storeInfo?: StoreInfo;
}

export function LocationContact({ storeInfo }: LocationContactProps) {
  // Fallback to local SITE data if storeInfo not provided
  const siteData = storeInfo || {
    brandName: SITE.name,
    address: SITE.address,
    phone: SITE.phoneDisplay,
    phoneHref: SITE.phoneHref,
    whatsappNumber: SITE.whatsappNumber,
    hours: SITE.hours.map(h => ({ days: h.days, time: h.time })),
    mapEmbedUrl: undefined,
  };

  const { address } = siteData;
  const fullAddress = `${address.line1}, ${address.city}, ${address.state} ${address.pincode}`;
  const mapsQuery = encodeURIComponent(`${siteData.brandName}, ${fullAddress}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  
  // Use custom map embed URL if provided, otherwise use default query-based embed
  const embedUrl = siteData.mapEmbedUrl || `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Visit us"
        title={`Find ${siteData.brandName} in ${address.city}`}
        description="Drop by the store or reach us on WhatsApp — we're happy to help with sizes and availability."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-7 grid gap-3.5 lg:grid-cols-[1fr_1.1fr]"
      >
        {/* Details */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-5 sm:p-6"
        >
          <ContactItem icon={MapPin} label="Address">
            {fullAddress}
          </ContactItem>

          <ContactItem icon={Phone} label="Phone">
            <a
              href={`tel:${siteData.phoneHref}`}
              className="transition-colors hover:text-foreground"
            >
              {siteData.phone}
            </a>
          </ContactItem>

          <ContactItem icon={Clock} label="Store hours">
            <ul className="space-y-0.5">
              {siteData.hours?.map((h) => (
                <li key={h.days}>
                  <span className="text-foreground">{h.days}:</span> {h.time}
                </li>
              ))}
            </ul>
          </ContactItem>

          <div className="mt-1 flex flex-wrap gap-2">
            <WhatsAppButton href={generalEnquiryUrl(siteData.whatsappNumber, siteData.brandName)} size="md">
              Chat on WhatsApp
            </WhatsAppButton>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Navigation className="size-4" />
              Get directions
            </a>
          </div>
        </motion.div>

        {/* Embedded Google Maps (no API key needed) */}
        <motion.div
          variants={fadeInUp}
          className="relative min-h-[260px] overflow-hidden rounded-xl border border-border/70 bg-[linear-gradient(135deg,var(--cream),var(--background))]"
        >
          {/* Skeleton behind the iframe so the layout doesn't jump while it loads. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--cream),var(--background))] text-muted-foreground"
          >
            <MapPin className="size-6 opacity-40" />
          </div>
          <iframe
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${siteData.brandName} location`}
            className="absolute inset-0 h-full w-full border-0"
          />
        </motion.div>
      </motion.div>
    </Section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
        <Icon className="size-[18px]" />
      </span>
      <div className="text-sm text-muted-foreground">
        <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
