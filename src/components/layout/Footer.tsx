import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

import { NAV_LINKS, SITE } from "@/data/site";
import { CATEGORIES } from "@/data/categories";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/common/icons";
import { generalEnquiryUrl } from "@/lib/whatsapp";

export function Footer() {
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
                alt={`${SITE.name} logo`}
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="font-heading text-base font-semibold">
              {SITE.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}. A kidswear & readymade garments shop in{" "}
            {SITE.address.city}, {SITE.address.state}.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={generalEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <WhatsAppIcon className="size-4" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Nouman Kids Wear on Instagram"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Nouman Kids Wear on Facebook"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
            >
              <FacebookIcon className="size-4" />
            </a>
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
                {SITE.address.line1}, {SITE.address.city} —{" "}
                {SITE.address.pincode}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a
                href={`tel:${SITE.phoneHref}`}
                className="transition-colors hover:text-foreground"
              >
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Browse-and-enquire catalogue · No online checkout.</p>
        </div>
      </div>
    </footer>
  );
}
