// Self-contained knowledge base for the site chatbot (no external AI).
// Two layers of matching:
//   1. SMART HANDLERS — computed answers for dynamic questions (counts, "what's
//      next", "how many") derived live from the data arrays, so they can never
//      drift out of sync with the site's actual content.
//   2. KNOWLEDGE entries — keyword-scored Q&A, generated from every data source
//      on the site (research, safety, qualifications, lectures, conferences,
//      publications, awards, endorsements, media, social, books, timeline) plus
//      hand-curated entries for the big-picture questions.

import { AUTHOR, BOOKS, MORE_BOOKS, MASK, TIMELINE, CONTACT } from "./content";
import {
  GLOBAL,
  QUALIFICATIONS,
  RESEARCH,
  PLUS,
  SAFETY,
  LECTURES,
  CONFERENCES,
  PUBLICATIONS,
  AWARDS,
  ENDORSEMENTS,
  MEDIA,
  SOCIAL,
  FEEDS,
  SPEAKER_KIT,
} from "./profile";

export type Suggestion = string;
type Entry = { keywords: string[]; answer: string };

// normalise punctuation/apostrophes/accents so "what's" / "whats" and
// "Giannì" / "Gianni" all line up regardless of precomposed vs decomposed
// Unicode input.
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents, keep the base letter
    .replace(/[’‘']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Full titles/names make poor standalone keywords — a user asking just
// "helpir" would never contain the full string "the helpir technique" as a
// substring. This expands every multi-word keyword into its own significant
// words too, so partial/paraphrased questions still match.
const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "his", "her", "are",
  "was", "were", "into", "across", "over", "under", "not", "but", "you",
  "your", "has", "have", "had", "who", "what", "when", "where", "why", "how",
  "its", "per", "via", "vs", "of", "in", "on", "at", "to", "by", "a", "an",
  "is", "it", "she", "him", "all", "any", "can", "did", "does", "each",
  "more", "most", "such", "than", "then", "they", "them", "very", "one",
]);
function expandKeywords(keywords: string[]): string[] {
  const out = new Set<string>();
  for (const kw of keywords) {
    if (!kw) continue;
    out.add(kw);
    const nk = norm(kw);
    if (nk.includes(" ")) {
      for (const w of nk.split(" ")) {
        if (w.length >= 3 && !STOPWORDS.has(w)) out.add(w);
      }
    }
  }
  return [...out];
}

const bookTitles = BOOKS.map((b) => b.title).join(", ");
const totalBooks = BOOKS.length + MORE_BOOKS.length;

/* ============================================================================
   SMART HANDLERS — computed live from data, checked before keyword scoring
   ========================================================================= */

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];
function parseMonthYear(s: string): Date | null {
  const m = s.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  const mi = MONTHS.indexOf(m[1].toLowerCase());
  if (mi < 0) return null;
  return new Date(parseInt(m[2], 10), mi, 1);
}
function upcomingEngagements() {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return CONFERENCES.upcoming
    .map((e) => ({ ...e, d: parseMonthYear(e.date) }))
    .filter((e) => e.d && e.d.getTime() >= thisMonth.getTime())
    .sort((a, b) => a.d!.getTime() - b.d!.getTime());
}

const totalAwards =
  AWARDS.lifetime.length + AWARDS.roll.reduce((n, y) => n + y.items.length, 0);

type Handler = { test: (q: string) => boolean; answer: () => string };

