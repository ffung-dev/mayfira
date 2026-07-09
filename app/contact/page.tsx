import Heading from "@/components/ui/Heading";
import BulletinBoard from "@/components/contact/BulletinBoard";
import { getContactNotes, getPolaroidPhotos } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function ContactPage() {
  const [notes, polaroids] = await Promise.all([getContactNotes(), getPolaroidPhotos()]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-cream px-6 pt-16 pb-28">
      <Heading className="text-center">let&rsquo;s talk! or we can just send carrier pigeons.</Heading>
      <BulletinBoard notes={notes} polaroids={polaroids} />
    </main>
  );
}
