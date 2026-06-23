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
  
  // Use mapUrl if available (from SITE data), otherwise construct from address
  const mapsQuery = encodeURIComponent(`${siteData.brandName}, ${fullAddress}`);
  const mapsUrl = SITE.mapUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  
  // Use custom map embed URL if provided, otherwise use default query-based embed
  const embedUrl = siteData.mapEmbedUrl || SITE.mapEmbedUrl || `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

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

          {/* Social links */}
          {(SITE.social.instagram || SITE.social.facebook) && (
            <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4">
              <span className="text-xs text-muted-foreground">Follow us:</span>
              {SITE.social.instagram && (
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit us on Instagram"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {SITE.social.facebook && (
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit us on Facebook"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Embedded Google Maps */}
        <motion.div
          variants={fadeInUp}
          className="relative min-h-[260px] overflow-hidden rounded-xl border border-border/70 bg-[linear-gradient(135deg,var(--cream),var(--background))]"
        >
          {/* Map iframe */}
          <iframe
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${siteData.brandName} location map`}
            className="absolute inset-0 h-full w-full border-0"
            allow="geolocation"
          />
          
          {/* Fallback UI - shows if iframe fails or on browsers that block it */}
          <noscript>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--cream),var(--background))] p-6 text-center">
              <MapPin className="size-8 text-muted-foreground/60" />
              <p className="text-sm font-medium text-foreground">{fullAddress}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Navigation className="size-3.5" />
                Open in Google Maps
              </a>
            </div>
          </noscript>
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
