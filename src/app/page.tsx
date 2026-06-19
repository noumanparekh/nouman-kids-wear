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
import { SITE } from "@/data/site";

// JSON-LD so search engines understand this is a local kids clothing store.
// SECURITY: Data comes from trusted SITE configuration, not user input.
// JSON.stringify automatically escapes any special characters.
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: SITE.name,
    description: SITE.description,
    telephone: SITE.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.pincode,
      addressCountry: "IN",
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

export default function Home() {
  return (
    <>
      <StructuredData />
      <SplashScreen />
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryNav />
        <NewArrivals />
        <ProductCatalogue />
        <FeaturedCollections />
        <WhyShopWithUs />
        <StoreGallery />
        <LocationContact />
      </main>
      <Footer />
    </>
  );
}
