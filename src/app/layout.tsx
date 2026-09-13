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
    default: "Atelier — exposición sobre papel",
    template: "%s · Atelier",
  },
  description:
    "Una sala pequeña y elegante para colgar obras sobre papel. Exposición permanente.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "48x48" },
      { url: "/icon?v=3", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [{ url: "/apple-icon.png?v=3", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="museum-wall paper-grain flex min-h-full flex-col text-ink">
        <SiteHeader />
        <main className="relative flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
