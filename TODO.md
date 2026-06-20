# Nouman Kids Wear — Task List

Organized by priority. Complete Phase 1 before launch. Phase 2 can be iterative post-launch.

---

## Phase 1: Critical Fixes & Polish (Pre-Launch)

### 1. Fix Splash Video ⚠️
**File**: `src/components/common/SplashScreen.tsx`  
**Issue**: Video not playing on mount  
**Possible causes**:
- Browser autoplay policy blocking (needs `muted` + `playsInline`)
- Video path incorrect
- `autoPlay` prop not set correctly
- Video format compatibility (MP4 should work)

**Action**:
- Verify video file path: `/brand/nouman-logo-splash.mp4`
- Ensure `autoPlay`, `muted`, `playsInline` all set
- Test in multiple browsers (Chrome, Safari, Firefox)
- Add error handling (`onError` callback)

---

### 2. Fix Hero Background Image ⚠️
**File**: `src/components/sections/Hero.tsx`  
**Issue**: Background image not visible  
**Possible causes**:
- Parent container missing `position: relative`
- Next Image with `fill` needs explicit parent sizing
- Gradient overlay too opaque (hiding image)
- Image path incorrect
- `priority` prop missing (lazy load blocking initial paint)

**Action**:
- Verify image path: `/hero/nouman-hero-bg.png`
- Check parent container has `relative` positioning
- Test gradient opacity values (reduce from/via values)
- Ensure `fill` + `sizes="100vw"` set correctly
- Add `priority` prop for above-fold image

---

### 3. Fix New Arrivals Auto-Transition ✅ COMPLETED
**File**: `src/components/sections/HeroNewArrivals.tsx`  
**Status**: Carousel now auto-advances every 1.8 seconds  
**Completed**:
- Fixed interval reference management with `intervalRef`
- Improved embla API initialization check
- Changed from `canScrollNext()` to loop back to start
- Cleaned up event handlers for pause/resume on hover/focus
- Shows exactly 4 new arrivals as specified
- Auto-transition pauses when user hovers or focuses on carousel
- Respects `prefers-reduced-motion` user preference

---

### 4. Improve Brand Title/Logo Lockup ✅ COMPLETED
**File**: `src/components/sections/Hero.tsx` (lines ~60–75)  
**Status**: Brand title significantly larger and more prominent  
**Completed**:
- Mobile: Increased from `text-[2.4rem]` to `text-[2.8rem]` (17% larger)
- Desktop: Added `lg:text-[4rem]` for even more impact on large screens
- Logo sizes adjusted: `size-14 sm:size-16 lg:size-20` (better balanced)
- Improved spacing throughout hero section
- Better mobile responsiveness

---

### 5. UI Polish & Refinement ✅ COMPLETED
**Files**: All section and card components  
**Status**: Mobile-first optimization with better spacing and typography

