export function EmptyGallery() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-sky/70">
        <svg
          viewBox="0 0 80 80"
          className="h-14 w-14 text-mint"
          aria-hidden
        >
          <rect x="12" y="16" width="56" height="48" rx="4" fill="currentColor" opacity="0.25" />
          <circle cx="28" cy="34" r="6" fill="currentColor" opacity="0.55" />
          <path
            d="M12 52 L32 38 L46 48 L68 28 L68 64 L12 64 Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      </div>
      <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-ink">
        La sala espera la primera obra
      </h2>
      <p className="mt-3 text-ink-soft">
        Quan pengis fotos des del comissariat, apareixeran aquí com en un museu
        — amb el seu marc i la seva cartela.
      </p>
    </div>
  );
}