const SMART_HANDLERS: Handler[] = [
  // ---- next / upcoming speaking engagement ----
  {
    test: (q) =>
      /(next|upcoming|where.*speak|current).*(lectur|speak|conferen|engage|event|talk)/.test(q) ||
      /(lectur|speak|conferen|engage|event).*(next|upcoming)/.test(q) ||
      q.includes("where is he speaking") ||
      q.includes("where is patrick treacy speaking"),
    answer: () => {
      const list = upcomingEngagements();
      if (!list.length) {
        return `There are no further engagements listed beyond the current schedule. His most recent featured keynote was "${CONFERENCES.featured.title}" at ${CONFERENCES.featured.event}. Check the Speaking section or his YouTube/Instagram for newly announced dates.`;
      }
      const [next, ...rest] = list;
      const restText = rest.length
        ? ` After that: ${rest.map((e) => `${e.event} in ${e.place} (${e.date})`).join("; ")}.`
        : "";
      return `His next public engagement is ${next.event} in ${next.place} (${next.date}), speaking on "${next.topic}".${restText}`;
    },
  },
  // ---- how many books / total book count ----
  {
    test: (q) => /how many (book|books)/.test(q) || (q.includes("book") && q.includes("total")),
    answer: () =>
      `Professor Treacy has written ${totalBooks} books in total — ${BOOKS.length} with cover art shown in the Books section here, plus ${MORE_BOOKS.length} more in the wider library. The full list: ${bookTitles}, and also ${MORE_BOOKS.map((b) => b.split(" — ")[0]).join(", ")}.`,
  },
  // ---- latest / newest book & upcoming releases ----
  {
    test: (q) =>
      (q.includes("book") && /(latest|newest|new book|recent|next book|release|coming out|coming soon|upcoming book)/.test(q)) ||
      q.includes("when is his next book") ||
      q.includes("when will his book release"),
    answer: () =>
      `This site doesn't list exact publication dates for each of his ${totalBooks} books, so I can't say for certain which is the very latest, and there's no unreleased title currently announced here. His most science-forward recent titles are "The Language of Peptides" and "Q&A on Regenerative Medicine". For release news and announcements, his YouTube (@PatrickTreacyAilesbury) and Instagram (@ptreacy) — linked in the Media & Social section — are the best up-to-date source.`,
  },
  // ---- YouTube specifics ----
  {
    test: (q) => q.includes("youtube") || q.includes("subscriber") || q.includes("how many videos"),
    answer: () =>
      `His YouTube channel is ${FEEDS.youtube.handle} (${FEEDS.youtube.stats}) — covering medicine, science, travel and humanitarianism. You can watch his latest uploads right on this page in the Media & Social section, or visit ${FEEDS.youtube.channelUrl} directly.`,
  },
  // ---- Instagram specifics ----
  {
    test: (q) => q.includes("instagram") || q.includes(" ig ") || q.startsWith("ig "),
    answer: () => {
      const ig = SOCIAL.channels.find((c) => c.platform === "Instagram")!;
      return `He's on Instagram as ${ig.handle} — ${ig.note}. Find the link in the Media & Social section, or go to ${ig.href}.`;
    },
  },
  // ---- LinkedIn specifics ----
  {
    test: (q) => q.includes("linkedin"),
    answer: () => {
      const li = SOCIAL.channels.find((c) => c.platform === "LinkedIn")!;
      return `He's on LinkedIn as ${li.handle} — ${li.note}. Link: ${li.href}.`;
    },
  },
  // ---- total awards / how many awards ----
  {
    test: (q) => /how many (award|awards|honou?rs|distinctions)/.test(q) || q.includes("total awards"),
    answer: () =>
      `Professor Treacy holds ${totalAwards}+ distinctions in total, including ${AWARDS.lifetime.length} Lifetime Achievement Awards (from ${AWARDS.lifetimeNations}). The full award roll on this site spans ${AWARDS.rollHeadline.replace("Award Roll · ", "")}.`,
  },
  // ---- latest / most recent award ----
  {
    test: (q) => q.includes("award") && /(latest|newest|most recent|recent|this year)/.test(q),
    answer: () => {
      const latest = AWARDS.roll[0];
      return `His most recent awards (${latest.year}) include: ${latest.items.map((i) => i.title + (i.place ? ` (${i.place})` : "")).join("; ")}.`;
    },
  },
  // ---- earliest / first award ----
  {
    test: (q) => q.includes("award") && /(first|earliest|oldest|began|started)/.test(q),
    answer: () => {
      const earliest = AWARDS.roll[AWARDS.roll.length - 1];
      return `On this site's award roll, the earliest entries are from ${earliest.year}: ${earliest.items.map((i) => i.title + (i.place ? ` (${i.place})` : "")).join("; ")}.`;
    },
  },
  // ---- how many publications ----
  {
    test: (q) => /how many (publication|papers|articles)/.test(q),
    answer: () =>
      `Professor Treacy has 150+ scientific publications overall. This site features a selected reading list of ${PUBLICATIONS.items.length}: ${PUBLICATIONS.items.map((p) => p.title).join("; ")}.`,
  },
  // ---- how many research areas ----
  {
    test: (q) => /how many (research|innovations?)/.test(q),
    answer: () =>
      `His Research & Innovation section covers ${RESEARCH.items.length} frontiers: ${RESEARCH.items.map((r) => r.title).join(", ")}.`,
  },
  // ---- how many lecture topics ----
  {
    test: (q) => /how many (lecture|topics|talks)/.test(q),
    answer: () => `He offers ${LECTURES.topics.length} signature lecture topics: ${LECTURES.topics.join("; ")}.`,
  },
  // ---- how many qualifications ----
  {
    test: (q) => /how many (qualification|credential|degree|fellowship)/.test(q),
    answer: () =>
      `He holds ${QUALIFICATIONS.items.length} qualifications and fellowships: ${QUALIFICATIONS.items.map((i) => i.abbr).join(", ")}.`,
  },
  // ---- how many countries / physicians trained ----
  {
    test: (q) => q.includes("how many countries"),
    answer: () => `He has lectured in ${GLOBAL.stats.find((s) => s.label.includes("Countries"))?.value ?? "40+"} countries across ${GLOBAL.regions.join(", ")}.`,
  },
  {
    test: (q) => q.includes("how many physicians") || q.includes("how many doctors"),
    answer: () => `He has trained ${GLOBAL.stats.find((s) => s.label.includes("Physicians"))?.value ?? "10,000+"} physicians worldwide.`,
  },
  // ---- email / contact ----
  {
    test: (q) => q.includes("email") || q.includes("contact") || q.includes("get in touch"),
    answer: () =>
      `You can reach him at ${CONTACT.email} for speaking engagements, faculty invitations, research collaborations and select media requests. ${CONTACT.lead}`,
  },
];

