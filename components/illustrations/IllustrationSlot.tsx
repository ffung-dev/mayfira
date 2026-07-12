import Image from "next/image";
import type { ComponentType } from "react";

type IllustrationSlotProps = {
  imageUrl?: string;
  Fallback: ComponentType<{ className?: string }>;
  alt: string;
  className?: string;
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
);

/** Renders a Sanity-provided image when one exists, otherwise the coded SVG
 * fallback. This is the seam that lets commissioned art replace any coded
 * illustration later via a CMS upload, with no code change.
 *
 * `fill` mode (vs. explicit width/height) is for spots sized by a
 * percentage-of-container box rather than a fixed pixel size — the
 * immediate parent needs `position: relative` and a real size for it. */
export default function IllustrationSlot({ imageUrl, Fallback, alt, className, ...size }: IllustrationSlotProps) {
  if (imageUrl) {
    // Browsers natively drag <img> elements by default — without this it
    // fights with Motion's own drag gesture and shows the OS's "can't
    // drop here" cursor instead of actually moving the element.
    if (size.fill) {
      return <Image src={imageUrl} alt={alt} fill className={className} draggable={false} />;
    }
    return (
      <Image src={imageUrl} alt={alt} width={size.width} height={size.height} className={className} draggable={false} />
    );
  }
  return <Fallback className={className} />;
}
