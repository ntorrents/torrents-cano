import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atelier — sala d’obres sobre paper",
    template: "%s · Atelier",
  },
  description:
    "Una sala petita on els dibuixos i els colors troben el seu lloc, un al costat de l’altre.",
  // Ruta nova (no /favicon.ico) per evitar la caché del triangle de Next.
  icons: {
    icon: [{ url: "/atelier-mark.png?v=5", type: "image/png", sizes: "32x32" }],
    shortcut: "/atelier-mark.png?v=5",
    apple: [{ url: "/atelier-mark-180.png?v=5", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ca"
      className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/atelier-mark.png?v=5" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/atelier-mark.png?v=5" type="image/png" />
      </head>
      <body className="museum-wall paper-grain flex min-h-full flex-col text-ink">
        <SiteHeader />
        <main className="relative flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
