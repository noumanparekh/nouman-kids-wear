# Sanity CMS as Source of Truth — Implementation Summary

This document explains the updated CMS behavior where Sanity becomes the authoritative data source once configured.

---

## Problem Solved

**Previous behavior:**
- CMS empty → Website shows local fallback products
- Client deletes products in CMS → Local products reappear
- Client cannot truly "remove all products" — fallbacks always shown

**New behavior:**
- CMS **not configured** → Website uses local fallback data
- CMS **configured but empty** → Website shows empty states (no fallback)
- CMS **configured with data** → Website uses ONLY CMS data

This gives the shop owner full control. Deleting/hiding products in CMS actually removes them from the website.

---

## Technical Changes

### 1. New `FetchResult<T>` Type

Introduced a discriminated union to distinguish CMS states:

```typescript
type FetchResult<T> = 
  | { type: 'not-configured'; data: null }  // CMS credentials missing
  | { type: 'success'; data: T }             // CMS returned data
  | { type: 'empty'; data: null }            // CMS configured but no content
  | { type: 'error'; data: null; error: Error } // CMS fetch error
```

**Key difference:**
- `'not-configured'` → Use fallback (CMS not set up)
- `'empty'` → Show empty state (CMS set up but intentionally empty)

---

### 2. Updated `fetchSanity()` Core Function

**File:** `src/sanity/lib/fetch.ts`

- Removed `fallbackData` parameter
- Returns `FetchResult<T>` instead of `T | null`
- Distinguishes between "CMS not configured" vs "CMS configured but empty"
- Callers decide how to handle each case

---

### 3. Updated All Data Fetch Functions

**Files:**
- `src/data/fetchProducts.ts`
- `src/data/fetchCategories.ts`
- `src/data/fetchSiteInfo.ts`
- `src/data/fetchGalleryImages.ts`
- `src/data/fetchFeaturedCollections.ts`
- `src/data/fetchHeroBanner.ts`

**Pattern:**
```typescript
const result = await fetchSanity<T>(QUERY, {})

if (result.type === 'not-configured') {
  // CMS not set up → use local fallback
  return LOCAL_FALLBACK_DATA
}

if (result.type === 'success') {
  // CMS has data → use it (source of truth)
  return result.data.map(transformFunction)
}

if (result.type === 'empty') {
  // CMS configured but empty → show empty state
  return []
}

// Error case → show empty state (or fallback for singletons like store info)
return []
```

---

### 4. New Arrivals Homepage Limit

**File:** `src/data/fetchProducts.ts`

Added:
```typescript
export const NEW_ARRIVALS_HOMEPAGE_LIMIT = 4

export async function getNewArrivalsForHomepage(): Promise<Product[]> {
  const allNewArrivals = await getNewArrivals()
  return allNewArrivals.slice(0, NEW_ARRIVALS_HOMEPAGE_LIMIT)
}
```

**Why:**
- Homepage should show 3–4 featured new arrivals (not all)
- Easy to adjust limit in one place
- Full new arrivals list can be used elsewhere (e.g., dedicated "New Arrivals" page)

**Updated:** `src/app/page.tsx` now calls `getNewArrivalsForHomepage()` instead of `getNewArrivals()`

---

### 5. Empty States in Components

**Files:**
- `src/components/sections/NewArrivals.tsx`
- `src/components/sections/ProductCatalogue.tsx`
- `src/components/sections/StoreGallery.tsx`

**Behavior:**
- `NewArrivals` → Hides section entirely if no products (returns `null`)
- `ProductCatalogue` → Shows friendly empty state with CTA
- `StoreGallery` → Shows placeholder with doodle if no images

**Empty state messages:**
- **Products:** "No products available yet. Products are being added. Message us for availability."
- **Gallery:** "Gallery photos coming soon. Visit us in Adilabad to see our collection!"

---

### 6. Removed Local Fallback Logic from Components

**Before:**
```typescript
const allProducts = productsProp || PRODUCTS  // Always had fallback
```

**After:**
```typescript
const allProducts = productsProp || []  // Trust server data
```

Components no longer import `PRODUCTS` or `FALLBACK_GALLERY` constants. They trust the server-provided data.

---

## Data Flow

### Scenario 1: CMS Not Configured (Development)

1. `.env.local` missing or `NEXT_PUBLIC_SANITY_PROJECT_ID` not set
2. `isSanityConfigured` returns `false`
3. All fetch functions return local fallback data
4. Website works perfectly with mock data

**Use case:** Local development without Sanity account

---

### Scenario 2: CMS Configured, No Content Yet

1. `.env.local` has valid Sanity credentials
2. `isSanityConfigured` returns `true`
3. Sanity queries return empty arrays
4. Fetch functions return empty arrays (not fallback)
5. Website shows empty states

**Use case:** Fresh Sanity project before migration

---

### Scenario 3: CMS Configured, Has Content

1. `.env.local` has valid Sanity credentials
2. `isSanityConfigured` returns `true`
3. Sanity queries return product/category data
4. Fetch functions transform and return CMS data
5. Website displays CMS content (source of truth)

**Use case:** Production site with populated CMS

---

### Scenario 4: Client Deletes All Products

