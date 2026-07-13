"use client";

import { useState } from "react";
import type { RefObject } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { PolaroidPhoto } from "@/lib/sanity/queries";
import { getPinnedTransform } from "@/lib/utils/seededRandom";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { usePersistedDrag } from "@/lib/hooks/usePersistedDrag";
import { useLayoutSettled } from "@/lib/hooks/useLayoutSettled";
import styles from "./BulletinBoard.module.css";

type PolaroidProps = {
  photo: PolaroidPhoto;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

export default function Polaroid({ photo, constraintsRef }: PolaroidProps) {
  const { rotation, offsetX, offsetY } = getPinnedTransform(photo._id, photo.rotationOverride);
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const canDrag = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { x: dragX, y: dragY, onDragEnd } = usePersistedDrag(`mayfira:contact:polaroid:${photo._id}`, {
    x: offsetX,
    y: offsetY,
  });
  const settled = useLayoutSettled();

  const photoFrame = (
    <div className={styles.polaroidPhoto}>
      <Image src={photo.imageUrl} alt={photo.caption} fill sizes="180px" className="object-cover" />
    </div>
  );

  // No link to open here (plain photos, no url) — just static and
  // pinned, no drag, on touch devices.
  if (!canDrag) {
    return (
      <div
        className={styles.polaroid}
        style={{ transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)` }}
      >
        <span className={styles.pin} aria-hidden />
        {photoFrame}
        <p className={`font-hand text-sm ${styles.captionStatic}`}>{photo.caption}</p>
      </div>
    );
  }

  return (
    // Same outer(drag)/inner(hover-tilt) split as the other bulletin
    // items — see PinnedNote.tsx. The cursor-following caption bubble
    // tracks pointer position relative to the outer layer, which is
    // always wherever the polaroid currently is, dragged or not.
    <motion.div
      key={settled ? "settled" : "initial"}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${styles.dragLayer} cursor-grab active:cursor-grabbing`}
      style={{ x: dragX, y: dragY }}
    >
      <motion.div
        className={styles.polaroid}
        initial={{ rotate: rotation }}
        whileHover={{ y: -6, rotate: rotation * 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span className={styles.pin} aria-hidden />
        {photoFrame}
        {/* touch devices have no hover to trigger the caption bubble below,
            so the caption just lives in the photo's own margin instead */}
        <p className={`font-hand text-sm ${styles.captionStatic}`}>{photo.caption}</p>
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            className={styles.captionBubble}
            style={{ left: cursor.x, top: cursor.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <span className="font-hand text-sm">{photo.caption}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
