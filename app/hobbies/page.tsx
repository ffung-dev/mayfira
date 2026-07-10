import Heading from "@/components/ui/Heading";
import ContentBrowser from "@/components/content-viewer/ContentBrowser";
import { getHobbies, getHobbiesPageSettings } from "@/lib/sanity/queries";
import patterns from "@/styles/pagePatterns.module.css";

export const revalidate = 60;

export default async function HobbiesPage() {
  const [hobbies, settings] = await Promise.all([getHobbies(), getHobbiesPageSettings()]);

  return (
    <main className={`flex min-h-screen flex-col items-center gap-8 px-6 pt-16 pb-28 ${patterns.projects}`}>
      <Heading className="text-center text-cream">avid hobbyist who collects hobbies</Heading>
      <ContentBrowser
        items={hobbies}
        techLabel="Materials used"
        sidebarHeading="pick a hobby"
        footerNote={settings.sidebarNote}
        clipboardText={settings.clipboardText}
        clipboardStickers={settings}
      />
    </main>
  );
}
