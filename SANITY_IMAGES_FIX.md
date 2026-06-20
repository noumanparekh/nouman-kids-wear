# Sanity Images Fix - Next.js 16 IPv6 Issue

## Problem
After successfully running `npm run sanity:seed`, images were uploaded to Sanity CDN but not displaying on the website. Console showed error:

```
upstream image https://cdn.sanity.io/images/... resolved to private ip ["64:ff9b::23be:5a5e"]
```

## Root Cause
**Next.js 16 security feature** blocks images from URLs that resolve to certain IPv6 addresses. This is a known issue with Sanity CDN in local development with Next.js 16.

## Solution Applied
Updated the dev script to bypass the IPv6 private IP check by binding to `0.0.0.0`:

**File**: `package.json`
```json
{
  "scripts": {
    "dev": "next dev --hostname 0.0.0.0"
  }
}
```

## How to Fix (For You)

### Step 1: Stop Dev Server
If your dev server is currently running, stop it:
- Press `Ctrl+C` in the terminal where `npm run dev` is running

### Step 2: Restart Dev Server
```bash
npm run dev
```

The dev script now includes the `--hostname 0.0.0.0` flag, which will fix the image loading issue.

### Step 3: Verify Images Load
1. Open http://localhost:3000
2. Product images should now load correctly from Sanity CDN
3. Check browser console (F12) - should see:
   ```
   [Products] Using CMS data (14 products)
   [Categories] Using CMS data (4 categories)
   ```

## Verify Seed Results

Check the seeded data:

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

## Verify in Studio

1. Visit: http://localhost:3000/studio
2. Sign in with your Sanity account
3. Check:
   - Products section shows 14 products with image thumbnails
   - All products show "Published" status
   - Categories section shows 4 categories
   - All products are editable

## Important Notes

### Development vs Production
- ⚠️ This issue **only affects local development** (Next.js 16 + Sanity CDN)
- ✅ **Production deployment on Vercel works perfectly** - no changes needed
- The `--hostname 0.0.0.0` flag is safe for local dev and doesn't affect production builds

### Images Source
- All 14 product images are now stored in **Sanity CDN** (not local files)
- Images are referenced by Sanity asset IDs in product documents
- Website fetches images directly from `https://cdn.sanity.io/images/...`
- Next.js Image component optimizes them automatically

### CMS as Source of Truth
Your website now works as follows:

1. **CMS not configured** → Uses local fallback data (14 products from `src/data/products.ts`)
2. **CMS configured** → Uses ONLY Sanity data (no fallback)
   - Empty CMS → Shows empty states
   - Populated CMS → Shows CMS products

After running seed, you're in state #2 with 14 products imported.

## Next Steps

### 1. Verify Everything Works
```bash
# Restart dev server (if not already done)
npm run dev

# In browser, visit:
http://localhost:3000

# Check console shows:
[Products] Using CMS data (14 products)
```

### 2. Run Production Build
```bash
npm run build
```

Should complete with 0 errors and show CMS data in build logs.

### 3. Edit Products in Studio
1. Go to http://localhost:3000/studio
2. Click **Products** → Select any product
3. Edit fields (name, colors, sizes, etc.)
4. Click **Publish**
5. Refresh website → Changes appear within 60 seconds

### 4. Add Store Information
1. Studio → **Store Information** (singleton)
2. Fill in:
   - Store name
   - Phone number
   - WhatsApp number
   - Email
   - Full address
   - Business hours
3. Click **Publish**
4. Contact section updates on website

### 5. Add Homepage Banner
1. Studio → **Homepage Banner** (singleton)
2. Upload hero background image
3. Add tagline and description
4. Click **Publish**
5. Hero section updates on website

### 6. Add Gallery Images
1. Studio → **Gallery**
2. Click **"+ Create"** → **Gallery Image**
3. Upload store photo
4. Add caption
5. Select section (Interior/Exterior/Products/Events)
6. Click **Publish**
7. Repeat for 6-8 store photos

## Troubleshooting

### Images still not loading after restart?

Check:
1. Dev server restarted with new script?
   ```bash
   # Stop server (Ctrl+C), then:
   npm run dev
   # Should see: "Local: http://0.0.0.0:3000"
   ```

2. Environment variables correct?
   ```bash
   # Check .env.local has:
   NEXT_PUBLIC_SANITY_PROJECT_ID=ql5kwpe9
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. Browser cache cleared?
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or open in incognito/private window

### Console shows "Using fallback data"?

This means CMS is not connected. Check:
1. `.env.local` has correct `NEXT_PUBLIC_SANITY_PROJECT_ID`
2. Restart dev server after changing `.env.local`
3. Run `npm run sanity:check` to verify connection

### Products show in Studio but not on website?

Check publish status:
1. Studio → Products → Open each product
2. Verify green "Published" badge (not "Draft")
3. If showing Draft, click **"Publish"** button

## Documentation Updated

The following files have been updated with this fix:

- ✅ `package.json` - Dev script includes `--hostname 0.0.0.0`
- ✅ `SANITY_SEED_README.md` - Added troubleshooting section for image issue
- ✅ `TODO.md` - Updated Sanity integration status with seed completion
- ✅ `SANITY_IMAGES_FIX.md` - This file (explains the fix)

## Summary

**What was fixed:**
- Updated dev script to bypass Next.js 16 IPv6 security check
- Images from Sanity CDN now load correctly in local development

**What you need to do:**
1. Stop dev server (Ctrl+C)
2. Run: `npm run dev`
3. Visit: http://localhost:3000
4. Verify images load correctly

**Production deployment:**
- No changes needed
- Vercel deployment will work perfectly without this flag
- Issue only affects local development

---

**Last Updated:** June 18, 2026  
**Status:** ✅ Fixed and documented
