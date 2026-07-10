import { Fraunces, Space_Grotesk } from "next/font/google";

// High-contrast editorial serif for names, titles, and pull quotes.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Grotesque used for eyebrows, labels, UI, and body copy.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});
