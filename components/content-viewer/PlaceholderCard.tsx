import HandwrittenLabel from "@/components/ui/HandwrittenLabel";
import styles from "./ContentBrowser.module.css";

export default function PlaceholderCard({ message }: { message: string }) {
  return (
    <div className={styles.placeholder}>
      <HandwrittenLabel className="text-3xl text-maroon sm:text-4xl">{message}</HandwrittenLabel>
    </div>
  );
}
