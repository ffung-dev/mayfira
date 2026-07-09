"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { PolaroidPhoto } from "@/lib/sanity/queries";
import { getPinnedTransform } from "@/lib/utils/seededRandom";
import styles from "./BulletinBoard.module.css";

export default function Polaroid({ photo }: { photo: PolaroidPhoto }) {
  const { rotation, offsetX, offsetY } = getPinnedTransform(photo._id, photo.rotationOverride);
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <div
      className={styles.polaroidWrapper}
      style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.pin} aria-hidden />
      <motion.div
        className={styles.polaroid}
        initial={{ rotate: rotation }}
        whileHover={{ y: -6, rotate: rotation * 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <div className={styles.polaroidPhoto}>
          <Image src={photo.imageUrl} alt={photo.caption} fill sizes="180px" className="object-cover" />
        </div>
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
    </div>
  );
}
