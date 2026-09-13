import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl text-ink">
        Aquesta obra no és a la sala
      </h1>
      <p className="mt-3 text-ink-soft">
        Potser s’ha retirat de l’exposició.
      </p>
      <Link
        href="/galeria"
        className="mt-8 rounded-full bg-ink px-6 py-2.5 text-sm text-paper"
      >
        Tornar a la galeria
      </Link>
    </div>
  );
}
