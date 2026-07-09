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
};

export default function ContentBrowser({ items, placeholderMessage, techLabel }: ContentBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((item) => item._id === selectedId) ?? null;

  return (
    <div className={styles.browser}>
      <SidebarTabs items={items} selectedId={selectedId} onSelect={setSelectedId} />
      <div className={styles.contentArea}>
        <AnimatePresence mode="popLayout" initial={false}>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PlaceholderCard message={placeholderMessage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
