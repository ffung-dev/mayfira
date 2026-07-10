import { PortableText } from "@portabletext/react";
import type { ContentItem } from "@/lib/sanity/queries";
import IllustrationSlot from "@/components/illustrations/IllustrationSlot";
import FitText from "@/components/ui/FitText";
import { GithubIcon } from "@/components/illustrations/svg/contactIcons";
import { ChipIcon, HeartIcon, PersonIcon, StarIcon, TagIcon, ArrowUpRightIcon } from "@/components/illustrations/svg/contentIcons";
import { FlowerDoodle } from "@/components/illustrations/svg/doodles";
import Paperclip from "@/components/illustrations/svg/Paperclip";
import GalleryStrip from "./GalleryStrip";
import styles from "./ContentPane.module.css";

type ContentPaneProps = {
  item: ContentItem;
  techLabel: string;
};

export default function ContentPane({ item, techLabel }: ContentPaneProps) {
  return (
    <div className={styles.pane}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleDot} aria-hidden />
          <div className={styles.titleGroup}>
            <FitText
              as="h3"
              boxClassName={styles.titleBox}
              className={`text-2xl ${styles.title}`}
              maxFontSizePx={22}
              minFontSizePx={14}
            >
              {item.title}
            </FitText>
            {item.date && (
              <p className={styles.date}>
                {new Date(item.date).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
              </p>
            )}
          </div>
        </div>
        <div className={styles.headerRight}>
          {item.tags?.map((tag) => (
            <span key={tag} className={styles.tagPill}>
              {tag}
            </span>
          ))}
          <HeartIcon className={styles.heartIcon} />
        </div>
      </div>

      <GalleryStrip urls={item.galleryUrls} alt={item.title} />

      <div className={styles.columns}>
        <div className={styles.aboutColumn}>
          <span className={styles.aboutPin} aria-hidden />
          <span className={styles.sectionLabel}>
            <TagIcon className={styles.sectionIcon} />
            about this project
          </span>
          {item.description.length > 0 && (
            <div className={styles.aboutText}>
              <PortableText value={item.description} />
            </div>
          )}
          {item.links && item.links.length > 0 && (
            <ul className={styles.extraLinks}>
              {item.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.extraLinkPill}>
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
          <FlowerDoodle className={styles.aboutDoodle} />
        </div>

        <div className={styles.midColumn}>
          {item.techOrMaterials && item.techOrMaterials.length > 0 && (
            <div className={styles.midSection}>
              <Paperclip className={styles.midSectionClip} />
              <span className={styles.sectionLabel}>
                <ChipIcon className={styles.sectionIcon} />
                {techLabel.toLowerCase()}
              </span>
              <FitText
                as="p"
                boxClassName={styles.midSectionTextBox}
                className={`text-sm ${styles.midSectionText}`}
                maxFontSizePx={14}
                minFontSizePx={10}
              >
                {item.techOrMaterials.join(", ")}
              </FitText>
            </div>
          )}
          {item.myRole && (
            <div className={styles.midSection}>
              <Paperclip className={styles.midSectionClip} />
              <span className={styles.sectionLabel}>
                <PersonIcon className={styles.sectionIcon} />
                my role
              </span>
              <FitText
                as="p"
                boxClassName={styles.midSectionTextBox}
                className={`text-sm ${styles.midSectionText}`}
                maxFontSizePx={14}
                minFontSizePx={10}
              >
                {item.myRole}
              </FitText>
            </div>
          )}
        </div>

        {item.highlights && item.highlights.length > 0 && (
          <div className={styles.highlightsCard}>
            <span className={styles.sectionLabel}>
              <StarIcon className={styles.sectionIcon} />
              key highlights
            </span>
            <ul className={styles.highlightsList}>
              {item.highlights.map((highlight) => (
                <li key={highlight} className={styles.highlightItem}>
                  <HeartIcon className={styles.highlightBullet} />
                  <FitText
                    as="span"
                    boxClassName={styles.highlightTextBox}
                    className="text-sm"
                    maxFontSizePx={14}
                    minFontSizePx={10}
                  >
                    {highlight}
                  </FitText>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {item.codeLink && (
        <a href={item.codeLink.url} target="_blank" rel="noopener noreferrer" className={styles.hangingTab}>
          <IllustrationSlot
            imageUrl={item.codeLink.iconUrl}
            Fallback={GithubIcon}
            alt=""
            width={20}
            height={20}
            className={styles.hangingTabIcon}
          />
          <FitText
            as="span"
            boxClassName={styles.hangingTabTextBox}
            className={`text-sm ${styles.hangingTabText}`}
            maxFontSizePx={14}
            minFontSizePx={9}
          >
            {item.codeLink.label}
          </FitText>
          <ArrowUpRightIcon className={styles.hangingTabArrow} />
        </a>
      )}
    </div>
  );
}
