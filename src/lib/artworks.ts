import { list, put, del } from "@vercel/blob";
import type { Artwork, Catalog } from "./types";

const CATALOG_PATH = "gallery/catalog.json";

function emptyCatalog(): Catalog {
  return { version: 1, artworks: [] };
}

export function isBlobConfigured(): boolean {
  // En Vercel moderno basta BLOB_STORE_ID (+ OIDC).
  // En local suele usarse BLOB_READ_WRITE_TOKEN.
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID,
  );
}

export async function getCatalog(): Promise<Catalog> {
  if (!isBlobConfigured()) return emptyCatalog();

  try {
    const { blobs } = await list({ prefix: CATALOG_PATH, limit: 1 });
    const catalogBlob = blobs.find((b) => b.pathname === CATALOG_PATH);
    if (!catalogBlob) return emptyCatalog();

    const res = await fetch(catalogBlob.url, { cache: "no-store" });
    if (!res.ok) return emptyCatalog();

    const data = (await res.json()) as Catalog;
    if (!data?.artworks || !Array.isArray(data.artworks)) return emptyCatalog();

    return {
      version: 1,
      artworks: [...data.artworks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    };
  } catch {
    return emptyCatalog();
  }
}

async function saveCatalog(catalog: Catalog): Promise<void> {
  await put(CATALOG_PATH, JSON.stringify(catalog, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}

export async function getArtwork(id: string): Promise<Artwork | null> {
  const catalog = await getCatalog();
  return catalog.artworks.find((a) => a.id === id) ?? null;
}

export async function addArtwork(
  input: Omit<Artwork, "id" | "createdAt"> & { id?: string },
): Promise<Artwork> {
  const catalog = await getCatalog();
  const artwork: Artwork = {
    id: input.id ?? crypto.randomUUID(),
    title: input.title.trim() || "Sin título",
    year: input.year?.trim() || undefined,
    medium: input.medium?.trim() || undefined,
    caption: input.caption?.trim() || undefined,
    imageUrl: input.imageUrl,
    imagePathname: input.imagePathname,
    createdAt: new Date().toISOString(),
  };

  catalog.artworks.unshift(artwork);
  await saveCatalog(catalog);
  return artwork;
}

export async function removeArtwork(id: string): Promise<boolean> {
  const catalog = await getCatalog();
  const artwork = catalog.artworks.find((a) => a.id === id);
  if (!artwork) return false;

  catalog.artworks = catalog.artworks.filter((a) => a.id !== id);
  await saveCatalog(catalog);

  try {
    await del(artwork.imagePathname);
  } catch {
    // image may already be gone
  }

  return true;
}

export async function uploadArtworkImage(
  file: File,
  id: string,
): Promise<{ url: string; pathname: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const pathname = `gallery/artworks/${id}.${ext}`;

  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type || "image/jpeg",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return { url: blob.url, pathname: blob.pathname };
}
