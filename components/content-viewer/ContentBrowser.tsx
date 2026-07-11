"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ClipboardStickerUrls, ContentItem } from "@/lib/sanity/queries";
import SidebarTabs from "./SidebarTabs";
import ContentPane from "./ContentPane";
import ClipboardPlaceholder from "./ClipboardPlaceholder";
import styles from "./ContentBrowser.module.css";

type ContentBrowserProps = {
  items: ContentItem[];
  techLabel: string;
  sidebarHeading: string;
  footerNote: string;
  footerImageUrl?: string;
  clipboardText: string;
  clipboardStickers: ClipboardStickerUrls;
};

export default function ContentBrowser({
  items,
  techLabel,
  sidebarHeading,
  footerNote,
  footerImageUrl,
  clipboardText,
  clipboardStickers,
}: ContentBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((item) => item._id === selectedId) ?? null;

  return (
    <div className={styles.browser}>
      <SidebarTabs
        items={items}
        selectedId={selectedId}
        onSelect={setSelectedId}
        heading={sidebarHeading}
        footerNote={footerNote}
        footerImageUrl={footerImageUrl}
      />
      {/* mode="wait": the clipboard's drop-away exit finishes before the
          content starts rising, rather than the two overlapping.
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
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ y: 280, opacity: 0, transition: { duration: 0.45, ease: "easeIn" } }}
            >
              <div className={styles.placeholder}>
                <ClipboardPlaceholder text={clipboardText} stickers={clipboardStickers} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
