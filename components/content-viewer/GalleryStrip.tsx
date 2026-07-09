import Image from "next/image";
import styles from "./ContentBrowser.module.css";

export default function GalleryStrip({ urls, alt }: { urls: string[]; alt: string }) {
  if (urls.length === 0) return null;

  return (
    <div className={styles.gallery}>
      {urls.map((url, index) => (
        <div key={url} className={styles.galleryImage}>
          <Image
            src={url}
            alt={`${alt} — photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 30vw, 22vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
