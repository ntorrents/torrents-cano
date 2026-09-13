"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Artwork } from "@/lib/types";

type Props = {
  initialArtworks: Artwork[];
  blobReady: boolean;
  adminConfigured: boolean;
  initiallyAuthed: boolean;
};

export function AdminPanel({
  initialArtworks,
  blobReady,
  adminConfigured,
  initiallyAuthed,
}: Props) {
  const router = useRouter();
  const [authed, setAuthed] = useState(initiallyAuthed);
  const [checking, setChecking] = useState(!initiallyAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [artworks, setArtworks] = useState(initialArtworks);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth");
        const data = await res.json();
        if (!cancelled) setAuthed(Boolean(data.ok));
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [medium, setMedium] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function login(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "No s’ha pogut entrar");
      }
      setAuthed(true);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
  }

  async function upload(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Tria una foto del quadre");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("title", title);
      form.set("year", year);
      form.set("medium", medium);
      form.set("caption", caption);

      const res = await fetch("/api/artworks", { method: "POST", body: form });
      const text = await res.text();
      let data: { error?: string; artwork?: Artwork } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          res.ok
            ? "Resposta invàlida del servidor"
            : `Error en pujar (${res.status})`,
        );
      }
      if (!res.ok) throw new Error(data.error || "No s’ha pogut pujar");

      setArtworks((prev) => [data.artwork as Artwork, ...prev]);
      setTitle("");
      setMedium("");
      setCaption("");
      setFile(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Vols treure aquesta obra de l’exposició?")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/artworks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No s’ha pogut eliminar");
      setArtworks((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  if (!adminConfigured) {
    return (
      <div className="plaque mx-auto max-w-lg px-6 py-8">
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl">
          Comissariat
        </h1>
        <p className="mt-3 text-ink-soft">
          Defineix <code className="text-ink">ADMIN_PASSWORD</code> a les
          variables d’entorn per protegir aquesta zona.
        </p>
      </div>
    );
  }

  if (checking) {
    return (
      <p className="text-center text-sm text-ink-soft">Obrint la sala…</p>
    );
  }

  if (!authed) {
    return (
      <form
        onSubmit={login}
        className="plaque mx-auto max-w-md space-y-5 px-6 py-8"
      >
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl">
          Comissariat
        </h1>
        <p className="text-sm text-ink-soft">
          Benvingut. Entra per penjar noves obres a la sala.
        </p>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Contrasenya</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-frame-edge bg-paper px-4 py-3 outline-none ring-mint focus:ring-2"
            required
          />
        </label>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition hover:bg-ink/90 disabled:opacity-60"
        >
          Entrar
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl text-ink">
            Comissariat
          </h1>
          <p className="mt-2 text-ink-soft">
            Puja una foto del quadre. Títol, tècnica i any basten per a la
            cartela del museu.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-ink-soft underline-offset-2 hover:text-ink hover:underline"
        >
          Sortir
        </button>
      </div>

      {!blobReady && (
        <div className="rounded-2xl border border-butter/60 bg-butter/20 px-5 py-4 text-sm text-ink">
          Encara no hi ha <strong>Vercel Blob</strong> configurat. Al dashboard
          crea l’store i assegura’t de tenir <code>BLOB_STORE_ID</code> o{" "}
          <code>BLOB_READ_WRITE_TOKEN</code>, i torna a desplegar.
        </div>
      )}

      <form onSubmit={upload} className="plaque space-y-5 px-6 py-7">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm md:col-span-2">
            <span className="mb-1.5 block text-ink-soft">Foto del quadre</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
              required
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="mb-1.5 block text-ink-soft">Títol</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Sol del matí"
              className="w-full rounded-xl border border-frame-edge bg-paper px-4 py-3 outline-none ring-mint focus:ring-2"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-ink-soft">Any</span>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-xl border border-frame-edge bg-paper px-4 py-3 outline-none ring-mint focus:ring-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-ink-soft">Tècnica</span>
            <input
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="Ceres, aquarel·la…"
              className="w-full rounded-xl border border-frame-edge bg-paper px-4 py-3 outline-none ring-mint focus:ring-2"
            />
          </label>
          <label className="block text-sm md:col-span-2">
            <span className="mb-1.5 block text-ink-soft">
              Nota de sala (opcional)
            </span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="Una línia breu, sense dades personals."
              className="w-full rounded-xl border border-frame-edge bg-paper px-4 py-3 outline-none ring-mint focus:ring-2"
            />
          </label>
        </div>
        {error && <p className="text-sm text-coral">{error}</p>}
        <button
          type="submit"
          disabled={busy || !blobReady}
          className="rounded-full bg-mint px-6 py-2.5 text-sm font-medium text-ink transition hover:brightness-105 disabled:opacity-50"
        >
          Penjar a l’exposició
        </button>
      </form>

      <section>
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl">
          Obres a la sala ({artworks.length})
        </h2>
        <ul className="mt-5 space-y-3">
          {artworks.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-frame-edge/60 bg-paper/70 px-4 py-3"
            >
              <div>
                <p className="font-medium text-ink">{a.title}</p>
                <p className="text-sm text-ink-soft">
                  {[a.medium, a.year].filter(Boolean).join(" · ")}
                </p>
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() => remove(a.id)}
                className="text-sm text-coral hover:underline disabled:opacity-50"
              >
                Treure
              </button>
            </li>
          ))}
          {artworks.length === 0 && (
            <li className="text-sm text-ink-soft">Encara no hi ha obres.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
