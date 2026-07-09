import WashiTape from "@/components/illustrations/svg/WashiTape";
import styles from "./PageTag.module.css";

export default function PageTag({ text }: { text: string }) {
  return (
    <div className={styles.wrapper}>
      <WashiTape className={styles.tagTape} />
      <div className={styles.tag}>
        <span className={styles.tagHole} aria-hidden />
        <span className={`font-hand text-lg ${styles.tagText}`}>{text}</span>
      </div>
    </div>
  );
}
