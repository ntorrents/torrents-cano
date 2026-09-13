import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/types";

type Props = {
  artwork: Artwork;
  index?: number;
};

export function ArtworkCard({ artwork, index = 0 }: Props) {
  const tilt = index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-1" : "rotate-0";

  return (
    <Link
      href={`/obra/${artwork.id}`}
      className={`group block ${tilt} transition duration-500 hover:rotate-0 hover:-translate-y-1`}
    >
      <figure>
        <div className="frame-shadow rounded-[2px] border-[10px] border-frame bg-paper p-2 md:border-[14px]">
          <div className="relative aspect-[4/5] overflow-hidden bg-wall-deep">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
        <figcaption className="plaque mt-5 px-4 py-3">
          <p className="font-[family-name:var(--font-fraunces)] text-lg text-ink">
            {artwork.title}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {[artwork.medium, artwork.year].filter(Boolean).join(" · ") || "Obra sobre papel"}
          </p>
        </figcaption>
      </figure>
    </Link>
  );
}
