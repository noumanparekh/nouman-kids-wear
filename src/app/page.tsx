import { SplashScreen } from "@/components/common/SplashScreen";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { ProductCatalogue } from "@/components/sections/ProductCatalogue";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { WhyShopWithUs } from "@/components/sections/WhyShopWithUs";
import { StoreGallery } from "@/components/sections/StoreGallery";
import { LocationContact } from "@/components/sections/LocationContact";
import { getProducts, getNewArrivalsForHomepage } from "@/data/fetchProducts";
import { getCategories } from "@/data/fetchCategories";
import { getStoreInfo } from "@/data/fetchSiteInfo";
import { getGalleryImages } from "@/data/fetchGalleryImages";
import { getFeaturedCollections } from "@/data/fetchFeaturedCollections";
import { getHeroBanner } from "@/data/fetchHeroBanner";

// ISR revalidation: 60 seconds
// Balances content freshness with CDN efficiency for catalogue data
export const revalidate = 60;

// JSON-LD so search engines understand this is a local kids clothing store.
// SECURITY: Data comes from trusted store info, not user input.
// JSON.stringify automatically escapes any special characters.
function StructuredData({ storeInfo }: { storeInfo: Awaited<ReturnType<typeof getStoreInfo>> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: storeInfo.brandName,
    description: storeInfo.description,
    telephone: storeInfo.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeInfo.address.line1,
      addressLocality: storeInfo.address.city,
      addressRegion: storeInfo.address.state,
      postalCode: storeInfo.address.pincode,
      addressCountry: storeInfo.address.country,
    },
    areaServed: "Adilabad, Telangana",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Home() {
  // Fetch all CMS data server-side with fallback to local data
  // SECURITY: All fetch functions use safe Sanity queries and transform data
  const [
    products,
    newArrivalsHomepage,
    categories,
    storeInfo,
    galleryImages,
    collections,
    heroBanner,
  ] = await Promise.all([
    getProducts(),
    getNewArrivalsForHomepage(), // Limited to 4 items for homepage
    getCategories(),
    getStoreInfo(),
    getGalleryImages(),
    getFeaturedCollections(),
    getHeroBanner(),
  ]);

  console.log('[Server] Data sources:', {
    products: products.length > 0 ? `${products.length} products` : 'empty',
    newArrivalsHomepage: newArrivalsHomepage.length > 0 ? `${newArrivalsHomepage.length} new arrivals (homepage)` : 'empty',
    categories: categories.length > 0 ? `${categories.length} categories` : 'empty',
    storeInfo: storeInfo.brandName,
    galleryImages: galleryImages.length > 0 ? `${galleryImages.length} images` : 'empty',
    collections: collections.length > 0 ? `${collections.length} collections` : 'empty',
    heroBanner: heroBanner ? 'CMS banner' : 'default content',
  });

  return (
    <>
      <StructuredData storeInfo={storeInfo} />
      <SplashScreen />
      <Header storeInfo={storeInfo} />
      <main className="flex-1">
        <Hero storeInfo={storeInfo} heroBanner={heroBanner} newArrivals={newArrivalsHomepage} />
        <CategoryNav categories={categories} />
        <NewArrivals products={newArrivalsHomepage} />
        <ProductCatalogue products={products} />
        <FeaturedCollections collections={collections} />
        <WhyShopWithUs />
        <StoreGallery galleryImages={galleryImages} />
        <LocationContact storeInfo={storeInfo} />
      </main>
      <Footer storeInfo={storeInfo} />
    </>
  );
}
