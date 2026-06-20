# Deploying Nouman Kids Wear to Vercel

Complete guide for deploying your Next.js site to Vercel with Sanity CMS.

---

## Prerequisites

Before deploying:
- ✅ GitHub repository created and code pushed
- ✅ Sanity project created at https://sanity.io/manage
- ✅ Local development working (`npm run dev` and `/studio` accessible)
- ✅ Build passes locally (`npm run build` with 0 errors)

---

## Part 1: Vercel Environment Variables

When deploying to Vercel, you need to add environment variables for Sanity CMS.

### Required Environment Variables

Add these in your Vercel project settings:

#### 1. `NEXT_PUBLIC_SANITY_PROJECT_ID`

- **Value:** `ql5kwpe9` (your Sanity project ID)
- **Environment:** Production, Preview, Development (all)
- **Exposed to browser:** Yes (safe - it's just a project identifier)

#### 2. `NEXT_PUBLIC_SANITY_DATASET`

- **Value:** `production`
- **Environment:** Production, Preview, Development (all)
- **Exposed to browser:** Yes (safe - dataset name is public)

#### 3. `NEXT_PUBLIC_SANITY_API_VERSION`

- **Value:** `2024-01-01`
- **Environment:** Production, Preview, Development (all)
- **Exposed to browser:** Yes (safe - API version is public)

### Optional Environment Variable

#### 4. `SANITY_API_TOKEN`

- **Value:** (Get from Sanity project settings → API → Tokens)
- **Environment:** Production, Preview, Development (all)
- **Exposed to browser:** NO (keep secret - server-only)
- **When needed:** 
  - Preview/draft content mode
  - Server-side content mutations
  - NOT needed for normal public website operation

**For now, skip this.** Your website reads published content without authentication.

---

## Part 2: How to Add Environment Variables in Vercel

### Option A: During Initial Deployment

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Before clicking "Deploy", scroll to **Environment Variables** section
4. Add each variable:
   - Variable name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Value: `ql5kwpe9`
   - Environments: Check all (Production, Preview, Development)
   - Click "Add"
5. Repeat for the other two variables
6. Click **"Deploy"**

### Option B: After Deployment

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in left sidebar
4. Click **"Add New"** button
5. For each variable:
   - **Key:** `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Value:** `ql5kwpe9`
   - **Environments:** Select all (Production, Preview, Development)
   - Click **"Save"**
6. Repeat for remaining variables
7. **Redeploy** your site for changes to take effect:
   - Go to **"Deployments"** tab
   - Click "..." menu on latest deployment
   - Click **"Redeploy"**

---

## Part 3: Complete Environment Variables List

Copy these into Vercel (one at a time):

```
Variable 1:
Key: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: ql5kwpe9
Environments: ✅ Production ✅ Preview ✅ Development

Variable 2:
Key: NEXT_PUBLIC_SANITY_DATASET
Value: production
Environments: ✅ Production ✅ Preview ✅ Development

Variable 3:
Key: NEXT_PUBLIC_SANITY_API_VERSION
Value: 2024-01-01
Environments: ✅ Production ✅ Preview ✅ Development
```

**That's it!** You only need these 3 variables.

---

## Part 4: Verify Deployment

After deployment completes:

### 1. Check Deployment Logs

1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"Building"** to see build logs
4. Look for:
   ```
   ✓ Compiled successfully
   ✓ Generating static pages
   ```
5. Build should complete with 0 errors

### 2. Visit Your Site

1. Click **"Visit"** button to open deployed site
2. Check:
   - ✅ Homepage loads correctly
   - ✅ Products appear (if you've added them to Sanity)
   - ✅ No console errors (open browser DevTools → Console)
   - ✅ Images load properly
   - ✅ WhatsApp buttons work
   - ✅ Mobile layout looks good (test on phone)

### 3. Check CMS Integration

1. Visit `https://your-site.vercel.app/studio`
2. Should show Sanity Studio login
3. Sign in with your Sanity account
4. Studio should load correctly
5. Try creating/editing a product
6. Publish the product
7. Visit homepage → Product should appear within 60 seconds

### 4. Check Console Logs (Optional)

If you want to verify CMS is working:

1. Go to Vercel project dashboard
2. Click **"Functions"** tab (or **"Logs"** if available)
3. Look for logs like:
   ```
   [Products] Using CMS data (11 products)
   [Categories] Using CMS data (7 categories)
   ```

If you see these, CMS integration is working perfectly!

---

## Part 5: Troubleshooting

### Issue: Build fails with "Module not found"

**Cause:** Missing dependencies

**Fix:**
1. Locally run: `npm install`
2. Commit `package-lock.json` changes
3. Push to GitHub
4. Vercel will auto-redeploy

---

### Issue: Site shows local fallback products, not CMS products

**Cause:** Environment variables not set correctly

**Fix:**
1. Go to Vercel project → **Settings** → **Environment Variables**
2. Verify all 3 variables are present and spelled correctly
3. Make sure **Production** environment is checked
4. Click **"Redeploy"** after making changes

---

### Issue: `/studio` shows 404 error

**Cause:** Studio route not deploying correctly

**Fix:**
1. Check `src/app/studio/[[...tool]]/page.tsx` exists
2. Locally run `npm run build` to verify it works
3. Push any fixes to GitHub
4. Vercel will auto-redeploy

---

### Issue: Products show in Studio but not on website

**Cause:** Products not published or inactive

**Fix:**
1. Open Sanity Studio
2. For each product:
   - Click **"Publish"** button (not just "Save draft")
   - Make sure **"Show on Website"** toggle is ON
   - Make sure **"active"** field is true
3. Wait 60 seconds (ISR revalidation)
4. Hard refresh website (Ctrl+Shift+R or Cmd+Shift+R)

---

### Issue: Images broken or not loading

**Cause:** Sanity CDN domain not configured in Next.js

**Fix:**
1. Check `next.config.ts` has:
   ```typescript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'cdn.sanity.io',
       },
     ],
   }
   ```
2. If missing, add it and push to GitHub
3. Vercel will auto-redeploy

---

### Issue: "Sanity client not configured" errors

**Cause:** Environment variables missing or misspelled

**Fix:**
1. Verify in Vercel project settings:
   - Variable names are EXACTLY as shown (case-sensitive)
   - All use `NEXT_PUBLIC_` prefix (except `SANITY_API_TOKEN` if you added it)
   - No extra spaces in values
2. Redeploy after fixing

---

## Part 6: Custom Domain Setup

To use your own domain (e.g., `noumankidswear.com`):

### 1. Buy Domain

Buy domain from:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare
- Any domain registrar

### 2. Add Domain to Vercel

1. Go to Vercel project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain: `noumankidswear.com`
4. Click **"Add"**
5. Vercel will show DNS records to add

### 3. Configure DNS at Domain Registrar

Vercel will tell you to add one of these:

**Option A: A Record (recommended)**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
```

**Option B: CNAME Record**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Add these records in your domain registrar's DNS settings.

### 4. Wait for DNS Propagation

- Takes 5 minutes to 48 hours (usually ~1 hour)
- Check status in Vercel dashboard
- Once verified, Vercel auto-configures SSL certificate (free)

### 5. Set Primary Domain

1. Go to Vercel project → **Settings** → **Domains**
2. Find your custom domain
3. Click "..." → **"Set as Primary"**
4. All traffic redirects to your custom domain

---

## Part 7: Recommended Vercel Settings

### Build & Development Settings

**Framework Preset:** Next.js (auto-detected)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

**Root Directory:** `./` (leave blank or use root)

**Node.js Version:** 20.x (default, recommended)

### Leave these settings as default unless you have specific needs.

---

## Part 8: Deployment Workflow

### Automatic Deployments

Vercel automatically deploys when you:
1. Push to `main` branch → Production deployment
2. Push to other branches → Preview deployment
3. Open pull request → Preview deployment with unique URL

### Manual Deployments

To manually trigger a deployment:
1. Go to **"Deployments"** tab
2. Click **"..."** on any deployment
3. Click **"Redeploy"**

Or push an empty commit:
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

---

## Part 9: Performance & SEO

### Already Configured

✅ **ISR (Incremental Static Regeneration):** 60-second revalidation  
✅ **Image Optimization:** Next.js automatic image optimization  
✅ **Turbopack:** Fast builds (Next.js 16)  
✅ **Static Generation:** Homepage pre-rendered at build time  
✅ **JSON-LD:** Structured data for search engines  
✅ **Metadata:** SEO titles and descriptions  

### Optional Enhancements

**Add Google Analytics (optional):**
1. Get tracking ID from Google Analytics
2. Add to `src/app/layout.tsx` (Google tag script)
3. Deploy

**Add Sitemap (optional):**
1. Create `src/app/sitemap.ts`
2. Export sitemap function
3. Deploy
4. Submit to Google Search Console

---

## Part 10: Cost & Limits

### Vercel Free (Hobby) Plan

✅ **Hosting:** Free forever  
✅ **SSL Certificate:** Free automatic HTTPS  
✅ **Bandwidth:** 100 GB/month  
✅ **Builds:** 100 hours/month  
✅ **Serverless Functions:** 100 GB-hours/month  
✅ **Edge Requests:** 1 million/month  

**Perfect for small businesses like Nouman Kids Wear.**

### Sanity Free Plan

✅ **Content:** Unlimited documents  
✅ **Assets:** 10 GB storage  
✅ **Bandwidth:** 10 GB/month  
✅ **API Requests:** 100k/month  
✅ **Users:** 3 editors  

**More than enough for a catalogue website.**

### When to Upgrade?

- **Vercel:** If traffic exceeds 100 GB bandwidth/month (~10,000 visitors)
- **Sanity:** If you upload 10+ GB of images or need more editors

---

## Part 11: Post-Deployment Checklist

After successful deployment:

- [ ] Homepage loads correctly
- [ ] Products appear from Sanity CMS
- [ ] Images load properly (no broken images)
- [ ] WhatsApp buttons work (test on mobile)
- [ ] Mobile layout looks good (2-column product grid)
- [ ] Studio accessible at `/studio`
- [ ] Can create/edit products in Studio
- [ ] Published products appear on site within 60 seconds
- [ ] Categories display correctly
- [ ] Contact information shows real phone/address
- [ ] Footer links work
- [ ] Navigation works on mobile
- [ ] Page load speed is good (test with https://pagespeed.web.dev/)
- [ ] No console errors in browser DevTools
- [ ] Tested on Chrome, Safari, and mobile browsers

---

## Part 12: Maintenance

### Regular Tasks

**Weekly:**
- Add new product arrivals through Studio
- Update "New Arrival" flags for recent products
- Check website loads correctly

**Monthly:**
- Review product inventory (hide out-of-stock items)
- Update store hours if changed
- Check mobile experience

**As Needed:**
- Update homepage banner for seasonal promotions
- Add gallery photos of new store displays
- Update contact information if changed

### Monitoring

Vercel provides:
- **Analytics:** Visit counts, page views (Settings → Analytics)
- **Speed Insights:** Performance metrics (Settings → Speed Insights)
- **Logs:** Function execution logs (Functions tab)

---

## Summary: Quick Environment Variables Reference

**Add these 3 variables in Vercel project settings:**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ql5kwpe9
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Select all environments for each variable:**
- ✅ Production
- ✅ Preview
- ✅ Development

**That's all you need!** Your website will read published content from Sanity CMS without requiring authentication tokens.

---

**Deployment Status:** Ready to deploy! 🚀  
**Estimated Setup Time:** 10–15 minutes  
**Cost:** $0/month (free Vercel + free Sanity plans)
