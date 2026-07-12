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

// x/y are each item's top-left corner, as a percentage of the cart's
// interior — pre-computed so that every item's full footprint (at
// CART_ITEM_SIZE from cartLayout.ts) stays inside the 0–100% bounds, on
// any screen size, with nothing poking outside the cart by default.
function buildItems(images: HomePageData): (CartItemData & { key: string })[] {
  return [
    { key: "about", id: "about", href: "/about", label: "about", Icon: TeddyBear, imageUrl: images.teddyBearUrl, x: "8%", y: "8.8%", hoverVariant: "bob" },
    { key: "projects", id: "projects", href: "/projects", label: "projects", Icon: Laptop, imageUrl: images.laptopUrl, x: "66%", y: "6.8%", hoverVariant: "none" },
    { key: "hobbies", id: "hobbies", href: "/hobbies", label: "hobbies", Icon: YarnBall, imageUrl: images.yarnBallUrl, x: "12%", y: "54.8%", hoverVariant: "spin" },
    { key: "contact", id: "contact", href: "/contact", label: "contact", Icon: Telephone, imageUrl: images.telephoneUrl, x: "64%", y: "52.8%", hoverVariant: "wiggle" },
  ];
}

const CLUTTER = [
  { key: "oranges", Icon: OrangesBagDoodle, imageKey: "orangesBagUrl" as const, x: "38%", y: "0%", rotate: -6 },
  { key: "bread", Icon: BreadLoafDoodle, imageKey: "breadLoafUrl" as const, x: "76%", y: "30.8%", rotate: 5 },
  { key: "eggs", Icon: EggCartonDoodle, imageKey: "eggCartonUrl" as const, x: "0%", y: "30.8%", rotate: -3 },
  { key: "scallions", Icon: ScallionsDoodle, imageKey: "scallionsUrl" as const, x: "38%", y: "61.6%", rotate: 8 },
  { key: "chips", Icon: ChipBagDoodle, imageKey: "chipBagUrl" as const, x: "0%", y: "0.8%", rotate: -4 },
  { key: "milk", Icon: MilkCartonDoodle, imageKey: "milkCartonUrl" as const, x: "76%", y: "61.6%", rotate: 4 },
  { key: "canned", Icon: CannedGoodDoodle, imageKey: "cannedGoodUrl" as const, x: "18%", y: "30.8%", rotate: -5 },
  { key: "cereal", Icon: CerealBoxDoodle, imageKey: "cerealBoxUrl" as const, x: "56%", y: "32.8%", rotate: 6 },
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
