import Image from "next/image";
import WashiTape from "@/components/illustrations/svg/WashiTape";
import Paperclip from "@/components/illustrations/svg/Paperclip";
import { SmileyDoodle, SparkDoodle } from "@/components/illustrations/svg/doodles";
import styles from "./ContentPane.module.css";

const ROTATIONS = [-3, 2, -2];

export default function GalleryStrip({ urls, alt }: { urls: string[]; alt: string }) {
  if (urls.length === 0) return null;

  return (
    <div className={styles.gallery}>
      {urls.map((url, index) => {
        const isLast = index === urls.length - 1 && urls.length === 3;
        return (
          <div
            key={url}
            className={styles.galleryFrame}
            style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)` }}
          >
            {isLast ? (
              <>
                <span className={styles.gallerySticker} aria-hidden>
                  <SmileyDoodle className="h-full w-full text-maroon" />
                </span>
                <Paperclip className={styles.galleryClip} />
                <SparkDoodle className={styles.gallerySpark} />
              </>
            ) : (
              <WashiTape className={styles.galleryTape} />
            )}
            <div className={styles.galleryImage}>
              <Image
                src={url}
                alt={`${alt} — photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
