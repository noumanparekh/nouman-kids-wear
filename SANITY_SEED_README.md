# Sanity CMS Seed Guide

Complete guide for importing initial product catalogue into Sanity CMS.

---

## What This Does

The seed script:
- ✅ Uploads real product images from `public/images/products/` to Sanity CDN
- ✅ Creates 4 categories (Boys Ethnic Wear, Girls Party Wear, etc.)
- ✅ Creates 14 products with proper category references
- ✅ Sets up new arrivals (4 jacket gowns)
- ✅ Makes all products **fully editable in Sanity Studio**
- ✅ Uses stable IDs to prevent duplicates on re-run

**After seeding, Sanity CMS becomes the source of truth.** All products are real Sanity documents that you can edit, publish, hide, or delete through the Studio.

---

## Prerequisites

Before running the seed:

### 1. Sanity Project Created

- ✅ Project created at https://sanity.io/manage
- ✅ Project ID: `ql5kwpe9`
- ✅ Dataset: `production`

### 2. Environment Variables Set

Check `.env.local` has:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=ql5kwpe9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Product Images Exist

Check these images exist in `public/images/products/`:
- `boys/boys-black-ethnic-sherwani-1-14yr.jpeg`
- `boys/girls/girls-*.jpeg` (10 images)

Run to verify:
```bash
dir public\images\products\boys\girls
```

You should see 10 girl's product images.

---

## Step-by-Step Seed Process

### Step 1: Create Sanity Write Token

You need a write token to upload images and create documents.

1. Go to https://sanity.io/manage
2. Click on your project (`nouman-kids-wear`)
3. Go to **API** → **Tokens** in the sidebar
4. Click **"Add API token"** button
5. Fill in:
   - **Label:** Seed Script Write Token
   - **Permissions:** Editor
   - **Expiry:** Never (or set a date if you want)
