import Heading from "@/components/ui/Heading";
import ContentBrowser from "@/components/content-viewer/ContentBrowser";
import { getHobbies } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HobbiesPage() {
  const hobbies = await getHobbies();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-cream px-6 pt-16 pb-28">
      <Heading className="text-center">avid hobbyist who collects hobbies</Heading>
      <ContentBrowser
        items={hobbies}
        placeholderMessage="pick a hobby, any hobby…"
        techLabel="Materials used"
      />
    </main>
  );
}
