import HandwrittenLabel from "@/components/ui/HandwrittenLabel";
import Paperclip from "@/components/illustrations/svg/Paperclip";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";
import styles from "./SpecialsCard.module.css";

type SpecialsCardProps = {
  specials: string[];
  paperclipUrl?: string;
};

export default function SpecialsCard({ specials, paperclipUrl }: SpecialsCardProps) {
  const items = specials.length > 0 ? specials : ["check back soon for what's fresh!"];

  return (
    <div className={styles.wrapper}>
      {/* sibling of the clipped card, not a child — clip-path on .card would
          otherwise cut off anything overhanging its own edge */}
      <IllustrationSlot imageUrl={paperclipUrl} Fallback={Paperclip} alt="" width={26} height={44} className={styles.paperclip} />
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
