// Per-region Amazon links for a book. We key a search to the exact title +
// author so it lands on the right book on each regional store. If exact product
// URLs become available, pass them in `overrides` (e.g. { uk: "https://www.amazon.co.uk/dp/191074204X" }).
export type AmazonRegion = "uk" | "us" | "ie";

export type AmazonLinks = Record<AmazonRegion, string>;

const DOMAINS: Record<AmazonRegion, string> = {
  uk: "amazon.co.uk",
  us: "amazon.com",
  ie: "amazon.ie",
};

export const REGION_LABEL: Record<AmazonRegion, string> = {
  uk: "Amazon UK",
  us: "Amazon US",
  ie: "Amazon IE",
};

export function amazonLinks(
  title: string,
  overrides?: Partial<AmazonLinks>
): AmazonLinks {
  const q = encodeURIComponent(`${title} Dr Patrick Treacy`);
  const build = (r: AmazonRegion) =>
    overrides?.[r] ?? `https://www.${DOMAINS[r]}/s?k=${q}`;
  return { uk: build("uk"), us: build("us"), ie: build("ie") };
}