**Completed**:
- **Mobile-first spacing**: Reduced from `px-4 pb-12` to `px-3.5 pb-10` (20% tighter on mobile)
- **Section headings**: Scale properly from `text-xl` → `sm:text-2xl` → `lg:text-3xl`
- **Product grid**: Tighter gaps on mobile (`gap-3` vs `gap-3.5`)
- **Product cards**: Smaller text and padding on mobile, scales up on larger screens
- **Category grid**: Optimized 2-column layout with `gap-2` on mobile
- **Typography**: All text scales gradually (mobile → tablet → desktop)
- **Touch targets**: Minimum 44px height for all buttons
- **Hero section**: Comprehensive mobile optimization (see #4 above)

**Mobile-first principles applied**:
- Base styles target 375px width (smallest common iPhone)
- Spacing and typography scale UP from mobile baseline
- No desktop-first retrofitting with `max-` classes
- Touch-optimized interactions
- Content-first approach (decorative elements hidden on mobile)

---

### 6. Verify Mobile Layout 📱
**Files**: All components  
**Goal**: Perfect mobile experience (most users browse on phone)

**Actions**:
- Test at 375px, 390px, 414px widths (common mobile sizes)
- Check touch target sizes (min 44px height for buttons)
- Verify horizontal scroll works for category chips
- Test sticky header doesn't cover content
- Ensure images don't cause horizontal overflow
- Check text remains readable (no tiny fonts)
- Test mobile menu Sheet (right slide-in, proper close behavior)

---

### 7. Run Production Build ✅
**Command**: `npm run build`  
**Goal**: Catch type errors, build warnings, optimization issues

**Actions**:
- Fix any TypeScript errors
- Resolve ESLint warnings
- Check for unused imports
- Verify no `console.log` left in production code
- Ensure build completes without errors
- Test production build locally: `npm run start`

---

## Phase 2: Content & Deployment (Post-Development)

### 8. Replace Stock Product Images ✅ COMPLETED
**File**: `src/data/products.ts`  
**Status**: Real product images now loaded from `/images/products/`  
**Completed**:
- All 11 real Nouman Kids Wear product images integrated
- Product data updated with accurate names, categories, and age ranges
- New categories added: Boys Ethnic Wear, Girls Party Wear, Girls Ethnic Wear, Girls Lehenga Choli
- Age range display added to product cards
- Image positioning optimized (`object-[center_top]`) to avoid cutting dresses
- New Arrivals section updated with 4 featured products
- Collection hero images updated with real product photos

---

### 9. Update Contact Information ☎️
**File**: `src/data/site.ts`  
**Current**: Placeholder phone/WhatsApp numbers  
**Action**:
- Confirm real Nouman Kids Wear contact details:
  - WhatsApp number (digits only, with country code)
  - Display phone number (formatted with spaces/dashes)
  - Email address (if available)
  - Exact shop address with pincode
  - Business hours (weekdays + weekends)
- Update `SITE` object with real values
- Test WhatsApp links open correctly

---

### 10. Add Real Store Gallery Photos 🏪
**File**: `src/components/sections/StoreGallery.tsx`  
**Current**: Shows placeholder tiles with doodles  
**Action**:
- Receive 6–8 photos of physical store (interior + exterior)
- Optimize images (1200px width, WebP format)
- Place in `public/gallery/` directory
- Update `StoreGallery.tsx` to render real images
- Add captions if relevant (e.g., "Kids section", "Party wear display")

---

### 11. Populate Product Catalogue with Real Inventory 🛍️
**File**: `src/data/products.ts`  
**Current**: 12 placeholder products  
**Action**:
- Client provides full inventory list:
  - Product names
  - Categories (boys-wear, girls-wear, etc.)
  - Gender (boys/girls/unisex)
  - Age groups (newborn/toddler/kids/juniors)
  - Available sizes
  - Brief descriptions
- Add all products to `PRODUCTS` array
- Mark new arrivals with `isNew: true`
- Mark bestsellers/featured with `featured: true`
- Assign appropriate collections

---

### 12. Deploy to Vercel/Netlify/Cloudflare ☁️
**Platform**: Vercel (recommended for Next.js)  
**Domain**: Client-owned domain

**Actions**:
- Create Vercel account (free tier, no hosting fees)
- Connect GitHub repo
- Configure build settings:
  - Build command: `npm run build`
  - Output directory: `.next`
  - Node version: 20.x
- Set environment variables (if any)
- Deploy to production
- Connect custom domain:
  - Add domain in Vercel dashboard
  - Update DNS records (A/CNAME) at domain registrar
  - Enable auto SSL (Vercel provides free SSL)

**Alternative: Netlify**
- Similar process, free tier available
- Better for static sites, but Next.js SSR supported

**Alternative: Cloudflare Pages**
- Free tier with CDN benefits
- Next.js support via adapter

---

### 13. Integrate Sanity CMS ✅ COMPLETED
**Status**: Full CMS integration with graceful fallbacks + shop owner-friendly Studio  
**Files**: See `SANITY_CMS_INTEGRATION.md` for complete documentation, `CLIENT_CMS_GUIDE.md` for shop owner guide

**Completed**:
- Installed `@sanity/vision` dependency
- Created comprehensive Sanity configuration (`sanity.config.ts`)
- Built 6 schema types:
  - `product` - Products with images, sizes, categories, badges
  - `category` - Categories with accent colors and images
  - `heroBanner` - Hero content management
  - `galleryImage` - Store gallery images with sections
  - `featuredCollection` - Featured collection cards
  - `storeInfo` - Store contact and business info
- Created client, queries, and data fetching utilities
- Added fetch layers with automatic fallback to local data:
  - `fetchProducts.ts` - Products with fallback to `PRODUCTS`
  - `fetchCategories.ts` - Categories with fallback to `CATEGORIES`
  - `fetchSiteInfo.ts` - Store info with fallback to `SITE`
- Studio route created at `/studio` (shows setup instructions)
- Updated `next.config.ts` for Sanity CDN images
- Created `.env.local.example` with required environment variables
- **Simplified Studio for non-technical shop owner**:
  - Custom sidebar structure with clear labels and emoji icons
  - Store Information as singleton (prevents multiple documents)
  - Homepage Banner as singleton
  - Product schema organized into fieldsets (Basic, Images, Display, Advanced/SEO collapsed)
  - All fields have helpful descriptions in plain language
  - Better document previews showing key info
  - Slug auto-generation (minimal technical exposure)
  - Color options for products (20 colors available)
  - Created comprehensive `CLIENT_CMS_GUIDE.md` with step-by-step instructions
- **Site works perfectly WITHOUT Sanity credentials** (uses local data)
- Build passes with 0 errors
- Ready for CMS connection when client is ready

**Shop Owner Benefits**:
- User-friendly CMS interface (feels like shop dashboard, not developer tool)
- No technical knowledge required
- Can manage all content from one dashboard
- Add/edit products, categories, images, store info
- Preview changes before publishing
- Active/inactive toggles for content (hide without deleting)
- Display order controls for sorting
- Simple photo uploads with automatic optimization
- Clear field labels with examples
- Helpful descriptions guide data entry

**Next Steps**:
1. Create Sanity project at https://sanity.io/manage
2. Add credentials to `.env.local` (see `.env.local.example`)
3. Visit `/studio` to access CMS
4. Follow `CLIENT_CMS_GUIDE.md` to populate content
5. Share guide with shop owner for ongoing content management

---

## Quick Wins (Optional Enhancements)

These are nice-to-have improvements that can be added anytime:

- [ ] Add breadcrumb navigation (if adding product detail pages)
- [ ] Add "Scroll to top" button (appears after scrolling down)
- [ ] Add FAQ accordion section (common questions about sizing, delivery, etc.)
- [ ] Add customer testimonials/reviews section
- [ ] Add "Share on WhatsApp" buttons for individual products
- [ ] Add simple analytics (Google Analytics or privacy-friendly Plausible)
- [ ] Add sitemap.xml for SEO
- [ ] Add robots.txt
- [ ] Add OpenGraph images for social sharing
- [ ] Improve loading states (skeleton screens for product grids)
- [ ] Add error boundary for graceful error handling

---

## Testing Checklist (Before Launch)

- [ ] Run `npm run build` — no errors
- [ ] Test on Chrome (desktop + mobile)
- [ ] Test on Safari (iOS)
- [ ] Test on Firefox
- [ ] Verify all images load
- [ ] Test all WhatsApp links (open correct app/web.whatsapp.com)
- [ ] Test navigation (all anchor links work)
- [ ] Test mobile menu (opens, closes, links work)
- [ ] Test contact form (if present)
- [ ] Check page load speed (Lighthouse/PageSpeed Insights)
- [ ] Verify SEO metadata (title, description, OpenGraph tags)
- [ ] Check accessibility (keyboard navigation, screen reader test)
- [ ] Test on slow network (throttle to 3G)
- [ ] Verify reduced motion preferences respected
- [ ] Check console for errors/warnings
- [ ] Test with JavaScript disabled (should still show content)

---

## Post-Launch Monitoring

After going live:

- [ ] Monitor Vercel deployment logs for errors
- [ ] Check Google Search Console (submit sitemap)
- [ ] Monitor page speed (aim for <3s load time)
- [ ] Collect user feedback (WhatsApp enquiries, in-store feedback)
- [ ] Track top enquired products (ask clients)
- [ ] Plan content updates (new arrivals, seasonal collections)

---

**Last updated**: Session start  
**Next action**: Start Phase 1 fixes (splash video, hero background, auto-slider)
