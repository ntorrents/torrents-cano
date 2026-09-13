import Link from "next/link";
import { SoftDoodles } from "@/components/SoftDoodles";
import { getCatalog } from "@/lib/artworks";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const catalog = await getCatalog();
  const count = catalog.artworks.length;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <SoftDoodles variant="hero" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="float-a absolute left-[8%] top-[22%] h-24 w-20 rounded-sm bg-butter/50 shadow-lg md:h-32 md:w-28" />
        <div className="float-b absolute right-[12%] top-[28%] h-28 w-24 rounded-sm bg-coral/35 shadow-lg md:h-40 md:w-32" />
        <div className="float-c absolute bottom-[18%] left-[18%] h-20 w-28 rounded-sm bg-mint/40 shadow-lg md:h-28 md:w-40" />
        <div className="absolute right-[22%] bottom-[22%] h-16 w-16 rounded-full bg-sky/80 blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-28 text-center md:px-10 md:pt-24">
        <div className="text-panel rise mx-auto max-w-2xl px-6 py-8 md:px-10 md:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ink">
            exposición permanente
          </p>
          <h1 className="rise rise-delay-1 squiggle-underline mt-5 inline-block font-[family-name:var(--font-fraunces)] text-6xl leading-[0.95] tracking-tight text-ink md:text-8xl">
            Atelier
          </h1>
          <p className="rise rise-delay-2 mx-auto mt-6 max-w-md text-lg text-ink md:text-xl">
            Una sala quieta para obras sobre papel — como un museo pequeño, con
            luz suave y marcos que cuidan cada dibujo.
          </p>
          <div className="rise rise-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/galeria"
              className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper shadow-[0_8px_0_rgba(26,42,36,0.16)] transition hover:bg-ink/90 hover:shadow-[0_5px_0_rgba(26,42,36,0.16)] hover:translate-y-px"
            >
              Entrar a la exposición
            </Link>
            {count > 0 && (
              <span className="rounded-full border border-frame-edge/80 bg-paper px-4 py-2 text-sm font-medium text-ink">
                {count} {count === 1 ? "obra" : "obras"} en sala
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
