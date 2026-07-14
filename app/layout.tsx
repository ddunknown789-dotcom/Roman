import type { Metadata } from "next";
import { fraunces, spaceGrotesk } from "./fonts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Prof Patrick Treacy — Regenerative-Medicine Pioneer · Author · Humanitarian",
  description:
    "The Irishman who became Michael Jackson's doctor. Founder of the Ailesbury Clinic, Dublin, author of fourteen books, and a globally recognised pioneer of regenerative aesthetic medicine — in a fully immersive 3D experience.",
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
        <ChatBot />
      </body>
    </html>
  );
}
