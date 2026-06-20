# Migrating Local Products to Sanity CMS

This guide explains how to transfer your existing local product data from `src/data/products.ts` into the Sanity CMS dashboard.

## Why Migrate?

Once Sanity CMS is configured and you start adding products through the dashboard, the local product data in `src/data/products.ts` becomes irrelevant. The website will use CMS data as the source of truth.

**Current behavior:**
- **CMS NOT configured** → Website uses local fallback data from `src/data/`
- **CMS configured** → Website uses ONLY CMS data (empty CMS = empty website)

This means you need to manually copy existing products into Sanity Studio once.

---

## Prerequisites

Before starting:
1. ✅ Sanity project created at https://sanity.io/manage
2. ✅ Environment variables added to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=ql5kwpe9
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. ✅ `/studio` route accessible and working
4. ✅ Logged into Sanity Studio (Google/GitHub/email)

---

## Migration Steps

### Step 1: Access Sanity Studio

1. Run `npm run dev` if not already running
2. Open browser to `http://localhost:3000/studio`
3. Sign in with your authorized account
4. You should see the Studio dashboard with empty content

---

### Step 2: Create Categories First

Products require categories, so create categories before products.

**Current local categories** (from `src/data/categories.ts`):
1. Boys Ethnic Wear
2. Girls Ethnic Wear
3. Girls Party Wear
4. Boys Casual Wear
5. Girls Casual Wear
6. Newborn Wear
7. Accessories

**For each category:**

1. Click **"Categories"** in sidebar → Click **"+"**
2. Fill in:
   - **Category Name**: (Example: Boys Ethnic Wear)
   - **Short Description**: Brief tagline (Example: Traditional wear for special occasions)
   - **Category Image**: Upload a representative image (optional)
   - **UI Accent Color**: Select a color (Blush, Mint, Sky, Peach, or Lilac)
   - **Display Order**: 1, 2, 3, etc. (lower numbers appear first)
   - **Show on Website**: ✅ ON
   - **Slug**: Click "Generate" (auto-generates from name)
3. Click **"Publish"**

Repeat for all 7 categories (or however many you need).

---

### Step 3: Migrate Products

Now manually copy each product from `src/data/products.ts` into Sanity Studio.

**Example local product:**
```typescript
{
  id: "girls-ethnic-kurta-set-1",
  name: "Girls Ethnic Embroidered Kurta Set",
  category: "girls-ethnic-wear",
  gender: "girls",
  ageGroup: "kids",
  ageRangeDisplay: "4–14 Years",
  sizes: ["4×10", "4×14", "6×12"],
  colors: ["Maroon", "Rose Gold", "Mint Green"],
  image: "/images/products/girls-ethnic-kurta-maroon.jpg",
  price: "Price on request",
  badge: "New Arrival",
  isNew: true,
  featured: true,
  description: "Beautiful ethnic kurta set with embroidery",
}
```

**To add in Studio:**

1. Click **"Products"** in sidebar → Click **"+"**

2. **Basic Product Details:**
   - **Product Name**: Girls Ethnic Embroidered Kurta Set
   - **Category**: Select from dropdown → Girls Ethnic Wear
   - **Gender**: Select → Girls
   - **Age Range Display**: 4–14 Years
   - **Available Sizes**: 4×10, 4×14, 6×12 (add one by one)
   - **Product Colors**: Select from list → Maroon, Rose Gold, Mint Green
   - **Price Text**: Price on Request

3. **Images:**
   - **Product Images**: Upload `/images/products/girls-ethnic-kurta-maroon.jpg`
   - **Image Alt Text**: Girls ethnic embroidered kurta set in maroon

4. **Website Display:**
   - **Badge**: New Arrival
   - **New Arrival**: ✅ ON
   - **Featured Product**: ✅ ON
   - **Stock Status**: In Stock
   - **Show on Website**: ✅ ON
   - **Display Order**: 1 (or appropriate number)

5. **Advanced/SEO** (collapsed — leave as-is or expand):
   - **Slug**: Click "Generate"

6. Click **"Publish"**

Repeat for all 11 products (or however many you have).

---

### Step 4: Add Store Information

Store info is a **singleton** — only one document should exist.

1. Click **"Store Information"** in sidebar
2. If no document exists, create one. If one exists, click to edit it.

3. **Contact Details:**
   - **Store Name**: Nouman Kids Wear
   - **Phone Number**: +91 XXXXXXXXXX (your real number)
   - **WhatsApp Number**: +91 XXXXXXXXXX
   - **Email Address**: (if available)

