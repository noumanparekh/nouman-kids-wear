import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

import { NAV_LINKS, SITE } from "@/data/site";
import { CATEGORIES } from "@/data/categories";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/common/icons";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import type { StoreInfo } from "@/data/fetchSiteInfo";

interface FooterProps {
  storeInfo?: StoreInfo;
}

export function Footer({ storeInfo }: FooterProps) {
  // Fallback to local SITE data if storeInfo not provided
  const siteData = storeInfo || {
    brandName: SITE.name,
    tagline: SITE.tagline,
    address: SITE.address,
    phone: SITE.phoneDisplay,
    phoneHref: SITE.phoneHref,
    whatsappNumber: SITE.whatsappNumber,
    social: SITE.social,
  };
  
  const year = 2026;

  return (
    <footer className="mt-4 border-t bg-cream/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative block size-9 overflow-hidden rounded-full ring-1 ring-border">
              <Image
                src="/brand/nouman-logo.png"
                alt={`${siteData.brandName} logo`}
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="font-heading text-base font-semibold">
              {siteData.brandName}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteData.tagline}. A kidswear & readymade garments shop in{" "}
            {siteData.address.city}, {siteData.address.state}.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={generalEnquiryUrl(siteData.whatsappNumber, siteData.brandName)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <WhatsAppIcon className="size-4" />
            </a>
            {siteData.social?.instagram && (
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Nouman Kids Wear on Instagram"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <InstagramIcon className="size-4" />
              </a>
            )}
            {siteData.social?.facebook && (
              <a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Nouman Kids Wear on Facebook"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
              >
                <FacebookIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories + contact */}
        <div>
          <h3 className="eyebrow">Categories</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2">
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <a
                  href="#catalogue"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {siteData.address.line1}, {siteData.address.city} —{" "}
                {siteData.address.pincode}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a
                href={`tel:${siteData.phoneHref}`}
                className="transition-colors hover:text-foreground"
              >
                {siteData.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {siteData.brandName}. All rights reserved.
          </p>
          <p>Browse-and-enquire catalogue · No online checkout.</p>
          <p className="flex items-center gap-1">
            Designed & developed by{" "}
            <a
              href="https://www.linkedin.com/in/shaikh-ibrahim17?utm_source=share&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sk Ibrahim on LinkedIn"
              className="inline-flex items-center gap-0.5 transition-colors hover:text-foreground hover:underline hover:underline-offset-2"
            >
              Sk Ibrahim
              <LinkedInIcon className="size-3 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
