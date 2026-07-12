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
// items — real items are spread one-per-row rather than grouped together,
// so the cart doesn't read as "four real items in a corner, clutter
// everywhere else." Actual on-screen position is this cell plus a
// per-item seeded jitter, so it looks scattered rather than gridded.
function buildItems(images: HomePageData): (CartItemData & { key: string })[] {
  return [
    { key: "about", id: "about", href: "/about", label: "about", Icon: TeddyBear, imageUrl: images.teddyBearUrl, ...getCartItemPosition("about", 1), hoverVariant: "bob" },
    { key: "projects", id: "projects", href: "/projects", label: "projects", Icon: Laptop, imageUrl: images.laptopUrl, ...getCartItemPosition("projects", 5), hoverVariant: "none" },
    { key: "hobbies", id: "hobbies", href: "/hobbies", label: "hobbies", Icon: YarnBall, imageUrl: images.yarnBallUrl, ...getCartItemPosition("hobbies", 9), hoverVariant: "spin" },
    { key: "contact", id: "contact", href: "/contact", label: "contact", Icon: Telephone, imageUrl: images.telephoneUrl, ...getCartItemPosition("contact", 11), hoverVariant: "wiggle" },
  ];
}

const CLUTTER = [
  { key: "oranges", Icon: OrangesBagDoodle, imageKey: "orangesBagUrl" as const, ...getCartItemPosition("oranges", 0), rotate: -6 },
  { key: "bread", Icon: BreadLoafDoodle, imageKey: "breadLoafUrl" as const, ...getCartItemPosition("bread", 2), rotate: 5 },
  { key: "chips", Icon: ChipBagDoodle, imageKey: "chipBagUrl" as const, ...getCartItemPosition("chips", 3), rotate: -4 },
  { key: "eggs", Icon: EggCartonDoodle, imageKey: "eggCartonUrl" as const, ...getCartItemPosition("eggs", 4), rotate: -3 },
  { key: "milk", Icon: MilkCartonDoodle, imageKey: "milkCartonUrl" as const, ...getCartItemPosition("milk", 6), rotate: 4 },
  { key: "canned", Icon: CannedGoodDoodle, imageKey: "cannedGoodUrl" as const, ...getCartItemPosition("canned", 7), rotate: -5 },
  { key: "scallions", Icon: ScallionsDoodle, imageKey: "scallionsUrl" as const, ...getCartItemPosition("scallions", 8), rotate: 8 },
  { key: "cereal", Icon: CerealBoxDoodle, imageKey: "cerealBoxUrl" as const, ...getCartItemPosition("cereal", 10), rotate: 6 },
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
