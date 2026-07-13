"use client";

import type { CSSProperties, RefObject } from "react";
import { motion } from "motion/react";
import type { ContactNote } from "@/lib/sanity/queries";
import { getPinnedTransform } from "@/lib/utils/seededRandom";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { usePersistedDrag } from "@/lib/hooks/usePersistedDrag";
import { useLayoutSettled } from "@/lib/hooks/useLayoutSettled";
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

type PinnedNoteProps = {
  note: ContactNote;
  constraintsRef: RefObject<HTMLDivElement | null>;
};

export default function PinnedNote({ note, constraintsRef }: PinnedNoteProps) {
  const { rotation, offsetX, offsetY } = getPinnedTransform(note._id, note.rotationOverride);
  const Icon = CONTACT_ICONS[note.iconKey] ?? CONTACT_ICONS.other;
  const paperClass = PAPER_STYLE_CLASSES[note.paperStyle] ?? styles.indexCard;
  const canDrag = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { x: dragX, y: dragY, onDragEnd } = usePersistedDrag(`mayfira:contact:note:${note._id}`, {
    x: offsetX,
    y: offsetY,
  });
  const settled = useLayoutSettled();

  const colorStyle: CSSProperties = {
    backgroundColor: note.color || undefined,
    ["--color-outline" as string]: note.outlineColor || undefined,
  };

  const content = (
    <>
      <span className={styles.pin} aria-hidden />
      <span className={`h-7 w-7 ${styles.noteIcon}`}>
        <IllustrationSlot imageUrl={note.iconImageUrl} Fallback={Icon} alt="" width={28} height={28} />
      </span>
      <span className={`font-title text-sm ${styles.notePlatform}`}>{note.platform}</span>
      <span className="font-body text-sm">{note.value}</span>
      {note.description && <span className="font-body text-xs opacity-80">{note.description}</span>}
    </>
  );

  // Touch devices: static, no drag, no hover tilt — just the plain
  // pinned-in-place note, tappable to open the link directly.
  if (!canDrag) {
    return (
      <a
        href={note.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.paper} ${paperClass}`}
        style={{ ...colorStyle, transform: `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)` }}
      >
        {content}
      </a>
    );
  }

  return (
    // Outer layer owns drag + the flex-layout slot + the click/keyboard
    // interaction; inner layer owns only the hover lift/tilt. Splitting
    // them keeps drag's own y motion value (the persisted position)
    // separate from the hover animation's y (a -6px lift) — combining
    // both on one element would have them fight over the same property.
    // Double-click opens the link (same disambiguation as the homepage
    // cart items) since a single click/drag just moves the note now.
    <motion.div
      key={settled ? "settled" : "initial"}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={onDragEnd}
      onDoubleClick={() => window.open(note.url, "_blank", "noopener,noreferrer")}
      role="link"
      tabIndex={0}
      aria-label={`${note.platform}: ${note.value}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.open(note.url, "_blank", "noopener,noreferrer");
        }
      }}
      className={`${styles.dragLayer} cursor-grab active:cursor-grabbing`}
      style={{ x: dragX, y: dragY }}
    >
      <motion.div
        initial={{ rotate: rotation }}
        whileHover={{ y: -6, rotate: rotation * 0.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`${styles.paper} ${paperClass}`}
        style={colorStyle}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
