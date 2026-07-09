import { PortableText } from "@portabletext/react";
import type { ContentItem } from "@/lib/sanity/queries";
import GalleryStrip from "./GalleryStrip";
import styles from "./ContentBrowser.module.css";

type ContentPaneProps = {
  item: ContentItem;
  techLabel: string;
};

export default function ContentPane({ item, techLabel }: ContentPaneProps) {
  return (
    <div className={styles.pane}>
      <GalleryStrip urls={item.galleryUrls} alt={item.title} />

      <div className={styles.body}>
        <h3 className="font-title text-2xl text-maroon sm:text-3xl">{item.title}</h3>
        {item.date && (
          <p className="font-body text-sm text-rose">
            {new Date(item.date).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
          </p>
        )}

        {item.description.length > 0 && (
          <div className={`${styles.richText} font-body text-ink`}>
            <PortableText value={item.description} />
          </div>
        )}

        {item.techOrMaterials && item.techOrMaterials.length > 0 && (
          <div className={styles.tagRow}>
            <span className="font-title text-xs uppercase text-rose">{techLabel}</span>
            <ul className={styles.tagList}>
              {item.techOrMaterials.map((tech) => (
                <li key={tech} className={styles.tagChip}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.links && item.links.length > 0 && (
          <ul className={styles.linkList}>
            {item.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkPill}
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
