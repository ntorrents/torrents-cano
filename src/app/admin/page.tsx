import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";
import { getCatalog, isBlobConfigured } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Comissariat",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const catalog = await getCatalog();
  const initiallyAuthed = await isAuthenticated();

  return (
    <div className="px-6 pb-24 pt-28 md:px-10">
      <AdminPanel
        initialArtworks={catalog.artworks}
        blobReady={isBlobConfigured()}
        adminConfigured={isAdminConfigured()}
        initiallyAuthed={initiallyAuthed}
      />
    </div>
  );
}