4. **Address:**
   - **Street Address**: (your shop's full address)
   - **City**: Adilabad
   - **State**: Telangana
   - **Postal Code**: (your pincode)
   - **Google Maps Link**: (optional — paste share link from Google Maps)

5. **Store Hours:**
   - **Opening Time**: 10:00 AM
   - **Closing Time**: 8:00 PM
   - **Open Days**: Monday to Saturday
   - **Weekly Holiday**: Sunday

6. **Social Media:**
   - **Instagram URL**: (full link to your Instagram)
   - **Facebook URL**: (full link to your Facebook page)

7. Click **"Publish"**

---

### Step 5: Add Homepage Banner (Optional)

If you want to customize the homepage hero section:

1. Click **"Homepage Banner"** in sidebar → Create document if none exists
2. Fill in:
   - **Main Heading**: Latest Kids Fashion in Adilabad
   - **Subtitle**: Premium kidswear for all occasions
   - **Background Image**: Upload a wide banner image (1920x600px recommended)
   - **Mobile Background Image**: Upload square/portrait image for mobile (800x1000px)
   - **Button Text**: Shop Now
   - **Button Link**: #catalogue
   - **Show Banner**: ✅ ON
3. Click **"Publish"**

If you skip this, the website will use default hero content (which is fine).

---

### Step 6: Add Gallery Images (Optional)

Upload photos of your physical store:

1. Click **"Gallery"** in sidebar → Click **"+"**
2. For each photo:
   - **Photo Title**: Descriptive name (Example: Store Front View)
   - **Upload Photo**: Select photo from computer
   - **Image Description**: Describe what's in the photo
   - **Photo Category**: Store Interior / Store Exterior / Product Display / Events / Other
   - **Display Order**: 1, 2, 3, etc.
   - **Show in Gallery**: ✅ ON
3. Click **"Publish"**

Add 5–10 gallery photos if available.

---

### Step 7: Add Featured Collections (Optional)

Create featured collection cards for the homepage:

1. Click **"Featured Collections"** in sidebar → Click **"+"**
2. Fill in:
   - **Collection Name**: Festival Special / Wedding Collection / Summer Casuals
   - **Description**: Brief 1-2 line description
   - **Collection Image**: Upload representative image
   - **UI Accent Color**: Select a color
   - **Display Order**: 1, 2, 3, etc.
   - **Show on Website**: ✅ ON
   - **Slug**: Click "Generate"
3. Click **"Publish"**

Repeat for 3–4 collections.

---

### Step 8: Verify on Website

1. Visit `http://localhost:3000` (refresh if already open)
2. Check that:
   - Products appear in catalogue
   - New arrivals show correctly (limited to 4 on homepage)
   - Categories display properly
   - Store info shows your real contact details
   - Gallery photos appear (if added)
   - Collections display (if added)

3. Check console logs in terminal:
   ```
   [Products] Using CMS data (11 products)
   [Categories] Using CMS data (7 categories)
   [Store Info] Using CMS data
   ```

If you see "Using CMS data" logs, migration is successful!

---

## Post-Migration

### What happens to local data?

**Local data files** (`src/data/products.ts`, `src/data/categories.ts`, etc.) **remain in the codebase as fallback** for when CMS is NOT configured.

They are **NOT deleted** because:
- They serve as fallback if Sanity credentials are removed
- They serve as reference for developers
- The website still works without Sanity in development

However, once your site goes live with Sanity configured, **only CMS data is used**.

### Can I delete local data files?

**Not recommended.** Keep them as fallback and reference.

If you really want to clean up (after migration is 100% complete and verified):
1. Keep the files but remove all product entries except 1–2 examples
2. Add a comment at the top: "// FALLBACK DATA — CMS is source of truth"
3. This way the fallback structure remains but with minimal placeholder data

---

## Troubleshooting

### "CMS configured but empty" after migration

**Cause:** Products exist in Studio but haven't been published yet.

**Fix:**
1. Go to each product in Studio
2. Make sure you clicked **"Publish"** (not just "Save draft")
3. Check that **"Show on Website"** toggle is ON

---

### Categories not showing in product dropdown

**Cause:** Categories not published or inactive.

**Fix:**
1. Go to Categories in Studio
2. Publish each category
3. Make sure **"Show on Website"** is ON

---

### Products show on Studio but not on website

**Cause:** Product is a draft or inactive.

**Fix:**
1. Open the product
2. Click **"Publish"** (publish icon in bottom right)
3. Make sure **"Show on Website"** toggle is ON
4. Refresh website

---

### New Arrivals section not showing

**Cause:** No products marked as "New Arrival", or all are inactive.

**Fix:**
1. Open products you want as new arrivals
2. Turn ON **"New Arrival"** toggle in **Website Display** section
3. Click **"Publish"**
4. Refresh website

Homepage limits to 4 new arrivals. If you have more than 4, only the first 4 (by display order) will show.

---

### Store info not updating on website

**Cause:** Store info not published or browser cache.

**Fix:**
1. Open Store Information in Studio
2. Click **"Publish"**
3. Hard refresh website (Ctrl+Shift+R or Cmd+Shift+R)
4. Wait 60 seconds (ISR revalidation time)

---

## Need Help?

- **CMS not working?** Check `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Studio won't load?** Make sure `/studio` route works and you're logged in
- **Products not showing?** Check they are Published and Active
- **Images broken?** Verify image uploads completed successfully in Studio

For technical issues, contact your web developer.

---

**Migration Complete!** 🎉

Your local data is now in Sanity CMS. The shop owner can manage everything from the Studio dashboard going forward.
