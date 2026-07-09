import Heading from "@/components/ui/Heading";
import AboutContent from "@/components/about/AboutContent";
import { getAboutPage } from "@/lib/sanity/queries";
import patterns from "@/styles/pagePatterns.module.css";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutPage();
  const heading = about?.heading ?? "it's about time we met!";

  return (
    <main className={`flex min-h-screen flex-col items-center gap-10 px-6 pt-16 pb-28 ${patterns.about}`}>
      <Heading className="text-center">{heading}</Heading>
      {about ? (
        <AboutContent about={about} />
      ) : (
        <p className="font-hand text-2xl text-maroon/70">
          bio content is on its way — check back soon!
        </p>
      )}
    </main>
  );
}
