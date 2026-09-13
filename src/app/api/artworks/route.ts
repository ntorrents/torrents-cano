import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  addArtwork,
  getCatalog,
  isBlobConfigured,
  removeArtwork,
  uploadArtworkImage,
} from "@/lib/artworks";

export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json(catalog);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autoritzat" }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json(
      {
        error:
          "Falta BLOB_STORE_ID o BLOB_READ_WRITE_TOKEN. Configura Vercel Blob.",
      },
      { status: 503 },
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const title = String(form.get("title") ?? "");
    const year = String(form.get("year") ?? "");
    const medium = String(form.get("medium") ?? "");
    const caption = String(form.get("caption") ?? "");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Falta la foto de l’obra" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Només s’admeten imatges" },
        { status: 400 },
      );
    }

    const id = crypto.randomUUID();
    const uploaded = await uploadArtworkImage(file, id);
    const artwork = await addArtwork({
      id,
      title,
      year,
      medium,
      caption,
      imageUrl: uploaded.url,
      imagePathname: uploaded.pathname,
    });

    return NextResponse.json({ artwork });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No s’ha pogut pujar l’obra";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autoritzat" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) {
      return NextResponse.json({ error: "Falta l’id" }, { status: 400 });
    }

    const ok = await removeArtwork(body.id);
    if (!ok) {
      return NextResponse.json({ error: "Obra no trobada" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No s’ha pogut eliminar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
