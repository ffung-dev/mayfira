"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { BulletinItem } from "@/lib/sanity/queries";
import { getPinnedTransform } from "@/lib/utils/seededRandom";
import styles from "./BulletinBoard.module.css";

const PAPER_STYLE_CLASSES: Record<string, string> = {
  "post-it": styles.stickyNote,
  poster: styles.miniPoster,
  receipt: styles.groceryReceipt,
  tag: styles.tagStyle,
};

export default function BulletinItemCard({ item }: { item: BulletinItem }) {
  const { rotation, offsetX, offsetY } = getPinnedTransform(item._id, item.rotationOverride);
  const wrapperStyle = { transform: `translate(${offsetX}px, ${offsetY}px)` };

  if (item.displayStyle === "decoration-image") {
    return (
      <div className={styles.noteWrapper} style={wrapperStyle}>
        <motion.div
          className={styles.decorationImage}
          initial={{ rotate: rotation }}
          whileHover={{ y: -6, rotate: rotation * 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {item.imageUrl && (
            <div className={styles.decorationImageInner}>
              <Image src={item.imageUrl} alt={item.title ?? ""} fill sizes="160px" className="object-cover" />
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  if (item.displayStyle === "polaroid") {
    return (
      <div className={styles.noteWrapper} style={wrapperStyle}>
        <span className={styles.pin} aria-hidden />
        <motion.div
          className={`${styles.paper} ${styles.bulletinPolaroid}`}
          initial={{ rotate: rotation }}
          whileHover={{ y: -6, rotate: rotation * 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {item.imageUrl && (
            <div className={styles.bulletinPolaroidPhoto}>
              <Image src={item.imageUrl} alt={item.title ?? ""} fill sizes="140px" className="object-cover" />
            </div>
          )}
          {item.text && <span className="font-hand text-sm text-maroon">{item.text}</span>}
        </motion.div>
      </div>
    );
  }

  const styleClass = PAPER_STYLE_CLASSES[item.displayStyle] ?? styles.stickyNote;
  const content = (
    <>
      {item.displayStyle === "tag" && <span className={styles.tagStyleHole} aria-hidden />}
      {item.title && <span className="font-title text-sm text-maroon">{item.title}</span>}
      {item.text && <span className="font-body text-sm">{item.text}</span>}
    </>
  );

  return (
    <div className={styles.noteWrapper} style={wrapperStyle}>
      <span className={styles.pin} aria-hidden />
      {item.url ? (
        <motion.a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.paper} ${styleClass}`}
          initial={{ rotate: rotation }}
          whileHover={{ y: -6, rotate: rotation * 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {content}
        </motion.a>
      ) : (
        <motion.div
          className={`${styles.paper} ${styleClass}`}
          initial={{ rotate: rotation }}
          whileHover={{ y: -6, rotate: rotation * 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
}
