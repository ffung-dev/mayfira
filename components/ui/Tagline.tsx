type TaglineProps = {
  children: React.ReactNode;
  className?: string;
};

/** Subtitle line under a Heading — Karla italic, in the rose accent color. */
export default function Tagline({ children, className = "" }: TaglineProps) {
  return <p className={`font-body text-lg text-rose italic sm:text-xl ${className}`}>{children}</p>;
}
