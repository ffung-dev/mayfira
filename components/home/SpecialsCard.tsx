import HandwrittenLabel from "@/components/ui/HandwrittenLabel";
import Paperclip from "@/components/illustrations/svg/Paperclip";
import styles from "./SpecialsCard.module.css";

export default function SpecialsCard({ specials }: { specials: string[] }) {
  const items = specials.length > 0 ? specials : ["check back soon for what's fresh!"];

  return (
    <div className={styles.wrapper}>
      {/* sibling of the clipped card, not a child — clip-path on .card would
          otherwise cut off anything overhanging its own edge */}
      <Paperclip className={styles.paperclip} />
      <div className={styles.card}>
        <HandwrittenLabel className={`text-xl text-maroon ${styles.heading}`}>
          today&rsquo;s specials
        </HandwrittenLabel>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item} className="font-body text-sm text-ink">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