/* ============================================================================
   GENERATED KNOWLEDGE — one entry per item across every data source
   ========================================================================= */

const generated: Entry[] = [];

// ---- Research & Innovation (9) ----
for (const r of RESEARCH.items) {
  generated.push({ keywords: [r.title.toLowerCase(), "research " + r.title.toLowerCase()], answer: `${r.title}: ${r.body}` });
}
generated.push({
  keywords: ["research areas", "innovation", "research and innovation", "frontiers", "what has he researched"],
  answer: `His Research & Innovation work spans: ${RESEARCH.items.map((r) => r.title).join(", ")}. Ask me about any one of these by name for detail.`,
});

// ---- PLUS Technique (4 pillars + overview) ----
generated.push({
  keywords: ["plus technique", "plus protocol", "signature protocol"],
  answer: `The PLUS Technique™ is ${PLUS.tagline}. ${PLUS.intro} Its four pillars: ${PLUS.pillars.map((p) => `${p.letter} = ${p.title}`).join("; ")}.`,
});
for (const p of PLUS.pillars) {
  generated.push({ keywords: [p.title.toLowerCase(), p.sub?.toLowerCase() ?? ""].filter(Boolean), answer: `${p.title}${p.sub ? ` (${p.sub})` : ""}: ${p.body} This is one of the four pillars of his PLUS Technique™.` });
}

// ---- Patient Safety & Complications (6) ----
for (const s of SAFETY.items) {
  generated.push({ keywords: [s.title.toLowerCase(), "safety " + s.title.toLowerCase()], answer: `${s.title}: ${s.body}` });
}
generated.push({
  keywords: ["patient safety", "complication management", "safety work"],
  answer: `${SAFETY.lead} His safety work covers: ${SAFETY.items.map((s) => s.title).join(", ")}.`,
});

