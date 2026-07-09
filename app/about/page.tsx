import Heading from "@/components/ui/Heading";
import Tagline from "@/components/ui/Tagline";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 pt-16 pb-24 text-center">
      <Heading>it&rsquo;s about time we met!</Heading>
      <Tagline>bio content, pulled from Sanity, lands here in a later pass.</Tagline>
    </main>
  );
}