1. Client goes to Sanity Studio
2. Deletes all product documents (or turns Active OFF for all)
3. Sanity queries return empty arrays
4. Website shows "No products available yet" empty state
5. Local fallback products do NOT reappear

**Result:** Client has true control over content

---

### Scenario 5: CMS Fetch Error (Network Issue)

1. `.env.local` has valid credentials
2. Network/Sanity API error occurs
3. Fetch functions return `{ type: 'error', ... }`
4. Website shows empty states (not fallback)
5. ISR cache (60s) may serve stale data briefly

**Result:** Temporary errors don't reintroduce old fallback data

---

## Singletons (Store Info, Hero Banner)

**Special handling for singleton documents:**

- **Store Info:** Falls back to local `SITE` data on empty/error (safety fallback only)
- **Hero Banner:** Returns `null` on empty/error (Hero component uses default content)

**Why:**
- Store info should always exist (phone, address, etc.)
- Hero banner is optional (default content is acceptable)

---

## Active/Inactive Behavior

All schemas have `active` boolean field. Queries filter by `active == true`:

```groq
*[_type == "product" && active == true]
```

**Client workflow:**
1. **Hide temporarily:** Turn OFF `active` toggle → Product disappears from website
2. **Show again:** Turn ON `active` toggle → Product reappears
3. **Permanent delete:** Delete document → Product gone forever

This gives non-technical users safe content control without accidental deletion.

---

## Build Verification

**Command:** `npm run build`

**Expected logs:**
```
[Products] Using CMS data (11 products)
[Categories] Using CMS data (1 categories)
[Store Info] Using CMS data
[Gallery] CMS configured but empty
[Collections] CMS configured but empty
[New Arrivals] CMS configured but empty
[Hero Banner] CMS empty or error - using default hero content
```

**Build result:** ✅ Passed (0 errors, 0 warnings)

---

## Breaking Changes

### For Developers

**Before:**
```typescript
const products = await getProducts() // Always returned array with fallback
```

**After:**
```typescript
const products = await getProducts() // May return empty array if CMS empty
```

**Impact:** Components must handle empty arrays gracefully (empty states added).

### For Shop Owner

**Before:**
- Deleting products in CMS didn't remove them from website
- Fallback products always reappeared

**After:**
- Deleting/hiding products in CMS removes them from website immediately
- CMS is the source of truth once configured

---

## Migration Path

For existing deployments with local data:

1. **Keep local data files** (`src/data/*.ts`) — they serve as fallback when CMS not configured
2. **Manually migrate** products to Sanity Studio (see `MIGRATE_TO_SANITY.md`)
3. **Verify** CMS data appears on website
4. **Going forward:** All content managed through Sanity Studio

---

## Configuration Constants

**New Arrivals Limit:**
```typescript
// src/data/fetchProducts.ts
export const NEW_ARRIVALS_HOMEPAGE_LIMIT = 4
```

Adjust this number to show more/fewer new arrivals on homepage.

**ISR Revalidation:**
```typescript
// src/app/page.tsx
export const revalidate = 60 // seconds
```

CMS changes appear on website within 60 seconds.

---

## Documentation Updates

**New files:**
- `MIGRATE_TO_SANITY.md` — Step-by-step migration guide for local data
- `CMS_SOURCE_OF_TRUTH.md` — This document

**Updated files:**
- `CLIENT_CMS_GUIDE.md` — Added sections:
  - How to remove or hide products
  - How to remove from New Arrivals
  - How to remove from homepage highlights
  - How to update store info
  - How to change homepage banner
  - How to remove/hide gallery photos
  - How to reorder gallery photos

---

## Testing Checklist

### Without Sanity Credentials

- [ ] Remove `.env.local` or comment out `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Run `npm run build` → Should pass
- [ ] Visit site → Should show local fallback products
- [ ] Logs should say "CMS not configured - using fallback data"

### With Sanity Credentials, Empty CMS

- [ ] Add `.env.local` with valid credentials
- [ ] Ensure Sanity Studio has no products
- [ ] Run `npm run build` → Should pass
- [ ] Visit site → Should show empty states (no fallback products)
- [ ] Logs should say "CMS configured but empty"

### With Sanity Credentials, Populated CMS

- [ ] Add products to Sanity Studio
- [ ] Mark some as "New Arrival"
- [ ] Run `npm run build` → Should pass
- [ ] Visit site → Should show CMS products only
- [ ] Homepage should show max 4 new arrivals
- [ ] Logs should say "Using CMS data (N products)"

### Hide/Delete Product in CMS

- [ ] Turn OFF "Show on Website" for a product → Product disappears from site
- [ ] Turn ON "Show on Website" for the product → Product reappears
- [ ] Delete a product entirely → Product never comes back

### Mobile Layout Preserved

- [ ] Product grid remains 2 columns on mobile
- [ ] WhatsApp buttons remain full-width
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scroll overflow

---

## Security Notes

- **No SANITY_API_TOKEN in NEXT_PUBLIC_*** — Never expose write tokens to client
- **Studio auth via Sanity OAuth** — No custom auth needed
- **Public reads use safe client** — No auth required for published content
- **ISR caching** — Reduces load on Sanity API

---

**Status:** ✅ Implemented and verified  
**Build:** ✅ Passing  
**Next Steps:** Migrate local products to CMS, train shop owner on Studio usage
