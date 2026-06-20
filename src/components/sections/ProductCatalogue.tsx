"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Filter, X } from "lucide-react";

import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { AGE_GROUP_OPTIONS, GENDER_OPTIONS } from "@/data/site";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/common/Section";
import { ProductCard } from "@/components/common/ProductCard";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import type { AgeGroup, CategorySlug, Gender, Product } from "@/types/product";

type CategoryFilter = CategorySlug | "all";
type GenderFilter = Gender | "all";
type AgeFilter = AgeGroup | "all";

interface FilterState {
  category: CategoryFilter;
  gender: GenderFilter;
  age: AgeFilter;
  size: string | "all";
}

const EMPTY_FILTERS: FilterState = {
  category: "all",
  gender: "all",
  age: "all",
  size: "all",
};

function matchProducts(products: Product[], f: FilterState) {
  return products.filter((p) => {
    if (f.category !== "all" && p.category !== f.category) return false;
    if (f.gender !== "all" && p.gender !== f.gender) return false;
    if (f.age !== "all" && p.ageGroup !== f.age) return false;
    if (f.size !== "all" && !p.sizes.includes(f.size)) return false;
    return true;
  });
}

function countActive(f: FilterState) {
  return (
    (f.category !== "all" ? 1 : 0) +
    (f.gender !== "all" ? 1 : 0) +
    (f.age !== "all" ? 1 : 0) +
    (f.size !== "all" ? 1 : 0)
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

interface ProductCatalogueProps {
  products?: Product[];
}

export function ProductCatalogue({ products: productsProp }: ProductCatalogueProps) {
  // Fallback to local PRODUCTS data if products not provided
  const allProducts = productsProp || PRODUCTS;

  // All distinct sizes across the catalogue, kept in a sensible display order.
  const ALL_SIZES = useMemo(
    () =>
      Array.from(new Set(allProducts.flatMap((p) => p.sizes))).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true }),
      ),
    [allProducts],
  );
  // Committed filters drive the grid; draft filters are staged inside the sheet.
  const [committed, setCommitted] = useState<FilterState>(EMPTY_FILTERS);
  const [draft, setDraft] = useState<FilterState>(EMPTY_FILTERS);
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const filtered = useMemo(() => matchProducts(allProducts, committed), [allProducts, committed]);
  const committedCount = countActive(committed);
  const hasFilters = committedCount > 0;

  // Live count for the not-yet-committed draft selection (powers "Apply (N)").
  const draftMatchCount = useMemo(
    () => matchProducts(allProducts, draft).length,
    [allProducts, draft],
  );

  const openSheet = useCallback(() => {
    // Stage the currently committed filters when opening.
    setDraft(committed);
    setOpen(true);
  }, [committed]);

  const closeSheet = useCallback(() => {
    // Discard unapplied changes and return focus to the trigger.
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const applyDraft = () => {
    setCommitted(draft);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Clear staged selections (still requires Apply to commit).
  const clearDraft = () => setDraft(EMPTY_FILTERS);

  // Reset committed filters directly (used by the empty-state button).
  const resetCommitted = () => setCommitted(EMPTY_FILTERS);

  // Escape-to-close + background scroll lock while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeSheet]);

  return (
    <Section id="catalogue">
      <SectionHeading
        eyebrow="Available stock"
        title="Browse the catalogue"
        description="Filter by category, gender, age and size. Prices are shared on request — enquire on WhatsApp to confirm what's in stock."
      />

      {/* Filters trigger + result count */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          ref={triggerRef}
          type="button"
          onClick={openSheet}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="neo-sm inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-muted/50"
        >
          <Filter className="size-3.5" />
          <span>Filter</span>
          {hasFilters && (
            <span
              className="inline-flex min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[0.6rem] font-semibold leading-4 text-background"
              aria-label={`${committedCount} active filters`}
            >
              {committedCount}
            </span>
          )}
        </button>

        <p className="text-[0.7rem] text-muted-foreground sm:text-xs">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <motion.div
          key={`${committed.category}-${committed.gender}-${committed.age}-${committed.size}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
          <p className="text-sm font-medium text-foreground">
            No items match these filters
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">
            We may still have something for you in store — message us and
            we&apos;ll help you find it.
          </p>
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={resetCommitted}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            >
              Reset filters
            </button>
            <WhatsAppButton href={generalEnquiryUrl()} size="sm">
              Ask us
            </WhatsAppButton>
          </div>
        </div>
      )}

      {/* Bottom-sheet filter dialog */}
      <FilterSheet
        open={open}
        draft={draft}
        setDraft={setDraft}
        applyCount={draftMatchCount}
        draftActiveCount={countActive(draft)}
        onClose={closeSheet}
        onApply={applyDraft}
        onClear={clearDraft}
        allSizes={ALL_SIZES}
      />
    </Section>
  );
}

function FilterSheet({
  open,
  draft,
  setDraft,
  applyCount,
  draftActiveCount,
  onClose,
  onApply,
  onClear,
  allSizes,
}: {
  open: boolean;
  draft: FilterState;
  setDraft: React.Dispatch<React.SetStateAction<FilterState>>;
  applyCount: number;
  draftActiveCount: number;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  allSizes: string[];
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Move focus into the sheet when it opens (focus the close button).
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLButtonElement>("[data-sheet-close]")
        ?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Dimmed backdrop — tap to close (discards unapplied changes). */}
          <button
            type="button"
            aria-label="Close filters"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
          />

          {/* Sheet */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative flex h-[84vh] w-full max-w-2xl flex-col rounded-t-3xl border border-b-0 border-border bg-card shadow-[0_-12px_40px_-12px_rgba(60,40,40,0.25)]"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 rounded-t-3xl bg-card px-5 pb-3 pt-2.5">
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-border" />
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Filters
                </h3>
                <button
                  type="button"
                  data-sheet-close
                  onClick={onClose}
                  aria-label="Close filters"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-4">
              <FilterGroup label="Category">
                <Chip
                  active={draft.category === "all"}
                  onClick={() => setDraft((d) => ({ ...d, category: "all" }))}
                >
                  All
                </Chip>
                {CATEGORIES.map((c) => (
                  <Chip
                    key={c.slug}
                    active={draft.category === c.slug}
                    onClick={() =>
                      setDraft((d) => ({ ...d, category: c.slug }))
                    }
                  >
                    {c.label}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Gender">
                <Chip
                  active={draft.gender === "all"}
                  onClick={() => setDraft((d) => ({ ...d, gender: "all" }))}
                >
                  All
                </Chip>
                {GENDER_OPTIONS.map((g) => (
                  <Chip
                    key={g.value}
                    active={draft.gender === g.value}
                    onClick={() =>
                      setDraft((d) => ({ ...d, gender: g.value }))
                    }
                  >
                    {g.label}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Age group">
                <Chip
                  active={draft.age === "all"}
                  onClick={() => setDraft((d) => ({ ...d, age: "all" }))}
                >
                  All
                </Chip>
                {AGE_GROUP_OPTIONS.map((a) => (
                  <Chip
                    key={a.value}
                    active={draft.age === a.value}
                    onClick={() => setDraft((d) => ({ ...d, age: a.value }))}
                  >
                    {a.label}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Size">
                <Chip
                  active={draft.size === "all"}
                  onClick={() => setDraft((d) => ({ ...d, size: "all" }))}
                >
                  All
                </Chip>
                {allSizes.map((s) => (
                  <Chip
                    key={s}
                    active={draft.size === s}
                    onClick={() => setDraft((d) => ({ ...d, size: s }))}
                  >
                    {s}
                  </Chip>
                ))}
              </FilterGroup>
            </div>

            {/* Sticky footer */}
            <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-card px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={onClear}
                disabled={draftActiveCount === 0}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={onApply}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Apply ({applyCount})
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2.5 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
