"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ContentItem } from "@/lib/sanity/queries";
import styles from "./ContentBrowser.module.css";

type SidebarTabsProps = {
  items: ContentItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function SidebarTabs({ items, selectedId, onSelect }: SidebarTabsProps) {
  return (
    <nav className={styles.sidebar} aria-label="entries">
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
                {active && (
                  <motion.span
                    layoutId="shelf-tab-highlight"
                    className={styles.shelfTabHighlight}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
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
    </nav>
  );
}