// ---- Qualifications (9) ----
for (const q of QUALIFICATIONS.items) {
  generated.push({ keywords: [q.abbr.toLowerCase()], answer: `${q.abbr} — ${q.body}.` });
}
generated.push({
  keywords: ["qualifications", "credentials", "degrees", "fellowships", "qualified"],
  answer: `Professor Treacy holds ${QUALIFICATIONS.items.length} qualifications and fellowships: ${QUALIFICATIONS.items.map((i) => `${i.abbr} (${i.body})`).join("; ")}.`,
});

// ---- Lecture topics (9) ----
for (const t of LECTURES.topics) {
  generated.push({ keywords: [t.toLowerCase()], answer: `"${t}" is one of his signature lecture topics — a high-level talk designed for medical conference audiences.` });
}
generated.push({
  keywords: ["lecture topics", "what does he lecture on", "speaking topics", "talks about"],
  answer: `His signature lecture topics: ${LECTURES.topics.join("; ")}.`,
});

// ---- Conferences: featured + upcoming ----
generated.push({
  keywords: ["featured keynote", "amwc", "monaco", "keynote"],
  answer: `His featured keynote is "${CONFERENCES.featured.title}" at ${CONFERENCES.featured.event} (${CONFERENCES.featured.meta}).`,
});
for (const e of CONFERENCES.upcoming) {
  generated.push({
    keywords: [e.place.toLowerCase(), e.event.toLowerCase()],
    answer: `${e.event} in ${e.place} (${e.date}) — he'll be speaking on "${e.topic}".`,
  });
}
generated.push({
  keywords: ["conferences", "speaking engagements", "congresses", "where has he spoken"],
  answer: `${CONFERENCES.lead} Upcoming: ${CONFERENCES.upcoming.map((e) => `${e.event} in ${e.place} (${e.date})`).join("; ")}.`,
});

// ---- Publications (8) ----
for (const p of PUBLICATIONS.items) {
  generated.push({ keywords: [p.title.toLowerCase()], answer: `"${p.title}" — ${p.body} (${p.source})` });
}
generated.push({
  keywords: ["publications", "papers", "articles", "published work"],
  answer: `Selected publications: ${PUBLICATIONS.items.map((p) => `"${p.title}" (${p.source})`).join("; ")}. He has 150+ scientific publications in total.`,
});

// ---- Awards: lifetime (5) + roll by year ----
for (const a of AWARDS.lifetime) {
  generated.push({ keywords: [a.country.toLowerCase() + " award", a.org.toLowerCase()], answer: `In ${a.country}: ${a.org} — ${a.body}` });
}
generated.push({
  keywords: ["lifetime achievement", "lifetime achievement award"],
  answer: `He holds ${AWARDS.lifetime.length} Lifetime Achievement Awards, from ${AWARDS.lifetimeNations}: ${AWARDS.lifetime.map((a) => `${a.org} (${a.country})`).join("; ")}.`,
});
for (const y of AWARDS.roll) {
  generated.push({
    keywords: [y.year.toLowerCase() + " award", y.year.toLowerCase() + " awards"],
    answer: `In ${y.year}: ${y.items.map((i) => i.title + (i.place ? ` (${i.place})` : "")).join("; ")}.`,
  });
}
generated.push({
  keywords: ["awards", "honours", "honors", "recognition", "distinctions", "won", "prizes"],
  answer: `Professor Treacy holds ${totalAwards}+ distinctions, including ${AWARDS.lifetime.length} Lifetime Achievement Awards from ${AWARDS.lifetimeNations}. The award roll spans ${AWARDS.rollHeadline.replace("Award Roll · ", "")} — ask me about a specific year (e.g. "2026 awards") or "latest awards" for the most recent.`,
});

// ---- Endorsements (5) ----
for (const e of ENDORSEMENTS.items) {
  generated.push({ keywords: [e.name.toLowerCase()], answer: `${e.name} (${e.award}) said: "${e.quote}"` });
}
generated.push({
  keywords: ["endorsements", "testimonials", "what do people say", "peers say"],
  answer: `Peers across five nations have honoured him, including ${ENDORSEMENTS.items.map((e) => e.name).join(", ")}. Ask me about any of them by name for their full quote.`,
});

