import Heading from "@/components/ui/Heading";
import BulletinBoard from "@/components/contact/BulletinBoard";
import { getBulletinItems, getContactNotes, getPolaroidPhotos } from "@/lib/sanity/queries";
import patterns from "@/styles/pagePatterns.module.css";

export const revalidate = 60;

export default async function ContactPage() {
  const [notes, polaroids, items] = await Promise.all([
    getContactNotes(),
    getPolaroidPhotos(),
    getBulletinItems(),
  ]);

  return (
    <main className={`flex min-h-screen flex-col items-center gap-8 px-6 pt-16 pb-28 ${patterns.contact}`}>
      <Heading className="text-center text-cream">let&rsquo;s talk! or we can just send carrier pigeons.</Heading>
      <BulletinBoard notes={notes} polaroids={polaroids} items={items} />
    </main>
  );
}
