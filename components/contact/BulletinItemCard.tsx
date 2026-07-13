"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { BulletinItem } from "@/lib/sanity/queries";
import { getPinnedTransform } from "@/lib/utils/seededRandom";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { usePersistedDrag } from "@/lib/hooks/usePersistedDrag";
import { useLayoutSettled } from "@/lib/hooks/useLayoutSettled";
import styles from "./BulletinBoard.module.css";

const PAPER_STYLE_CLASSES: Record<string, string> = {
  "post-it": styles.stickyNote,
  poster: styles.miniPoster,
  receipt: styles.groceryReceipt,
  tag: styles.tagStyle,
};

type DraggableItemProps = {
  id: string;
  url?: string;
  ariaLabel: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  showPin: boolean;
  innerClassName: string;
  colorStyle: CSSProperties;
  hoverRotateFactor?: number;
  constraintsRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

/** Shared outer(drag)/inner(hover) split for every bulletin item variant
 * below — see PinnedNote.tsx for why drag and hover-lift are on separate
 * layers. Renders a plain static version (no drag, tap-to-open) on touch
 * devices, matching the rest of the site's draggable fidgets. */
function DraggableItem({
  id,
  url,
  ariaLabel,
  rotation,
  offsetX,
  offsetY,
  showPin,
  innerClassName,
  colorStyle,
  hoverRotateFactor = 0.3,
  constraintsRef,
  children,
}: DraggableItemProps) {
  const canDrag = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { x: dragX, y: dragY, onDragEnd } = usePersistedDrag(`mayfira:contact:item:${id}`, { x: offsetX, y: offsetY });
  const settled = useLayoutSettled();
  const openLink = () => url && window.open(url, "_blank", "noopener,noreferrer");

  const pin = showPin ? <span className={styles.pin} aria-hidden /> : null;

  if (!canDrag) {
    const Tag = url ? "a" : "div";
    return (
      <Tag
        {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
        className={innerClassName}
        style={{ ...colorStyle, transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)` }}
      >
        {pin}
        {children}
      </Tag>
    );
  }

  return (
    <motion.div
      key={settled ? "settled" : "initial"}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      onDoubleClick={url ? openLink : undefined}
      role={url ? "link" : undefined}
      tabIndex={url ? 0 : undefined}
      aria-label={url ? ariaLabel : undefined}
      onKeyDown={
        url
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLink();
              }
            }
          : undefined
      }
      className={`${styles.dragLayer} cursor-grab active:cursor-grabbing`}
      style={{ x: dragX, y: dragY }}
    >
      <motion.div
        initial={{ rotate: rotation }}
        whileHover={{ y: -6, rotate: rotation * hoverRotateFactor }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={innerClassName}
        style={colorStyle}
      >
        {pin}
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function BulletinItemCard({
  item,
  constraintsRef,
}: {
  item: BulletinItem;
  constraintsRef: RefObject<HTMLDivElement | null>;
}) {
  const { rotation, offsetX, offsetY } = getPinnedTransform(item._id, item.rotationOverride);
  const colorStyle: CSSProperties = {
    backgroundColor: item.color || undefined,
    ["--color-outline" as string]: item.outlineColor || undefined,
  };

  if (item.displayStyle === "decoration-image") {
    return (
      <DraggableItem
        id={item._id}
        url={item.url}
        ariaLabel={item.title ?? "decoration"}
        rotation={rotation}
        offsetX={offsetX}
        offsetY={offsetY}
        showPin={false}
        innerClassName={styles.decorationImage}
        colorStyle={colorStyle}
        hoverRotateFactor={0.5}
        constraintsRef={constraintsRef}
      >
        {item.imageUrl && (
          <div className={styles.decorationImageInner}>
            <Image src={item.imageUrl} alt={item.title ?? ""} fill sizes="160px" className="object-cover" />
          </div>
        )}
      </DraggableItem>
    );
  }

  if (item.displayStyle === "polaroid") {
    return (
      <DraggableItem
        id={item._id}
        url={item.url}
        ariaLabel={item.title ?? "polaroid"}
        rotation={rotation}
        offsetX={offsetX}
        offsetY={offsetY}
        showPin
        innerClassName={`${styles.paper} ${styles.bulletinPolaroid}`}
        colorStyle={colorStyle}
        constraintsRef={constraintsRef}
      >
        {item.imageUrl && (
          <div className={styles.bulletinPolaroidPhoto}>
            <Image src={item.imageUrl} alt={item.title ?? ""} fill sizes="140px" className="object-cover" />
          </div>
        )}
        {item.text && <span className="font-hand text-sm text-maroon">{item.text}</span>}
      </DraggableItem>
    );
  }

  const styleClass = PAPER_STYLE_CLASSES[item.displayStyle] ?? styles.stickyNote;

  return (
    <DraggableItem
      id={item._id}
      url={item.url}
      ariaLabel={item.title ?? item.text ?? "bulletin note"}
      rotation={rotation}
      offsetX={offsetX}
      offsetY={offsetY}
      showPin
      innerClassName={`${styles.paper} ${styleClass}`}
      colorStyle={colorStyle}
      constraintsRef={constraintsRef}
    >
      {item.displayStyle === "tag" && <span className={styles.tagStyleHole} aria-hidden />}
      {item.title && <span className="font-title text-sm text-maroon">{item.title}</span>}
      {item.text && <span className="font-body text-sm">{item.text}</span>}
    </DraggableItem>
  );
}
