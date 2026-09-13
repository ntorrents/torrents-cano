import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-[family-name:var(--font-fraunces)] text-4xl text-ink">
        Esta obra no está en sala
      </h1>
      <p className="mt-3 text-ink-soft">Puede que se haya retirado de la exposición.</p>
      <Link
        href="/galeria"
        className="mt-8 rounded-full bg-ink px-6 py-2.5 text-sm text-paper"
      >
        Volver a la galería
      </Link>
    </div>
  );
}
