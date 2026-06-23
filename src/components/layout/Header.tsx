"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import { NAV_LINKS, SITE } from "@/data/site";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/components/common/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { StoreInfo } from "@/data/fetchSiteInfo";

interface HeaderProps {
  storeInfo?: StoreInfo;
}

export function Header({ storeInfo }: HeaderProps) {
  // Fallback to local SITE data if storeInfo not provided
  const siteData = storeInfo || {
    brandName: SITE.name,
    address: SITE.address,
    whatsappNumber: SITE.whatsappNumber,
  };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        {/* Brand */}
        <a
          href="#top"
          className="flex items-center gap-2.5 sm:gap-3"
          aria-label={siteData.brandName}
        >
          <span className="relative block size-10 shrink-0 sm:size-12">
            <Image
              src="/brand/nouman-logo.png"
              alt={`${siteData.brandName} logo`}
              fill
              priority
              sizes="48px"
              className="object-contain"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="brand-wordmark font-heading text-[1.15rem] font-semibold tracking-tight sm:text-[1.35rem]">
              {siteData.brandName}
            </span>
            <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              {siteData.address.city} · {siteData.address.state}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <WhatsAppButton
            href={generalEnquiryUrl(siteData.whatsappNumber, siteData.brandName)}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Enquire
          </WhatsAppButton>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[78%] gap-0 p-0 sm:max-w-xs">
              <SheetHeader className="border-b px-5 py-4 text-left">
                <SheetTitle className="font-heading text-base">
                  {siteData.brandName}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-3 py-3">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-[0.95rem] text-foreground transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t px-5 py-4">
                <WhatsAppButton
                  href={generalEnquiryUrl(siteData.whatsappNumber, siteData.brandName)}
                  size="md"
                  className="w-full"
                >
                  Enquire on WhatsApp
                </WhatsAppButton>
                
                {/* Social links in mobile menu */}
                {(SITE.social.instagram || SITE.social.facebook) && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Follow us:</span>
                    {SITE.social.instagram && (
                      <a
                        href={SITE.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="inline-flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                      >
                        <InstagramIcon className="size-4" />
                      </a>
                    )}
                    {SITE.social.facebook && (
                      <a
                        href={SITE.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="inline-flex size-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                      >
                        <FacebookIcon className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
