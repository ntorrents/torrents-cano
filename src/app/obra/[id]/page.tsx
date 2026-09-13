import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SoftDoodles } from "@/components/SoftDoodles";
import { getArtwork, getCatalog } from "@/lib/artworks";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtwork(id);
  if (!artwork) return { title: "Obra" };
  return {
    title: artwork.title,
    description: artwork.caption || `${artwork.title} — Atelier`,
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;
  const artwork = await getArtwork(id);
  if (!artwork) notFound();

  const catalog = await getCatalog();
  const idx = catalog.artworks.findIndex((a) => a.id === id);
  const prev = idx > 0 ? catalog.artworks[idx - 1] : null;
  const next =
    idx >= 0 && idx < catalog.artworks.length - 1
      ? catalog.artworks[idx + 1]
      : null;

  return (
    <div className="relative px-6 pb-24 pt-28 md:px-10">
      <SoftDoodles variant="page" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start lg:gap-16">
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            aria-hidden
            className="absolute left-1/2 top-[-22px] z-10 flex -translate-x-1/2 flex-col items-center"
          >
            <span className="h-3 w-3 rounded-full bg-coral shadow-sm ring-2 ring-paper" />
            <span className="h-5 w-px bg-ink-soft/35" />
          </div>
          <span
            aria-hidden
            className="washi-tape absolute -top-1 left-8 z-20 h-5 w-16 -rotate-6 rounded-[2px] bg-butter opacity-90 shadow-sm"
          />
          <span
            aria-hidden
            className="washi-tape absolute right-10 top-0 z-20 h-4 w-12 rotate-12 rounded-[2px] bg-mint/80 shadow-sm"
          />

          <div className="frame-shadow rounded-[4px] border-[12px] border-[#d8c7ae] bg-[#f7f0e4] p-3 ring-1 ring-[#a89072]/50 md:border-[18px] md:p-4">
            <div className="rounded-[2px] bg-[#F7E7C8] p-2 md:p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1px] bg-white md:aspect-[5/6]">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="plaque relative px-6 py-7">
            <span
              aria-hidden
              className="absolute -top-2 left-6 h-4 w-4 rounded-full bg-mint/90 shadow-sm ring-2 ring-paper"
            />
            <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">
              cartela
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-ink">
              {artwork.title}
            </h1>
            <dl className="mt-6 space-y-3 text-sm">
              {artwork.medium && (
                <div>
                  <dt className="text-ink-soft">Tècnica</dt>
                  <dd className="text-ink">{artwork.medium}</dd>
                </div>
              )}
              {artwork.year && (
                <div>
                  <dt className="text-ink-soft">Any</dt>
                  <dd className="text-ink">{artwork.year}</dd>
                </div>
              )}
            </dl>
            {artwork.caption && (
              <p className="mt-6 border-t border-dashed border-frame-edge/60 pt-5 text-ink-soft">
                {artwork.caption}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/galeria" className="text-ink-soft hover:text-ink">
              ← Tornar a la sala
            </Link>
            {prev && (
              <Link href={`/obra/${prev.id}`} className="hover:text-mint">
                Anterior
              </Link>
            )}
            {next && (
              <Link href={`/obra/${next.id}`} className="hover:text-mint">
                Següent
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
