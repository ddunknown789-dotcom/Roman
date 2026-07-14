// ---------------------------------------------------------------------------
// Patrick Treacy — site content
// Sourced & cross-verified from profpatricktreacy.ie and patricktreacybooks.ie
// ---------------------------------------------------------------------------

export const AUTHOR = {
  name: "Patrick Treacy",
  honorific: "Prof",
  roles: ["Regenerative-Medicine Pioneer", "Author", "Humanitarian", "Educator"],
  tagline: "The Irishman who became Michael Jackson's doctor.",
  intro:
    "For more than 40 years, Professor Patrick Treacy has worked at the intersection of clinical medicine, aesthetic innovation, regenerative science and humanitarian service — a globally recognised pioneer, and the author of fourteen books.",
};

export const NAV = [
  { label: "Story", href: "#story" },
  { label: "Research", href: "#research" },
  { label: "Books", href: "#books" },
  { label: "Humanity", href: "#humanity" },
  { label: "Speaking", href: "#speaking" },
  { label: "Awards", href: "#awards" },
  { label: "Media", href: "#media" },
  { label: "Contact", href: "#contact" },
];

export const STORY = {
  eyebrow: "About",
  title: "A life devoted to the science and art of restorative medicine.",
  paragraphs: [
    "For more than 40 years, Professor Patrick Treacy — founder of the Ailesbury Clinic in Dublin — has stood at the intersection of clinical medicine, aesthetic innovation, regenerative science and humanitarian conviction, pioneering therapies now adopted by physicians on six continents.",
    "His original research in HELPIR, photobiomodulation, platelet-rich plasma and complication management has been published across the world's leading journals and translated into the standard of care for tens of thousands of patients.",
    "He has received five Lifetime Achievement Awards and is consistently named among the most influential figures in aesthetic medicine worldwide — a leading voice for biological honesty, safer practice and the responsible future of regenerative aesthetics.",
  ],
};

export type Book = {
  title: string;
  kind: string;
  year?: string;
  blurb: string;
  spineColor: string;
  cover: string; // /covers/*.jpg
};

export const BOOKS: Book[] = [
  {
    title: "Behind the Mask",
    kind: "Memoir",
    blurb:
      "The extraordinary story of the Irishman who became Michael Jackson's doctor — a memoir of medicine, fame and identity.",
    spineColor: "#2f6fb0",
    cover: "/covers/behind-the-mask.jpg",
  },
  {
    title: "The Evolution of Aesthetic Medicine",
    kind: "Non-fiction",
    blurb: "The inside story of a specialty that changed modern medicine.",
    spineColor: "#1c3f63",
    cover: "/covers/evolution-aesthetic-medicine.jpg",
  },
  {
    title: "Aesthetic Complications & Other Interesting Cases",
    kind: "Clinical",
    blurb: "A clinical guide to recognising and managing aesthetic complications.",
    spineColor: "#0b2a4a",
    cover: "/covers/aesthetic-complications.jpg",
  },
  {
    title: "The Living History of Medicine",
    kind: "Non-fiction",
    blurb: "A journey through the people and discoveries that shaped medicine.",
    spineColor: "#1e3a4c",
    cover: "/covers/living-history-of-medicine.jpg",
  },
  {
    title: "Destinations",
    kind: "Travel · Memoir",
    blurb: "From Dublin to the world — medicine beyond the clinic.",
    spineColor: "#5a6b62",
    cover: "/covers/destinations.jpg",
  },
  {
    title: "Pandemics",
    kind: "Non-fiction",
    blurb: "The story of pandemics — and why they reshape civilisation.",
    spineColor: "#0e1a2b",
    cover: "/covers/pandemics.jpg",
  },
  {
    title: "Don't Give Up On Your Dreams",
    kind: "Inspiration",
    blurb: "A powerful reminder that resilience can rewrite a life.",
    spineColor: "#b5622a",
    cover: "/covers/dont-give-up-dreams.jpg",
  },
  {
    title: "Faces",
    kind: "Science",
    blurb:
      "Why they matter and what they reveal — the science, psychology and ethics of the human face.",
    spineColor: "#161616",
    cover: "/covers/faces.jpg",
  },
  {
    title: "The Pathways of Ageing",
    kind: "Longevity",
    blurb:
      "A groundbreaking exploration into longevity, healthspan and the science of growing older with vitality.",
    spineColor: "#0f2a4a",
    cover: "/covers/pathways-of-ageing.jpg",
  },
  {
    title: "The Language of Peptides",
    kind: "Science",
    blurb:
      "Signals, illusion and the temptation of longevity — an evidence-grounded guide for clinicians and patients.",
    spineColor: "#0f2733",
    cover: "/covers/language-of-peptides.jpg",
  },
  {
    title: "Q&A on Regenerative Medicine",
    kind: "Science",
    blurb: "Clear answers on the future of regenerative medicine.",
    spineColor: "#1f5fa8",
    cover: "/covers/qa-regenerative-medicine.jpg",
  },
];

