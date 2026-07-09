import Heading from "@/components/ui/Heading";
import ShoppingCart from "@/components/home/ShoppingCart";
import DoodleField from "@/components/home/DoodleField";
import SpecialsCard from "@/components/home/SpecialsCard";
import { getHomePageData } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const homeData = await getHomePageData();

  return (
    <main className="flex min-h-screen flex-col sm:flex-row">
      <section className="relative flex flex-col items-start justify-center gap-4 overflow-hidden bg-maroon px-8 py-16 text-cream sm:w-2/5 sm:px-10">
        <DoodleField doodleUrls={homeData.doodleUrls} />
        <Heading className="text-cream" maxFontSizePx={48}>
          hi, i&rsquo;m fiona!
        </Heading>
        <p className="max-w-sm text-lg text-blush">
          take a look around — everything in the cart leads somewhere.
        </p>
        <SpecialsCard specials={homeData.specials} />
      </section>
      <section className="flex items-center justify-center bg-cream px-8 py-16 sm:w-3/5 sm:px-16">
        <ShoppingCart images={homeData} />
      </section>
    </main>
  );
}
