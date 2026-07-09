"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ReceiptNav.module.css";

const TABS = [
  { href: "/", label: "home", note: "you are here!" },
  { href: "/about", label: "about", note: "my story" },
  { href: "/projects", label: "projects", note: "what i've built" },
  { href: "/hobbies", label: "hobbies", note: "what i love" },
  { href: "/contact", label: "contact", note: "let's connect" },
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
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`${styles.tab} ${active ? styles.tabActive : ""}`}
              >
                <span className={`font-title text-sm uppercase ${styles.tabLabel}`}>{tab.label}</span>
                <span className={`font-hand ${styles.tabNote}`}>{tab.note}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
