import styles from "./RouteTransitionOverlay.module.css";

export default function RouteTransitionOverlay({ visible }: { visible: boolean }) {
  return (
    <div className={`${styles.overlay} ${visible ? styles.visible : ""}`} aria-hidden={!visible}>
      <div className={styles.loader} />
    </div>
  );
}
