import IllustrationSlot from "@/components/illustrations/IllustrationSlot";
import { FlowerDoodle } from "@/components/illustrations/svg/doodles";
import styles from "./PageTag.module.css";

type PageTagProps = {
  text: string;
  stickerUrl?: string;
};

export default function PageTag({ text, stickerUrl }: PageTagProps) {
  return (
    <div className={styles.card}>
      <IllustrationSlot
        imageUrl={stickerUrl}
        Fallback={FlowerDoodle}
        alt=""
        width={48}
        height={48}
        className={styles.sticker}
      />
      <p className={`font-title ${styles.text}`}>{text}</p>
    </div>
  );
}