6. Click **"Add token"**
7. **Copy the token immediately** (you won't be able to see it again)

### Step 2: Add Token to .env.local

Open `.env.local` and add the token:

```bash
SANITY_API_WRITE_TOKEN=skAbCdEfGhIjKlMnOpQrStUvWxYz1234567890...
```

**Important:**
- ⚠️ Do NOT commit this token to Git
- ⚠️ Do NOT share this token publicly
- ✅ `.env.local` is already in `.gitignore`

### Step 3: Verify Connection

Before seeding, check your Sanity connection:

```bash
npm run sanity:check
```

**Expected output:**
```
🔍 Checking Sanity CMS connection...

Configuration:
  • Project ID: ql5kwpe9
  • Dataset: production
  • API Version: 2024-01-01

📁 Categories: 0
🛍️  Products (total): 0
  └─ Active: 0
  └─ New Arrivals: 0
  └─ Featured: 0
🖼️  Gallery Images: 0
🏪 Store Information: 0
🎯 Hero Banners: 0
⭐ Featured Collections: 0

✅ Connection successful!
⚠️  No active products found. Run: npm run sanity:seed
```

If you see errors:
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check project exists at https://sanity.io/manage
- Check internet connection

### Step 4: Run Seed Script

Now seed the initial catalogue:

```bash
npm run sanity:seed
```

**Expected output:**
```
🌱 Starting Sanity CMS seed...

📦 Project: ql5kwpe9
📊 Dataset: production

📁 Seeding categories...
  ✓ Boys Ethnic Wear
  ✓ Girls Party Wear
  ✓ Girls Ethnic Wear
  ✓ Girls Lehenga Choli
✅ Created 4 categories

🛍️  Seeding products...
  ✓ Uploaded: boys-black-ethnic-sherwani-1-14yr.jpeg
  ✓ Boys Black Ethnic Sherwani
  ✓ Uploaded: girls-dusty-pink-princess-gown-4-10yr.jpeg
  ✓ Girls Dusty Pink Princess Gown
  ... (12 more products)
✅ Created 14 products with 11 images

✨ Seed completed successfully!

Summary:
  • 4 categories
  • 14 products
  • 11 images uploaded

📝 Next steps:
  1. Run: npm run sanity:check
  2. Visit: http://localhost:3000/studio
  3. Verify all products are Published (not Draft)
  4. Run: npm run build
  5. Visit: http://localhost:3000
```

**What it does:**
1. Creates 4 categories with stable IDs
2. Uploads 11 product images to Sanity CDN
3. Creates 14 product documents with image references
4. Marks 4 products as "New Arrivals"
5. Marks 9 products as "Featured"

### Step 5: Verify Seed Worked

Check counts after seeding:

```bash
npm run sanity:check
```

**Expected output:**
```
📁 Categories: 4
🛍️  Products (total): 14
  └─ Active: 14
  └─ New Arrivals: 4
  └─ Featured: 9
```

All counts should match the seed script output.

### Step 6: Verify in Sanity Studio

1. Start dev server (if not already running):
   ```bash
   npm run dev
   ```

2. Open Sanity Studio:
   ```
   http://localhost:3000/studio
   ```

3. Sign in with your Sanity account

4. Check:
   - ✅ **Products** section shows 14 products
   - ✅ Each product has an image thumbnail
   - ✅ Products show "Published" status (green checkmark)
   - ✅ You can click and edit any product
   - ✅ **Categories** section shows 4 categories

**Important:** Products are created as **published documents** by default. They should already be live, not drafts.

### Step 7: Verify on Website

1. Visit your local site:
   ```
   http://localhost:3000
   ```

2. Check:
   - ✅ Product catalogue shows all 14 products
   - ✅ Product images load correctly (from Sanity CDN)
   - ✅ "New Arrivals" section shows 4 jacket gowns
   - ✅ Featured products appear
   - ✅ Categories display correctly

3. Check browser console (F12):
   - Should see: `[Products] Using CMS data (14 products)`
   - Should see: `[Categories] Using CMS data (4 categories)`

If you see "Using CMS data", seed was successful!

### Step 8: Build and Deploy

Run production build to verify everything works:

```bash
npm run build
```

**Expected:**
```
✓ Compiled successfully
✓ Generating static pages (4/4)
✓ Finalizing page optimization

[Products] Using CMS data (14 products)
[New Arrivals] Using CMS data (4 items)
[Categories] Using CMS data (4 categories)
```

Build should complete with 0 errors.

---

## Seeded Products List

### Categories (4)

1. **Boys Ethnic Wear** (Sky blue accent)
2. **Girls Party Wear** (Blush pink accent)
3. **Girls Ethnic Wear** (Peach accent)
4. **Girls Lehenga Choli** (Mint green accent)

### Products (14)

#### Boys Ethnic Wear (1)
1. Boys Black Ethnic Sherwani (1–14 Years, size 1×14)

#### Girls Party Wear (7)
2. Girls Dusty Pink Princess Gown (4–10 Years, size 4×10)
3. Girls Rose Gold Party Gown (1–14 Years, size 1×14)
4. Girls White Party Gown (1–14 Years, size 1×14)
5. **NEW** Girls Black Jacket Gown (4–10 Years, size 24×40)
6. **NEW** Girls Mint Green Jacket Gown (4–10 Years, size 24×40)
7. **NEW** Girls Olive Green Jacket Gown (4–10 Years, size 24×40)
8. **NEW** Girls Maroon Jacket Gown (4–10 Years, size 24×40)

#### Girls Ethnic Wear (2)
9. Girls Black Embroidered Ethnic Gown (4–10 Years, size 4×10)
10. **NEW** Girls Mint Green Embroidered Gown (4–10 Years, size 4×10)

#### Girls Lehenga Choli (4)
11. Girls Beige Gold Lehenga Choli (4–14 Years, size 4×14)
12. **NEW** Girls Olive Green Lehenga Choli (4–14 Years, size 4×14)
13. Girls Silver Grey Floral Cape Lehenga (4–14 Years, size 4×14)
14. Girls Teal Blue Lehenga Choli (4–14 Years, size 4×14)

**NEW** = Marked as "New Arrival" (4 total)  
**Featured** = 9 products marked as featured

---

## Managing Products After Seed

### Editing Products in Studio

1. Go to http://localhost:3000/studio
2. Click **"Products"** in sidebar
3. Click on any product
4. Edit fields (name, sizes, colors, images, etc.)
5. Click **"Publish"** to save changes
6. Refresh website → changes appear within 60 seconds

### Adding New Products

1. Go to Studio → **Products** → Click **"+"**
2. Fill in all required fields
3. Upload product images
4. Click **"Publish"**
5. Product appears on website

### Hiding Products

1. Open product in Studio
2. Scroll to **"Website Display Settings"**
3. Turn OFF **"Show on Website"** toggle
4. Click **"Publish"**
5. Product disappears from website (but stays in Studio)

### Marking as New Arrival

1. Open product in Studio
2. Scroll to **"Website Display Settings"**
3. Turn ON **"Mark as New Arrival"** toggle
4. Click **"Publish"**
5. Product appears in "New Arrivals" section (limited to 4 on homepage)

### Deleting Products

1. Open product in Studio
2. Click **"..." menu** (top right)
3. Select **"Delete"**
4. Confirm deletion
5. Product permanently removed

**⚠️ Deletion is permanent.** Consider hiding instead.

---

## Troubleshooting

### "SANITY_API_WRITE_TOKEN is not set"

**Cause:** Token missing from `.env.local`

**Fix:**
1. Create token at https://sanity.io/manage → API → Tokens
2. Add to `.env.local`:
   ```
   SANITY_API_WRITE_TOKEN=your_token_here
   ```
3. Restart terminal and run seed again

---

### Images not showing on website (Next.js 16 IPv6 Issue)

**Symptoms:**
- Seed runs successfully
- Products show in Studio with thumbnails
- Website shows products but images don't load
- Console error: `upstream image https://cdn.sanity.io/images/... resolved to private ip`

**Cause:** Next.js 16 security feature blocks certain IPv6 addresses from Sanity CDN in development

**Fix:**
The dev script has been updated to bypass this check. Simply restart your dev server:

1. Stop the dev server (Ctrl+C)
2. Run: `npm run dev` (now includes `--hostname 0.0.0.0` flag)
3. Images should now load correctly

**Note:** This issue only affects local development. Vercel deployment works fine.

---

### "Image not found: public/images/products/..."

**Cause:** Product image file missing

**Fix:**
1. Check image exists:
   ```bash
   dir public\images\products\boys\girls
   ```
2. If missing, seed will skip that image and continue
3. Product will be created without image
4. You can upload image later in Studio

---

### Seed runs but website still empty

**Cause:** Products created as drafts instead of published

**Fix:**
1. Go to Studio → Products
2. For each product:
   - Click to open
   - Click **"Publish"** button (bottom right)
3. Refresh website

---

### "Conflicting documents" error

**Cause:** Documents with same ID already exist

**Fix:**
- Seed script uses `createOrReplace()` to update existing documents
- This is intentional - re-running seed updates products without duplicating
- If you want fresh start, delete all products in Studio first

---

### Website shows "Using fallback data" after seed

**Cause:** CMS not configured or connection issue

**Fix:**
1. Check `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=ql5kwpe9`
2. Run `npm run sanity:check` to verify connection
3. Restart dev server: `npm run dev`

---

## Re-running Seed

Safe to run seed multiple times:

```bash
npm run sanity:seed
```

**What happens:**
- Existing documents are **updated**, not duplicated
- Stable document IDs prevent duplicates
- Images are re-uploaded (no duplicates in media library)
- Useful for resetting catalogue to initial state

**Use cases:**
- Reset after testing edits
- Update product data in bulk
- Re-upload images after changes

---

## Removing Write Token After Seed

Once seeding is complete, you can:

1. **Revoke the token** at https://sanity.io/manage → API → Tokens
2. **Or** keep it in `.env.local` for future re-seeding

Token is never used by the public website. It's only for seed script.

---

## Security Notes

✅ **SANITY_API_WRITE_TOKEN is server-only**
- Never used in browser/client code
- Only used by seed script
- Safe to keep in `.env.local` (gitignored)

✅ **Public website reads without auth**
- Uses public Sanity client
- No token needed for published content
- ISR caching (60s) reduces API load

❌ **Never expose write token**
- Don't commit to Git
- Don't use in `NEXT_PUBLIC_*` variables
- Don't share publicly

---

## Next Steps After Seeding

1. ✅ Verify products in Studio
2. ✅ Edit product details as needed
3. ✅ Upload real product photos to replace placeholder images
4. ✅ Update product descriptions
5. ✅ Add store information (Studio → Store Information)
6. ✅ Add homepage banner (Studio → Homepage Banner)
7. ✅ Add gallery photos (Studio → Gallery)
8. ✅ Deploy to Vercel with environment variables
9. ✅ Train shop owner on Studio usage

**Your catalogue is now live and manageable through Sanity Studio!** 🎉

---

## Support

If you encounter issues:

1. Check this README first
2. Run `npm run sanity:check` to verify connection
3. Check Studio at http://localhost:3000/studio
4. Verify `.env.local` has correct values
5. Check browser console for errors

For Sanity-specific issues:
- Docs: https://www.sanity.io/docs
- Project dashboard: https://sanity.io/manage

---

**Last Updated:** June 2026
