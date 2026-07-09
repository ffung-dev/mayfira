type HeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Page-level heading, always set in Elsie per the brand sheet. */
export default function Heading({ children, as: Tag = "h1", className = "" }: HeadingProps) {
  return (
    <Tag
      className={`font-title font-black text-4xl leading-tight sm:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </Tag>
  );
}
