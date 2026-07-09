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
    return <Image src={imageUrl} alt={alt} width={width} height={height} className={className} />;
  }
  return <Fallback className={className} />;
}
