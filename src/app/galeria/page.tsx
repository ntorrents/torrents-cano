import type { Metadata } from "next";
import { ArtworkCard } from "@/components/ArtworkCard";
import { EmptyGallery } from "@/components/EmptyGallery";
import { getCatalog } from "@/lib/artworks";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Exposición",
  description: "Obras colgadas en la sala de Atelier.",
};

export default async function GalleryPage() {
  const catalog = await getCatalog();

  return (
    <div className="px-6 pb-24 pt-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-ink-soft">
            sala principal
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-4xl text-ink md:text-5xl">
            La exposición
          </h1>
          <p className="mt-3 text-ink-soft">
            Cada obra cuelga con su marco y su cartela. Camina despacio.
          </p>
        </header>

        {catalog.artworks.length === 0 ? (
          <EmptyGallery />
        ) : (
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
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
