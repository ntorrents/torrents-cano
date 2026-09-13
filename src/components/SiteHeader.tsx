import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2 font-[family-name:var(--font-fraunces)] text-xl tracking-tight text-ink md:text-2xl"
        >
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky shadow-sm ring-1 ring-frame-edge/60 transition group-hover:rotate-6"
          >
            <span className="relative block h-4 w-4 overflow-hidden rounded-[2px] bg-paper">
              <span className="absolute left-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-butter" />
              <span className="absolute inset-x-0 bottom-0 h-1.5 bg-mint" />
            </span>
          </span>
          Atelier
        </Link>
        <nav className="flex items-center gap-6 text-sm text-ink-soft md:gap-8">
          <Link href="/galeria" className="transition-colors hover:text-ink">
            Exposició
          </Link>
          <Link
            href="/admin"
            className="rounded-full border border-frame-edge/70 bg-paper/60 px-3 py-1.5 text-xs tracking-wide text-ink-soft backdrop-blur-sm transition hover:border-mint hover:text-ink"
          >
            Comissariat
          </Link>
        </nav>
      </div>
    </header>
  );
}
