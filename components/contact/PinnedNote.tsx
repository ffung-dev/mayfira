"use client";

import { motion } from "motion/react";
import type { ContactNote } from "@/lib/sanity/queries";
import { getPinnedTransform } from "@/lib/utils/seededRandom";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";
import { CONTACT_ICONS } from "@/components/illustrations/svg/contactIcons";
import styles from "./BulletinBoard.module.css";

const PAPER_STYLE_CLASSES: Record<string, string> = {
  "sticky-note": styles.stickyNote,
  "index-card": styles.indexCard,
  "mini-poster": styles.miniPoster,
  "grocery-receipt": styles.groceryReceipt,
  "notebook-paper": styles.notebookPaper,
};

export default function PinnedNote({ note }: { note: ContactNote }) {
  const { rotation, offsetX, offsetY } = getPinnedTransform(note._id, note.rotationOverride);
  const Icon = CONTACT_ICONS[note.iconKey] ?? CONTACT_ICONS.other;
  const paperClass = PAPER_STYLE_CLASSES[note.paperStyle] ?? styles.indexCard;

  return (
    // The pin is a sibling of the paper, positioned only by this wrapper's
    // static jitter — hover only transforms the paper (rotate/lift below),
    // so the pin reads as physically fixed while the note moves under it.
    <div className={styles.noteWrapper} style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}>
      <span className={styles.pin} aria-hidden />
      <motion.a
        href={note.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.paper} ${paperClass}`}
        initial={{ rotate: rotation }}
        whileHover={{ y: -6, rotate: rotation * 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span className={`h-7 w-7 ${styles.noteIcon}`}>
          <IllustrationSlot imageUrl={note.iconImageUrl} Fallback={Icon} alt="" width={28} height={28} />
        </span>
        <span className={`font-title text-sm ${styles.notePlatform}`}>{note.platform}</span>
        <span className="font-body text-sm">{note.value}</span>
        {note.description && <span className="font-body text-xs opacity-80">{note.description}</span>}
      </motion.a>
    </div>
  );
}
