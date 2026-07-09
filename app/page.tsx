import Heading from "@/components/ui/Heading";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col sm:flex-row">
      <section className="flex flex-1 flex-col items-start justify-center gap-4 bg-maroon px-8 py-16 text-cream sm:px-16">
        <Heading className="text-cream">hi, i&rsquo;m fiona!</Heading>
        <p className="max-w-sm text-lg text-blush">
          take a look around — everything in the cart leads somewhere.
        </p>
      </section>
      <section className="flex flex-1 items-center justify-center bg-cream px-8 py-16 sm:px-16">
        {/* ShoppingCart interaction lands here in a later pass */}
        <div className="font-hand text-2xl text-maroon/60">the cart goes here</div>
      </section>
    </main>
  );
}
