"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ReceiptNav.module.css";

const TABS = [
  { href: "/", label: "home", defaultNote: "landing..." },
  { href: "/about", label: "about", defaultNote: "my story" },
  { href: "/projects", label: "projects", defaultNote: "what i've built" },
  { href: "/hobbies", label: "hobbies", defaultNote: "what i love" },
  { href: "/contact", label: "contact", defaultNote: "let's connect" },
];

export default function ReceiptNav() {
  const pathname = usePathname();

  // The home page has the shopping cart in its place.
  if (pathname === "/") return null;

  return (
    <nav aria-label="site navigation" className={styles.nav}>
      <div className={styles.pullTab}>
        <span className={styles.chevron} aria-hidden />
        <span className="font-hand text-lg">receipt</span>
      </div>
      <ul className={styles.tabRow}>
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          const note = active ? "you are here!" : tab.defaultNote;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`${styles.tab} ${active ? styles.tabActive : ""}`}
              >
                <span className={`font-title text-sm uppercase ${styles.tabLabel}`}>{tab.label}</span>
                <span className={`font-hand ${styles.tabNote}`}>{note}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
