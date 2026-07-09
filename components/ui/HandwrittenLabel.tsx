type HandwrittenLabelProps = {
  children: React.ReactNode;
  className?: string;
};

/** Homemade Apple accents — hover labels, placeholder-card messages, that
 * kind of "someone scribbled this on a sticky note" touch. */
export default function HandwrittenLabel({ children, className = "" }: HandwrittenLabelProps) {
  return <span className={`font-hand ${className}`}>{children}</span>;
}
