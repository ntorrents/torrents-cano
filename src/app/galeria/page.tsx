import type { Metadata } from "next";
import { ArtworkCard } from "@/components/ArtworkCard";
import { EmptyGallery } from "@/components/EmptyGallery";
import { SoftDoodles } from "@/components/SoftDoodles";
import { getCatalog } from "@/lib/artworks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Exposición",
  description: "Obras colgadas en la sala de Atelier.",
};

export default async function GalleryPage() {
  const catalog = await getCatalog();

  return (
    <div className="relative px-6 pb-24 pt-28 md:px-10">
      <SoftDoodles variant="page" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="text-panel mx-auto max-w-2xl px-6 py-7 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink">
            sala principal
          </p>
          <h1 className="squiggle-underline mt-3 inline-block font-[family-name:var(--font-fraunces)] text-4xl text-ink md:text-5xl">
            La exposición
          </h1>
          <p className="mt-4 text-ink">
            Cada obra cuelga con su marco y su cartela. Camina despacio.
          </p>
          <div className="gallery-rail mx-auto mt-8 max-w-xs" />
        </header>

        {catalog.artworks.length === 0 ? (
          <EmptyGallery />
        ) : (
          <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20">
            {catalog.artworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
