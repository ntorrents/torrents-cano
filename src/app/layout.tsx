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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="museum-wall paper-grain flex min-h-full flex-col text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
