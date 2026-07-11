import Image from "next/image";
import type { ComponentType } from "react";

type IllustrationSlotProps = {
  imageUrl?: string;
  Fallback: ComponentType<{ className?: string }>;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/** Renders a Sanity-provided image when one exists, otherwise the coded SVG
 * fallback. This is the seam that lets commissioned art replace any coded
 * illustration later via a CMS upload, with no code change. */
export default function IllustrationSlot({
  imageUrl,
  Fallback,
  alt,
  width,
  height,
  className,
}: IllustrationSlotProps) {
  if (imageUrl) {
    // Browsers natively drag <img> elements by default — without this it
    // fights with Motion's own drag gesture and shows the OS's "can't
    // drop here" cursor instead of actually moving the element.
    return (
      <Image src={imageUrl} alt={alt} width={width} height={height} className={className} draggable={false} />
    );
  }
  return <Fallback className={className} />;
}