// ---- Media outlets (4) ----
for (const m of MEDIA.outlets) {
  generated.push({ keywords: [m.name.toLowerCase()], answer: `${m.name} (${m.kind}): ${m.note}.` });
}
generated.push({
  keywords: ["media coverage", "press", "featured in", "media appearances"],
  answer: `He's been featured across: ${MEDIA.outlets.map((m) => m.name).join(", ")}.`,
});

// ---- Social channels (4) ----
for (const c of SOCIAL.channels) {
  generated.push({ keywords: [c.platform.toLowerCase()], answer: `${c.platform}: ${c.handle} — ${c.note}.${c.href ? ` ${c.href}` : ""}` });
}
generated.push({
  keywords: ["social media", "follow him", "social channels", "socials"],
  answer: `You can follow him on: ${SOCIAL.channels.map((c) => `${c.platform} (${c.handle})`).join(", ")}. Links are in the Media & Social section.`,
});

// ---- Speaker kit ----
generated.push({
  keywords: ["speaker kit", "media kit", "book him", "hire him", "invite him", "conference organiser", "conference organizer"],
  answer: `${SPEAKER_KIT.title} The media kit includes: ${SPEAKER_KIT.included.join(", ")}. Email ${CONTACT.email} to enquire.`,
});

// ---- Global footprint ----
generated.push({
  keywords: ["global footprint", "global recognition", "countries", "regions", "where has he lectured"],
  answer: `${GLOBAL.lead} He's lectured across ${GLOBAL.regions.join(", ")}: ${GLOBAL.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(", ")}.`,
});

// ---- Humanitarian timeline (per entry + summary) ----
for (const t of TIMELINE) {
  generated.push({ keywords: [t.year.toLowerCase()], answer: `${t.year}: ${t.text}` });
}

// ---- Books (per title, incl. MORE_BOOKS) ----
for (const b of BOOKS) {
  generated.push({ keywords: [b.title.toLowerCase()], answer: `"${b.title}" (${b.kind}) — ${b.blurb}` });
}
for (const b of MORE_BOOKS) {
  const [title, desc] = b.split(" — ");
  generated.push({ keywords: [title.toLowerCase().replace(/[…]/g, "")], answer: `"${title}" — ${desc}` });
}

/* ============================================================================
   CURATED — big-picture / narrative questions
   ========================================================================= */

