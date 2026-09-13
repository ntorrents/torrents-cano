import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-fraunces)] text-xl tracking-tight text-ink md:text-2xl"
        >
          Atelier
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-soft md:gap-8">
          <Link
            href="/galeria"
            className="transition-colors hover:text-ink"
          >
            Exposición
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-frame-edge/70 bg-paper/60 px-3 py-1.5 text-xs tracking-wide text-ink-soft backdrop-blur-sm transition hover:border-mint hover:text-ink"
          >
            Curaduría
          </Link>
        </nav>
      </div>
    </header>
  );
}
