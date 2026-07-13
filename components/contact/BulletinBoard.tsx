"use client";

import { useRef } from "react";
import PinnedNote from "./PinnedNote";
import Polaroid from "./Polaroid";
import BulletinItemCard from "./BulletinItemCard";
import WashiTape from "@/components/illustrations/svg/WashiTape";
import Doodle from "@/components/illustrations/svg/Doodle";
import type { BulletinItem, ContactNote, PolaroidPhoto } from "@/lib/sanity/queries";
import styles from "./BulletinBoard.module.css";

type BulletinBoardProps = {
  notes: ContactNote[];
  polaroids: PolaroidPhoto[];
  items: BulletinItem[];
};

export default function BulletinBoard({ notes, polaroids, items }: BulletinBoardProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.board}>
      <WashiTape className={styles.decorTapeLeft} />
      <WashiTape className={styles.decorTapeRight} />
      <Doodle className={styles.decorDoodle} />
      <div ref={gridRef} className={styles.grid}>
        {notes.map((note) => (
          <PinnedNote key={note._id} note={note} constraintsRef={gridRef} />
        ))}
        {polaroids.map((photo) => (
          <Polaroid key={photo._id} photo={photo} constraintsRef={gridRef} />
        ))}
        {items.map((item) => (
          <BulletinItemCard key={item._id} item={item} constraintsRef={gridRef} />
        ))}
      </div>
    </div>
  );
}