const curated: Entry[] = [
  {
    keywords: ["who is", "whos", "bio", "biography", "patrick treacy", "himself", "his career", "background", "professor", "prof"],
    answer:
      "Professor Patrick Treacy is an Irish doctor, author, humanitarian and a globally recognised pioneer of regenerative aesthetic medicine. He founded the Ailesbury Clinic in Dublin, and over more than 40 years his research and teaching have reached physicians on six continents. He is also known as the friend and physician who became Michael Jackson's doctor, and is the author of fourteen books.",
  },
  {
    keywords: ["ailesbury", "clinic", "dublin", "practice", "where does he work", "where is he based"],
    answer:
      "Professor Treacy is the founder of the Ailesbury Clinic in Dublin, Ireland (David Lloyd Riverview, Beech Hill Rd, Clonskeagh, D04 AF10). It has been repeatedly named among Ireland's top aesthetic clinics.",
  },
  {
    keywords: ["book", "books", "written", "write", "titles", "read", "collection", "library"],
    answer: `Professor Treacy has written ${totalBooks} books, spanning memoir, aesthetic medicine, regenerative science, pandemics, medical history, humanitarian memoir and the psychology of the face. Featured titles include: ${bookTitles}. Head to the Books section to flip through the covers — double-click any cover to find it on Amazon UK, US or IE.`,
  },
  {
    keywords: ["behind the mask", "mask", "memoir"],
    answer: `"Behind the Mask" is Dr Treacy's memoir — the extraordinary story of the Irishman who became Michael Jackson's doctor, spanning travel, adventure, politics and the birth of aesthetic medicine. ${MASK.quote}`,
  },
  {
    keywords: ["michael", "jackson", "mj", "singer", "friend", "friendship"],
    answer:
      "Dr Treacy met Michael Jackson in Ireland in 2006. What began as care became a genuine friendship, and their bond became a humanitarian mission through the Michael Jackson Legacy Organisation, helping build orphanages in Haiti and Liberia. He tells the full story in his memoir, \"Behind the Mask.\"",
  },
  {
    keywords: ["aesthetic", "medicine", "pioneer", "hyaluronidase", "cosmetic", "field"],
    answer:
      "Professor Treacy is a pioneer of regenerative aesthetic medicine and an early international advocate for high-dose hyaluronidase in filler-related vascular emergencies. Much of his work centres on patient safety and complication management. His book \"The Evolution of Aesthetic Medicine\" charts how the discipline was built.",
  },
  {
    keywords: ["humanitarian", "africa", "orphanage", "orphanages", "charity", "hiv", "aids", "liberia", "haiti", "uganda", "pakistan", "malawi", "water"],
    answer:
      "Professor Treacy's humanitarian work spans nearly four decades: HIV/AIDS relief in South Africa (from 2001), earthquake relief and building an orphanage and two schools in Haiti (2010–13), an orphanage in Liberia (2012, with the Michael Jackson Legacy Organisation), hospital work in Malawi (2016), rural projects in Uganda (2019–26), physician training and clean-water pump projects in Pakistan (2023–24).",
  },
  {
    keywords: ["needle", "damage", "story", "started", "beginning", "northern ireland", "1987"],
    answer:
      "His story turned on a single moment in 1987 — a needlestick injury that set him on a path from Northern Ireland into humanitarian medicine in Africa and, ultimately, to the summit of aesthetic medicine.",
  },
  {
    keywords: ["buy", "purchase", "amazon", "order", "where can i get", "shop", "get the book"],
    answer:
      "You can buy the books through Amazon UK, US and Ireland. Scroll to the Books section, then double-click any cover — a pop-up will let you pick your Amazon store for that title.",
  },
  {
    keywords: ["thanks", "thank you", "cheers", "great", "awesome", "helpful"],
    answer: "You're very welcome. Ask me anything else about Professor Treacy, his work or this website.",
  },
];

export const KNOWLEDGE: Entry[] = [...curated, ...generated].map((e) => ({
  ...e,
  keywords: expandKeywords(e.keywords),
}));

export const GREETING = `Hello! I'm Professor Treacy's assistant. Ask me about ${AUTHOR.name} — his ${totalBooks} books, his research and protocols, patient safety work, lecture topics, upcoming speaking engagements, publications, awards, humanitarian missions, his friendship with Michael Jackson, or how to follow him on YouTube, Instagram or LinkedIn.`;

export const SUGGESTIONS: Suggestion[] = [
  "Who is Patrick Treacy?",
  "Where is he speaking next?",
  "What awards has he won?",
  "Tell me about the PLUS Technique",
  "How can I follow him on YouTube?",
  "Tell me about Michael Jackson",
];

const GREETING_WORDS = ["hi", "hey", "hello", "yo", "hiya", "howdy", "good morning", "good evening"];

export function answerQuestion(query: string): string {
  const raw = query.toLowerCase().trim();
  if (!raw) return "Ask me anything about Professor Patrick Treacy — his books, research, awards, speaking schedule or story.";

  if (GREETING_WORDS.some((w) => raw === w || raw.startsWith(w + " "))) {
    return GREETING;
  }

  const q = norm(raw);

  // 1. smart computed handlers first (dynamic, always current)
  for (const h of SMART_HANDLERS) {
    if (h.test(q)) return h.answer();
  }

  // 2. keyword-scored knowledge base
  let best: Entry | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (!kw) continue;
      const nk = norm(kw);
      if (nk && q.includes(nk)) score += nk.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) return best.answer;

  return "I don't have that exact detail, but I can help with: his biography, research & innovation, the PLUS Technique, patient safety work, qualifications, lecture topics, conferences & upcoming speaking engagements, publications, awards & honours, humanitarian missions, his 14 books, his friendship with Michael Jackson, or his YouTube/Instagram/LinkedIn. Try asking about any of these!";
}
