"use client";

import { useRef } from "react";
import CartSvg from "@/components/illustrations/svg/CartSvg";
import TeddyBear from "@/components/illustrations/svg/TeddyBear";
import Laptop from "@/components/illustrations/svg/Laptop";
import YarnBall from "@/components/illustrations/svg/YarnBall";
import Telephone from "@/components/illustrations/svg/Telephone";
import type { HomePageData } from "@/lib/sanity/queries";
import CartItem, { type CartItemData } from "./CartItem";

function buildItems(images: HomePageData): (CartItemData & { key: string })[] {
  return [
    { key: "about", href: "/about", label: "about", Icon: TeddyBear, imageUrl: images.teddyBearUrl, x: "18%", y: "28%" },
    { key: "projects", href: "/projects", label: "projects", Icon: Laptop, imageUrl: images.laptopUrl, x: "60%", y: "24%" },
    { key: "hobbies", href: "/hobbies", label: "hobbies", Icon: YarnBall, imageUrl: images.yarnBallUrl, x: "22%", y: "62%" },
    { key: "contact", href: "/contact", label: "contact", Icon: Telephone, imageUrl: images.telephoneUrl, x: "58%", y: "60%" },
  ];
}

export default function ShoppingCart({ images }: { images: HomePageData }) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const items = buildItems(images);

  return (
    <div className="relative aspect-[4/3] w-full max-w-2xl">
      <CartSvg className="absolute inset-0 h-full w-full drop-shadow-xl" />
      {/* Bounds items are draggable within — matches CartSvg's basket
          interior (excludes the handle bar and the outer wire rim). */}
      <div ref={constraintsRef} className="absolute" style={{ inset: "20% 8% 10% 8%" }}>
        {items.map(({ key, ...item }) => (
          <CartItem key={key} {...item} constraintsRef={constraintsRef} />
        ))}
      </div>
    </div>
  );
}
