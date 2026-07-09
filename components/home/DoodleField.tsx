import {
  ArrowDoodle,
  BearDoodle,
  CatDoodle,
  FlowerDoodle,
  SmileyDoodle,
  SparkDoodle,
} from "@/components/illustrations/svg/doodles";

const DOODLES = [
  { Doodle: FlowerDoodle, top: "10%", left: "80%", size: "2.1rem", rotate: -8 },
  { Doodle: SparkDoodle, top: "18%", left: "10%", size: "1.5rem", rotate: 10 },
  { Doodle: SmileyDoodle, top: "70%", left: "84%", size: "1.9rem", rotate: 6 },
  { Doodle: CatDoodle, top: "80%", left: "16%", size: "2.3rem", rotate: -6 },
  { Doodle: ArrowDoodle, top: "42%", left: "90%", size: "1.9rem", rotate: 18 },
  { Doodle: BearDoodle, top: "58%", left: "5%", size: "2.1rem", rotate: -12 },
];

/** Purely decorative — scattered small line-art doodles so the maroon
 * panel doesn't read as an empty block of color. Kept low-opacity and out
 * near the edges so they don't compete with the heading/note card. */
export default function DoodleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {DOODLES.map(({ Doodle, top, left, size, rotate }, index) => (
        <span
          key={index}
          className="absolute text-cream opacity-35"
          style={{ top, left, width: size, height: size, transform: `rotate(${rotate}deg)` }}
        >
          <Doodle className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}
