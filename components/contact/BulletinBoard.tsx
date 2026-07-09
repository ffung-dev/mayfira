import PinnedNote from "./PinnedNote";
import Polaroid from "./Polaroid";
import WashiTape from "@/components/illustrations/svg/WashiTape";
import Doodle from "@/components/illustrations/svg/Doodle";
import type { ContactNote, PolaroidPhoto } from "@/lib/sanity/queries";
import styles from "./BulletinBoard.module.css";

type BulletinBoardProps = {
  notes: ContactNote[];
  polaroids: PolaroidPhoto[];
};

export default function BulletinBoard({ notes, polaroids }: BulletinBoardProps) {
  return (
    <div className={styles.board}>
      <WashiTape className={styles.decorTapeLeft} />
      <WashiTape className={styles.decorTapeRight} />
      <Doodle className={styles.decorDoodle} />
      <div className={styles.grid}>
        {notes.map((note) => (
          <PinnedNote key={note._id} note={note} />
        ))}
        {polaroids.map((photo) => (
          <Polaroid key={photo._id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
