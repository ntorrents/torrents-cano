import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/types";

type Props = {
  artwork: Artwork;
  index?: number;
};

const MATS = ["#F7E7C8", "#D9EBF2", "#E5F0E8", "#F6E0D8"] as const;
const TAPES = ["#F0D27A", "#E8A090", "#7EB8A2", "#9BC4DE"] as const;

export function ArtworkCard({ artwork, index = 0 }: Props) {
  const tilt =
    index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-1" : "rotate-0";
  const mat = MATS[index % MATS.length];
  const tape = TAPES[index % TAPES.length];

  return (
    <Link
      href={`/obra/${artwork.id}`}
      className={`group block w-full ${tilt} transition duration-500 hover:rotate-0 hover:-translate-y-1`}
    >
      <figure className="w-full">
        <div className="relative w-full pt-5">
          <div
            aria-hidden
            className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 flex-col items-center"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-coral shadow-sm ring-2 ring-paper" />
            <span className="h-4 w-px bg-ink-soft/35" />
          </div>

          <span
            aria-hidden
            className="washi-tape absolute left-5 top-3 z-20 h-5 w-14 -rotate-6 rounded-[2px] opacity-90 shadow-sm transition group-hover:rotate-[-3deg]"
            style={{ backgroundColor: tape }}
          />
          <span
            aria-hidden
            className="washi-tape absolute right-6 top-4 z-20 h-4 w-10 rotate-12 rounded-[2px] opacity-80 shadow-sm"
            style={{ backgroundColor: MATS[(index + 1) % MATS.length] }}
          />

          <div className="frame-shadow w-full rounded-[4px] border-[11px] border-[#d8c7ae] bg-[#f7f0e4] p-2 ring-1 ring-[#a89072]/50 md:border-[15px]">
            <div className="rounded-[2px] p-1.5 md:p-2" style={{ backgroundColor: mat }}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1px] bg-white">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>

        <figcaption className="plaque relative mt-6 px-4 py-3">
          <span
            aria-hidden
            className="absolute -top-2 right-4 h-4 w-4 rounded-full bg-butter/90 shadow-sm ring-2 ring-paper"
          />
          <p className="font-[family-name:var(--font-fraunces)] text-lg text-ink">
            {artwork.title}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {[artwork.medium, artwork.year].filter(Boolean).join(" · ") ||
              "Obra sobre papel"}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}
