import HandwrittenLabel from "@/components/ui/HandwrittenLabel";
import styles from "./ContentBrowser.module.css";

export default function PlaceholderCard({ message }: { message: string }) {
  return (
    <div className={styles.placeholder}>
      <div className={styles.foldedCard}>
        <HandwrittenLabel className={`text-xl text-maroon sm:text-2xl ${styles.foldedCardText}`}>{message}</HandwrittenLabel>
      </div>
    </div>
  );
}
