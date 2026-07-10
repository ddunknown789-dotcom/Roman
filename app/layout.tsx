import type { Metadata } from "next";
import { fraunces, spaceGrotesk } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Patrick Treacy — Author · Aesthetic-Medicine Pioneer · Humanitarian",
  description:
    "The Irishman who became Michael Jackson's doctor. Author of Behind the Mask, The Needle and The Damage Done, and more — told in a fully immersive 3D experience.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <div className="vignette" aria-hidden />
        <div className="grain" aria-hidden />
        <Cursor />
      </body>
    </html>
  );
}
