import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { AboutPageData } from "@/lib/sanity/queries";

export default function AboutContent({ about }: { about: AboutPageData }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 sm:flex-row sm:items-start">
      {about.photoUrls.length > 0 && (
        <div className="flex flex-1 flex-wrap justify-center gap-4 sm:max-w-xs">
          {about.photoUrls.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square w-32 overflow-hidden rounded-2xl border-2 border-rose shadow-md sm:w-full"
              style={{ transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 3}deg)` }}
            >
              <Image src={url} alt="" fill sizes="200px" className="object-cover" />
            </div>
          ))}
        </div>
      )}
      <div className="flex-1 font-body text-lg leading-relaxed text-ink [&>*+*]:mt-4">
        <PortableText value={about.bio} />
      </div>
    </div>
  );
}
