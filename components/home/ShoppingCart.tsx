"use client";

import { useRef } from "react";
import CartSvg from "@/components/illustrations/svg/CartSvg";
import TeddyBear from "@/components/illustrations/svg/TeddyBear";
import Laptop from "@/components/illustrations/svg/Laptop";
import YarnBall from "@/components/illustrations/svg/YarnBall";
import Telephone from "@/components/illustrations/svg/Telephone";
import {
  BreadLoafDoodle,
  CannedGoodDoodle,
  CerealBoxDoodle,
  ChipBagDoodle,
  EggCartonDoodle,
  MilkCartonDoodle,
  OrangesBagDoodle,
  ScallionsDoodle,
} from "@/components/illustrations/svg/clutter";
import type { HomePageData } from "@/lib/sanity/queries";
import CartItem, { type CartItemData } from "./CartItem";
import CartClutterItem from "./CartClutterItem";
import { getCartItemPosition } from "./cartLayout";

// Grid-cell index (0–11, see getCartItemPosition) for each of the 12 cart
// items — a clean, even 4×3 grid matching the reference layout, real
// items spread one-per-row rather than grouped together. Items sit
// upright (no rotation) and don't overlap by default, so all 12 are
// clearly visible — everything's still fully draggable from there.
function buildItems(images: HomePageData): (CartItemData & { key: string })[] {
  return [
    { key: "about", id: "about", href: "/about", label: "about", Icon: TeddyBear, imageUrl: images.teddyBearUrl, ...getCartItemPosition(1), hoverVariant: "bob" },
    { key: "projects", id: "projects", href: "/projects", label: "projects", Icon: Laptop, imageUrl: images.laptopUrl, ...getCartItemPosition(5), hoverVariant: "none" },
    { key: "hobbies", id: "hobbies", href: "/hobbies", label: "hobbies", Icon: YarnBall, imageUrl: images.yarnBallUrl, ...getCartItemPosition(9), hoverVariant: "spin" },
    { key: "contact", id: "contact", href: "/contact", label: "contact", Icon: Telephone, imageUrl: images.telephoneUrl, ...getCartItemPosition(11), hoverVariant: "wiggle" },
  ];
}

const CLUTTER = [
  { key: "oranges", Icon: OrangesBagDoodle, imageKey: "orangesBagUrl" as const, ...getCartItemPosition(0), rotate: 0 },
  { key: "bread", Icon: BreadLoafDoodle, imageKey: "breadLoafUrl" as const, ...getCartItemPosition(2), rotate: 0 },
  { key: "chips", Icon: ChipBagDoodle, imageKey: "chipBagUrl" as const, ...getCartItemPosition(3), rotate: 0 },
  { key: "eggs", Icon: EggCartonDoodle, imageKey: "eggCartonUrl" as const, ...getCartItemPosition(4), rotate: 0 },
  { key: "milk", Icon: MilkCartonDoodle, imageKey: "milkCartonUrl" as const, ...getCartItemPosition(6), rotate: 0 },
  { key: "canned", Icon: CannedGoodDoodle, imageKey: "cannedGoodUrl" as const, ...getCartItemPosition(7), rotate: 0 },
  { key: "scallions", Icon: ScallionsDoodle, imageKey: "scallionsUrl" as const, ...getCartItemPosition(8), rotate: 0 },
  { key: "cereal", Icon: CerealBoxDoodle, imageKey: "cerealBoxUrl" as const, ...getCartItemPosition(10), rotate: 0 },
];

export default function ShoppingCart({ images }: { images: HomePageData }) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const items = buildItems(images);

  return (
    <div className="relative aspect-[4/3] w-full max-w-2xl">
      <CartSvg className="absolute inset-0 h-full w-full drop-shadow-xl" />
      {/* Bounds items are draggable within — matches CartSvg's basket
          interior (excludes the handle bar and the outer wire rim). */}
      <div ref={constraintsRef} className="absolute" style={{ inset: "20% 8% 10% 8%" }}>
        {/* Decorative clutter is draggable too, same as the real items, but
            pinned to z-0 (real items are z-10) so it can never end up
            visually on top of something that actually leads somewhere. */}
        {CLUTTER.map((item) => (
          <CartClutterItem
            key={item.key}
            id={item.key}
            Icon={item.Icon}
            imageUrl={images[item.imageKey]}
            x={item.x}
            y={item.y}
            rotate={item.rotate}
            constraintsRef={constraintsRef}
          />
        ))}
        {items.map(({ key, ...item }) => (
          <CartItem key={key} {...item} constraintsRef={constraintsRef} />
        ))}
      </div>
    </div>
  );
}
