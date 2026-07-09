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

function buildItems(images: HomePageData): (CartItemData & { key: string })[] {
  return [
    { key: "about", href: "/about", label: "about", Icon: TeddyBear, imageUrl: images.teddyBearUrl, x: "18%", y: "28%", hoverVariant: "bob" },
    { key: "projects", href: "/projects", label: "projects", Icon: Laptop, imageUrl: images.laptopUrl, x: "60%", y: "24%", hoverVariant: "none" },
    { key: "hobbies", href: "/hobbies", label: "hobbies", Icon: YarnBall, imageUrl: images.yarnBallUrl, x: "22%", y: "62%", hoverVariant: "spin" },
    { key: "contact", href: "/contact", label: "contact", Icon: Telephone, imageUrl: images.telephoneUrl, x: "58%", y: "60%", hoverVariant: "wiggle" },
  ];
}

const CLUTTER = [
  { key: "oranges", Icon: OrangesBagDoodle, imageKey: "orangesBagUrl" as const, x: "38%", y: "4%", rotate: -6 },
  { key: "bread", Icon: BreadLoafDoodle, imageKey: "breadLoafUrl" as const, x: "82%", y: "8%", rotate: 5 },
  { key: "eggs", Icon: EggCartonDoodle, imageKey: "eggCartonUrl" as const, x: "2%", y: "6%", rotate: -3 },
  { key: "scallions", Icon: ScallionsDoodle, imageKey: "scallionsUrl" as const, x: "80%", y: "46%", rotate: 8 },
  { key: "chips", Icon: ChipBagDoodle, imageKey: "chipBagUrl" as const, x: "2%", y: "46%", rotate: -4 },
  { key: "milk", Icon: MilkCartonDoodle, imageKey: "milkCartonUrl" as const, x: "38%", y: "80%", rotate: 4 },
  { key: "canned", Icon: CannedGoodDoodle, imageKey: "cannedGoodUrl" as const, x: "78%", y: "80%", rotate: -5 },
  { key: "cereal", Icon: CerealBoxDoodle, imageKey: "cerealBoxUrl" as const, x: "40%", y: "42%", rotate: 6 },
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
        {/* Decorative clutter renders first (behind, no z-index needed —
            stacking follows DOM order here) and never intercepts clicks. */}
        {CLUTTER.map((item) => (
          <CartClutterItem key={item.key} Icon={item.Icon} imageUrl={images[item.imageKey]} x={item.x} y={item.y} rotate={item.rotate} />
        ))}
        {items.map(({ key, ...item }) => (
          <CartItem key={key} {...item} constraintsRef={constraintsRef} />
        ))}
      </div>
    </div>
  );
}
