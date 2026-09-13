import { NextResponse } from "next/server";
import { isBlobConfigured, readPrivateBlob } from "@/lib/artworks";

type Params = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  if (!isBlobConfigured()) {
    return NextResponse.json({ error: "Blob no configurado" }, { status: 503 });
  }

  const { path } = await params;
  const pathname = path.map(decodeURIComponent).join("/");

  if (!pathname.startsWith("gallery/") || pathname.includes("..")) {
    return NextResponse.json({ error: "Ruta no permitida" }, { status: 400 });
  }

  try {
    const result = await readPrivateBlob(pathname);
    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al leer el archivo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
