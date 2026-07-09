import type { ComponentType } from "react";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";

type CartClutterItemProps = {
  Icon: ComponentType<{ className?: string }>;
  imageUrl?: string;
  x: string;
  y: string;
  rotate: number;
};

/** Purely decorative filler in the cart — not clickable, not draggable,
 * sits behind the real nav items (see ShoppingCart's stacking order). */
export default function CartClutterItem({ Icon, imageUrl, x, y, rotate }: CartClutterItemProps) {
  return (
    <div
      className="pointer-events-none absolute opacity-80"
      style={{ left: x, top: y, transform: `rotate(${rotate}deg)` }}
    >
      <IllustrationSlot imageUrl={imageUrl} Fallback={Icon} alt="" width={52} height={52} className="h-13 w-13 drop-shadow-sm" />
    </div>
  );
}
