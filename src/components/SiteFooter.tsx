import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-frame-edge/40 bg-paper/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-ink-soft md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-[family-name:var(--font-fraunces)] text-base text-ink">
          Atelier
        </p>
        <p>Una sala pequeña para obras sobre papel.</p>
        <Link href="/galeria" className="hover:text-ink">
          Volver a la exposición
        </Link>
      </div>
    </footer>
  );
}