// Books in the wider fourteen-volume library that don't yet have cover art here.
export const MORE_BOOKS = [
  "Where Angels Dare… — a humanitarian's journey to Haiti and Kurdistan-Iraq",
  "The Needle and the Damage Done — a gripping journey through medicine, fame and human vulnerability",
  "Prevention and Management of Aesthetic Complications — the clinical reference (Edizioni Minerva Medica)",
];

export const MASK = {
  eyebrow: "Behind the Mask",
  title: "A friendship the world never saw.",
  body: [
    "Professor Treacy met Michael Jackson in Ireland in 2006. What began as care became a genuine friendship — and a window into a private world.",
    "He tells the full story in his memoir, “Behind the Mask” — the extraordinary account of the Irishman who became Michael Jackson's doctor, and a meditation on medicine, fame and identity.",
    "Through the Michael Jackson Legacy Organisation, that friendship became a mission — helping build orphanages for vulnerable children in Haiti and Liberia.",
  ],
  quote: "“He wanted a place where the mask could finally come off.”",
};

export type TimelineEntry = { year: string; text: string };

export const TIMELINE: TimelineEntry[] = [
  { year: "2001", text: "Humanitarian medical work across South Africa, supporting vulnerable HIV patients and rural health." },
  { year: "2010", text: "Medical support after the Haiti earthquake, among communities facing trauma and displacement." },
  { year: "2012", text: "Opens an orphanage for vulnerable children in post-conflict Liberia." },
  { year: "2012–13", text: "Helps build an orphanage and two schools for children in earthquake-struck Haiti." },
  { year: "2016", text: "Humanitarian work at Maun District Hospital and Eyes for Sight projects in Malawi." },
  { year: "2019–26", text: "Rural health, children's and clean-water projects across Uganda." },
  { year: "2023", text: "Trains physicians in Pakistan in scar revision, regenerative approaches and complication care." },
  { year: "2024", text: "Brings clean-water access to rural Northern Punjab through village pump projects." },
];

export const HUMANITY = {
  eyebrow: "Humanitarian Missions",
  title: "Medicine, where it is needed most.",
  lead:
    "For nearly four decades, Professor Treacy has carried his practice beyond the clinic — from AIDS relief in Malawi and South Africa to orphanages in Haiti and Liberia with the Michael Jackson Legacy Organisation, and ongoing education and clean-water work across Uganda, India and North Pakistan.",
};

export type Stat = { value: string; label: string };

export const RECOGNITION = {
  eyebrow: "Honours & Recognition",
  title: "Five nations. One lifetime of devotion.",
  stats: [
    { value: "40+", label: "Years at the frontier of medicine" },
    { value: "150+", label: "Scientific publications, taught in 40+ countries" },
    { value: "10,000+", label: "Physicians trained worldwide" },
    { value: "5×", label: "Lifetime Achievement Awards — China · Ireland · Italy · Pakistan · UK" },
  ] as Stat[],
};

export const QUOTE = {
  text:
    "A defining voice in European aesthetic medicine — his contribution to patient safety and ethical practice has shaped a generation of clinicians.",
  attribution: "Prof. Aldo Bruno Giannì · IAPEM, Milan",
};

export const CONTACT = {
  eyebrow: "Contact & Booking",
  title: "Begin the conversation.",
  lead:
    "For speaking engagements, faculty invitations, research collaborations and select media requests. Ailesbury Clinics Ltd, David Lloyd Riverview, Beech Hill Rd, Clonskeagh, Co. Dublin, D04 AF10, Ireland.",
  email: "patrick@drpatricktreacy.ie",
  links: [
    { label: "Ailesbury Clinic", href: "https://www.ailesburyclinic.ie" },
    { label: "YouTube · @PatrickTreacyAilesbury", href: "https://www.youtube.com/@PatrickTreacyAilesbury" },
  ],
};
