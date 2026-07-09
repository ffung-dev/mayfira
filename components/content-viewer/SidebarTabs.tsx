import Image from "next/image";
import type { ContentItem } from "@/lib/sanity/queries";
import { StarIcon } from "@/components/illustrations/svg/contentIcons";
import { SparkDoodle, FlowerDoodle } from "@/components/illustrations/svg/doodles";
import styles from "./ContentBrowser.module.css";

type SidebarTabsProps = {
  items: ContentItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  heading: string;
  footerNote: string;
};

export default function SidebarTabs({ items, selectedId, onSelect, heading, footerNote }: SidebarTabsProps) {
  return (
    <nav className={styles.sidebar} aria-label="entries">
      <div className={styles.sidebarHeading}>
        <SparkDoodle className={styles.sidebarHeadingMark} />
        <span className="font-hand text-lg">{heading}</span>
        <SparkDoodle className={styles.sidebarHeadingMark} />
      </div>
      <ul className={styles.tabList}>
        {items.map((item) => {
          const active = item._id === selectedId;
          return (
            <li key={item._id} className={styles.tabItem}>
              <button
                type="button"
                onClick={() => onSelect(item._id)}
                aria-pressed={active}
                className={`${styles.shelfTab} ${active ? styles.shelfTabActive : ""}`}
              >
                {active && <StarIcon className={styles.shelfTabStar} />}
                <span className={styles.shelfTabContent}>
                  {item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.shelfThumb}
                    />
                  ) : (
                    <span className={styles.shelfThumbFallback} aria-hidden />
                  )}
                  <span className="font-title text-sm">{item.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.sidebarFooter}>
        <FlowerDoodle className={styles.sidebarFooterDoodle} />
        <span className={`font-hand text-base ${styles.sidebarFooterText}`}>{footerNote}</span>
      </div>
    </nav>
  );
}
