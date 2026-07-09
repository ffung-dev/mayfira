"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import styles from "./ReceiptNav.module.css";

const TABS = [
  { href: "/", label: "home", note: "you are here!" },
  { href: "/about", label: "about", note: "my story" },
  { href: "/projects", label: "projects", note: "what i've built" },
  { href: "/hobbies", label: "hobbies", note: "what i love" },
  { href: "/contact", label: "contact", note: "let's connect" },
];

const PULL_TAB_HEIGHT = "2.5rem";

export default function ReceiptNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  // Hover doesn't exist on touch devices, so there's no gesture that could
  // ever reveal a collapsed bar there — skip the collapse entirely instead.
  const canHover = useMediaQuery("(hover: hover)");

  // The home page has the shopping cart in its place.
  if (pathname === "/") return null;

  const revealed = !canHover || hovered;

  return (
    <motion.nav
      aria-label="site navigation"
      className={styles.nav}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: revealed ? 0 : `calc(100% - ${PULL_TAB_HEIGHT})` }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      <div className={styles.pullTab}>
        <span className={styles.chevron} aria-hidden />
        <span className="font-hand text-lg">receipt</span>
      </div>
      <ul className={styles.tabRow} style={{ pointerEvents: revealed ? "auto" : "none" }}>
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                tabIndex={revealed ? 0 : -1}
              >
                <span className={`font-title text-sm uppercase ${styles.tabLabel}`}>{tab.label}</span>
                <span className={`font-hand ${styles.tabNote}`}>{tab.note}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
