// ---------------------------------------------------------------------------
// Patrick Treacy — site content (sourced from patricktreacybooks.ie + research)
// ---------------------------------------------------------------------------

export const AUTHOR = {
  name: "Patrick Treacy",
  honorific: "Dr",
  roles: ["Author", "Aesthetic-Medicine Pioneer", "Humanitarian", "Storyteller"],
  tagline: "The Irishman who became Michael Jackson's doctor.",
  intro:
    "Doctor, author and humanitarian — a life told across four books, three continents, and one extraordinary friendship.",
};

export const NAV = [
  { label: "Story", href: "#story" },
  { label: "Books", href: "#books" },
  { label: "The Mask", href: "#mask" },
  { label: "Humanity", href: "#humanity" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
];

export const STORY = {
  eyebrow: "The Story",
  title: "From a needle's edge to the world stage.",
  paragraphs: [
    "Born in Northern Ireland, Patrick Treacy's life turned on a single moment in 1987 — a needlestick injury that set him on a path few could imagine.",
    "It carried him into the HIV/AIDS wards and orphanages of Africa, into the front line of a global health crisis, and ultimately into the invention of a new kind of medicine.",
    "He became a pioneer of aesthetic medicine — the first doctor to use hyaluronidase in the field — and, along the way, the trusted physician and friend of the most famous man on earth.",
  ],
};

export type Book = {
  title: string;
  kind: string;
  year?: string;
  blurb: string;
  spineColor: string;
};

export const BOOKS: Book[] = [
  {
    title: "Behind the Mask",
    kind: "Memoir",
    blurb:
      "The extraordinary story of the Irishman who became Michael Jackson's doctor — a gripping page-turner steeped in travel, adventure, politics, and the birth of aesthetic medicine.",
    spineColor: "#6e1f24",
  },
  {
    title: "The Needle and The Damage Done",
    kind: "Memoir · Novel",
    blurb:
      "A life-threatening needlestick accident and everything it unleashed — a journey from a childhood in Northern Ireland to the summit of aesthetic medicine.",
    spineColor: "#8a6d2c",
  },
  {
    title: "The Evolution of Aesthetic Medicine",
    kind: "Non-fiction",
    blurb:
      "A definitive account of how a discipline was built — the science, the breakthroughs, and the practitioners who shaped a modern field.",
    spineColor: "#2f3a44",
  },
  {
    title: "Aesthetic Complications & Other Interesting Cases",
    kind: "Clinical",
    blurb:
      "Hard-won lessons from the treatment room — the complications, the interesting cases, and the judgement that separates art from technique.",
    spineColor: "#1d1d22",
  },
];

export const MASK = {
  eyebrow: "Behind the Mask",
  title: "A friendship the world never saw.",
  body: [
    "Patrick Treacy met Michael Jackson in Ireland in 2006. What began as care became friendship — and a window into a private world.",
    "In his memoir, he reveals how the legendary singer was quietly planning to make his move to Ireland permanent, before his sudden death in 2009.",
    "Today, Treacy serves as Honorary Ambassador to the Michael Jackson Legacy Foundation.",
  ],
  quote:
    "“He wanted a place where the mask could finally come off.”",
};

export type TimelineEntry = { year: string; text: string };

export const TIMELINE: TimelineEntry[] = [
  { year: "1987", text: "A needlestick injury changes the course of a life." },
  { year: "1993", text: "Visits HIV orphanages across Zimbabwe and South Africa." },
  { year: "2001", text: "Publicly challenges Thabo Mbeki's AIDS policy at a medical conference." },
  { year: "2006", text: "Meets Michael Jackson in Ireland; a friendship begins." },
  { year: "2011", text: "Becomes Ambassador for the Michael Jackson Legacy Foundation." },
  { year: "2012", text: "Opens Everland Children's Orphanages in Liberia and Haiti." },
];

export const HUMANITY = {
  eyebrow: "Humanity",
  title: "Medicine as a moral act.",
  lead:
    "Long before the awards, there was the work — in the wards, the orphanages, and the places the cameras never reached.",
};

export type Stat = { value: string; label: string };

export const RECOGNITION = {
  eyebrow: "Recognition",
  title: "A field, redefined.",
  stats: [
    { value: "2019", label: "Top Aesthetic Practitioner in the World — MyFaceMyBody Global Awards" },
    { value: "×3", label: "AMEC Trophy — stem-cell, platelet & red-light research" },
    { value: "1st", label: "Doctor to use hyaluronidase in aesthetic medicine" },
    { value: "50+", label: "Peer-reviewed scientific articles & book chapters" },
  ] as Stat[],
};

export const QUOTE = {
  text:
    "A gripping page-turner — steeped in travel, adventure, politics, and his involvement in pioneering aesthetic medicine.",
  attribution: "on Behind the Mask",
};

export const CONTACT = {
  eyebrow: "Contact",
  title: "Enquiries & appearances.",
  lead: "For press, publishing, speaking engagements and clinical enquiries.",
  email: "info@patricktreacybooks.ie",
  links: [
    { label: "Behind the Mask on Amazon", href: "https://www.amazon.co.uk/Behind-Mask-Patrick-Treacy/dp/191074204X" },
    { label: "Ailesbury Clinic", href: "https://www.ailesburyclinic.ie" },
  ],
};
