import { put, del, get } from "@vercel/blob";
import type { Artwork, Catalog } from "./types";

const CATALOG_PATH = "gallery/catalog.json";
export const MEDIA_PREFIX = "/api/media/";

function emptyCatalog(): Catalog {
  return { version: 1, artworks: [] };
}

/** Prefer RW token locally; on Vercel, OIDC + BLOB_STORE_ID is enough. */
export function blobAuth(): { token?: string } {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return token ? { token } : {};
}

export function isBlobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
      process.env.BLOB_STORE_ID?.trim(),
  );
}

export function mediaUrlForPathname(pathname: string): string {
  return `${MEDIA_PREFIX}${pathname.split("/").map(encodeURIComponent).join("/")}`;
}

export async function getCatalog(): Promise<Catalog> {
  if (!isBlobConfigured()) return emptyCatalog();

  try {
    const result = await get(CATALOG_PATH, {
      access: "private",
      useCache: false,
      ...blobAuth(),
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return emptyCatalog();
    }

    const data = (await new Response(result.stream).json()) as Catalog;
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
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    ...blobAuth(),
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
    title: input.title.trim() || "Sense títol",
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
    await del(artwork.imagePathname, blobAuth());
  } catch {
    // image may already be gone
  }

  return true;
}

export async function uploadArtworkImage(
  file: File,
  id: string,
): Promise<{ url: string; pathname: string }> {
  const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const ext = /^[a-z0-9]{1,5}$/.test(rawExt) ? rawExt : "jpg";
  const pathname = `gallery/artworks/${id}.${ext}`;

  const blob = await put(pathname, file, {
    access: "private",
    contentType: file.type || "image/jpeg",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...blobAuth(),
  });

  return {
    url: mediaUrlForPathname(blob.pathname),
    pathname: blob.pathname,
  };
}

export async function readPrivateBlob(pathname: string) {
  return get(pathname, {
    access: "private",
    ...blobAuth(),
  });
}
