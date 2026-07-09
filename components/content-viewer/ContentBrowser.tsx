"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ContentItem } from "@/lib/sanity/queries";
import SidebarTabs from "./SidebarTabs";
import ContentPane from "./ContentPane";
import PlaceholderCard from "./PlaceholderCard";
import styles from "./ContentBrowser.module.css";

type ContentBrowserProps = {
  items: ContentItem[];
  placeholderMessage: string;
  techLabel: string;
  sidebarHeading: string;
  footerNote: string;
};

export default function ContentBrowser({ items, placeholderMessage, techLabel, sidebarHeading, footerNote }: ContentBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((item) => item._id === selectedId) ?? null;

  return (
    <div className={styles.browser}>
      <SidebarTabs items={items} selectedId={selectedId} onSelect={setSelectedId} heading={sidebarHeading} footerNote={footerNote} />
      {/* mode="wait": the placeholder's whole fold-then-drop exit finishes
          before the content starts rising, matching "fold flat, drop off,
          THEN content rises" rather than the two overlapping.
          No cream box at all until something's selected — contentArea
          only picks up the paper-card look once selected has a value. */}
      <div className={`${styles.contentArea} ${selected ? styles.contentAreaFilled : ""}`}>
        <AnimatePresence mode="wait" initial={false}>
          {selected ? (
            <motion.div
              key={selected._id}
              className={styles.contentSlide}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <ContentPane item={selected} techLabel={techLabel} />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className={styles.contentSlide}
              initial={{ rotateX: 14, opacity: 0 }}
              animate={{ rotateX: 14, opacity: 1 }}
              exit={{
                rotateX: [14, 0, 0],
                y: [0, 0, 280],
                opacity: [1, 1, 0],
                transition: { duration: 0.6, times: [0, 0.35, 1], ease: "easeInOut" },
              }}
            >
              <PlaceholderCard message={placeholderMessage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
