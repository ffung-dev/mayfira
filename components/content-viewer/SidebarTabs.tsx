"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ContentItem } from "@/lib/sanity/queries";
import { StarIcon } from "@/components/illustrations/svg/contentIcons";
import { SparkDoodle, FlowerDoodle } from "@/components/illustrations/svg/doodles";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";
import FitText from "@/components/ui/FitText";
import styles from "./ContentBrowser.module.css";

type SidebarTabsProps = {
  items: ContentItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  heading: string;
  footerNote: string;
  footerImageUrl?: string;
};

const FOOTER_REST_ROTATE = -0.8;

export default function SidebarTabs({ items, selectedId, onSelect, heading, footerNote, footerImageUrl }: SidebarTabsProps) {
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
                  {/* the tab is a fixed shape (torn-tape clip-path) — a long
                      title used to just get visually cut off by that clip
                      path once it overflowed the tab's width */}
                  <FitText
                    as="span"
                    boxClassName="min-w-0 flex-1 max-h-10 overflow-hidden"
                    className="font-title text-sm"
                    maxFontSizePx={14}
                    minFontSizePx={9}
                  >
                    {item.title}
                  </FitText>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {/* Sits still at rest — only shakes while actively hovered, and
          settles straight back to its resting tilt the moment hover ends. */}
      <motion.div
        className={styles.sidebarFooter}
        initial={{ rotate: FOOTER_REST_ROTATE }}
        whileHover={{
          rotate: [FOOTER_REST_ROTATE, -6, 5, -5, 4, FOOTER_REST_ROTATE],
          transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <IllustrationSlot imageUrl={footerImageUrl} Fallback={FlowerDoodle} alt="" width={21} height={21} className={styles.sidebarFooterDoodle} />
        <FitText
          as="span"
          boxClassName="w-full max-h-16 overflow-hidden"
          className={`font-hand text-base ${styles.sidebarFooterText}`}
          maxFontSizePx={16}
          minFontSizePx={10}
        >
          {footerNote}
        </FitText>
      </motion.div>
    </nav>
  );
}
