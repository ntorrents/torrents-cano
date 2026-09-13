import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start lg:gap-16">
        <div className="frame-shadow rounded-[2px] border-[12px] border-frame bg-paper p-3 md:border-[18px] md:p-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-wall-deep md:aspect-[5/6]">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain bg-[#f7f1e8]"
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="plaque px-6 py-7">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">
              cartela
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-ink">
              {artwork.title}
            </h1>
            <dl className="mt-6 space-y-3 text-sm">
              {artwork.medium && (
                <div>
                  <dt className="text-ink-soft">Técnica</dt>
                  <dd className="text-ink">{artwork.medium}</dd>
                </div>
              )}
              {artwork.year && (
                <div>
                  <dt className="text-ink-soft">Año</dt>
                  <dd className="text-ink">{artwork.year}</dd>
                </div>
              )}
            </dl>
            {artwork.caption && (
              <p className="mt-6 border-t border-frame-edge/50 pt-5 text-ink-soft">
                {artwork.caption}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link href="/galeria" className="text-ink-soft hover:text-ink">
              ← Volver a la sala
            </Link>
            {prev && (
              <Link href={`/obra/${prev.id}`} className="hover:text-mint">
                Anterior
              </Link>
            )}
            {next && (
              <Link href={`/obra/${next.id}`} className="hover:text-mint">
                Siguiente
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
